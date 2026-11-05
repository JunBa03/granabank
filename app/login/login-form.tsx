"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextField } from "@/components/ui/text-field";
import { loginSchema } from "@/lib/validations";

type FieldErrors = {
  email?: string;
  password?: string;
};

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    // Validamos en el cliente con el mismo schema que usa la API
    const result = loginSchema.safeParse({ email, password, remember });
    if (!result.success) {
      const errors = z.flattenError(result.error).fieldErrors;
      setFieldErrors({ email: errors.email?.[0], password: errors.password?.[0] });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setFormError(data?.error ?? "No pudimos iniciar sesión. Intentá de nuevo.");
        setIsSubmitting(false);
        return;
      }

      router.replace("/home");
      router.refresh();
    } catch {
      setFormError("No pudimos conectarnos. Revisá tu conexión e intentá de nuevo.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4">
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setFieldErrors((errors) => ({ ...errors, email: undefined }));
          }}
          error={fieldErrors.email}
        />

        <TextField
          label="Contraseña"
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Ingresá tu contraseña"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setFieldErrors((errors) => ({ ...errors, password: undefined }));
          }}
          error={fieldErrors.password}
        />

        <Checkbox label="Recordarme" checked={remember} onChange={setRemember} />

        {formError && (
          <p role="alert" className="rounded-xl border border-error/30 bg-error/10 px-3.5 py-2.5 text-sm text-error">
            {formError}
          </p>
        )}
      </div>

      {/* Equivale al frame "Espacio" del Figma: empuja el botón al fondo */}
      <div className="flex-1" />

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}
