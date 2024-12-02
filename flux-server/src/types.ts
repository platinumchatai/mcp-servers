export interface FluxGenerateArgs {
  prompt: string;
  go_fast?: boolean;
  guidance?: number;
  megapixels?: string;
  num_outputs?: number;
  aspect_ratio?: string;
  output_format?: string;
  output_quality?: number;
  prompt_strength?: number;
  num_inference_steps?: number;
}

export function isValidFluxArgs(args: any): args is FluxGenerateArgs {
  return (
    typeof args === "object" &&
    args !== null &&
    typeof args.prompt === "string" &&
    (args.go_fast === undefined || typeof args.go_fast === "boolean") &&
    (args.guidance === undefined || typeof args.guidance === "number") &&
    (args.megapixels === undefined || typeof args.megapixels === "string") &&
    (args.num_outputs === undefined || typeof args.num_outputs === "number") &&
    (args.aspect_ratio === undefined || typeof args.aspect_ratio === "string") &&
    (args.output_format === undefined || typeof args.output_format === "string") &&
    (args.output_quality === undefined || typeof args.output_quality === "number") &&
    (args.prompt_strength === undefined || typeof args.prompt_strength === "number") &&
    (args.num_inference_steps === undefined || typeof args.num_inference_steps === "number")
  );
}
