import React from 'react';
import { Users, Globe, Zap } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { href: "#", label: "Follow us on platform X", icon: <Users size={24} /> },
    { href: "#", label: "Visit our main website", icon: <Globe size={24} /> },
    { href: "#", label: "Check our latest news", icon: <Zap size={24} /> },
  ];
  const consultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";


  return (
    <footer className="py-10 px-4 sm:px-8 text-center text-muted-foreground bg-background border-t border-border">
      <div className="container mx-auto">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <img  alt="Marketing Car Icon Logo" className="h-8 w-8" src="https://images.unsplash.com/photo-1685275153761-1f2c1421a7b2" />
          <img  alt="Marketing Car Full Logo" className="h-7" src="https://images.unsplash.com/photo-1698685247855-078092c12b1b" />
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