"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import Sign_In_Button from "../login/sign_in_button"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-[#00563F] text-white">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold">
            <HelpCircle className="h-5 w-5" />
            <span>Terms of Service</span>
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
          <p className="text-sm text-muted-foreground">Last updated: April 30, 2025</p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                By accessing or using this site, you agree to be bound by these Terms and our Privacy Policy. If you don’t agree, please exit the site.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use of the Site</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                You may not:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Violate any laws or regulations.</li>
                  <li>Disrupt the site or its servers.</li>
                  <li>Attempt unauthorized access to any part of the site.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                All content on this site—including text, graphics, logos, and images—is the property of Room Finder unless otherwise stated, and is protected by copyright and other laws.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. User Content</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                By posting or uploading content (comments, media, etc.), you:
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Grant us a non-exclusive, royalty-free license to use, display, and distribute it.</li>
                  <li>Agree not to post anything illegal, offensive, or infringing on others’ rights.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Third-Party Links</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We’re not responsible for the content, policies, or practices of external websites linked here.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                The site is provided “as is,” without warranties of any kind. We don’t guarantee it’ll be error-free or uninterrupted.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                To the fullest extent permitted by law, Room Finder won’t be liable for any indirect, incidental, or consequential damages.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Changes to These Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                We may update these Terms from time to time. Changes take effect when posted. Check back often!
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Questions? Email us at{" "}
              <Link
                href="mailto:Sean@shawnosphere.com"
                className="text-[#00563F] hover:underline"
              >
                Sean@shawnosphere.com
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
