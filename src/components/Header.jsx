import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useQueryParams } from '@/contexts/QueryParamContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { queryParams } = useQueryParams();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/services', text: 'Services' },
    { to: '/who-we-help', text: 'Who We Help' },
    { to: '/case-studies', text: 'Case Studies' },
    { to: '/blog', text: 'Blog' },
  ];

  const baseConsultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";
  const consultationLink = `${baseConsultationLink}${queryParams}`;

  const linkClasses = "text-lg hover:text-primary transition-colors duration-300 font-body";
  const activeLinkClasses = "text-primary font-semibold";

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="relative">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-4 px-4 sm:px-8 shadow-lg bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border/10"
      >
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to={{ pathname: "/", search: queryParams }} className="flex items-center space-x-2 shrink-0">
            <img src="/mainlogo.png" alt="Marketing Car Main Logo" className="h-12" width="205" height="48" />
          </NavLink>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={{ pathname: link.to, search: queryParams }}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeLinkClasses : 'text-muted-foreground'}`
                }
              >
                {link.text}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <a href={consultationLink} target="_blank" rel="noopener noreferrer">Get a Quote</a>
            </Button>
          </div>
          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg z-40 border-b border-border/10"
          >
            <nav className="container mx-auto flex flex-col items-center space-y-6 py-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={{ pathname: link.to, search: queryParams }}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `${linkClasses} text-2xl ${isActive ? activeLinkClasses : 'text-foreground'}`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
              <Button asChild className="mt-4" size="lg">
                <a href={consultationLink} target="_blank" rel="noopener noreferrer">Get a Quote</a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;