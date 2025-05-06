import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Effective Date: May 3, 2025</p>

      <p className="mb-4">
        Welcome to Room finder! We value your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how
        we collect, use, and protect your data when you use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Personal Information:</strong> such as your name, email
          address, and contact details when you sign up or contact us.
        </li>
        <li>
          <strong>Usage Data:</strong> including your IP address, browser type,
          device information, and activity on our platform.
        </li>
        <li>
          <strong>Cookies:</strong> small data files used to improve your
          experience and analyze site usage.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Provide and improve our services</li>
        <li>Communicate with you (including updates and promotional messages)</li>
        <li>Ensure the security and integrity of our platform</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do <strong>not</strong> sell your personal data. We may share your
        information with trusted third parties who help us operate our service,
        but only under strict confidentiality agreements. We may also disclose
        information when required by law.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Your Choices</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Opt out of marketing communications at any time</li>
        <li>Disable cookies in your browser settings</li>
        <li>Request access, correction, or deletion of your personal data</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Security</h2>
      <p className="mb-4">
        We use industry-standard security measures to protect your information.
        However, no method of transmission or storage is 100% secure, so we
        cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Children’s Privacy</h2>
      <p className="mb-4">
        Our services are not intended for individuals under the age of 13. We do
        not knowingly collect data from children.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. If we make
        significant changes, we’ll notify you by email or through our service.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns, please contact us at:
        <br />
        <a
          href="mailto:Sean@shawnosphere.com"
          className="text-blue-600 underline"
        >
          support@roomfinder.book
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
