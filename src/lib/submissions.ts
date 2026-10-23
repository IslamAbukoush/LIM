export type SubmissionKind =
  "volunteer" | "contact" | "donation" | "discrimination";
export type SubmissionPayload = Record<string, string | boolean>;
export type SubmissionReceipt = { reference: string; mode: "demo" };

/** Replace with a server API adapter. Never log or persist personal data here. */
export async function submitDemo(
  kind: SubmissionKind,
  payload: SubmissionPayload,
  simulateError = false,
): Promise<SubmissionReceipt> {
  void kind;
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 850));
  if (simulateError)
    throw new Error(
      "This is a simulated submission error. Your entries are still here. Turn off the demo error and try again.",
    );
  return { reference: "DEMO-PREVIEW", mode: "demo" };
}
