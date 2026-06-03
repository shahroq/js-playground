import { useEffect, type PropsWithChildren } from "react";
import { useAuthContext } from "./auth-context";
import { Alert } from "@gpublic/comps";
import { useNavContext } from "@/modules/router";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthContext();
  const { navigate } = useNavContext();

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
