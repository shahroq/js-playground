type Props = {
  children?: React.ReactNode;
};

export function DummyBox({ children }: Props) {
  return <div className="dummy-area">{children || ""}</div>;
}
