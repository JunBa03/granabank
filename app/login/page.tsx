import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Ingresar",
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 px-6 pt-24 pb-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <Image src="/escudo.svg" alt="Escudo del Club Atlético Lanús" width={72} height={72} priority />
        <h1 className="text-[40px] leading-none font-bold text-primary">GranaBank</h1>
        <p className="text-sm leading-[1.25] font-medium text-text-medium">Con cada compra, sumás orgullo granate</p>
      </div>

      <LoginForm />
    </main>
  );
}
