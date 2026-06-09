import { Button } from "@jsp/shared/comps";
import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";

import { Provider } from "react-redux";
import { store, type RootState } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";
import { decrement, increment, reset, changeBy } from "./counter-slice";

const page: Page = {
  title: "Counter w/ ReduxTK",
  breadcrumb: [{ label: "Counter", path: "/counter" }, { label: "w/ ReduxTK" }],
};

export default function CounterPage() {
  return (
    <Provider store={store}>
      <section>
        <PageTitle page={page} />
        <Counter />
      </section>
    </Provider>
  );
}

function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-3">
      <Button onClick={() => dispatch(decrement())}>-</Button>
      <p className="border border-slate-400 rounded w-25 flex items-center justify-center">
        {count}
      </p>
      <Button onClick={() => dispatch(increment())}>+</Button>
      <Button className="btn-danger" onClick={() => dispatch(reset())}>
        Reset
      </Button>
      <Button className="btn-secondary" onClick={() => dispatch(changeBy(10))}>
        +10
      </Button>
      <Button className="btn-secondary" onClick={() => dispatch(changeBy(-10))}>
        -10
      </Button>
    </div>
  );
}
