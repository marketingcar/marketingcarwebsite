
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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

const CallToActionSection = () => {
  const consultationLink = "https://marketingcar.com/book-now";

  return (
    <motion.section
      id="contact"
      className="py-20 px-4 sm:px-8 bg-gradient-to-r from-primary to-accent text-primary-foreground"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto text-center">
        <motion.h3 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mb-6">Ready to Hit the Road?</motion.h3>
        <motion.p variants={itemVariants} className="text-xl mb-10 max-w-2xl mx-auto">
          Let's discuss how we can customize your marketing vehicle for an unparalleled journey to success.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-lg px-10 py-6 shadow-xl transform hover:scale-105 transition-transform duration-300 bg-white text-primary hover:bg-gray-100"
            asChild
          >
            <a href={consultationLink} target="_blank" rel="noopener noreferrer">
              Schedule Your Free Consultation
            </a>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CallToActionSection;
