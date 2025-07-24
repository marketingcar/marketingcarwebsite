import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { services } from '@/data/servicesData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

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

  if (!service) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The service you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`${service.title} | Marketing Car Services`}</title>
        <meta name="description" content={service.description} />
      </Helmet>
      
      <div className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10"></div>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate('/services')} className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Services
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <span className="text-6xl md:text-7xl mb-6 block">{service.icon}</span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 font-heading text-white">{service.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">{service.details}</p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/20 border-border/30 shadow-2xl shadow-primary/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 font-heading text-white">What's Included?</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        custom={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      >
                        <CheckCircle className="h-6 w-6 text-primary mr-4 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
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

export default ServiceDetailPage;