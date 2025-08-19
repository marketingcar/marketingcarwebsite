import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavLink, Link } from 'react-router-dom';
import { useQueryParams } from '@/contexts/QueryParamContext';
import { professionals } from '@/data/whoWeHelpData.jsx';
import SchemaMarkup from '@/components/SchemaMarkup';

const WhoWeHelpPage = () => {
  const { queryParams } = useQueryParams();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };
  
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://marketingcar.com/who-we-help",
    "name": "Who We Help | Marketing Car",
    "description": "Marketing Car helps passionate, licensed professionals—therapists, electricians, plumbers, veterinarians, and more—solve their marketing challenges so they can focus on their craft.",
    "mainEntity": {
        "@type": "ItemList",
        "itemListElement": professionals.map((prof, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Service",
                "name": `Marketing for ${prof.name}`,
                "url": `https://marketingcar.com/who-we-help/${prof.slug}`,
                "description": prof.summary
            }
        }))
    }
  };


  return (
    <PageTransition>
      <Helmet>
        <title>Who We Help | Marketing Car</title>
        <meta name="description" content="Marketing Car helps passionate, licensed professionals—therapists, electricians, plumbers, veterinarians, and more—solve their marketing challenges so they can focus on their craft." />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />
      
      <div className="bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-primary font-heading tracking-tight">We Help Humans Solve Marketing Challenges</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Behind every professional license is a person with a passion. You're an expert in your field, not a marketing guru—and that's exactly how it should be. We're here to be your marketing engine, so you can focus on what you love.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="py-24 bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {professionals.map((prof) => (
              <motion.div key={prof.name} variants={itemVariants}>
                <Link to={`/who-we-help/${prof.slug}`} className="block h-full group">
                  <Card className="text-center h-full group-hover:shadow-xl group-hover:-translate-y-2 transition-transform duration-300 bg-secondary/20 border-border/30 flex flex-col">
                    <CardHeader className="items-center flex-grow">
                      {prof.icon}
                      <CardTitle className="mt-4 text-2xl font-semibold font-heading text-white">{prof.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{prof.summary}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-primary/20 border-primary/40 flex flex-col justify-center items-center p-6">
                <CardHeader className="items-center">
                  <Sparkles size={48} className="text-primary" />
                  <CardTitle className="mt-4 text-2xl font-semibold font-heading">Ready to Focus on Your Passion?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-muted-foreground">Let us handle the marketing.</p>
                  <Button asChild className="mt-6" size="lg">
                    <NavLink to={{ pathname: "/book-now", search: queryParams }}>Let's Talk</NavLink>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default WhoWeHelpPage;