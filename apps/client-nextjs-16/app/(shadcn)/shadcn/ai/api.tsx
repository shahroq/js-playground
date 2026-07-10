"use server";

import { generateText } from "ai";
import { createFireworks } from "@ai-sdk/fireworks";
import { pause } from "@jsp/shared/utils";

const apiKey = process.env.FIREWORKS_API_KEY;
if (!apiKey) throw new Error("FIREWORKS_API_KEY is not set");

const fireworksCustom = createFireworks({ apiKey });

// api
export async function generateResponse2(prompt: string) {
  const { text } = await generateText({
    model: fireworksCustom("accounts/fireworks/models/firefunction-v1"),
    prompt,
  });

  return { text };
}

export async function generateResponse(prompt: string) {
  await pause(500);
  const text = `Generated text for "${prompt}" is: ...`;

  return { text };
}
