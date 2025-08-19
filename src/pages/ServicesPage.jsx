import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { services } from '@/data/servicesData.js';
import SchemaMarkup from '@/components/SchemaMarkup';

const ServicesPage = () => {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/services",
    "name": "Our Marketing Services | Marketing Car",
    "description": "Explore the full range of digital marketing services offered by Marketing Car, from SEO and web design to content marketing and paid advertising.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "name": service.title,
          "url": `https://www.marketingcar.com/services/${service.slug}`
        }
      }))
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Our Marketing Services | Marketing Car</title>
        <meta name="description" content="Explore the full range of digital marketing services offered by Marketing Car, from SEO and web design to content marketing and paid advertising." />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={webPageSchema} />
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-4 font-heading"
          >
            Our Marketing Services
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A complete toolkit to build, tune, and accelerate your business growth. We offer a full range of services to get you where you want to go.
          </motion.p>
        </div>
      </div>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
                  <CardHeader className="flex-grow">
                    <div className="mb-4">{service.icon}</div>
                    <CardTitle className="font-heading text-2xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={`/services/${service.slug}`}>Learn More</Link>
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

export default ServicesPage;