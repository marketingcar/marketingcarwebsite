
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, Zap, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Link } from 'react-router-dom';

const LpWebsiteServices = () => {
  const serviceDetails = {
    title: "Professional Website Design & Development",
    subtitle: "Transform Your Online Presence with a Custom Website That Drives Results",
    description: "Get a professionally designed, high-converting website that attracts customers, builds credibility, and grows your business. No cookie-cutter templates—just results-driven design.",
    ctaLink: "/contact",
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceDetails.title,
    "description": serviceDetails.description,
    "provider": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "serviceType": "Website Design and Development"
  };

  const heroImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4d84324a-cf58-49bf-a9fe-718fd0642a7d/e1111111111111111111111111111115.jpg";

  const features = [
    {
      icon: Globe,
      title: "Custom Design",
      description: "A unique website tailored to your brand, not a generic template"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed and performance to keep visitors engaged"
    },
    {
      icon: Target,
      title: "Conversion-Focused",
      description: "Designed to turn visitors into customers with strategic CTAs"
    },
    {
      icon: TrendingUp,
      title: "SEO Optimized",
      description: "Built to rank on Google and drive organic traffic"
    }
  ];

  const benefits = [
    "Mobile-responsive design that looks perfect on any device",
    "Easy-to-update content management system",
    "Professional copywriting that speaks to your ideal customers",
    "Fast load times for better user experience and SEO",
    "Secure hosting and SSL certificate included",
    "Ongoing support and maintenance options available"
  ];

  return (
    <PageTransition>

      <Helmet>
        <title>{serviceDetails.subtitle} | Marketing Car</title>
        <meta name="description" content={serviceDetails.description} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content={serviceDetails.subtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://marketingcar.com/og-website-services.png" />
        <meta property="og:url" content="https://marketingcar.com/lp-website-services" />
        <meta property="og:description" content={serviceDetails.description} />
        <meta property="og:site_name" content="Marketing Car" />
        <meta property="og:locale" content="en_US" />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />
      <div className="bg-gradient-to-b from-background via-highlight/10 to-background">
        <section
          className="relative py-20 md:py-32 text-center text-white"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-background/70 to-background/90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-semibold text-secondary"
            >
              WEBSITE DESIGN & DEVELOPMENT
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-black my-4 font-heading"
            >
              {serviceDetails.subtitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              {serviceDetails.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
            >
              <Button size="lg" asChild>
                <Link to={serviceDetails.ctaLink}>Get Your Custom Website <ArrowRight className="ml-2" /></Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Our Website Services?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-secondary/10 p-6 rounded-lg text-center hover:bg-secondary/20 transition-colors"
                  >
                    <feature.icon className="h-12 w-12 text-highlight mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-invert max-w-none lg:prose-xl prose-h3:text-accent">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What's Included in Every Website</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="h-6 w-6 text-highlight flex-shrink-0 mt-1" />
                        <p className="text-lg m-0">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-secondary/10 p-8 rounded-lg text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-lg mb-6">
                      Your business deserves a website that works as hard as you do. Let's create something amazing together.
                    </p>
                    <Button size="lg" asChild className="transform hover:scale-105 transition-transform">
                      <Link to={serviceDetails.ctaLink}>Schedule Your Free Consultation <ArrowRight className="ml-2" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LpWebsiteServices;
