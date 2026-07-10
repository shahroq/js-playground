"use client";

import { useActionState, useEffect, useOptimistic, useRef } from "react";
import Form from "next/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/shadcn/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { Message, updateConversationReducer } from "../actions";
import { Conversation } from "./Conversation";

export function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => textareaRef.current?.focus(), []);

  const [conversation, dispatchAction, isPending] = useActionState(
    updateConversationReducer,
    [],
  );
  const [optimisticConversation, setOptimisticConversation] =
    useOptimistic(conversation);

  function formAction(formData: FormData) {
    const body = formData.get("msg")?.toString().trim();
    if (!body) return;

    const newMessage = {
      body,
      author: "me",
      id: crypto.randomUUID(),
    } as Message;

    setOptimisticConversation((conv) => [...conv, newMessage]);

    formRef.current?.reset();
    textareaRef.current?.focus();

    dispatchAction(newMessage);
  }

  return (
    <div className="flex h-full min-h-0 flex-col justify-end gap-5">
      <Conversation messages={optimisticConversation} isPending={isPending} />

      <section id="input">
        <Form className="grid w-full" ref={formRef} action={formAction}>
          <InputGroup>
            <TextareaAutosize
              className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
              name="msg"
              placeholder=""
              data-slot="input-group-control"
              ref={textareaRef}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                className="ml-auto"
                size="sm"
                variant="default"
                type="submit"
                disabled={isPending}
              >
                Send
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </section>
    </div>
  );
}
