import type { Metadata } from "next"
import "./globals.css"
import ClientProviders from "@/app/ClientProviders"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster />
      </body>
    </html>
  )
}
