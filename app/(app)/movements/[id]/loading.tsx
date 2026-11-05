export default function MovementDetailLoading() {
  return (
    <main aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-6 px-6 pt-12 pb-6">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-stroke-2" />
        <div className="h-7 w-24 rounded bg-stroke-2" />
      </div>
      <div className="h-[244px] rounded-3xl bg-stroke-2/60" />
      <div className="h-[220px] rounded-2xl bg-stroke-2/60" />
    </main>
  );
}
