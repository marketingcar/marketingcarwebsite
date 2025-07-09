import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, BarChart, Users, TrendingUp } from 'lucide-react';

const driveItems = [
  {
    icon: <Target size={40} className="text-white" />,
    title: "Precision Targeting",
    description: "We pinpoint your ideal audience to maximize engagement and conversions.",
  },
  {
    icon: <BarChart size={40} className="text-white" />,
    title: "Data-Driven Strategy",
    description: "Our decisions are backed by analytics to ensure optimal performance.",
  },
  {
    icon: <Users size={40} className="text-white" />,
    title: "Customer-Centric Approach",
    description: "We build campaigns that resonate deeply with your customers' needs.",
  },
  {
    icon: <TrendingUp size={40} className="text-white" />,
    title: "Continuous Growth",
    description: "We constantly adapt and refine strategies to keep you ahead of the curve.",
  },
];

const OurDriveSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-highlight">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white tracking-tight">Our Marketing Components</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            The core components that power your journey to success. Each element is finely tuned to deliver results.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {driveItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                <CardHeader className="items-center">
                  <div className="p-4 bg-white/20 rounded-full mb-4">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurDriveSection;