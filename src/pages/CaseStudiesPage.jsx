import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { caseStudies } from '@/data/caseStudiesData.jsx';

const CaseStudiesPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Case Studies | Marketing Car</title>
        <meta name="description" content="Explore our case studies to see how Marketing Car has driven success for clients across various industries with proven results and tangible impact." />
      </Helmet>
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-highlight/10">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-4 font-heading"
          >
            Proven Results, Real Success
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Our track record speaks for itself. Dive into our success stories and see the tangible impact we've made for our clients.
          </motion.p>
        </div>
      </div>
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-highlight/20">
                  <CardHeader className="flex-grow">
                    <div className="mb-4">{study.icon}</div>
                    <CardTitle className="font-heading text-2xl">{study.title}</CardTitle>
                    <CardDescription>{study.client}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-end">
                    <p className="text-3xl font-bold font-heading text-primary mb-4">{study.result}</p>
                    <Button asChild className="w-full">
                      <Link to={`/case-studies/${study.slug}`}>Read Full Study</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CaseStudiesPage;