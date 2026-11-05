"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HomeIcon, LogoutIcon, ReceiptIcon } from "@/components/icons";

const NAV_ITEMS = [
  { href: "/home", label: "Inicio", Icon: HomeIcon },
  { href: "/movements", label: "Movimientos", Icon: ReceiptIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
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
            className={`p-1 transition-colors ${isActive ? "text-primary" : "text-text-medium hover:text-text-primary"}`}
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
        className="p-1 text-text-medium transition-colors hover:text-text-primary disabled:opacity-50"
      >
        <LogoutIcon className="size-6" />
      </button>
    </nav>
  );
}
