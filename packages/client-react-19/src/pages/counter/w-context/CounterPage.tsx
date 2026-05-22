import { Button } from "@gpublic/comps";
import { PageTitle } from "@/comps";
import { CounterProvider, useCounterContext } from "./counter-context";
import type { Page } from "@gpublic/types/types";

const page: Page = {
  title: "Counter w/ Context",
  breadcrumb: [{ label: "Counter", path: "/counter" }, { label: "w/ Context" }],
};

export function CounterPage() {
  return (
    <CounterProvider>
      <section>
        <PageTitle page={page} />
        <Counter />
      </section>
    </CounterProvider>
  );
}

function Counter() {
  const { count, inc, dec } = useCounterContext();

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
