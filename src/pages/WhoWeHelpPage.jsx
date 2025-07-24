
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BrainCircuit, Wrench, HeartPulse, Calculator, ShieldCheck, Languages, Store, Users, Sparkles } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { useQueryParams } from '@/contexts/QueryParamContext';

const professionals = [
  { icon: <Users size={48} className="text-white" />, name: 'Small Business Owners', description: 'Your passion is your business. Our passion is marketing it. We help you attract more local customers and stand out in a crowded market, ensuring your hard work pays off.' },
  { icon: <BrainCircuit size={48} className="text-white" />, name: 'Therapists & Counselors', description: 'Focus on your clients while we handle your digital presence. We understand the unique needs of your practice, creating sensitive and effective marketing strategies to connect you with those who need your help most.' },
  { icon: <Wrench size={48} className="text-white" />, name: 'Electricians & Plumbers', description: 'We wire up your marketing so you can focus on the job. From emergency calls to major installations, we ensure your services are found by the right customers at the right time, driving more leads and bookings.' },
  { icon: <HeartPulse size={48} className="text-white" />, name: 'Global Veterinarians', description: 'Care for pets, and we’ll fetch new clients for you. We help clinics of all sizes, from local practices to specialized hospitals, connect with pet owners who are looking for compassionate and expert care.' },
  { icon: <Calculator size={48} className="text-white" />, name: 'Accountants & Financial Pros', description: 'We crunch the marketing numbers so you can focus on the real ones. Let us handle your online visibility, lead generation, and brand reputation, freeing you to manage your clients\' financial success.' },
  { icon: <Languages size={48} className="text-white" />, name: 'Spanish-Speaking Businesses', description: 'Conectamos con tu comunidad, en su idioma. Desarrollamos estrategias de marketing culturalmente relevantes y bilingües para ayudarte a alcanzar a tu audiencia de habla hispana de manera efectiva y auténtica.' },
  { icon: <Store size={48} className="text-white" />, name: 'Farmers Markets', description: 'From local roots to loyal customers, we help you grow. We craft marketing plans that highlight your unique offerings and attract more visitors to your market, boosting sales for all your vendors.' },
  { icon: <ShieldCheck size={48} className="text-white" />, name: 'Other Licensed Professionals', description: 'You have the expertise. We have the marketing engine. Whether you\'re an architect, engineer, or consultant, we tailor marketing solutions that elevate your professional standing and bring in high-quality clients.' },
];

const WhoWeHelpPage = () => {
  const { queryParams } = useQueryParams();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Who We Help | Marketing Car</title>
        <meta name="description" content="We help passionate, licensed professionals—therapists, electricians, plumbers, veterinarians, and more—solve their marketing challenges so they can focus on their craft." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-primary font-heading tracking-tight">We Help Humans Solve Marketing Challenges</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Behind every professional license is a person with a passion. You're an expert in your field, not a marketing guru—and that's exactly how it should be. We're here to be your marketing engine, so you can focus on what you love.
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="py-24 bg-background"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {professionals.map((prof) => (
              <motion.div key={prof.name} variants={itemVariants}>
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-secondary/20 border-border/30 flex flex-col">
                  <CardHeader className="items-center flex-grow">
                    {prof.icon}
                    <CardTitle className="mt-4 text-2xl font-semibold font-heading text-white">{prof.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{prof.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-primary/20 border-primary/40 flex flex-col justify-center items-center p-6">
                <CardHeader className="items-center">
                  <Sparkles size={48} className="text-primary" />
                  <CardTitle className="mt-4 text-2xl font-semibold font-heading">Ready to Focus on Your Passion?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <p className="text-muted-foreground">Let us handle the marketing.</p>
                  <Button asChild className="mt-6" size="lg">
                    <NavLink to={{ pathname: "/book-now", search: queryParams }}>Let's Talk</NavLink>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default WhoWeHelpPage;
