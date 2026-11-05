import { MovementListSkeleton } from "@/components/movement-list-skeleton";

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
      <MovementListSkeleton />
    </main>
  );
}
