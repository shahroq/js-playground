"use server";

import { getEncoding } from "js-tiktoken";

export type TokenizerState = {
  error?: string;
  prompt?: string;
  count?: number;
  tokens?: number[];
  tokenStrings?: string[];
};

export async function tokenizeAction(
  _: TokenizerState,
  formData: FormData,
): Promise<TokenizerState> {
  const prompt = formData.get("prompt")?.toString() ?? "";

  try {
    const encoding = getEncoding("cl100k_base");
    const tokens = encoding.encode(prompt);
    const tokenStrings = tokens.map((id) => encoding.decode([id]));

    return { prompt, count: tokens.length, tokens, tokenStrings };
  } catch {
    return { error: "Unable to tokenize input.", prompt };
  }
}
