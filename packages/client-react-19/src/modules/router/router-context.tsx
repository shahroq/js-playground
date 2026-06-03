import {
  createContext,
  useState,
  useEffect,
  useContext,
  type PropsWithChildren,
} from "react";

type ContextType = {
  curPath: string;
  navigate: (path: string) => void;
};

const RouterContext = createContext<ContextType | null>(null);

function RouterProvider({ children }: PropsWithChildren) {
  const [curPath, setCurPath] = useState(window.location.pathname);

  useEffect(() => {
    const handler = () => setCurPath(window.location.pathname);

    window.addEventListener("popstate", handler);

    // cleanup
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setCurPath(to);
  };

  const contextValue = {
    curPath,
    navigate,
  };

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

function useRouterContext() {
  const context = useContext(RouterContext);
  if (!context)
    throw new Error("useRouterContext must be used inside RouterProvider");
  return context;
}

export { RouterProvider, RouterContext, useRouterContext };
