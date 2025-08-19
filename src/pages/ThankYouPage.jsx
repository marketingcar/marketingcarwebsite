import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SchemaMarkup from '@/components/SchemaMarkup';

const ThankYouPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Thank You for Booking | Marketing Car",
    "description": "Your consultation booking is confirmed. We look forward to speaking with you!",
    "url": "https://marketingcar.com/thank-you"
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Thank You for Booking | Marketing Car</title>
        <meta name="description" content="Thank you for scheduling your consultation with Marketing Car. Your booking is confirmed, and we look forward to connecting with you soon!" />
      </Helmet>
      <SchemaMarkup schema={schema} />
      <div className="container mx-auto px-4 py-24 sm:py-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-lg"
        >
          <Card className="bg-secondary/20 border-border/30 text-center shadow-2xl shadow-primary/10">
            <CardContent className="p-8 md:p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
              >
                <CheckCircle2 className="mx-auto h-20 w-20 text-primary mb-6" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-black text-primary font-heading tracking-tight mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for scheduling a session with us. We've received your request and will send a confirmation email with all the details shortly.
              </p>
              <Button asChild size="lg">
                <Link to="/">
                  Back to Home
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ThankYouPage;