import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const OurDriveSection = () => {
  return (
    <motion.section
      id="our-drive"
      className="py-20 px-4 sm:px-8 bg-background"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto text-center">
        <motion.div variants={itemVariants}>
          <MapPin className="h-16 w-16 text-highlight mx-auto mb-4" aria-label="Map pin icon indicating a location or destination" />
          <h3 className="text-4xl sm:text-5xl font-heading mb-6 text-foreground">Navigating Your Marketing Journey</h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 font-body">
            We take the complexity of marketing, mix it with your business goals, and make it easy for you to drive to your marketing destination. Think of us as your GPS and expert driver, all in one.
          </p>
          <img  
            alt="Stylized illustration of a digital map with a route highlighted, leading towards various business goals or markers." 
            class="rounded-lg shadow-2xl mx-auto max-w-3xl w-full" src="https://images.unsplash.com/photo-1621273974925-b5b6d7a32140" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurDriveSection;