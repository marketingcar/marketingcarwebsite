import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SchemaMarkup from '@/components/SchemaMarkup';
import ServicesSection from '@/components/ServicesSection';



const TheMarketingCarPage = () => {
    const pageTitle = "The Marketing Car | Our Components for Success";
    const pageDescription = "Discover the essential components of The Marketing Car and how each part works together to drive your business forward. Learn about our comprehensive approach to marketing.";

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://marketingcar.com/about/the-marketing-car",
        "name": pageTitle,
        "description": pageDescription,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": parts.map((part, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": part.title,
                "description": part.description
            }))
        }
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 sm:py-16 lg:py-20"
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>
      <SchemaMarkup schema={schema} />

      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary mb-4 leading-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-highlight to-secondary">
            The Marketing Car
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          Just like a car needs all its parts to run smoothly, your marketing needs a complete system. No single part in isolation can drive you forward—it takes the right combination to build a powerful engine for growth.
        </p>
      </header>

             <ServicesSection />

      <section className="text-center mt-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Ready to build your Marketing Car?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let's assemble the perfect combination of strategies and tools to accelerate your business growth.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 shadow-xl transform hover:scale-105 transition-transform duration-300 text-primary-foreground font-semibold" asChild>
          <Link to="/book-now">
            Book a Free Consultation <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </motion.div>
  );
};

export default TheMarketingCarPage;