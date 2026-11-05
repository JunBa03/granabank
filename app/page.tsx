import { redirect } from "next/navigation";

// proxy.ts ya redirige "/" según haya sesión o no; esto es solo un respaldo
export default function RootPage() {
  redirect("/home");
}
