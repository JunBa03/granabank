import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Slab } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GranaBank",
    template: "%s | GranaBank",
  },
  description: "Con cada compra, sumás orgullo granate",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} ${robotoSlab.variable} antialiased`}>
      <body className="font-sans">
        {/* El diseño es mobile: en pantallas grandes lo centramos con el ancho del Figma */}
        <ToastProvider>
          <div className="mx-auto flex min-h-dvh w-full max-w-[414px] flex-col">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}
