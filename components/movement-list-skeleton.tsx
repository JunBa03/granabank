type MovementListSkeletonProps = {
  count?: number;
};

export function MovementListSkeleton({ count = 5 }: MovementListSkeletonProps) {
  return (
    <div aria-hidden="true" className="flex animate-pulse flex-col gap-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="h-[76px] rounded-2xl bg-stroke-2/60" />
      ))}
    </div>
  );
}
