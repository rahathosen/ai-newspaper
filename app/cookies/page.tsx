import type { Metadata } from "next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Cookie Policy | The Daily Summary",
  description: "Cookie Policy for The Daily Summary website and services.",
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-bold mb-8 text-primary">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: March 15, 2025</p>

        <div className="prose prose-lg max-w-none">
          <p className="text-foreground/90 mb-6">
            This Cookie Policy explains how The Daily Summary ("we", "us", or "our") uses cookies and similar
            technologies to recognize you when you visit our website and use our services. It explains what these
            technologies are and why we use them, as well as your rights to control our use of them.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">What are cookies?</h2>
          <p className="text-foreground/90 mb-6">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </p>
          <p className="text-foreground/90 mb-6">
            Cookies set by the website owner (in this case, The Daily Summary) are called "first-party cookies".
            Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies
            enable third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Why do we use cookies?</h2>
          <p className="text-foreground/90 mb-6">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical
            reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary"
            cookies. Other cookies also enable us to track and target the interests of our users to enhance the
            experience on our website and provide personalized content and ads. Third parties serve cookies through our
            website for advertising, analytics, and other purposes.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">Types of cookies we use</h2>

          <Tabs defaultValue="essential">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="essential">Essential</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="functional">Functional</TabsTrigger>
              <TabsTrigger value="targeting">Targeting</TabsTrigger>
            </TabsList>

            <TabsContent value="essential">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Essential Cookies</h3>
              <p className="text-foreground/90 mb-6">
                These cookies are strictly necessary to provide you with services available through our website and to
                use some of its features, such as access to secure areas. Because these cookies are strictly necessary
                to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>session_id</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Used to maintain your session state across page requests</TableCell>
                    <TableCell>Session</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>auth_token</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Used to authenticate logged-in users</TableCell>
                    <TableCell>30 days</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>csrf_token</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Used to prevent cross-site request forgery attacks</TableCell>
                    <TableCell>Session</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>cookie_consent</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Stores your cookie consent preferences</TableCell>
                    <TableCell>1 year</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="performance">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Performance Cookies</h3>
              <p className="text-foreground/90 mb-6">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance
                of our site. They help us to know which pages are the most and least popular and see how visitors move
                around the site. All information these cookies collect is aggregated and therefore anonymous.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>_ga</TableCell>
                    <TableCell>Google Analytics</TableCell>
                    <TableCell>Used to distinguish users for analytics purposes</TableCell>
                    <TableCell>2 years</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>_gid</TableCell>
                    <TableCell>Google Analytics</TableCell>
                    <TableCell>Used to distinguish users for analytics purposes</TableCell>
                    <TableCell>24 hours</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>_gat</TableCell>
                    <TableCell>Google Analytics</TableCell>
                    <TableCell>Used to throttle request rate</TableCell>
                    <TableCell>1 minute</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>dc_performance</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Collects anonymous statistics on site performance</TableCell>
                    <TableCell>30 days</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="functional">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Functional Cookies</h3>
              <p className="text-foreground/90 mb-6">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set
                by us or by third-party providers whose services we have added to our pages. If you do not allow these
                cookies, then some or all of these services may not function properly.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>user_preferences</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Stores user preferences such as font size and theme</TableCell>
                    <TableCell>1 year</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>recently_viewed</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Tracks recently viewed articles for personalization</TableCell>
                    <TableCell>30 days</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>language</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Stores language preferences</TableCell>
                    <TableCell>1 year</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>reading_history</TableCell>
                    <TableCell>dailychronicle.com</TableCell>
                    <TableCell>Tracks reading progress across articles</TableCell>
                    <TableCell>90 days</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="targeting">
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Targeting Cookies</h3>
              <p className="text-foreground/90 mb-6">
                These cookies may be set through our site by our advertising partners. They may be used by those
                companies to build a profile of your interests and show you relevant advertisements on other sites. They
                do not directly store personal information but are based on uniquely identifying your browser and
                internet device.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>_fbp</TableCell>
                    <TableCell>Facebook</TableCell>
                    <TableCell>Used by Facebook to deliver advertisements</TableCell>
                    <TableCell>90 days</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>IDE</TableCell>
                    <TableCell>Google DoubleClick</TableCell>
                    <TableCell>Used for targeted advertising</TableCell>
                    <TableCell>1 year</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>MUID</TableCell>
                    <TableCell>Microsoft</TableCell>
                    <TableCell>Used as unique user identifier for Microsoft advertising products</TableCell>
                    <TableCell>1 year</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>personalization_id</TableCell>
                    <TableCell>Twitter</TableCell>
                    <TableCell>Used by Twitter for tracking and advertising</TableCell>
                    <TableCell>2 years</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">How can you control cookies?</h2>
          <p className="text-foreground/90 mb-6">
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences
            by clicking on the appropriate opt-out links provided in the cookie table above.
          </p>

          <p className="text-foreground/90 mb-6">
            You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject
            cookies, you may still use our website though your access to some functionality and areas of our website may
            be restricted. As the means by which you can refuse cookies through your web browser controls vary from
            browser to browser, you should visit your browser's help menu for more information.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">
            How often will we update this Cookie Policy?
          </h2>
          <p className="text-foreground/90 mb-6">
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies
            we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy
            regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p className="text-foreground/90 mb-6">
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-8 mb-4">
            Where can you get further information?
          </h2>
          <p className="text-foreground/90 mb-6">
            If you have any questions about our use of cookies or other technologies, please email us at
            privacy@dailychronicle.com or contact us at:
          </p>
          <p className="text-foreground/90 mb-6">
            The Daily Summary
            <br />
            Attn: Privacy Officer
            <br />
            123 News Avenue
            <br />
            Metropolis, NY 10001
          </p>
        </div>
      </div>
    </div>
  )
}

