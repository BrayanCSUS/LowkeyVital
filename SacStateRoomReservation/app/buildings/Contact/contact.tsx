import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">
        If you have any questions, comments, or concerns, please reach out using one of the methods below. We aim to respond within 1–2 business days.
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Email</h2>
        <p>support@roomfinder.com</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Phone</h2>
        <p>(123) 456-7890</p>
        <p>Available Monday–Friday, 9:00 AM – 5:00 PM (local time)</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Mailing Address</h2>
        <p>Non-specific Company</p>
        <p>123 Business Road</p>
        <p>Suite 100</p>
        <p>City, State, ZIP Code</p>
      </div>
    </div> // ✅ This closes the main div
  ); // ✅ This closes the return statement
}

