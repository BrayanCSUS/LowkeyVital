"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"
import Sign_In_Button from "../login/sign_in_button"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-[#00563F] text-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5" />
            <span>Privacy Policy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">Home</Link>
            <Link href="/reservations" className="text-sm font-medium hover:underline">My Reservations</Link>
            <Link href="/Help" className="text-sm font-medium hover:underline">Help</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Sign_In_Button />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container px-4 space-y-8">
          <p className="text-sm text-muted-foreground">Effective Date: May 3, 2025</p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Personal Information:</strong> Your name, email address, and contact details when you sign up or contact us.</li>
                  <li><strong>Usage Data:</strong> Your IP address, browser type, device info, and activity on our platform.</li>
                  <li><strong>Cookies:</strong> Small data files used to improve your experience and analyze site usage.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Provide and improve our services</li>
                  <li>Communicate updates and promotional messages</li>
                  <li>Ensure the security and integrity of our platform</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Sharing Your Information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We do <strong>not</strong> sell your personal data. We may share info with trusted third parties under strict confidentiality, and disclose when required by law.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Your Choices</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Opt out of marketing communications at any time</li>
                  <li>Disable cookies in your browser settings</li>
                  <li>Request access, correction, or deletion of your personal data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Security</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We use industry-standard security measures to protect your information. However, no transmission or storage method is 100% secure.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Children’s Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Our services aren’t intended for individuals under 13. We do not knowingly collect data from children.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We may update this Privacy Policy periodically. Significant changes will be communicated via email or through our service.
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Questions? Email us at{" "}
              <Link
                href="mailto:support@roomfinder.book"
                className="text-[#00563F] hover:underline"
              >
                support@roomfinder.book
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-[#00563F] text-white py-6">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2025 Team Lowkey Vital. All rights reserved.</p>
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
