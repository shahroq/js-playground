"use client";

import { JSONTree } from "react-json-tree";
import { cn } from "../utils";

type Props<T> = {
  data: T;
  label?: string;
  className?: string;
};

export function Json<T>({ data, label, className }: Props<T>) {
  return (
    <div className={cn(className)}>
      {label && <h4 style={{ marginBottom: 8 }}>{label}</h4>}
      <JSONTree data={data as any} />
    </div>
  );
}
