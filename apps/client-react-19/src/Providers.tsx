/**
 * this is a place to put all providers in the app using react context
 */

import { type PropsWithChildren } from "react";
import { RouterProvider } from "@/modules/router";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <RouterProvider>{children}</RouterProvider>
    </>
  );
}
