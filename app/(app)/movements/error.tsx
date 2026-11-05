"use client";

import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/ui/state-message";

export default function MovementsError({ retry }: { error: Error; retry: () => void }) {
  return (
    <main className="flex flex-1 flex-col justify-center px-6">
      <StateMessage
        variant="error"
        title="Algo salió mal"
        description="No pudimos cargar esta pantalla. Probá de nuevo en unos segundos."
        action={<Button onClick={() => retry()}>Reintentar</Button>}
      />
    </main>
  );
}
