"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "@/components/icons";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
};

export function TextField({ label, error, leftIcon, type = "text", id, ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm leading-[1.25] font-semibold">
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-1.5 rounded-xl border bg-surface-3 px-3.5 py-2 transition-colors ${
          error ? "border-error" : "border-stroke-2 focus-within:border-primary"
        }`}
      >
        {leftIcon}

        <input
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full min-w-0 bg-transparent font-slab text-sm leading-4 outline-none placeholder:text-text-medium"
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="shrink-0 text-text-medium transition-colors hover:text-text-primary"
          >
            {showPassword ? <EyeIcon className="size-[18px]" /> : <EyeOffIcon className="size-[18px]" />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
