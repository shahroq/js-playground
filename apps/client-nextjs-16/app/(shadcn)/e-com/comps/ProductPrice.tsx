import { cn } from "@jsp/shared/utils";

type Props = {
  value: number;
  className?: string;
};

export function ProductPrice({ value, className }: Props) {
  if (value < 0) return null;

  // Ensure two decimal places
  const stringValue = value.toFixed(2);
  // Get the int/float
  const [intValue, floatValue] = stringValue.split(".");

  return (
    <p className={cn("text-xl", className)}>
      <span className="text-xs align-super">$</span>
      {intValue}
      <span className="text-xs align-super">.{floatValue}</span>
    </p>
  );
}
