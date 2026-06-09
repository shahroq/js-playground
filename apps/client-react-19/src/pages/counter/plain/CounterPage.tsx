import { useState } from "react";
import { Button } from "@jsp/shared/comps";
import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";

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
