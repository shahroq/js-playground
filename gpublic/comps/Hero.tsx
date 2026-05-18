import { Button } from "./Button";

type Props = {
  children?: React.ReactNode;
  className?: string;
  title: React.ReactNode;
};

export function Hero({ children, className, title }: Props) {
  return (
    <div className={`hero ${className}`}>
      {title && <h2 className="title">{title}</h2>}
      {children && <div className="content">{children}</div>}

      <div className="action">
        <Button className="btn btn-primary btn-lg">Button</Button>
      </div>
    </div>
  );
}
