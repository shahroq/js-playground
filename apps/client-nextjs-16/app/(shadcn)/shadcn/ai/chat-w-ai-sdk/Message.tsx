"use client";

import ReactMarkdown from "react-markdown";
import { UIMessage } from "./types";

type Props = { message: UIMessage };

export function Message({ message }: Props) {
  if (message.role !== "assistant") return <>{message.content}</>;

  return <ReactMarkdown>{message.content as string}</ReactMarkdown>;
}
