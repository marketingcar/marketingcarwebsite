import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const HeroSection = () => {
  const consultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";

  return (
    <motion.section
      id="home"
      className="flex-grow flex items-center justify-center py-20 px-4 sm:px-8 text-center relative overflow-hidden min-h-[calc(100vh-100px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 opacity-20">
        <img  alt="Abstract hero background showing a stylized roadmap or navigation interface with glowing lines and waypoints, symbolizing a journey to success." class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1484912279071-8a0effa21316" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="mb-8">
           <img-replace src="/marketing-car-icon.png" alt="Marketing Car Icon Pulsing" class="h-24 w-24 mx-auto animate-pulse" />
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-heading mb-6 leading-tight text-foreground"
        >
          <span className="block">Accelerate Your Marketing</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-highlight to-secondary">
            To New Heights
          </span>
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
          We're your expert mechanics for marketing. Each part of our "car" propels your business forward, turning complexity into a smooth ride to your goals.
        </motion.p>
        <motion.div variants={itemVariants} className="space-x-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 shadow-xl transform hover:scale-105 transition-transform duration-300 text-primary-foreground font-semibold"
            asChild
          >
            <a href={consultationLink} target="_blank" rel="noopener noreferrer">
              Ignite Your Growth <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;