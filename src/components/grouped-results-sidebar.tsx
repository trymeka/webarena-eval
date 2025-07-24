"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { Result } from "@/lib/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function GroupedResultsSidebar({
  groupedResults,
}: {
  groupedResults: Record<string, Result[]>;
}) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Tasks</SidebarGroupLabel>
            {Object.entries(groupedResults).map(([site, results]) => (
              <Collapsible key={site} defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between p-2"
                    >
                      {site}
                      <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {results.map((result) => (
                        <SidebarMenuSubItem key={result.task_id}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === `/${result.task_id}`}
                          >
                            <Link href={`/${result.task_id}`}>
                              Task {result.task_id}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
