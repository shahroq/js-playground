import { generateResponse } from "./api";

// types
export type Message = {
  id: string;
  body: string;
  author: "me" | "other";
};

// utils
export function buildPrompt(messages: Message[]) {
  return (
    "Continue this conversation:\n\n" +
    messages.map((m) => `${m.author}: ${m.body}`).join("\n")
  );
}

// actions
export async function updateConversationReducer(
  prevState: Message[],
  newMessage: Message,
) {
  let conversation = [...prevState, newMessage];

  const prompt = buildPrompt(conversation);

  try {
    const { text } = await generateResponse(prompt);
    conversation = [
      ...conversation,
      { body: text, author: "other", id: crypto.randomUUID() },
    ];
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";

    conversation = [
      ...conversation,
      {
        body: `Something went wrong: ${message}`,
        author: "other",
        id: crypto.randomUUID(),
      },
    ];
  }

  return conversation;
}
