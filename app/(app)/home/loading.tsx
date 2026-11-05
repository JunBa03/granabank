// Se muestra automáticamente mientras la página carga los datos del servidor
export default function HomeLoading() {
  return (
    <main aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-6 px-6 pt-12 pb-6">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-10 rounded bg-stroke-2" />
        <div className="h-7 w-28 rounded bg-stroke-2" />
      </div>
      <div className="h-[190px] rounded-3xl bg-stroke-2" />
      <div className="h-6 w-48 rounded bg-stroke-2" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="h-[76px] rounded-2xl bg-stroke-2/60" />
        ))}
      </div>
    </main>
  );
}
