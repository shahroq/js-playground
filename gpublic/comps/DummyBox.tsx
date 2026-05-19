type Props = {
  title?: React.ReactNode;
};

export function DummyBox({ title }: Props) {
  return <div className="dummy-area">{title || ""}</div>;
}
