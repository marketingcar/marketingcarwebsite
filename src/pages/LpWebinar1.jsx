
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, Clock, Map, Target } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Link } from 'react-router-dom';

const LpWebinar1 = () => {
  const webinarDetails = {
    title: "The GPS – Marketing Strategy",
    subtitle: "Small Business Roadmap: Building a Marketing Strategy That Gets Results",
    description: "How to create a realistic, results-focused plan for your small business, set achievable goals, and align every marketing component so it works toward your growth.",
    date: "September 16, 2025",
    time: "12:00 PM - 12:30 PM EST",
    registrationLink: "https://zoom.us/webinar/register/4417556050965/WN_oe6iPjC1QRKdj5Y0DNyq7w",
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": webinarDetails.subtitle,
    "startDate": "2025-09-16T12:00:00-04:00",
    "endDate": "2025-09-16T12:30:00-04:00",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "VirtualLocation",
      "url": webinarDetails.registrationLink
    },
    "image": [
      "https://www.marketingcar.com/webinar-gps.jpg"
    ],
    "description": webinarDetails.description,
    "organizer": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com"
    }
  };

  const heroImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/4d84324a-cf58-49bf-a9fe-718fd0642a7d/e1111111111111111111111111111114.jpg";

  return (
    <PageTransition>

      <Helmet>
        <title>{webinarDetails.subtitle} | Marketing Car Webinar</title>
        <meta name="description" content={webinarDetails.description} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content={webinarDetails.subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://marketingcar.com/webinars/webinar1.png" />
        <meta property="og:url" content="https://marketingcar.com/lp-webinar-1" />
        <meta property="og:description" content={webinarDetails.description} />
        <meta property="og:site_name" content="Marketing Car" />
        <meta property="og:locale" content="en_US" />
      </Helmet>
      <SchemaMarkup schema={pageSchema} />
      <div className="bg-gradient-to-b from-background via-accent/10 to-background">
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-semibold text-highlight"
            >
              FREE LIVE WEBINAR
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-black my-4 font-heading"
            >
              {webinarDetails.subtitle}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
            >
              <Button size="lg" asChild>
                <a href={webinarDetails.registrationLink} target="_blank" rel="noopener noreferrer">Register Now</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-secondary/10 p-6 rounded-lg flex items-center space-x-4">
                  <Calendar className="h-10 w-10 text-highlight" />
                  <div>
                    <p className="font-bold text-lg">Date</p>
                    <p className="text-muted-foreground">{webinarDetails.date}</p>
                  </div>
                </div>
                <div className="bg-secondary/10 p-6 rounded-lg flex items-center space-x-4">
                  <Clock className="h-10 w-10 text-highlight" />
                  <div>
                    <p className="font-bold text-lg">Time</p>
                    <p className="text-muted-foreground">{webinarDetails.time}</p>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none lg:prose-xl prose-h3:text-accent">
                <h2 className="text-3xl md:text-4xl font-bold">Stop Guessing, Start Growing.</h2>
                <p>{webinarDetails.description}</p>
                <h3>In this 30-minute session, you will learn:</h3>
                <ul>
                  <li><Target className="inline-block mr-2 text-highlight" /> How to define clear, achievable marketing goals that align with your business objectives.</li>
                  <li><Map className="inline-block mr-2 text-highlight" /> The simple framework for building a marketing plan you can actually stick to.</li>
                  <li><Target className="inline-block mr-2 text-highlight" /> How to make sure your website, social media, and ads are all working together to drive results.</li>
                </ul>
                <p>This isn't about complex theories. It's about giving you a practical GPS for your marketing so you always know where you're going and how to get there. Register now to save your spot!</p>
              </div>
              
              <div className="text-center mt-12">
                <Button size="lg" asChild className="transform hover:scale-105 transition-transform">
                  <a href={webinarDetails.registrationLink} target="_blank" rel="noopener noreferrer">Register Now for Free</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LpWebinar1;
