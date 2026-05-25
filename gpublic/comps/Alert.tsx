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
  dismissible?: boolean;
  // icon?: string;
};

export function Alert({
  children,
  variant = "primary",
  dismissible = true,
}: Props) {
  return (
    <div
      className={`alert alert-${variant} ${dismissible ? "alert-dismissible fade show" : ""}`}
      role="alert"
    >
      <div className="flex-1">{children || ""}</div>

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
