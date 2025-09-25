import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyHeroImage from '@/components/LazyHeroImage';

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

const titles = [
  { line1: "Steering Small Businesses", line2: "To Success" },
  { line1: "Shift Your Marketing", line2: "Into High Gear" },
  { line1: "Drive Your", line2: "Small Business Forward" },
  { line1: "From Roadblocks", line2: "To Results" },
  { line1: "Marketing That Drives", line2: "Your Small Business" },
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Disable animations if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroImageUrl = "/elements/hero.png";
  
  return (
    <motion.section 
      id="home" 
      className="flex-grow flex items-center justify-center py-20 px-4 sm:px-8 text-center relative overflow-hidden min-h-[calc(100vh-100px)]"
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <div className="absolute inset-0">
        <LazyHeroImage
          src={heroImageUrl}
          alt="Abstract hero background showing a stylized roadmap or navigation interface with glowing lines and waypoints, symbolizing a journey to success."
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
          style={{aspectRatio: '16/9'}}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
      <div className="h-[8rem] sm:h-[10rem] md:h-[12rem] flex items-center justify-center mb-6" style={{minHeight: '200px'}}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={titleIndex}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: "easeInOut" }}
              className="text-5xl sm:text-6xl md:text-7xl font-black font-heading mb-6 leading-tight text-foreground will-change-transform"
            >
              <span className="block font-black">{titles[titleIndex].line1}</span>
              {titles[titleIndex].line2 && (
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-highlight to-secondary font-black">
                  {titles[titleIndex].line2}
                </span>
              )}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
          We're your expert mechanics for marketing. Each part of our "car" propels your business forward, turning complexity into a smooth ride to your goals.
        </motion.p>
        <motion.div variants={itemVariants} className="space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 shadow-xl will-change-transform hover:scale-105 transition-transform duration-300 text-primary-foreground font-semibold" asChild>
            <Link to="/book-now">
              Ignite Your Growth <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
