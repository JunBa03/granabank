"use client";

import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/ui/state-message";

// Se muestra si algo falla al cargar la página (por ejemplo, la base no responde)
export default function HomeError({ retry }: { error: Error; retry: () => void }) {
  return (
    <main className="flex flex-1 flex-col justify-center px-6">
      <StateMessage
        variant="error"
        title="No pudimos cargar tu información"
        description="Puede ser un problema de conexión. Probá de nuevo en unos segundos."
        action={<Button onClick={() => retry()}>Reintentar</Button>}
      />
    </main>
  );
}
