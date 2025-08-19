
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import OurDriveSection from '@/components/OurDriveSection';

const AboutPage = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "url": "https://www.marketingcar.com/about",
    "name": "About Marketing Car | Our Mission and Story",
    "description": "Learn about Marketing Car's mission to provide small businesses with clear, effective, and custom-tailored marketing solutions that drive real growth.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com",
      "logo": "https://www.marketingcar.com/mainlogo.png",
      "founder": {
        "@type": "Person",
        "name": "Kelly Baltzell, M.A."
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const heroImageUrl = "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/6a87d97c1bf39048e734e0367e837e98.jpg";

  return (
    <PageTransition>
      <Helmet>
        <title>About Marketing Car | Our Mission and Story</title>
        <meta name="description" content="Learn about Marketing Car's mission to provide small businesses with clear, effective, and custom-tailored marketing solutions that drive real growth." />
        <meta property="og:title" content="About Marketing Car | Our Mission and Story" />
        <meta property="og:description" content="Learn about Marketing Car's mission to provide small businesses with clear, effective, and custom-tailored marketing solutions that drive real growth." />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={aboutSchema} />

      <div className="relative isolate overflow-hidden py-24 sm:py-32 flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img src={heroImageUrl} alt="Abstract background representing marketing concepts" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl font-heading">About Us</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              At Marketing Car, we’re the mechanics for your business growth vehicle, dedicated to equipping small businesses with the roadmap and tools they need to drive lasting success.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="py-24 sm:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20 items-start">
            
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Philosophy</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Marketing Car is built on the fact that there is no magic pill or single solution for growth—it takes a combination of components working together to build your marketing vehicle and move your business forward. Just like a car, every part matters. From strategy and branding to content, design, and advertising, we help align each piece so the whole engine runs smoothly.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We believe every small business deserves a marketing strategy that’s as unique as they are. That’s why we throw out the one-size-fits-all playbook and instead focus on creating custom-tailored solutions that fit your goals, budget, and pace.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Our mission is to demystify digital marketing, transforming complex concepts into a clear, actionable roadmap. We empower you with the knowledge and tools to not just compete, but to thrive in your market.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Roots</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Founded by Kelly Baltzell, M.A., a 30+ year marketing agency owner, Marketing Car builds on decades of expertise helping businesses of every size grow. Today, that legacy continues with a focus on supporting small business owners who are ready to take the driver’s seat in their marketing journey.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.div>
      
      <OurDriveSection />

      <div className="bg-secondary/10 py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
           <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-base font-semibold leading-7 text-primary">Ready to Talk?</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let's Build Your Marketing Vehicle
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you need a full strategy or just a tune-up, we're here to help. Get in touch to discuss how we can accelerate your growth.
            </p>
          </div>
           <div className="mt-16 text-center">
             <Button asChild size="lg">
               <Link to="/contact">Contact Us</Link>
             </Button>
           </div>
        </div>
      </div>

    </PageTransition>
  );
};

export default AboutPage;
