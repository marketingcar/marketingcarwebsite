import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Header = () => {
  const consultationLink = "https://meetings.hubspot.com/your-marketing-car/ymc-consultation";

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-4 px-4 sm:px-8 shadow-lg bg-background/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/mainlogo.png" alt="Marketing Car Main Logo" className="h-10 md:h-12" />
        </div>
        <Button 
          variant="outline" 
          className="hidden md:inline-flex border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
          asChild
        >
          <a href={consultationLink} target="_blank" rel="noopener noreferrer">
            Get a Quote Now
          </a>
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;