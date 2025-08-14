import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useQueryParams } from '@/contexts/QueryParamContext';
import { services } from '@/data/servicesData';
import { professionals } from '@/data/whoWeHelpData.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const { queryParams } = useQueryParams();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const serviceLinks = services.map(s => ({ to: `/services/${s.slug}`, text: s.title }));
  const whoWeHelpLinks = professionals.map(p => ({ to: `/who-we-help/${p.slug}`, text: p.name }));

  const navLinks = [
    { to: '/', text: 'Home' },
    { to: '/services', text: 'Services', children: serviceLinks },
    { to: '/who-we-help', text: 'Who We Help', children: whoWeHelpLinks },
    { to: '/case-studies', text: 'Case Studies' },
    { to: '/blog', text: 'Blog' },
  ];

  const baseConsultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";
  const consultationLink = `${baseConsultationLink}${queryParams}`;

  const linkClasses = "text-lg hover:text-primary transition-colors duration-300 font-body";
  const activeLinkClasses = "text-primary font-semibold";

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } }
  };
  
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } }
  };

  const MobileNavLink = ({ link, onClick }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
    if (!link.children) {
      return (
        <NavLink
          to={{ pathname: link.to, search: queryParams }}
          onClick={onClick}
          className={({ isActive }) =>
            `block w-full text-center py-2 ${linkClasses} text-2xl ${isActive ? activeLinkClasses : 'text-foreground'}`
          }
        >
          {link.text}
        </NavLink>
      );
    }
  
    return (
      <div className="w-full text-center">
        <button
          onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          className={`flex items-center justify-center w-full py-2 ${linkClasses} text-2xl text-foreground`}
        >
          {link.text}
          <ChevronDown
            className={`ml-2 h-5 w-5 transition-transform duration-300 ${isSubMenuOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <AnimatePresence>
          {isSubMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center space-y-4 pt-2 pb-4 overflow-hidden bg-secondary/10 rounded-md"
            >
              {link.children.map(child => (
                <NavLink
                  key={child.to}
                  to={{ pathname: child.to, search: queryParams }}
                  onClick={onClick}
                  className="text-lg text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {child.text}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
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
              <div
                key={link.to}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.to)}
                onMouseLeave={() => link.children && setOpenDropdown(null)}
              >
                <NavLink
                  to={{ pathname: link.to, search: queryParams }}
                  className={({ isActive }) =>
                    `flex items-center ${linkClasses} ${isActive ? activeLinkClasses : 'text-muted-foreground'}`
                  }
                >
                  {link.text}
                  {link.children && <ChevronDown className="ml-1 h-4 w-4" />}
                </NavLink>
                <AnimatePresence>
                  {link.children && openDropdown === link.to && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-background border border-border/20 rounded-lg shadow-xl p-2 z-50"
                    >
                      <div className="flex flex-col space-y-1">
                        {link.children.map(child => (
                           <Link
                            key={child.to}
                            to={{ pathname: child.to, search: queryParams }}
                            className="px-4 py-2 rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.text}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                <MobileNavLink key={link.to} link={link} onClick={() => setIsMenuOpen(false)} />
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