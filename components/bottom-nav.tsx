"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, LogoutIcon, ReceiptIcon } from "@/components/icons";
import { useToast } from "@/components/ui/toast";

const NAV_ITEMS = [
  { href: "/home", label: "Inicio", Icon: HomeIcon },
  { href: "/movements", label: "Movimientos", Icon: ReceiptIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const showToast = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) throw new Error(`Error ${response.status}`);

      showToast("success", "Cerraste sesión correctamente");
      router.replace("/login");
      router.refresh();
    } catch {
      // Si no se borró la cookie no tiene sentido redirigir: el proxy nos devolvería a /home
      showToast("error", "No pudimos cerrar la sesión. Intentá de nuevo.");
      setIsLoggingOut(false);
    }
  }

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-10 flex items-center justify-around rounded-t-3xl bg-surface-3 py-5 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
    >
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-xl p-2 transition-colors active:scale-95 ${
              isActive ? "text-primary" : "text-text-medium hover:bg-surface-1 hover:text-text-primary"
            }`}
          >
            <Icon className="size-6" />
          </Link>
        );
      })}

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        aria-label="Cerrar sesión"
        className="rounded-xl p-2 text-text-medium transition-colors hover:bg-surface-1 hover:text-text-primary active:scale-95 disabled:opacity-50"
      >
        <LogoutIcon className="size-6" />
      </button>
    </nav>
  );
}
