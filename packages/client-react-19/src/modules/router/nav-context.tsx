import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

type ContextType = {
  curPath: string;
  navigate: (path: string) => void;
};

type Props = {
  children: ReactNode;
};

const NavContext = createContext<ContextType | null>(null);

function NavProvider({ children }: Props) {
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
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
}

function useNavContext() {
  const context = useContext(NavContext);
  if (!context)
    throw new Error("useNavContext must be used inside NavProvider");
  return context;
}

export { NavProvider, NavContext, useNavContext };
