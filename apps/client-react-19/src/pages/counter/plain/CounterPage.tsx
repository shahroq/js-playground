import { Button } from "@packages/comps";
import { PageTitle } from "@/comps";
import type { Page } from "@packages/types/types";
import { useState } from "react";

const page: Page = {
  title: "Counter",
  breadcrumb: [{ label: "Counter", path: "/counter" }, { label: "Plain" }],
};

export default function CounterPage() {
  return (
    <section>
      <PageTitle page={page} />
      <Counter />
    </section>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  const dec = () => setCount(count - 1);
  const inc = () => setCount(count + 1);

  return (
    <div className="flex gap-3">
      <Button onClick={dec}>-</Button>
      <p className="border border-slate-400 rounded w-25 flex items-center justify-center">
        {count}
      </p>
      <Button onClick={inc}>+</Button>
    </div>
  );
}
