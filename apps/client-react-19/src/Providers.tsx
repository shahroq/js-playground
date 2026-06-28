/**
 * this is a place to put all providers in the app using react context
 */

import { type PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@/modules/router";
import { ErrorFallback } from "./Error";

const isDev = import.meta.env.DEV;

export function Providers({ children }: PropsWithChildren) {
  const app = <RouterProvider>{children}</RouterProvider>;
  if (isDev) return app;

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // Log the error to your error reporting service
      }}
      onReset={() => {
        // Reset any state that may have caused the error
      }}
    >
      {app}
    </ErrorBoundary>
  );
}
