import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Wrench, Users, CircleDollarSign } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import HubSpotEmbed from '@/components/HubSpotEmbed';
import { useQueryParams } from '@/contexts/QueryParamContext';
import SchemaMarkup from '@/components/SchemaMarkup';

const features = [
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: 'Straightforward Strategy',
    description: 'No fluff—just real, actionable marketing plans tailored to your trade and local market.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Done-for-You Tools',
    description: 'Websites, Google ads, SEO, and social content—custom-built for your business, and fully yours to keep.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Real Support, Real People',
    description: 'We don’t leave you hanging. You’ll get hands-on help and clear direction every step of the way.',
  },
  {
    icon: <CircleDollarSign className="h-10 w-10 text-primary" />,
    title: 'Right-Sized Pricing',
    description: 'No bloated agency fees or useless bells and whistles. Just smart, affordable marketing that works for your size and goals.',
  },
];

const LpSpinningWheelsTradesPage = () => {
  const { queryParams } = useQueryParams();

  const scrollToBooking = () => {
    document.getElementById('booking-widget').scrollIntoView({ behavior: 'smooth' });
  };
  
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://marketingcar.com/lp-spinning-wheels-trades",
    "name": "Win More Jobs Without the Guesswork | Marketing Car for Trades",
    "description": "Tired of spinning your wheels trying to get noticed? Marketing Car helps tradesmen win more jobs with straightforward marketing strategies and done-for-you tools.",
    "publisher": {
      "@type": "Organization",
      "name": "Marketing Car",
      "logo": "https://marketingcar.com/mainlogo.png"
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Win More Jobs Without the Guesswork | Marketing Car for Trades</title>
        <meta name="description" content="Tired of spinning your wheels trying to get noticed? Marketing Car helps tradesmen win more jobs with straightforward marketing strategies and done-for-you tools." />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />

      <div className="bg-gradient-to-b from-background via-secondary/10 to-background">
        {/* Hero Section */}
        <section 
          className="relative py-20 md:py-32 text-center text-white"
        >
          <img src="https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/e2d091a4-9271-460b-8012-d04b6805b57f.jpg" alt="A construction worker looking at blueprints on a job site, with the sun setting in the background." className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-background/70 to-background/90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-black font-heading tracking-tight"
            >
              Tired of Spinning Your Wheels?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-200"
            >
              You’re working hard. So why does it feel like the jobs aren’t coming in like they should?
            </motion.p>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-lg text-muted-foreground mb-8">
              If you’re stuck in the slow lane—burning time, money, and energy trying to get noticed—you're not alone. Most tradesmen were never given a clear plan for marketing their business.
            </p>
            <h2 className="text-3xl font-bold text-white font-heading">
              Marketing Car is here to change that.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We don’t just hand you some tools and disappear. We partner with you, build a clear path, and help you win more jobs without the guesswork.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading text-white">
              What You Get with Marketing Car
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center p-6 bg-secondary/20 rounded-lg border border-border/30"
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
              Ready to Stop Spinning and Start Booking More Jobs?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're an electrician, plumber, contractor, or other skilled tradesman, Marketing Car helps you get noticed—and get hired.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={scrollToBooking}>
                Book a Free Consultation
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to={{ pathname: "/services", search: queryParams }}>Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Booking Widget Section */}
        <section id="booking-widget" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-lg overflow-hidden shadow-2xl shadow-primary/20">
              <HubSpotEmbed />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LpSpinningWheelsTradesPage;