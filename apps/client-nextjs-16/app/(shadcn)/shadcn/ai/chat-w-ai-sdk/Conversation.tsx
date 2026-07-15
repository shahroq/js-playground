"use client";

import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Spinner } from "@/shadcn/components/ui/spinner";
import { Message } from "./Message";
import { UIMessage } from "./types";

type Props = { messages: UIMessage[]; isPending: boolean };

export function Conversation({ messages, isPending }: Props) {
  return (
    <section id="conversation" className="flex w-full flex-col gap-3">
      {messages.map((m) => (
        <Bubble
          align={m.role === "user" ? "end" : "start"}
          variant={m.role === "user" ? "default" : "secondary"}
          key={m.id}
        >
          <BubbleContent>
            <Message message={m} />
          </BubbleContent>
        </Bubble>
      ))}
      {isPending && (
        <Bubble align="start" variant="secondary">
          <BubbleContent>
            <Spinner />
          </BubbleContent>
        </Bubble>
      )}
    </section>
  );
}
