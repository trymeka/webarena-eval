import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getResults } from "@/lib/data";

export default async function Home() {
  const results = await getResults();

  const totalTasks = results.length;
  const passedTasks = results.filter((r) => r.result === "PASS").length;
  const passPercentage =
    totalTasks > 0 ? ((passedTasks / totalTasks) * 100).toFixed(2) : "0";
  const averageSteps =
    totalTasks > 0
      ? (
          results.reduce((acc, r) => acc + r.agent_logs.length, 0) / totalTasks
        ).toFixed(2)
      : "0";
  const averageTime =
    totalTasks > 0
      ? (
          results.reduce((acc, r) => acc + r.execution_time_ms, 0) /
          totalTasks /
          1000
        ).toFixed(2)
      : "0";

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{totalTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Passed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{passedTasks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pass Percentage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{passPercentage}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{averageSteps}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-2xl">{averageTime}s</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
