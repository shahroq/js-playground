/**
 * this is a place to put all providers in the app using react context
 */

"use client";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
