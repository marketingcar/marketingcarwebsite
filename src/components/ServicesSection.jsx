import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, Map, Eye, Brush, Link2, Factory, BrainCircuit, Search, Newspaper, Zap, Annoyed, Mail, Code } from 'lucide-react';
import { services as servicesData } from '@/data/servicesData';

const componentMap = {
  'marketing-strategy': { icon: <Map className="h-12 w-12 text-primary" />, name: 'GPS', subName: 'Marketing Strategy' },
  'local-near-me-marketing': { icon: <Eye className="h-12 w-12 text-primary" />, name: 'Headlights', subName: 'Local/Near Me Marketing' },
  'graphic-design': { icon: <Brush className="h-12 w-12 text-primary" />, name: 'Paint Job', subName: 'Graphic Design' },
  'b2b-marketing': { icon: <Link2 className="h-12 w-12 text-primary" />, name: 'Hitch', subName: 'B2B Marketing' },
  'brand-strategy-design': { icon: <Factory className="h-12 w-12 text-primary" />, name: 'Body', subName: 'Brand Strategy and Design' },
  'marketing-consultation': { icon: <BrainCircuit className="h-12 w-12 text-primary" />, name: 'Mechanic', subName: 'Marketing Consultation' },
  'seo-strategy': { icon: <Search className="h-12 w-12 text-primary" />, name: 'Engine', subName: 'SEO' },
  'content-marketing': { icon: <Newspaper className="h-12 w-12 text-primary" />, name: 'Gas', subName: 'Content Marketing' },
  'paid-advertising': { icon: <Zap className="h-12 w-12 text-primary" />, name: 'Accelerator', subName: 'Paid Advertising' },
  'social-media-management': { icon: <Annoyed className="h-12 w-12 text-primary" />, name: 'Horn', subName: 'Social Media' },
  'email-marketing': { icon: <Mail className="h-12 w-12 text-primary" />, name: 'Steering Wheel', subName: 'Email Marketing' },
  'web-design-development': { icon: <Code className="h-12 w-12 text-primary" />, name: 'Wheels', subName: 'Web Design and Development' },
};

const orderedServices = [
  'marketing-strategy',
  'local-near-me-marketing',
  'graphic-design',
  'b2b-marketing',
  'brand-strategy-design',
  'marketing-consultation',
  'seo-strategy',
  'content-marketing',
  'paid-advertising',
  'social-media-management',
  'email-marketing',
  'web-design-development',
];



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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
  const { t } = useTranslation();

  // Memoize processed services data to prevent recreation on every render
  const services = useMemo(() => {
    return orderedServices.map(slug => {
      const serviceData = servicesData.find(s => s.slug === slug);
      const component = componentMap[slug];
      return {
        ...serviceData,
        ...component,
      };
    });
  }, []); // Empty dependency array - data is static
  return (
    <motion.section
      id="services"
      className="py-20 px-4 sm:px-8 bg-slate-800/30"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <Settings className="h-16 w-16 text-accent mx-auto mb-4" aria-label="Settings icon" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('servicesSection.description')}
          </p>
          <h3 className="text-4xl sm:text-5xl font-bold mb-4 mt-2">{t('servicesSection.heading')}</h3>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div key={service.slug} variants={itemVariants} className="h-full">
              <Link to={`/services/${service.slug}`} className="h-full block">
                <Card className="h-full flex flex-col bg-slate-900/70 backdrop-blur-sm border-slate-700 hover:border-primary transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="items-center text-center">
                    {React.cloneElement(componentMap[service.slug].icon, { "aria-label": service.name, className: "h-12 w-12 text-white" })}
                    <CardTitle className="mt-4 text-2xl text-white">{service.name}</CardTitle>
                    <CardDescription className="text-sm text-highlight font-semibold">{service.subName}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-white/80 text-center">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(ServicesSection);