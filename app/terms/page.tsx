import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | The Daily Chronicle",
  description: "Terms of Service for The Daily Chronicle website and services.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-8 text-primary">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 15, 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/90 mb-6">
            Welcome to The Daily Chronicle. These Terms of Service ("Terms") govern your access to and use of The Daily
            Chronicle website, mobile applications, and services (collectively, the "Services"). By accessing or using
            our Services, you agree to be bound by these Terms.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-foreground/90 mb-6">
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do
            not agree to these Terms, you may not access or use our Services.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">2. Use of Services</h2>
          <p className="text-foreground/90 mb-6">
            You may use our Services only as permitted by these Terms and any applicable laws and regulations. You agree
            not to engage in any activity that interferes with or disrupts the Services or the servers and networks
            connected to the Services.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">3. Account Registration</h2>
          <p className="text-foreground/90 mb-6">
            Some features of our Services require you to register for an account. When you register, you agree to
            provide accurate, current, and complete information about yourself. You are responsible for safeguarding
            your password and for all activities that occur under your account.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">4. Subscription and Billing</h2>
          <p className="text-foreground/90 mb-6">
            Certain portions of our Services may be provided on a subscription basis. By subscribing to our Services,
            you agree to pay the subscription fees as they become due. We may change our subscription fees from time to
            time, but we will provide you with advance notice of any fee changes.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">5. Content and Intellectual Property</h2>
          <p className="text-foreground/90 mb-6">
            All content included in or made available through our Services, such as text, graphics, logos, images, audio
            clips, video clips, and data compilations, is the property of The Daily Chronicle or its licensors and is
            protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-foreground/90 mb-6">
            You may not modify, reproduce, distribute, create derivative works of, publicly display, publicly perform,
            republish, download, store, transmit, or otherwise exploit any content on our Services, except as follows:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
            <li>
              You may store files that are automatically cached by your web browser for display enhancement purposes.
            </li>
            <li>
              You may print or download one copy of a reasonable number of pages of the website for your own personal,
              non-commercial use and not for further reproduction, publication, or distribution.
            </li>
            <li>
              If we provide social media features with certain content, you may take such actions as are enabled by such
              features.
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">6. User Content</h2>
          <p className="text-foreground/90 mb-6">
            Our Services may allow you to post, submit, publish, display, or transmit content such as comments, reviews,
            or other materials ("User Content"). By providing User Content, you grant us a non-exclusive, transferable,
            sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on,
            distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all
            formats and distribution channels now known or hereafter devised.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">7. Prohibited Conduct</h2>
          <p className="text-foreground/90 mb-6">You agree not to use our Services to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
            <li>Violate any applicable law or regulation.</li>
            <li>Infringe the rights of any third party, including intellectual property rights.</li>
            <li>Transmit any material that is defamatory, offensive, or otherwise objectionable.</li>
            <li>Interfere with the proper working of the Services.</li>
            <li>Attempt to bypass any measures we may use to prevent or restrict access to the Services.</li>
            <li>Collect or harvest any personally identifiable information from the Services.</li>
            <li>Impersonate or misrepresent your affiliation with any person or entity.</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">8. Termination</h2>
          <p className="text-foreground/90 mb-6">
            We may terminate or suspend your access to all or part of our Services, without notice, for any conduct that
            we, in our sole discretion, believe violates these Terms or is harmful to other users of the Services, us,
            or third parties, or for any other reason.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">9. Disclaimer of Warranties</h2>
          <p className="text-foreground/90 mb-6">
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
            INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">10. Limitation of Liability</h2>
          <p className="text-foreground/90 mb-6">
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING, BUT NOT LIMITED TO, LOSS OF PROFITS,
            DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO
            ACCESS OR USE THE SERVICES.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">11. Changes to Terms</h2>
          <p className="text-foreground/90 mb-6">
            We may revise these Terms from time to time. The most current version will always be posted on our website.
            By continuing to access or use our Services after revisions become effective, you agree to be bound by the
            revised Terms.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">12. Governing Law</h2>
          <p className="text-foreground/90 mb-6">
            These Terms and your use of the Services shall be governed by and construed in accordance with the laws of
            the State of New York, without giving effect to any choice or conflict of law provision or rule.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">13. Contact Information</h2>
          <p className="text-foreground/90 mb-6">
            If you have any questions about these Terms, please contact us at legal@dailychronicle.com.
          </p>
        </div>
      </div>
    </div>
  )
}

