import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  Gps,
  Headlights,
  PaintJob,
  Hitch,
  Body,
  Mechanic,
  Engine,
  Gas,
  Accelerator,
  Horn,
  SteeringWheel,
  Wheels
} from '@/components/CarIcons';

const carParts = [
  { icon: <Gps />, title: 'GPS', name: 'Marketing Strategy', description: 'Develop a comprehensive plan to achieve your business goals.' },
  { icon: <Headlights />, title: 'Headlights', name: 'Local/Near Me Marketing', description: 'Attract local customers and dominate your geographic market.' },
  { icon: <PaintJob />, title: 'Paint Job', name: 'Graphic Design', description: 'Create stunning visuals that capture attention and convey your message.' },
  { icon: <Hitch />, title: 'Hitch', name: 'B2B Marketing', description: 'Drive growth with strategies tailored for business-to-business clients.' },
  { icon: <Body />, title: 'Body', name: 'Brand Strategy and Design', description: 'Build a powerful and memorable brand identity from the ground up.' },
  { icon: <Mechanic />, title: 'Mechanic', name: 'Marketing Consultation', description: 'Get expert advice and actionable insights tailored to your unique challenges.' },
  { icon: <Engine />, title: 'Engine', name: 'SEO', description: 'Climb search rankings and drive organic traffic.' },
  { icon: <Gas />, title: 'Gas', name: 'Content Marketing', description: 'Engage your audience with compelling stories and content.' },
  { icon: <Accelerator />, title: 'Accelerator', name: 'Paid Advertising', description: 'Maximize ROI with targeted PPC campaigns.' },
  { icon: <Horn />, title: 'Horn', name: 'Social Media', description: 'Build a vibrant community around your brand.' },
  { icon: <SteeringWheel />, title: 'Steering Wheel', name: 'Email Marketing', description: 'Nurture leads and retain customers effectively.' },
  { icon: <Wheels />, title: 'Wheels', name: 'Web Design and Development', description: 'Create stunning, high-performance websites.' },
];

const TheMarketingCarPage = () => {
  const pageTitle = "The Marketing Car | Our Approach to Integrated Marketing";
  const pageDescription = "Discover the components of 'The Marketing Car'—our philosophy that true marketing success comes from the right combination of integrated parts working together.";

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/about/the-marketing-car",
    "name": pageTitle,
    "description": pageDescription,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />

      <div className="py-24 sm:py-32 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl font-heading"
          >
            The Marketing Car
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto"
          >
            It takes the right combination of parts to build a car, and no single part in isolation can drive you forward. The same is true for your marketing. Here are the components we use to build your vehicle for growth.
          </motion.p>
        </div>
      </div>

      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {carParts.map((part, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-secondary/10 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-20 h-20 mb-4 text-primary">{part.icon}</div>
                <h2 className="text-xl font-bold text-white">{part.title}</h2>
                <h3 className="text-lg font-semibold text-highlight mb-2">{part.name}</h3>
                <p className="text-muted-foreground flex-grow">{part.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TheMarketingCarPage;