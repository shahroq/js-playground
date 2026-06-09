import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

type ContextType = {
  count: number;
  dec: () => void;
  inc: () => void;
};

const CounterContext = createContext<ContextType | null>(null);

function CounterProvider({ children }: PropsWithChildren) {
  const [count, setCount] = useState(0);

  const dec = () => setCount(count - 1);
  const inc = () => setCount(count + 1);

  const contextValue = {
    count,
    dec,
    inc,
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
}

function useCounterContext() {
  const context = useContext(CounterContext);
  if (!context)
    throw new Error("useCounterContext must be used inside CounterProvider");
  return context;
}

export { CounterProvider, CounterContext, useCounterContext };
