import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GroupedResultsSidebar } from "@/components/grouped-results-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getGroupedResults } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebArena Results",
  description: "View the results of your WebArena evaluation.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const groupedResults = await getGroupedResults();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <GroupedResultsSidebar groupedResults={groupedResults} />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
