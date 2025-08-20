import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Send } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import HubSpotNewsletterForm from '@/components/HubSpotNewsletterForm';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Link } from 'react-router-dom';


const features = [
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Actionable Insights',
    description: 'Get one easy-to-implement marketing tip delivered to your inbox every week.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Quick Wins',
    description: 'Each tip is designed to take just a few minutes but deliver a real impact.',
  },
  {
    icon: <Send className="h-10 w-10 text-primary" />,
    title: 'Free Forever',
    description: 'No fluff, no spam, no cost. Just pure, valuable marketing advice.',
  },
];

const LpFreeMarketingTips = () => {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://www.marketingcar.com/lp-free-marketing-tips",
    "name": "Free Weekly Marketing Tips | Marketing Car",
    "description": "Sign up for free, actionable marketing tips you can use to grow your small business. Quick, easy, and delivered to your inbox weekly.",
    "publisher": {
      "@type": "Organization",
      "name": "Marketing Car",
      "logo": "https://www.marketingcar.com/mainlogo.png"
    }
  };

  const heroImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4d84324a-cf58-49bf-a9fe-718fd0642a7d/e1111111111111111111111111111113.jpg";

  return (
    <PageTransition>


      <Helmet>
        <title>Free Weekly Marketing Tips | Marketing Car</title>
        <meta name="description" content="Sign up for free, actionable marketing tips you can use to grow your small business. Quick, easy, and delivered to your inbox weekly." />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="5-Minute Weekly Marketing Tips" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://marketingcar.com/mainlogo.png" />
        <meta property="og:url" content="https://marketingcar.com/lp-free-marketing-tips" />
        <meta property="og:description" content="Because Who Has Time for 6?" />
        <meta property="og:site_name" content="Marketing Car" />
        <meta property="og:locale" content="en_US" />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />
      <div className="bg-gradient-to-b from-background via-secondary/10 to-background">
        <section 
          className="relative py-20 md:py-32 text-center text-white"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-background/70 to-background/90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-black mb-4 font-heading"
            >
  5 Minute Marketing Tips:<br className="hidden sm:block" /> Because Who Has Time for 6?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8"
            >
Sign up for our free weekly newsletter. Each edition gives you one bite-sized, brain-expanding marketing tip you can actually use right away. No jargon. No 80-slide decks. Just the kind of advice that makes you look brilliant in meetings and maybe even gets your cat to respect you.            </motion.p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Why Sign Up?</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl">
                  Stop guessing and start growing. Our weekly tips are designed for busy small business owners who want real results without the complexity.
                </p>
                <div className="mt-8 space-y-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">{feature.icon}</div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-2xl shadow-primary/10">
                {/* <h3 className="text-2xl font-bold text-center mb-4">Enter Your Email to Subscribe</h3> */}
                <HubSpotNewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LpFreeMarketingTips;