import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: Yesterday</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By accessing or using this Site, you agree to be bound by these Terms and our Privacy Policy.
          If you don’t agree, kindly take your leave and do not use the Site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Use of the Site</h2>
        <ul className="list-disc pl-6">
          <li>Violate any laws or regulations.</li>
          <li>Interfere with or disrupt the Site or servers.</li>
          <li>Attempt unauthorized access to any part of the Site.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
        <p>
          All content on this Site — including text, graphics, logos, and images — is the property of 
          Room Finder unless otherwise stated, and is protected by copyright 
          and other laws.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. User Content</h2>
        <p>
          If you post or upload content (like comments or media), you:
        </p>
        <ul className="list-disc pl-6">
          <li>
            Grant us a non-exclusive, royalty-free license to use, display, and distribute your content.
          </li>
          <li>
            Agree not to post anything illegal, offensive, or infringing on others’ rights.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Third-Party Links</h2>
        <p>
          We’re not responsible for the content, policies, or practices of external websites linked here.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Disclaimer of Warranties</h2>
        <p>
          The Site is provided “as is” without warranties of any kind. We don’t guarantee it’ll be 
          error-free, uninterrupted, or fit your particular purpose (though we sure hope it does).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Room Finder won’t be liable for any indirect, 
          incidental, or consequential damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Changes take effect when posted. Check back often!
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
        <p>
          Questions? Reach us at <a href="mailto:Sean@shawnosphere.com" className="text-blue-600 underline">[Your Email Address]</a>.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
