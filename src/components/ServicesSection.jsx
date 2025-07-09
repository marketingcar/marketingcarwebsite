import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, Search, Users, Star, Fuel, BarChart3, Settings } from 'lucide-react';

const services = [
  {
    title: 'Websites: Your Front Left Wheel',
    description: 'Crafting stunning, high-performance websites that drive engagement and conversions. Your digital storefront, perfectly engineered.',
    icon: <Globe className="h-12 w-12 text-primary" aria-hidden="true" />,
    wheel: 'Front Left Wheel',
    altText: 'Globe icon representing website services'
  },
  {
    title: 'SEO: Your Front Right Wheel',
    description: 'Optimizing your online presence to steer you to the top of search results, ensuring your customers can find you easily.',
    icon: <Search className="h-12 w-12 text-primary" aria-hidden="true" />,
    wheel: 'Front Right Wheel',
    altText: 'Search icon representing SEO services'
  },
  {
    title: 'Social Media: Your Back Left Wheel',
    description: 'Building and engaging your community across social platforms, keeping your brand in the fast lane of customer interaction.',
    icon: <Users className="h-12 w-12 text-primary" aria-hidden="true" />,
    wheel: 'Back Left Wheel',
    altText: 'Users icon representing social media marketing services'
  },
  {
    title: 'Online Reviews: Your Back Right Wheel',
    description: 'Managing and boosting your online reputation, ensuring positive feedback keeps your journey smooth and trustworthy.',
    icon: <Star className="h-12 w-12 text-primary" aria-hidden="true" />,
    wheel: 'Back Right Wheel',
    altText: 'Star icon representing online review management services'
  },
  {
    title: 'PPC Ads: Your Gas Tank',
    description: 'Fueling your growth with targeted pay-per-click campaigns that deliver measurable results and accelerate your reach.',
    icon: <Fuel className="h-12 w-12 text-primary" aria-hidden="true" />,
    wheel: 'Gas Tank',
    altText: 'Fuel icon representing PPC advertising services'
  },
  {
    title: 'Metrics: Your Dashboard',
    description: 'Providing clear, actionable insights into your marketing performance. We show you the data that matters to navigate your success.',
    icon: <BarChart3 className="h-12 w-12 text-primary" aria-hidden="true" />,
    wheel: 'Dashboard',
    altText: 'Bar chart icon representing marketing metrics and analytics'
  },
];

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

const ServicesSection = () => {
  return (
    <motion.section
      id="services"
      className="py-20 px-4 sm:px-8 bg-slate-800/30"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Settings className="h-16 w-16 text-accent mx-auto mb-4" aria-label="Settings icon" />
          <h3 className="text-4xl sm:text-5xl font-bold mb-4">Our Marketing Components</h3>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Each component of our strategy is a vital part of your marketing vehicle, meticulously tuned for peak performance.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants} whileHover={{ y: -10, scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="h-full flex flex-col bg-slate-900/70 backdrop-blur-sm border-slate-700 hover:border-primary transition-colors duration-300">
                <CardHeader className="items-center text-center">
                  {React.cloneElement(service.icon, { "aria-label": service.altText, className: "h-12 w-12 text-white" })}
                  <CardTitle className="mt-4 text-2xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-sm text-highlight font-semibold">{service.wheel}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-white/80 text-center">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServicesSection;