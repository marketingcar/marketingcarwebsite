import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Wrench, Users, CircleDollarSign } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import HubSpotEmbed from '@/components/HubSpotEmbed';
import { useQueryParams } from '@/contexts/QueryParamContext';

const features = [
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: 'Strategic Roadmaps',
    description: 'We create focused, actionable marketing plans tailored to your business.',
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Done-for-You Tools',
    description: 'Websites, advertising, SEO, and social content. Built for you. Owned by you.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Real-Time Support',
    description: 'Clear direction and hands-on help so you\'re never left wondering what to do next.',
  },
  {
    icon: <CircleDollarSign className="h-10 w-10 text-primary" />,
    title: 'Right-Sized Pricing',
    description: 'No bloated retainers or cookie-cutter packages. Just smart solutions that fit.',
  },
];

const LpSpinningWheelsPage = () => {
  const { queryParams } = useQueryParams();

  const scrollToBooking = () => {
    document.getElementById('booking-widget').scrollIntoView({ behavior: 'smooth' });
  };

  const heroImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4d84324a-cf58-49bf-a9fe-718fd0642a7d/4102124814504cd0bb1f6e6c0e98efbf.jpg";

  return (
    <PageTransition>
      <Helmet>
        <title>Stop Spinning Your Wheels | Marketing Car</title>
        <meta name="description" content="Tired of marketing efforts that go nowhere? Marketing Car provides clear, strategic roadmaps to move your business forward. Let's get you on the road to results." />
      </Helmet>

      <div className="bg-gradient-to-b from-background via-secondary/10 to-background">
        {/* Hero Section */}
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
              You're working hard. So why does it feel like you're getting nowhere?
            </motion.p>
          </div>
        </section>

        {/* Problem & Solution Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-lg text-muted-foreground mb-8">
              If you're stuck in the slow lane of marketing—burning time, money, and energy without real progress—you're not alone. Most business owners were never given a clear path.
            </p>
            <h2 className="text-3xl font-bold text-white font-heading">
              Marketing Car exists to change that.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We don't throw strategies at you and disappear. We partner with you, map the route, and move your business forward.
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
              Ready to Stop Spinning and Start Moving?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're a therapist, contractor, or small business owner, Marketing Car is here to help you gain traction and finally see results.
            </p>
            <p className="mt-8 text-2xl font-bold text-primary font-heading">
              Let’s get you on the road.
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

export default LpSpinningWheelsPage;