import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import HubSpotNewsletterForm from '@/components/HubSpotNewsletterForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const socialLinks = [
    {
      href: "https://facebook.com/themarketingcar",
      label: "Follow us on Facebook",
      icon: <Facebook size={24} />
    },
    {
      href: "https://www.linkedin.com/company/marketingcar/",
      label: "Connect with us on LinkedIn",
      icon: <Linkedin size={24} />
    }
  ];

  return (
    <footer className="py-10 px-4 sm:px-8 text-center text-muted-foreground bg-background border-t border-border">
      <div className="container mx-auto">
        <div className="grid gap-8 items-start md:grid-cols-3">
          {/* Left: brand, copyright, socials (3rd on mobile, 1st on desktop) */}
          <div className="order-3 md:order-1 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center space-x-2 mb-4">
              <img
                src="https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fulllogo-JQ4WH.png"
                alt="Marketing Car Main Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="font-body">
              &copy; {new Date().getFullYear()} MarketingCar™. All Rights Reserved.
            </p>
            <p className="font-body">Driving Your Success, One Mile at a Time.</p>

            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              {socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <p className="mt-4 font-body">
              <Link to="/book-now" className="hover:text-primary transition-colors underline font-semibold">
                Book a Free Consultation
              </Link>
            </p>
          </div>

          {/* Middle: CTA button (2nd on mobile, 2nd on desktop) */}
          {/* <div className="order-2 md:order-2">
            <div className="flex justify-center md:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-6 py-4 shadow-xl transition-transform duration-300 text-primary-foreground font-semibold rounded-2xl"
              >
                <Link to="/about/webinars">
                  Check Out Our Marketing Webinars
                </Link>
              </Button>
            </div>
          </div> */}

          {/* Right: Newsletter (1st on mobile, 3rd on desktop) */}
          <div className="order-1 md:order-3">
            <HubSpotNewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
