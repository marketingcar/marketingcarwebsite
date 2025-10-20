
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, BarChart, Users, TrendingUp } from 'lucide-react';

const OurDriveSection = () => {
  const { t } = useTranslation();

  const driveItems = [
    {
      icon: <Target size={40} className="text-white" />,
      title: t('ourDrive.items.smallBusiness.title'),
      description: t('ourDrive.items.smallBusiness.description'),
    },
    {
      icon: <BarChart size={40} className="text-white" />,
      title: t('ourDrive.items.dataStrategy.title'),
      description: t('ourDrive.items.dataStrategy.description'),
    },
    {
      icon: <Users size={40} className="text-white" />,
      title: t('ourDrive.items.customSolutions.title'),
      description: t('ourDrive.items.customSolutions.description'),
    },
    {
      icon: <TrendingUp size={40} className="text-white" />,
      title: t('ourDrive.items.continuousGrowth.title'),
      description: t('ourDrive.items.continuousGrowth.description'),
    },
  ];
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
          <h2 className="text-4xl font-bold text-white tracking-tight">{t('ourDrive.heading')}</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            {t('ourDrive.description')}
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
