import { useEffect, useState } from "react";

// Devuelve el valor recién cuando dejó de cambiar durante `delay` ms.
// Sirve para no llamar a la API en cada tecla del buscador.
export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
