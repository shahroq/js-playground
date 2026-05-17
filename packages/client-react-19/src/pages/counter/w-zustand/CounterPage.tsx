import { Button } from "@/comps/Button";
import { PageTitle } from "@/comps/PageTitle";
import { useCounterStore } from "./store";
import { useShallow } from "zustand/shallow";

const page = {
  title: "Counter w/ Zustand",
  breadcrumb: [{ title: "Counter", href: "/counter" }, { title: "w/ Zustand" }],
};

export function CounterPage() {
  return (
    <section>
      <PageTitle page={page} />
      <Counter />
    </section>
  );
}

function Counter() {
  // 1:
  // const { count, dec, inc } = useCounterStore();
  // 2:
  // const count = useCounterStore((state) => state.count);
  // const dec = useCounterStore((state) => state.dec);
  // const inc = useCounterStore((state) => state.inc);
  // 3: shallow
  const [count, dec, inc] = useCounterStore(
    useShallow((state) => [state.count, state.dec, state.inc]),
  );

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
