"use client";
import {
  useCallback,
  useEffect,
  createContext,
  useContext,
  useState,
  type ReactNode,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";

type Props = {
  children: ReactNode;
  title?: ReactNode;
  size?: Size;
  closeOnBackdrop?: boolean;
};
type PropsTrigger = {
  children: ReactNode;
  windowName: string;
};
type PropsWindow = {
  children: ReactNode;
  name: string;
};
type PropsContent = { children: ReactNode };
type PropsFooter = { children: ReactNode };

type ContextValues = {
  openName: string;
  close: () => void;
  open: (name: string) => void;
  title?: ReactNode;
  size: Size;
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

// 1. Create a context & its hook
const ModalContext = createContext<ContextValues | null>(null);
function useModal() {
  const context = useContext(ModalContext);
  if (context === null)
    throw new Error("useDialog must be used within a provider");

  return context;
}

function Modal({ children, title, size = "2xl", closeOnBackdrop }: Props) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) close();
    },
    [close],
  );

  useEffect(() => {
    if (!openName) return;

    document.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, handleEscape]);

  const contextValue: ContextValues = {
    openName,
    open,
    close,
    title,
    size,
    closeOnBackdrop,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

// 3. Create child components to help implementing the common task
function Trigger({ children, windowName }: PropsTrigger) {
  const { open } = useModal();

  return cloneElement(children, { onClick: () => open(windowName) });
}
function Window({ children, name }: PropsWindow) {
  const { openName, close, size, title, closeOnBackdrop } = useModal();

  // SSR safety for Next.js
  if (typeof document === "undefined") return null;

  if (name !== openName) return null;

  return createPortal(
    <div
      className={cn(`modal`, sizeClasses[size])}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal-backdrop"
        onClick={() => {
          if (closeOnBackdrop) close();
        }}
      ></div>
      <div className="modal-content">
        <header className="">
          <h2 id="modal-title">{title}</h2>
          <button className="btn-close" onClick={close}>
            X
          </button>
        </header>
        {children}
      </div>
    </div>,
    document.body,
  );
}

function Content({ children }: PropsContent) {
  return <section>{children}</section>;
}
function Footer({ children }: PropsFooter) {
  return <footer>{children}</footer>;
}

// 4. Add child components as proeprties to parent component
Modal.Trigger = Trigger;
Modal.Window = Window;
Modal.Content = Content;
Modal.Footer = Footer;

export { Modal as ModalV2 };
