
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Rocket, Target, PartyPopper } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { caseStudies } from '@/data/caseStudiesData.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SchemaMarkup from '@/components/SchemaMarkup';

const CaseStudyDetailPage = () => {
  const { slug } = useParams();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <PageTransition>
        <Helmet>
          <title>Case Study Not Found | Marketing Car</title>
          <meta name="description" content="The case study you are looking for could not be found." />
        </Helmet>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Case Study Not Found</h1>
          <p className="text-muted-foreground mt-4">Sorry, we couldn't find the case study you're looking for.</p>
          <Button asChild className="mt-8">
            <Link to="/case-studies">Back to Case Studies</Link>
          </Button>
        </div>
      </PageTransition>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.marketingcar.com/case-studies/${study.slug}`
    },
    "headline": study.title,
    "description": study.meta.description,
    "image": `https://www.marketingcar.com${study.image}`,
    "author": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marketing Car",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.marketingcar.com/mainlogo.png"
      }
    },
    "datePublished": "2025-08-13",
    "dateModified": "2025-08-13"
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{study.meta.title}</title>
        <meta name="description" content={study.meta.description} />
        <meta property="og:title" content={study.meta.ogTitle} />
        <meta property="og:description" content={study.meta.ogDescription} />
        <meta property="og:image" content={study.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={study.meta.ogTitle} />
        <meta name="twitter:description" content={study.meta.ogDescription} />
        <meta name="twitter:image" content={study.image} />
        <meta name="twitter:image:alt" content={study.meta.ogImageAlt} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={articleSchema} />
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/case-studies">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Case Studies
              </Link>
            </Button>
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-2 font-heading"
          >
            {study.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            Client: {study.client}
          </motion.p>
        </div>
      </div>

      <motion.div
        className="container mx-auto px-4 py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants} className="mb-12">
              <img src={study.image} alt={study.imageAlt} className="rounded-lg shadow-xl w-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold font-heading mb-4 flex items-center"><Target className="mr-3 h-8 w-8 text-primary"/>Marketing Goal</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{study.marketingGoal}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-3xl font-bold font-heading mb-6 flex items-center"><Rocket className="mr-3 h-8 w-8 text-primary"/>Process to Get There</h2>
              <ul className="space-y-4">
                {study.process.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-lg text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {study.successStory && (
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold font-heading mb-4 flex items-center"><PartyPopper className="mr-3 h-8 w-8 text-primary"/>{study.successStory.title}</h2>
                <Card className="bg-secondary/10 border-l-4 border-secondary">
                  <CardContent className="pt-6">
                    <blockquote className="text-lg italic text-foreground">
                      "{study.successStory.content}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <motion.div variants={itemVariants} className="sticky top-28">
              <Card className="shadow-lg bg-secondary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-heading text-center">Key Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {study.resultsSummary.map((res, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-xl text-primary">{res.metric}</span>
                          <p className="text-muted-foreground">{res.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </aside>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default CaseStudyDetailPage;
