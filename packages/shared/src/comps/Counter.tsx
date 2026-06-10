"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Button } from "./Button";

type Props = {
  children: ReactNode;
};

type ContextValues = {
  count: number;
  increase: () => void;
  decrease: () => void;
};

// 1. Create a context & its hook
const CounterContext = createContext<ContextValues | null>(null);
function useCounter() {
  const context = useContext(CounterContext);
  if (context === null)
    throw new Error("useCounter must be used within a provider");

  return context;
}

// 2. Create parent component
function Counter({ children }: Props) {
  const [count, setCount] = useState(0);
  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  const contextValue: ContextValues = { count, increase, decrease };

  return (
    <CounterContext.Provider value={contextValue}>
      <span className="flex items-center gap-3">{children}</span>
    </CounterContext.Provider>
  );
}

// 3. Create child components to help implementing the common task
function Count() {
  const { count } = useCounter();

  return <span>{count}</span>;
}

function Label({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

function Increase({ icon }: { icon: string }) {
  const { increase } = useCounter();

  return <Button onClick={increase}>{icon}</Button>;
}

function Decrease({ icon }: { icon: string }) {
  const { decrease } = useCounter();

  return <Button onClick={decrease}>{icon}</Button>;
}
// 4. Add child components as proeprties to parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export { Counter };
