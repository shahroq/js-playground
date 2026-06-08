import type { User } from "@packages/types/types";
import {
  createContext,
  useContext,
  type PropsWithChildren,
  useReducer,
} from "react";

type ContextType = {
  login: (email: string, password: string) => void;
  logout: () => void;
  user?: User;
  isAuthenticated?: boolean;
};

type AuthState = {
  user?: User;
  isAuthenticated?: boolean;
};

type AuthAction =
  | { type: "Auth/Login"; payload?: User }
  | { type: "Auth/Logout" };

const INITIAL_STATE: AuthState = {
  user: undefined,
  isAuthenticated: undefined,
};

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case "Auth/Login":
      console.log("action", action);
      return { ...state, user: action.payload, isAuthenticated: true };
    case "Auth/Logout":
      return INITIAL_STATE;
    default:
      throw new Error("Unknown action.");
  }
}

const AuthContext = createContext<ContextType | null>(null);

function AuthProvider({ children }: PropsWithChildren) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    INITIAL_STATE,
  );

  function login(email: string, password: string) {
    if (!email || !password) return null;

    dispatch({
      type: "Auth/Login",
      payload: { email, password, name: "John Doe" },
    });
  }
  function logout() {
    dispatch({ type: "Auth/Logout" });
  }

  const contextValue = { login, logout, user, isAuthenticated };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
}

export { AuthProvider, AuthContext, useAuthContext };
