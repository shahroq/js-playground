"use client";

import { Button } from "@/shadcn/components/ui/button";
import { Json } from "@jsp/shared/comps";

type Props = {
  error: Error & {
    digest?: string;
  };
  reset?: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div className="flex h-full flex-col gap-5 p-6">
      <h4>Something went wrong</h4>
      <p>{error.message}</p>
      {reset && <Button onClick={reset}>Try again</Button>}

      {process.env.NODE_ENV === "development" && (
        <Json
          data={{
            message: error.message,
            digest: error.digest,
            stack: error.stack,
          }}
        />
      )}
    </div>
  );
}
