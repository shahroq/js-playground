"use server";

import { generateText, ModelMessage } from "ai";
import { google } from "@ai-sdk/google";
import { pause } from "@jsp/shared/utils";

// const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
// if (!apiKey) throw new Error("API_KEY is not set");

const options = {
  model: google("gemini-flash-latest"),
  // system: "You are a unhelpful bot, answering questions with a pun.",
  // temperature: 0.5,
  // maxTokens: 20,
};

export async function askGeminiWMessages(messages: ModelMessage[]) {
  console.log(messages);

  const res = await generateText({ ...options, messages });
  console.log(res);

  return res.text;
}

export async function askGeminiWPrompt(prompt: string) {
  console.log(prompt);

  const res = await generateText({ ...options, prompt });
  console.log(res);

  return res.text;
}

export async function askDummy(prompt: string) {
  await pause(500);
  const text = `Generated text with Dummy for prompt: "${prompt}": BLOB`;
  return text;
}
