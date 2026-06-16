"use client";
import {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
  cloneElement,
  type ReactNode,
  type ReactElement,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";

type Props = PropsWithChildren<{
  title?: ReactNode;
  size?: Size;

  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;

  // controlled
  openName?: string;

  // uncontrolled support
  defaultOpenName?: string;
  onOpenChange?: (name: string) => void;
}>;
type PropsTrigger = PropsWithChildren<{ windowName: string }>;
type PropsWindow = PropsWithChildren<{ name: string }>;

type ContextValues = {
  openedModalName: string;

  close: () => void;
  open: (name: string) => void;

  title?: ReactNode;
  size: Size;

  closeOnBackdrop?: boolean;
  closeOnEscape: boolean;
};

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

// TODO:
// add focus trapping

// 1. Create a context & its hook
const ModalContext = createContext<ContextValues | null>(null);
function useModalContext() {
  const context = useContext(ModalContext);
  if (context === null)
    throw new Error("useDialog must be used within a provider");

  return context;
}

function Modal({
  children,
  title,
  size = "2xl",

  closeOnBackdrop = true,
  closeOnEscape = true,

  defaultOpenName = "",
  openName,
  onOpenChange,
}: Props) {
  const isControlled = openName !== undefined;

  const [internalOpenName, setInternalOpenName] = useState(defaultOpenName);
  const openedModalName = isControlled ? openName : internalOpenName;

  const open = useCallback(
    (name: string) => {
      if (!isControlled) {
        setInternalOpenName(name);
      }

      onOpenChange?.(name);
    },
    [isControlled, onOpenChange],
  );

  const close = useCallback(() => {
    if (!isControlled) setInternalOpenName("");

    onOpenChange?.("");
  }, [isControlled, onOpenChange]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (!closeOnEscape) return;

      if (event.key === "Escape" && !event.defaultPrevented) {
        close();
      }
    },
    [close, closeOnEscape],
  );

  useEffect(() => {
    if (!openedModalName) return;

    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [openedModalName, handleEscape]);

  const contextValue: ContextValues = useMemo<ContextValues>(
    () => ({
      openedModalName,

      open,
      close,

      title,
      size,

      closeOnBackdrop,
      closeOnEscape,
    }),
    [openedModalName, open, close, title, size, closeOnBackdrop, closeOnEscape],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. Create sub components to help implementing the common task
function Trigger({ children, windowName }: PropsTrigger) {
  const { open } = useModalContext();

  const child = children as ReactElement<any>;

  return cloneElement(child, {
    ...child.props,
    onClick: (e: React.MouseEvent) => {
      child.props?.onClick?.(e);

      if (!e.defaultPrevented) {
        open(windowName);
      }
    },
  });
}
function Window({ children, name }: PropsWindow) {
  const { openedModalName, close, title, size, closeOnBackdrop } =
    useModalContext();

  // SSR safety for Next.js
  if (typeof document === "undefined") return null;

  if (openedModalName !== name) return null;

  return createPortal(
    <div
      className={cn(`modal`, sizeClasses[size])}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-backdrop"
        onClick={() => {
          if (!closeOnBackdrop) return;

          close();
        }}
      />
      <div className="modal-content">
        <header>
          <h2 id="modal-title">{title}</h2>
          <button
            type="button"
            className="btn-close"
            onClick={close}
            aria-label="Close modal"
          >
            X
          </button>
        </header>
        {children}
      </div>
    </div>,
    document.body,
  );
}

function Content({ children }: PropsWithChildren) {
  return <section>{children}</section>;
}
function Footer({ children }: PropsWithChildren) {
  return <footer>{children}</footer>;
}

// 4. Add child components as proeprties to parent component
Modal.Trigger = Trigger;
Modal.Window = Window;
Modal.Content = Content;
Modal.Footer = Footer;

export { Modal as ModalV2, useModalContext };
