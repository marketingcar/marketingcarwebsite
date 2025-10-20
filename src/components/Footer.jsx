import React from 'react';
import { Facebook, Linkedin } from 'lucide-react';
import HubSpotNewsletterForm from '@/components/HubSpotNewsletterForm';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = React.memo(() => {
  const { t } = useTranslation('common');

  const socialLinks = React.useMemo(() => [
    { href: 'https://facebook.com/themarketingcar', label: t('footer.socialLinks.facebookLabel'), icon: <Facebook size={20} /> },
    { href: 'https://www.linkedin.com/company/marketingcar/', label: t('footer.socialLinks.linkedinLabel'), icon: <Linkedin size={20} /> }
  ], [t]);

  return (
    <footer className="border-t border-border bg-background text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          
          {/* Left: cap to max-w-xl so we know its visual width */}
          <div className="lg:col-span-5">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fulllogo-JQ4WH.png"
                  alt={t('footer.logoAlt')}
                  className="h-10 w-auto"
                  width={160}
                  height={40}
                  loading="lazy"
                />
              </div>

              <p className="font-body">{t('footer.copyrightText', { year: new Date().getFullYear() })}</p>
              <p className="font-body">{t('footer.tagline')}</p>
              <p className="font-body mt-2">
                <Link to="/privacy-policy" className="hover:text-primary transition">{t('footer.privacyPolicyLink')}</Link>
              </p>

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

              <div className="mt-6 space-y-2">
                <h3 className="font-semibold text-foreground mb-3">{t('footer.quickLinksHeading')}</h3>
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/"
                    className="hover:text-primary transition"
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    to="/services"
                    className="hover:text-primary transition"
                  >
                    {t('nav.services')}
                  </Link>
                  <Link
                    to="/who-we-help"
                    className="hover:text-primary transition"
                  >
                    {t('nav.whoWeHelp')}
                  </Link>
                  <Link
                    to="/about"
                    className="hover:text-primary transition"
                  >
                    {t('nav.about')}
                  </Link>
                  <Link
                    to="/faq"
                    className="hover:text-primary transition"
                  >
                    {t('nav.faq')}
                  </Link>
                  <Link
                    to="/about/webinars"
                    className="hover:text-primary transition"
                  >
                    {t('nav.webinars')}
                  </Link>
                  <Link
                    to="/blog"
                    className="hover:text-primary transition"
                  >
                    {t('nav.blog')}
                  </Link>
                  <Link
                    to="/contact"
                    className="hover:text-primary transition"
                  >
                    {t('nav.contact')}
                  </Link>
                  <Link
                    to="/book-now"
                    className="font-semibold text-primary hover:text-primary/80 transition"
                  >
                    {t('nav.bookNow')} →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: same max-w-xl to mirror left; keep it left-aligned */}
          <div className="lg:col-span-7">
            <div className="w-full max-w-xl">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <HubSpotNewsletterForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
});

export default Footer;
