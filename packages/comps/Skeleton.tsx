type Props = {
  width?: string; // e.g. "w-full", "w-32"
  height?: string; // e.g. "h-4", "h-6"
  times?: number;
};

export function Skeleton({
  width = "w-full",
  height = "h-4",
  times = 1,
}: Props) {
  return (
    <div>
      {Array.from({ length: times }).map((_, i) => (
        <div
          key={i}
          className={`
            ${width}
            ${height}
            bg-gray-200
            rounded-sm,
            animate-pulse
            mb-3
          `}
        />
      ))}
    </div>
  );
}
