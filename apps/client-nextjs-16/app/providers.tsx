/**
 * this is a place to put all providers in the app using react context
 */

"use client";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return <>{children}</>;
}
