import { cn } from "../utils";

export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

type Props = {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  dismissible?: boolean;
  messages?: string[] | null | undefined;
  // icon?: string;
};

export function Alert({
  children,
  messages,
  variant = "primary",
  className,
  dismissible = true,
}: Props) {
  return (
    <div
      className={cn(
        "alert",
        `alert-${variant}`,
        `${dismissible} || "alert-dismissible fade show"`,
        className,
      )}
      role="alert"
    >
      <div className="flex-1">
        <span className="font-semibold">{children || ""}</span>
        {messages && (
          <ul>
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}
      </div>

      {dismissible && (
        <button
          type="button"
          className="btn-close"
          data-dismiss="alert"
          aria-label="Close"
        >
          X
        </button>
      )}
    </div>
  );
}
