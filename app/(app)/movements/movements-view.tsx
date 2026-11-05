"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { MovementItem } from "@/components/movement-item";
import { MovementListSkeleton } from "@/components/movement-list-skeleton";
import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/ui/state-message";
import { TextField } from "@/components/ui/text-field";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import type { MovementType } from "@/lib/validations";
import { TypeFilters } from "./type-filters";

type Movement = {
  id: string;
  name: string;
  type: MovementType;
  amountCents: number;
  date: string;
};

// Guardamos con qué consulta se obtuvo cada resultado para saber si está "al día"
type Result = { query: string; movements: Movement[] } | { query: string; error: string };

export function MovementsView() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [type, setType] = useState<MovementType | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [result, setResult] = useState<Result | null>(null);

  const debouncedSearch = useDebouncedValue(search.trim());

  const params = new URLSearchParams();
  if (debouncedSearch) params.set("search", debouncedSearch);
  if (type) params.set("type", type);
  const queryString = params.toString();
  const query = `${queryString}#${retryCount}`;

  // Si el último resultado no corresponde a la consulta actual, estamos cargando
  const isLoading = result?.query !== query;

  useEffect(() => {
    // Si cambia la búsqueda antes de que responda, cancelamos el pedido anterior
    // para que una respuesta vieja no pise a la nueva
    const controller = new AbortController();

    async function loadMovements() {
      try {
        const response = await fetch(`/api/movements?${queryString}`, { signal: controller.signal });

        if (response.status === 401) {
          router.replace("/login");
          return;
        }
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const data: { movements: Movement[] } = await response.json();
        setResult({ query, movements: data.movements });
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setResult({ query, error: "No pudimos cargar tus movimientos." });
      }
    }

    loadMovements();
    return () => controller.abort();
  }, [query, queryString, router]);

  function renderList() {
    if (isLoading) {
      return <MovementListSkeleton count={6} />;
    }

    if ("error" in result) {
      return (
        <StateMessage
          variant="error"
          title={result.error}
          description="Revisá tu conexión e intentá de nuevo."
          action={<Button onClick={() => setRetryCount((count) => count + 1)}>Reintentar</Button>}
        />
      );
    }

    if (result.movements.length === 0) {
      const hasFilters = Boolean(debouncedSearch || type);
      return (
        <StateMessage
          title={hasFilters ? "No encontramos movimientos" : "Todavía no tenés movimientos"}
          description={
            hasFilters
              ? "Probá con otro nombre o cambiá el filtro seleccionado."
              : "Cuando hagas o recibas un pago, lo vas a ver acá."
          }
        />
      );
    }

    return (
      <ul className="flex flex-col gap-3">
        {result.movements.map((movement) => (
          <li key={movement.id}>
            <MovementItem movement={movement} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main className="flex flex-col gap-4 px-6 pt-12 pb-6">
      <h1 className="font-slab text-2xl leading-[1.17] font-semibold">Movimientos</h1>

      <TextField
        type="search"
        aria-label="Buscar por nombre de persona o servicio"
        placeholder="Buscar por nombre..."
        maxLength={50}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        leftIcon={<SearchIcon className="size-[18px] shrink-0 text-text-medium" />}
      />

      <TypeFilters selected={type} onChange={setType} />

      {/* Anuncia el resultado a los lectores de pantalla */}
      <p aria-live="polite" className="sr-only">
        {!isLoading && "movements" in result ? `${result.movements.length} movimientos` : ""}
      </p>

      {renderList()}
    </main>
  );
}
