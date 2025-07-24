"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgentLogEntry, Done } from "@/lib/types";

function isToolCall(done: Done): done is Extract<Done, { type: "tool_call" }> {
  return done.type === "tool_call";
}

function isText(done: Done): done is Extract<Done, { type: "text" }> {
  return done.type === "text" && done.text !== "";
}

export function AgentLog({ step }: { step: AgentLogEntry }) {
  const { plan, modelOutput } = step;

  const computerActions = modelOutput.done.filter(isToolCall);
  const textOutputs = modelOutput.done.filter(isText);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step {step.step}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {plan?.currentStepReasoning && (
          <div>
            <h3 className="font-semibold">Plan</h3>
            <p>{plan.currentStepReasoning}</p>
          </div>
        )}
        {textOutputs.length > 0 && (
          <div>
            <h3 className="font-semibold">Thoughts</h3>
            {textOutputs.map((output) => (
              <p key={output.text}>{output.text}</p>
            ))}
          </div>
        )}
        {computerActions.length > 0 && (
          <div>
            <h3 className="font-semibold">Tool Outputs</h3>
            {computerActions.map((action) => (
              <p key={action.toolCallId}>{action.reasoning}</p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
