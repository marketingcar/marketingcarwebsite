import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { services } from '@/data/servicesData';
import { professionals } from '@/data/whoWeHelpData';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const NavItem = ({
  to,
  children,
  isMobile,
  closeMenu
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return <NavLink to={to} className={`text-lg font-medium transition-colors duration-300 relative ${isMobile ? 'block px-4 py-3 text-foreground' : 'text-foreground nav-link-hover'} ${isActive ? 'nav-link-active' : ''}`} onClick={closeMenu}>
      {children}
      {!isMobile && <span className={`absolute left-0 -bottom-1 w-full h-0.5 nav-link-underline transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0'}`} />}
    </NavLink>;
};
const DropdownNavItem = ({
  title,
  children,
  isMobile,
  closeMenu
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="relative" onMouseEnter={() => !isMobile && setIsOpen(true)} onMouseLeave={() => !isMobile && setIsOpen(false)}>
      <button onClick={() => isMobile && setIsOpen(!isOpen)} className={`flex items-center text-lg font-medium transition-colors duration-300 ${isMobile ? 'w-full px-4 py-3 text-left text-foreground' : 'text-foreground nav-link-hover'}`}>
        {title}
        <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        y: isMobile ? 0 : 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: isMobile ? 0 : 10
      }} transition={{
        duration: 0.2
      }} className={isMobile ? 'pl-4' : 'absolute z-20 mt-2 w-56 rounded-md shadow-lg bg-card border border-border'}>
            <div className={isMobile ? 'py-1' : 'py-2'}>
              {React.Children.map(children, child => React.cloneElement(child, {
            isMobile,
            closeMenu
          }))}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};
const DropdownLink = ({
  to,
  children,
  isMobile,
  closeMenu
}) => <NavLink to={to} onClick={closeMenu} className={({
  isActive
}) => `block transition-colors duration-200 ${isMobile ? 'px-4 py-2 text-sm' : 'px-4 py-2 text-base'} ${isActive ? 'nav-link-active bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-primary/5'}`}>
    {children}
  </NavLink>;
const Header = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoize close menu callback to prevent recreation
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Memoize navigation data to prevent recreation
  const navigationData = useMemo(() => ({
    services: services.map(service => ({
      slug: service.slug,
      title: service.title
    })),
    professionals: professionals.map(prof => ({
      slug: prof.slug,
      title: prof.title
    }))
  }), []);
  const location = useLocation();
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Memoize navigation links to prevent recreation
  const navLinks = useMemo(() => (isMobile = false) => <>
      <NavItem to="/" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.home')}</NavItem>
      <DropdownNavItem title={t('nav.about')} isMobile={isMobile} closeMenu={closeMenu}>
        <DropdownLink to="/about" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.aboutUs')}</DropdownLink>
        <DropdownLink to="/about/the-marketing-car" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.theMarketingCar')}</DropdownLink>
        <DropdownLink to="/faq" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.faq')}</DropdownLink>
        <DropdownLink to="/about/webinars" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.webinars')}</DropdownLink>
        <DropdownLink to="/about/case-studies" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.caseStudies')}</DropdownLink>
        <DropdownLink to="/blog" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.blog')}</DropdownLink>
      </DropdownNavItem>
      <DropdownNavItem title={t('nav.services')} isMobile={isMobile} closeMenu={closeMenu}>
        <DropdownLink to="/services" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.allServices')}</DropdownLink>
        {navigationData.services.map(service => (
          <DropdownLink key={service.slug} to={`/services/${service.slug}`} isMobile={isMobile} closeMenu={closeMenu}>
            {service.title}
          </DropdownLink>
        ))}
      </DropdownNavItem>
      <DropdownNavItem title={t('nav.whoWeHelp')} isMobile={isMobile} closeMenu={closeMenu}>
         <DropdownLink to="/who-we-help" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.allSpecialties')}</DropdownLink>
        {navigationData.professionals.map(prof => (
          <DropdownLink key={prof.slug} to={`/who-we-help/${prof.slug}`} isMobile={isMobile} closeMenu={closeMenu}>
            {prof.title}
          </DropdownLink>
        ))}
      </DropdownNavItem>
      <NavItem to="/contact" isMobile={isMobile} closeMenu={closeMenu}>{t('nav.contact')}</NavItem>
    </>, [navigationData, closeMenu, t]);
  return <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex-shrink-0" onClick={closeMenu}>
            <img className="h-14 w-auto" src="https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fulllogo-IDmgO.png" alt="Marketing Car Logo" width="200" height="56" loading="eager" />
          </Link>
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks()}
          </nav>
          <div className="hidden xl:flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link to="/book-now">{t('nav.bookNow')}</Link>
            </Button>
          </div>
          <div className="xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="xl:hidden bg-background/95 backdrop-blur-sm will-change-transform">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks(true)}
            </div>
            <div className="px-4 py-3 flex items-center justify-center border-t border-border">
              <LanguageSwitcher />
            </div>
            <div className="px-4 py-4">
              <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg">
                <Link to="/book-now" onClick={closeMenu}>{t('nav.bookNow')}</Link>
              </Button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
};
export default React.memo(Header);