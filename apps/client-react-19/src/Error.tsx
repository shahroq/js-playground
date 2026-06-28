import { getErrorMessage } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import { Button } from "@jsp/shared/comps";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="layout layout-tw min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-lg space-y-5">
        <h4>Something went wrong</h4>
        <p className="small">
          An unexpected error occurred while rendering this page.
        </p>

        <pre>{getErrorMessage(error)}</pre>
        <div className="flex justify-end">
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
