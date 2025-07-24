import { AgentLog } from "@/components/agent-log";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getResults } from "@/lib/data";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const results = await getResults();
  const result = results.find((r) => r.task_id.toString() === taskId);

  if (!result) {
    return <div>Task not found</div>;
  }

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          Task: {result.task_id}
        </h1>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Intent</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.intent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Site</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.site}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={
                result.result === "PASS" ? "text-green-500" : "text-red-500"
              }
            >
              {result.result}
            </p>
            {result.result_notes && (
              <Popover>
                <PopoverTrigger>
                  <p className="text-blue-500 text-sm">View Notes</p>
                </PopoverTrigger>
                <PopoverContent>{result.result_notes}</PopoverContent>
              </Popover>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agent Output</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.agent_output}</p>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        {result.agent_logs.map((step) => (
          <AgentLog key={step.step} step={step} />
        ))}
      </div>
    </main>
  );
}
