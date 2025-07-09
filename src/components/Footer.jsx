import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { href: "https://facebook.com/themarketingcar", label: "Follow us on Facebook", icon: <Facebook size={24} /> },
    { href: "https://www.linkedin.com/company/marketingcar/", label: "Connect with us on LinkedIn", icon: <Linkedin size={24} /> },
  ];
  const consultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";


  return (
    <footer className="py-10 px-4 sm:px-8 text-center text-muted-foreground bg-background border-t border-border">
      <div className="container mx-auto">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <img src="/mainlogo.png" alt="Marketing Car Main Logo" className="h-10" />
        </div>
        <p className="font-body">&copy; {new Date().getFullYear()} MarketingCar™. All Rights Reserved.</p>
        <p className="font-body">Driving Your Success, One Mile at a Time.</p>
        <div className="mt-4 flex justify-center space-x-4">
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
            <a href={consultationLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline font-semibold">
              Book a Free Consultation
            </a>
          </p>
      </div>
    </footer>
  );
};

export default Footer;