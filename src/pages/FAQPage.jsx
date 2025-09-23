import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import SEOHelmet from '@/components/SEOHelmet';
import SchemaMarkup from '@/components/SchemaMarkup';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { signalPrerenderReady } from '@/lib/prerenderReady';
import { getAllFAQs } from '@/data/staticFAQData';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load FAQs from static data
    try {
      const staticFaqs = getAllFAQs();
      setFaqs(staticFaqs);
      setLoading(false);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      setFaqs([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      signalPrerenderReady();
    }
  }, [loading]);

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Generate FAQ schema for Google
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <SEOHelmet
        title="Frequently Asked Questions | Marketing Car"
        description="Get answers to common questions about Marketing Car's marketing services, pricing, timelines, and how we help small businesses grow."
        path="/about/faq"
      />

      <SchemaMarkup schema={faqSchema} />

      <div className="min-h-screen bg-background text-foreground py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our marketing services, process, and how we help businesses grow.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-card/80 transition-colors"
                  aria-expanded={openItems[faq.id]}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                    {openItems[faq.id] ? (
                      <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>

                {openItems[faq.id] && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 text-center">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Get in touch with our team for personalized answers.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default FAQPage;