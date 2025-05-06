"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import Sign_In_Button from "../login/sign_in_button"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-[#00563F] text-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <Mail className="h-5 w-5" />
            <span>Contact Us</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/reservations" className="text-sm font-medium hover:underline">
              My Reservations
            </Link>
            <Link href="/Help" className="text-sm font-medium hover:underline">
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Sign_In_Button />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container px-4 space-y-8">
          <p className="text-sm text-muted-foreground">
            Have questions, comments, or concerns? We aim to respond within 1–2 business days.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Email Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-[#00563F]" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <Link
                  href="mailto:support@roomfinder.com"
                  className="hover:underline"
                >
                  support@roomfinder.com
                </Link>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-[#00563F]" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>(916) 316-8506</p>
                <p>Mon–Fri, 9:00 AM – 5:00 PM</p>
              </CardContent>
            </Card>

            {/* Mailing Address Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#00563F]" />
                  Mailing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>LowkeyVital</p>
                <p>6000 J Street</p>
                <p>Sacramento, CA, 95817</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-[#00563F] text-white py-6">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2025 Team Lowkey Vital. All rights reserved.</p>
          <nav className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/Help" className="hover:underline">
              Help
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
