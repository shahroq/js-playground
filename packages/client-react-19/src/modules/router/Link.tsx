import { useNavContext } from "./use-nav-context";

type Props = {
  to?: string;
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export function Link({ to, children, className = "", ...rest }: Props) {
  const { navigate, curPath } = useNavContext();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    if (to) navigate(to);
  };

  if (curPath === to) className += " active";
  return (
    <a href={to} onClick={handleClick} className={`${className}`} {...rest}>
      {children}
    </a>
  );
}
