"use client";

import { JSONTree } from "react-json-tree";

type Props<T> = {
  data: T;
  label?: string;
};

export function Json<T>({ data, label }: Props<T>) {
  return (
    <div>
      {label && <h4 style={{ marginBottom: 8 }}>{label}</h4>}
      <JSONTree data={data as any} />
    </div>
  );
}
