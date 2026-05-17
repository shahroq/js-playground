import { Button } from "@/comps/Button";
import { PageTitle } from "@/comps/PageTitle";
import { CounterProvider, useCounterContext } from "./counter-context";

const page = {
  title: "Counter w/ Context",
  breadcrumb: [{ title: "Counter", href: "/counter" }, { title: "w/ Context" }],
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
