import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import HubSpotNewsletterForm from '@/components/HubSpotNewsletterForm';
import { Link } from 'react-router-dom';

const Footer = React.memo(() => {
  const socialLinks = React.useMemo(() => [
    { href: 'https://facebook.com/themarketingcar', label: 'Follow us on Facebook', icon: <Facebook size={20} /> },
    { href: 'https://www.linkedin.com/company/marketingcar/', label: 'Connect with us on LinkedIn', icon: <Linkedin size={20} /> }
  ], []);

  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* 5/7 split on desktop; stacks on mobile */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fulllogo-JQ4WH.png"
                alt="Marketing Car Main Logo"
                className="h-10 w-auto"
                width={160}
                height={40}
                loading="lazy"
              />
            </div>

            <p className="font-body">&copy; {new Date().getFullYear()} MarketingCar™. All Rights Reserved.</p>
            <p className="font-body">Driving Your Success, One Mile at a Time.</p>

            <div className="mt-4 flex gap-4">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-primary transition"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <Link
                to="/book-now"
                className="underline font-semibold hover:text-primary transition"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-7">
            {/* optional card wrapper for tidy edges */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <HubSpotNewsletterForm />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
