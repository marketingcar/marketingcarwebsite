import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SchemaMarkup from '@/components/SchemaMarkup';

const parts = [
  {
    name: "GPS",
    title: "Marketing Strategy",
    description: "Develop a comprehensive plan to achieve your business goals.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Headlights",
    title: "Local/Near Me Marketing",
    description: "Attract local customers and dominate your geographic market.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Paint Job",
    title: "Graphic Design",
    description: "Create stunning visuals that capture attention and convey your message.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Hitch",
    title: "B2B Marketing",
    description: "Drive growth with strategies tailored for business-to-business clients.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Body",
    title: "Brand Strategy and Design",
    description: "Build a powerful and memorable brand identity from the ground up.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Mechanic",
    title: "Marketing Consultation",
    description: "Get expert advice and actionable insights tailored to your unique challenges.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Engine",
    title: "SEO",
    description: "Climb search rankings and drive organic traffic.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Gas",
    title: "Content Marketing",
    description: "Engage your audience with compelling stories and content.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Accelerator",
    title: "Paid Advertising",
    description: "Maximize ROI with targeted PPC campaigns.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Horn",
    title: "Social Media",
    description: "Build a vibrant community around your brand.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Steering Wheel",
    title: "Email Marketing",
    description: "Nurture leads and retain customers effectively.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
  {
    name: "Wheels",
    title: "Web Design and Development",
    description: "Create stunning, high-performance websites.",
    icon: "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/17020240819104750.png"
  },
];

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

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {parts.map((part, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col p-6 bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
              <CardHeader className="flex flex-row items-center space-x-4 p-0 mb-4">
                <img src={part.icon} alt={`${part.name} icon`} className="w-12 h-12 object-contain" />
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">{part.name}</CardTitle>
                  <CardDescription className="text-lg text-primary font-semibold">{part.title}</CardDescription>
                </div>
              </CardHeader>
              <p className="text-muted-foreground flex-grow">{part.description}</p>
            </Card>
          </motion.div>
        ))}
      </section>

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