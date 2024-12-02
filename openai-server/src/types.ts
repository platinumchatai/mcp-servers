export interface ChatCompletionArgs {
  prompt: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  system_message?: string;
}

export function isValidChatArgs(args: any): args is ChatCompletionArgs {
  return (
    typeof args === "object" &&
    args !== null &&
    typeof args.prompt === "string" &&
    (args.model === undefined || typeof args.model === "string") &&
    (args.temperature === undefined || typeof args.temperature === "number") &&
    (args.max_tokens === undefined || typeof args.max_tokens === "number") &&
    (args.system_message === undefined || typeof args.system_message === "string")
  );
}
