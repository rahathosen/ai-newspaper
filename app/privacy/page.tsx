import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | The Daily Chronicle",
  description: "Privacy Policy for The Daily Chronicle website and services.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 15, 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/90 mb-6">
            At The Daily Chronicle, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website, mobile application, and use our
            services.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-foreground/90 mb-6">
            We collect information that you provide directly to us, information we collect automatically when you use
            our Services, and information from third parties.
          </p>

          <h3 className="font-serif text-xl font-bold text-primary mt-6 mb-3">Information You Provide to Us</h3>
          <p className="text-foreground/90 mb-6">We collect information you provide directly to us when you:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
            <li>Create an account or subscribe to our Services</li>
            <li>Fill out a form or survey</li>
            <li>Communicate with us via email, phone, or otherwise</li>
            <li>Post comments or other content on our Services</li>
            <li>Sign up for newsletters or other communications</li>
            <li>Participate in promotions, contests, or events</li>
          </ul>
          <p className="text-foreground/90 mb-6">
            This information may include your name, email address, postal address, phone number, payment information,
            and any other information you choose to provide.
          </p>

          <h3 className="font-serif text-xl font-bold text-primary mt-6 mb-3">Information We Collect Automatically</h3>
          <p className="text-foreground/90 mb-6">
            When you access or use our Services, we automatically collect information about you, including:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
            <li>
              Log Information: We collect log information about your use of our Services, including the type of browser
              you use, access times, pages viewed, your IP address, and the page you visited before navigating to our
              Services.
            </li>
            <li>
              Device Information: We collect information about the device you use to access our Services, including the
              hardware model, operating system and version, unique device identifiers, and mobile network information.
            </li>
            <li>
              Location Information: We may collect information about the precise location of your device with your
              consent, or we may derive your approximate location from your IP address.
            </li>
            <li>
              Cookies and Similar Technologies: We use cookies, web beacons, and other tracking technologies to collect
              information about you when you interact with our Services or emails, including information about your
              browsing behavior and other engagement with our Services.
            </li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-foreground/90 mb-6">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
            <li>Provide, maintain, and improve our Services</li>
            <li>Process transactions and send related information, including confirmations and receipts</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>
              Communicate with you about products, services, offers, promotions, and events, and provide news and
              information we think will be of interest to you
            </li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
            <li>
              Detect, investigate, and prevent fraudulent transactions and other illegal activities and protect the
              rights and property of The Daily Chronicle and others
            </li>
            <li>
              Personalize and improve the Services and provide content or features that match user profiles or interests
            </li>
            <li>Facilitate contests, sweepstakes, and promotions and process and deliver entries and rewards</li>
            <li>Carry out any other purpose described to you at the time the information was collected</li>
          </ul>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">3. Sharing of Information</h2>
          <p className="text-foreground/90 mb-6">
            We may share information about you as follows or as otherwise described in this Privacy Policy:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/90">
            <li>
              With vendors, consultants, and other service providers who need access to such information to carry out
              work on our behalf
            </li>
            <li>
              In response to a request for information if we believe disclosure is in accordance with, or required by,
              any applicable law, regulation, or legal process
            </li>
            <li>
              If we believe your actions are inconsistent with our user agreements or policies, or to protect the
              rights, property, and safety of The Daily Chronicle or others
            </li>
            <li>
              In connection with, or during negotiations of, any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business by another company
            </li>
            <li>
              Between and among The Daily Chronicle and our current and future parents, affiliates, subsidiaries, and
              other companies under common control and ownership
            </li>
            <li>With your consent or at your direction</li>
          </ul>
          <p className="text-foreground/90 mb-6">
            We may also share aggregated or de-identified information that cannot reasonably be used to identify you.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">
            4. Advertising and Analytics Services
          </h2>
          <p className="text-foreground/90 mb-6">
            We may allow others to provide analytics services and serve advertisements on our behalf across the web and
            in mobile applications. These entities may use cookies, web beacons, device identifiers, and other
            technologies to collect information about your use of our Services and other websites and applications,
            including your IP address, web browser, mobile network information, pages viewed, time spent on pages or in
            apps, links clicked, and conversion information. This information may be used by The Daily Chronicle and
            others to, among other things, analyze and track data, determine the popularity of certain content, deliver
            advertising and content targeted to your interests on our Services and other websites, and better understand
            your online activity.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">5. Data Retention</h2>
          <p className="text-foreground/90 mb-6">
            We store the information we collect about you for as long as is necessary for the purpose(s) for which we
            originally collected it or for other legitimate business purposes, including to meet our legal, regulatory,
            or other compliance obligations.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">6. Data Transfer</h2>
          <p className="text-foreground/90 mb-6">
            The Daily Chronicle is based in the United States and the information we collect is governed by U.S. law. By
            accessing or using our Services or otherwise providing information to us, you consent to the processing,
            transfer, and storage of information in and to the U.S. and other countries, where you may not have the same
            rights and protections as you do under local law.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">7. Your Choices</h2>
          <h3 className="font-serif text-xl font-bold text-primary mt-6 mb-3">Account Information</h3>
          <p className="text-foreground/90 mb-6">
            You may update, correct, or delete information about you at any time by logging into your online account or
            emailing us at privacy@dailychronicle.com. If you wish to delete or deactivate your account, please email
            us, but note that we may retain certain information as required by law or for legitimate business purposes.
          </p>

          <h3 className="font-serif text-xl font-bold text-primary mt-6 mb-3">Cookies</h3>
          <p className="text-foreground/90 mb-6">
            Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your
            browser to remove or reject browser cookies. Please note that if you choose to remove or reject cookies,
            this could affect the availability and functionality of our Services.
          </p>

          <h3 className="font-serif text-xl font-bold text-primary mt-6 mb-3">Promotional Communications</h3>
          <p className="text-foreground/90 mb-6">
            You may opt out of receiving promotional emails from The Daily Chronicle by following the instructions in
            those emails. If you opt out, we may still send you non-promotional emails, such as those about your account
            or our ongoing business relations.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">8. Your Rights</h2>
          <p className="text-foreground/90 mb-6">
            Depending on your location, you may have certain rights regarding your personal information, such as the
            right to request access to, correction of, deletion of, restriction on processing of, or portability of your
            personal information. You may also have the right to object to processing and to lodge a complaint with a
            supervisory authority.
          </p>
          <p className="text-foreground/90 mb-6">
            To exercise any of these rights, please contact us at privacy@dailychronicle.com.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">9. Children's Privacy</h2>
          <p className="text-foreground/90 mb-6">
            Our Services are not directed to children under 16. We do not knowingly collect personal information from
            children under 16. If we learn that we have collected personal information of a child under 16, we will take
            steps to delete such information from our files as soon as possible.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">10. Changes to this Privacy Policy</h2>
          <p className="text-foreground/90 mb-6">
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the
            date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding
            a statement to our website or sending you a notification). We encourage you to review the Privacy Policy
            whenever you access our Services to stay informed about our information practices and the choices available
            to you.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">11. Contact Us</h2>
          <p className="text-foreground/90 mb-6">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-foreground/90 mb-6">
            The Daily Chronicle
            <br />
            Attn: Privacy Officer
            <br />
            123 News Avenue
            <br />
            Metropolis, NY 10001
            <br />
            privacy@dailychronicle.com
          </p>
        </div>
      </div>
    </div>
  )
}

