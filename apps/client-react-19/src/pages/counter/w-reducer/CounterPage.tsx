import { useReducer } from "react";
import { Button } from "@jsp/shared/comps";
import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";
import { counterReducer, INITIAL_STATE } from "./counter-reducer";

const page: Page = {
  title: "Counter w/ Reducer",
  breadcrumb: [{ label: "Counter", path: "/counter" }, { label: "w/ Reducer" }],
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
  const [state, dispatch] = useReducer(counterReducer, INITIAL_STATE);

  const dec = () => {
    // setCounter(counter - 1);
    dispatch({
      type: "DEC",
      payload: 1,
    });
  };
  const inc = () => {
    // setCounter(counter + 1);
    dispatch({
      type: "INC",
      payload: 1,
    });
  };

  return (
    <div className="flex gap-3">
      <Button onClick={dec}>-</Button>
      <p className="border border-slate-400 rounded w-25 flex items-center justify-center">
        {state.count}
      </p>
      <Button onClick={inc}>+</Button>
    </div>
  );
}
