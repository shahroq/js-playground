import { useEffect, type PropsWithChildren } from "react";
import { useAuthContext } from "./auth-context";
import { Alert } from "@jsp/shared/comps";
import { useRouterContext } from "@/modules/router";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthContext();
  const { navigate } = useRouterContext();

  /*
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  */

  if (!isAuthenticated) {
    return <Alert variant="danger">Protected Route ALERT!</Alert>;
  }

  return children;
}
