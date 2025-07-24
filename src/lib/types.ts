export type Result = {
  task_id: number;
  site: string;
  result: "PASS" | "FAIL";
  eval_reasoning: string;
  expected_answer: string;
  result_notes: string | null;
  intent: string;
  agent_output: string;
  execution_time_ms: number;
  agent_logs: AgentLogEntry[];
};

export type AgentLogEntry = {
  plan: Plan;
  step: number;
  usage: Usage;
  timestamp: string;
  currentUrl: string;
  screenshot: string;
  modelOutput: ModelOutput;
};

export type Plan = {
  nextStepGoal: string;
  currentStepReasoning: string;
  previousStepEvaluation: string;
};

export type Usage = {
  model: string;
  inputTokensStep: number;
  totalTokensStep: number;
  outputTokensStep: number;
};

export type ModelOutput = {
  done: Done[];
};

export type Done = TextDone | ToolCallDone;

export type TextDone = {
  type: "text";
  text: string;
  reasoning: string;
};

export type ToolCallDone = {
  type: "tool_call";
  toolName: string;
  toolCallId: string;
  reasoning: string;
  screenshot: string;
  args: {
    action: {
      text?: string;
      type: string;
      x?: number;
      y?: number;
      button?: string;
      scroll_x?: number;
      scroll_y?: number;
      duration?: number;
    };
    reasoning: string;
    nextStepGoal: string;
    currentStepReasoning: string;
    previousStepEvaluation: string;
  };
  result: {
    type: string;
    response: {
      role: string;
      content: {
        text: string;
        type: string;
        image?: string;
      }[];
    };
  };
};
