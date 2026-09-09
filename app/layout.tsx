import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GreenHouse | Sistema de Monitoreo",
  description: "Monitoreo inteligente de cultivos en invernadero.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className="bg-background"><body className={geist.className}>{children}</body></html>
}
