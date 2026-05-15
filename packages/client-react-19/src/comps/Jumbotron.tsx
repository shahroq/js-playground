import { Button } from "./Button";

type Props = {
  children?: React.ReactNode;
  className?: string;
  title: React.ReactNode;
};

export function Jumbotron({ children, className, title }: Props) {
  return (
    <div className={`jumbotron ${className}`}>
      {title && <h2 className="title">{title}</h2>}
      {children && <div className="content">{children}</div>}

      <div className="action">
        <Button className="btn btn-primary btn-lg">Example button</Button>
      </div>
    </div>
  );
}
