import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import SchemaMarkup from '@/components/SchemaMarkup';

const ThankYouPage = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/thank-you",
    "name": "Thank You! | Marketing Car",
    "description": "Thank you for contacting Marketing Car. We've received your message and will be in touch shortly.",
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Thank You! | Marketing Car</title>
        <meta name="description" content="Thank you for contacting Marketing Car. We've received your message and will be in touch shortly." />
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
                Booking Confirmed!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Thank you for scheduling a session with us. We've received your request and will send a confirmation email with all the details shortly.
          </p>
          <Button asChild size="lg">
            <Link to="/">
              Return to Homepage <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ThankYouPage;