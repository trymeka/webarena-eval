import { AgentLog } from "@/components/agent-log";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getResults, getWebArenaTask } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const results = await getResults();
  const result = results.find((r) => r.task_id.toString() === taskId);
  const webarenaTask = await getWebArenaTask(taskId);
  const referenceUrl = webarenaTask?.eval.reference_url;
  if (!result) {
    return <div>Task not found</div>;
  }

  const totalSteps = result.agent_logs.length;
  const totalInputTokens = result.agent_logs.reduce(
    (acc, log) => acc + log.usage.inputTokensStep,
    0,
  );
  const totalOutputTokens = result.agent_logs.reduce(
    (acc, log) => acc + log.usage.outputTokensStep,
    0,
  );

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-base">
          <span className="font-normal text-muted-foreground">
            {result.site}
          </span>{" "}
          Task: {result.task_id}
        </h1>
        <div className="flex items-center gap-1">
          <p
            className={cn(
              "font-semibold",
              result.result === "PASS" ? "text-green-500" : "text-red-500",
            )}
          >
            {result.result}
          </p>
          {result.result_notes && (
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4" />
              </PopoverTrigger>
              <PopoverContent>{result.result_notes}</PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {`${(result.execution_time_ms / 1000).toFixed(2)}s`}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalSteps}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Input Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {totalInputTokens.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-medium text-sm">Output Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {totalOutputTokens.toLocaleString()}
            </div>
          </CardContent>
        </Card>
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
            <CardTitle>Agent Output</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.agent_output}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expected Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="truncate whitespace-pre-wrap break-all">
              {result.expected_answer.includes("$evalType") && webarenaTask
                ? result.expected_answer
                    .replace("$evalType", "url_match")
                    .replace(
                      '$task.eval.reference_url || ""',
                      referenceUrl || "",
                    )
                : result.expected_answer}
            </p>
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
