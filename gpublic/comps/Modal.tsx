"use client";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  children?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  title?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  closeOnBackdrop?: boolean;
};

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

export function Modal({
  open,
  children,
  size = "2xl",
  title,
  footer,
  onClose,
  closeOnBackdrop,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    dialogRef.current?.focus();
    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, handleEscape]);

  // SSR safety for Next.js
  if (typeof document === "undefined") return null;

  if (!open) return null;

  // const domNode = document.querySelector(".modal-container") as HTMLDivElement;

  return createPortal(
    <div
      className={[`modal`, sizeClasses[size]].filter(Boolean).join(" ")}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-backdrop"
        onClick={() => {
          if (closeOnBackdrop) onClose();
        }}
      ></div>
      <div className="modal-content" tabIndex={-1} ref={dialogRef}>
        {title && (
          <>
            <header>
              <h2 id="modal-title">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="btn-close"
                aria-label="Close modal"
              >
                ✕
              </button>
            </header>
          </>
        )}
        <section>{children}</section>
        {footer && (
          <>
            <footer>{footer}</footer>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
