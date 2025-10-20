
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OurDriveSection from '@/components/OurDriveSection';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://www.marketingcar.com/about",
    "name": t('pages.about.pageTitle'),
    "description": t('pages.about.pageDescription'),
    "mainEntity": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com",
      "logo": "https://www.marketingcar.com/mainlogo.png",
      "founder": {
        "@type": "Person",
        "name": "Kelly Baltzell, M.A."
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const heroImageUrl = "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/6a87d97c1bf39048e734e0367e837e98.jpg";

  return (
    <PageTransition>
      <Helmet>
        <title>{t('pages.about.pageTitle')}</title>
        <meta name="description" content={t('pages.about.pageDescription')} />
        <meta property="og:title" content={t('pages.about.pageTitle')} />
        <meta property="og:description" content={t('pages.about.pageDescription')} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={aboutSchema} />

      <div className="relative isolate overflow-hidden py-24 sm:py-32 flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img src={heroImageUrl} alt={t('pages.about.heroAlt')} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl font-heading">{t('pages.about.title')}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('pages.about.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="py-24 sm:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20 items-start">
            
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('pages.about.philosophy.title')}</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {t('pages.about.philosophy.paragraph1')}
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t('pages.about.philosophy.paragraph2')}
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {t('pages.about.philosophy.paragraph3')}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('pages.about.roots.title')}</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {t('pages.about.roots.paragraph')}
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>
      
      <OurDriveSection />

      <div className="bg-secondary/10 py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
           <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-primary">{t('pages.about.cta.preTitle')}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('pages.about.cta.title')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t('pages.about.cta.subtitle')}
            </p>
          </div>
           <div className="mt-16 text-center">
             <Button asChild size="lg">
               <Link to="/contact">{t('pages.about.cta.button')}</Link>
             </Button>
           </div>
        </div>
      </div>

    </PageTransition>
  );
};

export default AboutPage;
