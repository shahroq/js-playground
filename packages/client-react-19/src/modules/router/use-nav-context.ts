import { useContext } from "react";
import { NavContext } from "./nav-context";

function useNavContext() {
  const context = useContext(NavContext);
  if (!context)
    throw new Error("useNavContext must be used inside NavProvider");
  return context;
}

export { useNavContext };
