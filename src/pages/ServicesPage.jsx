import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { services } from '@/data/servicesData';
import SchemaMarkup from '@/components/SchemaMarkup';

const ServicesPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/services",
    "name": "Our Services | Marketing Car",
    "description": "Discover the full range of digital marketing services offered by Marketing Car, from SEO and content marketing to paid advertising and web design. We tailor every strategy to fit your unique goals.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.title,
          "url": `https://www.marketingcar.com/services/${service.slug}`,
          "description": service.description
        }
      }))
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Our Services | Marketing Car</title>
        <meta name="description" content="Discover the full range of digital marketing services offered by Marketing Car, from SEO and content marketing to paid advertising and web design. We tailor every strategy to fit your unique goals." />
      </Helmet>
      <SchemaMarkup schema={webPageSchema} />
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-4 font-heading"
          >
            Our Digital Marketing Services
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A complete toolkit to fuel your brand's growth. We tailor every strategy to fit your unique goals and drive real results.
          </motion.p>
        </div>
      </div>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={itemVariants}>
                <Link to={`/services/${service.slug}`} className="block h-full">
                  <Card className="h-full transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20 bg-secondary/20 border-border/30">
                    <CardHeader>
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <CardTitle className="font-heading text-2xl text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-muted-foreground">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ServicesPage;