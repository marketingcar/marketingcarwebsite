import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useTranslation } from 'react-i18next';

const ThankYouPage = () => {
  const { t } = useTranslation();

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/thank-you",
    "name": t('pages.thankYou.pageTitle'),
    "description": t('pages.thankYou.pageDescription'),
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{t('pages.thankYou.pageTitle')}</title>
        <meta name="description" content={t('pages.thankYou.pageDescription')} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />
      <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-background to-primary/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center p-8"
        >
          <CheckCircle className="mx-auto h-24 w-24 text-green-500 mb-6" />
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-heading">
                {t('pages.thankYou.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {t('pages.thankYou.message')}
          </p>
          <Button asChild size="lg">
            <Link to="/">
              {t('pages.thankYou.returnHome')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ThankYouPage;