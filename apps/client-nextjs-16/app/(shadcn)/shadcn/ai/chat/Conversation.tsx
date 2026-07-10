"use client";

import { Bubble, BubbleContent } from "@/shadcn/components/ui/bubble";
import { Spinner } from "@/shadcn/components/ui/spinner";
import { Message } from "../actions";

type Props = { messages: Message[]; isPending: boolean };

export function Conversation({ messages, isPending }: Props) {
  return (
    <section id="conversation" className="flex w-full flex-col gap-3">
      {messages.map((m) => (
        <Bubble
          align={m.author === "me" ? "end" : "start"}
          variant={m.author === "me" ? "default" : "secondary"}
          key={m.id}
        >
          <BubbleContent>{m.body}</BubbleContent>
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
