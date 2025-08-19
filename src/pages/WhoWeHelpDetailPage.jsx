
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { professionals } from '@/data/whoWeHelpData.jsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SchemaMarkup from '@/components/SchemaMarkup';

const WhoWeHelpDetailPage = () => {
  const { slug } = useParams();
  const professional = professionals.find((p) => p.slug === slug);

  if (!professional) {
    return (
      <PageTransition>
        <Helmet>
          <title>Specialty Not Found | Marketing Car</title>
          <meta name="description" content="The specialty you are looking for could not be found." />
        </Helmet>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold">Specialty Not Found</h1>
          <p className="text-muted-foreground mt-4">Sorry, we couldn't find the specialty you're looking for.</p>
          <Button asChild className="mt-8">
            <Link to="/who-we-help">Back to Who We Help</Link>
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

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": `https://www.marketingcar.com/who-we-help/${professional.slug}`,
    "name": professional.meta.title,
    "description": professional.meta.description,
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{professional.meta.title}</title>
        <meta name="description" content={professional.meta.description} />
        <meta property="og:title" content={professional.meta.ogTitle} />
        <meta property="og:description" content={professional.meta.ogDescription} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />
      <div className="py-16 md:py-24 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button asChild variant="ghost" className="mb-8">
              <Link to="/who-we-help">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Who We Help
              </Link>
            </Button>
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black mb-2 font-heading"
          >
            {professional.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl"
          >
            {professional.subtitle}
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
            <motion.div variants={itemVariants} className="prose prose-invert max-w-none lg:prose-xl prose-h3:text-accent">
              <div dangerouslySetInnerHTML={{ __html: professional.longDescription }} />
            </motion.div>
          </div>

          <aside className="lg:col-span-1">
            <motion.div variants={itemVariants} className="sticky top-28">
              <Card className="shadow-lg bg-secondary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-heading">How We Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {professional.howWeHelp.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Button asChild size="lg" className="w-full mt-8">
                <Link to="/book-now">Book a Free Consultation</Link>
              </Button>
            </motion.div>
          </aside>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default WhoWeHelpDetailPage;
