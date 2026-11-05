"use client";

import { BellIcon } from "@/components/icons";
import { useToast } from "@/components/ui/toast";

export function NotificationsButton() {
  const showToast = useToast();

  return (
    <button
      type="button"
      onClick={() => showToast("info", "No tenés notificaciones nuevas")}
      aria-label="Notificaciones"
      className="-m-1 rounded-full p-1 transition-colors hover:bg-stroke-2/40 active:scale-95"
    >
      <BellIcon className="size-6" />
    </button>
  );
}
