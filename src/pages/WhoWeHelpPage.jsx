import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { professionals } from '@/data/whoWeHelpData.jsx';
import SchemaMarkup from '@/components/SchemaMarkup';
import { useTranslation } from 'react-i18next';

const WhoWeHelpPage = () => {
  const { t } = useTranslation();

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/who-we-help",
    "name": t('pages.whoWeHelp.pageTitle'),
    "description": t('pages.whoWeHelp.pageDescription'),
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": professionals.map((prof, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": prof.title,
          "url": `https://www.marketingcar.com/who-we-help/${prof.slug}`
        }
      }))
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{t('pages.whoWeHelp.pageTitle')}</title>
        <meta name="description" content={t('pages.whoWeHelp.pageDescription')} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={webPageSchema} />
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-4 font-heading"
          >
            {t('pages.whoWeHelp.title')}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            {t('pages.whoWeHelp.subtitle')}
          </motion.p>
        </div>
      </div>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((prof, index) => (
              <motion.div
                key={prof.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-accent/20">
                  <CardHeader className="flex-grow">
                    <div className="mb-4">{prof.icon}</div>
                    <CardTitle className="font-heading text-2xl">{prof.title}</CardTitle>
                    <CardDescription>{prof.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={`/who-we-help/${prof.slug}`}>{t('pages.whoWeHelp.learnMore')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default WhoWeHelpPage;