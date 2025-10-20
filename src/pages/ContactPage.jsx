
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import HubSpotContactForm from '@/components/HubSpotContactForm';
import { Phone, MapPin, Mail, Facebook, Linkedin, CalendarCheck } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  const pageTitle = t('pages.contact.pageTitle');
  const pageDescription = t('pages.contact.pageDescription');

  const socialLinks = [{
    href: "https://facebook.com/themarketingcar",
    label: t('pages.contact.social.facebook'),
    icon: <Facebook size={24} />
  }, {
    href: "https://www.linkedin.com/company/marketingcar/",
    label: t('pages.contact.social.linkedin'),
    icon: <Linkedin size={24} />
  }];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://www.marketingcar.com/contact",
    "name": pageTitle,
    "description": pageDescription,
    "mainEntity": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com",
      "logo": "https://www.marketingcar.com/mainlogo.png",
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+1-312-741-9028",
        "contactType": "customer service"
      }, {
        "@type": "ContactPoint",
        "email": "mechanic@marketingcar.com",
        "contactType": "customer service"
      }]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={contactSchema} />

      <div className="bg-gradient-to-b from-background to-primary/10 py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl font-heading"
          >
            {t('pages.contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto"
          >
            {t('pages.contact.subtitle')}
          </motion.p>
        </div>
      </div>

      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-white mb-6">{t('pages.contact.form.title')}</h2>
                <HubSpotContactForm />
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-12"
            >
              <motion.div variants={itemVariants} className="bg-secondary/10 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <CalendarCheck className="h-6 w-6 mr-3 text-primary" />
                  {t('pages.contact.booking.title')}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {t('pages.contact.booking.subtitle')}
                </p>
                <Button asChild size="lg">
                  <Link to="/book-now">
                    {t('pages.contact.booking.button')}
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-primary" />
                  {t('pages.contact.phone.title')}
                </h3>
                <a href="tel:312-741-9028" className="text-lg text-muted-foreground hover:text-highlight transition-colors">
                  {t('pages.contact.phone.number')}
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-primary" />
                  {t('pages.contact.email.title')}
                </h3>
                <a href="mailto:mechanic@marketingcar.com" className="text-lg text-muted-foreground hover:text-highlight transition-colors">
                  {t('pages.contact.email.address')}
                </a>
                 <p className="text-sm text-muted-foreground mt-2">{t('pages.contact.email.note')}</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <MapPin className="h-6 w-6 mr-3 text-primary" />
                  {t('pages.contact.location.title')}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {t('pages.contact.location.description')}
                </p>
              </motion.div>

               <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-semibold text-white mb-4">{t('pages.contact.social.title')}</h3>
                <div className="flex space-x-6">
                  {socialLinks.map(link => (
                    <a key={link.label} href={link.href} className="text-muted-foreground hover:text-primary transition-colors" aria-label={link.label} target="_blank" rel="noopener noreferrer">
                      {link.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
