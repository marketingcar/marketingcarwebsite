import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/services', text: 'Services' },
    { to: '/who-we-help', text: 'Who We Help' },
    { to: '/case-studies', text: 'Case Studies' },
    { to: '/blog', text: 'Blog' },
  ];

  const consultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";

  const linkClasses = "text-lg hover:text-primary transition-colors duration-300 font-body";
  const activeLinkClasses = "text-primary font-semibold";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-4 px-4 sm:px-8 shadow-lg bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src="/mainlogo.png" alt="Marketing Car Main Logo" className="h-12" />
        </NavLink>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : 'text-muted-foreground'}`
              }
            >
              {link.text}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Button asChild>
            <a href={consultationLink} target="_blank" rel="noopener noreferrer">Get a Quote</a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;