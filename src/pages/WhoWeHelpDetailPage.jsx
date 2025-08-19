import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { professionals } from '@/data/whoWeHelpData.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SchemaMarkup from '@/components/SchemaMarkup';

const WhoWeHelpDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const professional = professionals.find((p) => p.slug === slug);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
  };

  if (!professional) {
    return (
      <PageTransition>
        <Helmet>
          <title>Specialty Not Found | Marketing Car</title>
          <meta name="description" content="The professional specialty you are looking for could not be found." />
        </Helmet>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Specialty Not Found</h1>
          <p className="text-muted-foreground mb-8">The professional specialty you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/who-we-help">Back to Who We Help</Link>
          </Button>
        </div>
      </PageTransition>
    );
  }
  
  const pageTitle = `Marketing for ${professional.name} | Marketing Car`;
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Marketing for ${professional.name}`,
    "description": professional.details,
    "provider": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://marketingcar.com"
    },
    "serviceType": "Marketing",
    "audience": {
      "@type": "Audience",
      "audienceType": professional.name
    },
    "mainEntityOfPage": `https://marketingcar.com/who-we-help/${professional.slug}`
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={professional.details} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={professional.details} />
      </Helmet>
      <SchemaMarkup schema={serviceSchema} />
      
      <div className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10"></div>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate('/who-we-help')} className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Professionals
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="text-6xl md:text-7xl mb-6 block">{professional.icon}</div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 font-heading text-white">{`Marketing for ${professional.name}`}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">{professional.details}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/20 border-border/30 shadow-2xl shadow-primary/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 font-heading text-white">Tailored Solutions</h3>
                  <ul className="space-y-4">
                    {professional.solutions.map((solution, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        custom={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{solution}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default WhoWeHelpDetailPage;