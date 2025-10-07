import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Privacy Policy | Marketing Car</title>
        <meta name="description" content="Learn about how Marketing Car collects, uses, and protects your personal information." />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p className="text-sm text-muted-foreground">
                <strong>Effective Date:</strong> October 7, 2025
              </p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">1. Introduction</h2>
                <p>
                  Marketing Car ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://www.marketingcar.com" className="text-primary hover:underline">www.marketingcar.com</a> or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">2. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fill out contact forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request a consultation or quote</li>
                  <li>Register for webinars or events</li>
                  <li>Communicate with us via email or phone</li>
                </ul>
                <p className="mt-4">This information may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Company name</li>
                  <li>Job title</li>
                  <li>Business information</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.2 Automatically Collected Information</h3>
                <p>When you visit our website, we automatically collect certain information about your device, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Operating system</li>
                  <li>Referring URLs</li>
                  <li>Pages visited</li>
                  <li>Time and date of visits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website usage and trends</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Types of Cookies We Use:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Marketing Cookies:</strong> Track visitors across websites to display relevant advertisements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">5. Third-Party Services</h2>
                <p>We may use third-party service providers to help us operate our website and deliver our services, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> For website analytics</li>
                  <li><strong>Google Tag Manager:</strong> For managing marketing tags</li>
                  <li><strong>Meta Pixel:</strong> For advertising and analytics</li>
                  <li><strong>HubSpot:</strong> For CRM and marketing automation</li>
                </ul>
                <p className="mt-4">
                  These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">6. Data Sharing and Disclosure</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With service providers who assist us in operating our business</li>
                  <li>To comply with legal obligations or respond to lawful requests</li>
                  <li>To protect our rights, property, or safety, or that of others</li>
                  <li>In connection with a business transaction (e.g., merger or acquisition)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">7. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">8. Data Retention</h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">9. Your Privacy Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Opt-Out:</strong> Opt-out of marketing communications</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at <a href="mailto:mechanic@marketingcar.com" className="text-primary hover:underline">mechanic@marketingcar.com</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">10. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">11. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to such transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">12. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">13. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Marketing Car</strong></p>
                  <p>Email: <a href="mailto:mechanic@marketingcar.com" className="text-primary hover:underline">mechanic@marketingcar.com</a></p>
                  <p>Website: <a href="https://www.marketingcar.com" className="text-primary hover:underline">www.marketingcar.com</a></p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicyPage;
