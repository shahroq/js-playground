import { askDummy, askGeminiWPrompt, askGeminiWMessages } from "./api";
import { UIMessage } from "./types";

// actions
export async function updateMessagesReducer(
  prevState: UIMessage[],
  newMessage: UIMessage,
) {
  let messages = [...prevState, newMessage];
  // const prompt = buildPrompt(conversation);
  const modelMessages = messages.map(({ id: _id, ...m }) => m);

  try {
    // const text = await askGeminiWPrompt(prompt);
    const text = await askGeminiWMessages(modelMessages);
    messages = [
      ...messages,
      { content: text, role: "assistant", id: crypto.randomUUID() },
    ];
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";

    messages = [
      ...messages,
      {
        content: `Something went wrong: ${message}`,
        role: "assistant",
        id: crypto.randomUUID(),
      },
    ];
  }

  return messages;
}

// utils
export function buildPrompt(messages: UIMessage[]) {
  return (
    "Continue this conversation:\n\n" +
    messages.map((m) => `${m.role}: ${m.content}`).join("\n")
  );
}
