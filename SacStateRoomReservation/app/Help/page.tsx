"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Info, Search, MapPin, Mail, Phone, User } from "lucide-react"
import Sign_In_Button from "../login/sign_in_button"
import { useAuth } from "@/context/AuthContext"

export default function HelpPage() {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-[#00563F] text-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
            <Link href="/reservations" className="text-sm font-medium hover:underline">My Reservations</Link>
            <Link href="/Help" className="text-sm font-medium hover:underline">Help</Link>
          </nav>
          <div className="flex items-center gap-4">
          { !user && <Sign_In_Button /> }
          </div>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4 space-y-12">
          <section>
            <h1 className="text-3xl font-bold mb-6">How to Use the Room Finder</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-[#00563F]" />
                    Search for Buildings
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Use the search bar to find buildings by name. You can also filter by building type (Academic, Student Services, Admin).
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#00563F]" />
                    Check Room Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Each building card shows how many rooms are currently free. Click "Find Rooms" to view more details.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-[#00563F]" />
                    Make Reservations
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sign in to reserve a room. Visit the “My Reservations” page to see or cancel your bookings.
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Do I need an account to book a room?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Yes. You need to sign in using your Sacramento State account to view availability and make reservations.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>How long can I reserve a room for?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  You can reserve a room in 30-minute increments for up to 4 hours per day. Longer reservations may require faculty approval.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Why can't I see availability for certain rooms?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Some rooms may be reserved for faculty or maintenance. Only student-accessible spaces will appear under your account.
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#00563F]" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  support@sacstatefinder.edu
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-[#00563F]" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  (916) 123-4567 — Monday to Friday, 9 AM – 5 PM
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-[#00563F] text-white py-6">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© © 2025 Team Lowkey Vital. All rights reserved. All rights reserved.</p>
          <nav className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
