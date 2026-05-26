"use client";
import { createContext, useContext, type ReactNode } from "react";
import { Button } from "./Button";

type Props = {
  children: ReactNode;
  className?: string;
};

type ContextValues = {};

const HeroContext = createContext<ContextValues | null>(null);

function useHero() {
  const context = useContext(HeroContext);
  if (context === null)
    throw new Error("useHero must be used within a Hero provider");

  return context;
}

// parent comp
function Hero({ children, className }: Props) {
  const contextValue: ContextValues = {};

  return (
    <HeroContext.Provider value={contextValue}>
      <div className={[`hero`, className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </HeroContext.Provider>
  );
}

// child comps
function HeroTitle({ children, className }: Props) {
  return (
    <h2 className={[`title`, className].filter(Boolean).join(" ")}>
      {children}
    </h2>
  );
}

function HeroContent({ children, className }: Props) {
  return (
    <div className={[`content`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

function HeroButton({ children, className, ...rest }: Props) {
  return (
    <Button
      className={[`btn-primary`, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </Button>
  );
}

// add child comps as props of parent comp
Hero.Title = HeroTitle;
Hero.Content = HeroContent;
Hero.Button = HeroButton;

export { Hero };
