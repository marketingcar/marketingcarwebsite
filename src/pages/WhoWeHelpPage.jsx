import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BrainCircuit, Wrench, HeartPulse, Calculator, ShieldCheck } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const professionals = [
  { icon: <BrainCircuit size={48} className="text-white" />, name: 'Therapists & Counselors', description: 'Focus on your clients while we handle your digital presence.' },
  { icon: <Wrench size={48} className="text-white" />, name: 'Electricians & Plumbers', description: 'We wire up your marketing so you can focus on the job.' },
  { icon: <HeartPulse size={48} className="text-white" />, name: 'Veterinarians', description: 'Care for pets, and we’ll fetch new clients for you.' },
  { icon: <Calculator size={48} className="text-white" />, name: 'Accountants & Financial Pros', description: 'We crunch the marketing numbers so you can focus on the real ones.' },
  { icon: <ShieldCheck size={48} className="text-white" />, name: 'Other Licensed Professionals', description: 'You have the expertise. We have the marketing engine.' },
];

const WhoWeHelpPage = () => {
    const { toast } = useToast();
    const handleUnimplementedClick = () => {
        toast({
            title: "🚧 Feature In Progress",
            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
            variant: "default",
        });
    };
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
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">You're Great at Your Job. We're Great at Ours.</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              You didn't spend years mastering your craft just to get bogged down by algorithms, ad campaigns, and social media content. You want to serve your clients, not wrestle with SEO. That's where we come in.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {professionals.map((prof) => (
              <motion.div key={prof.name} variants={itemVariants}>
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-secondary/20 border-border/30">
                  <CardHeader className="items-center">
                    {prof.icon}
                    <CardTitle className="mt-4 text-2xl font-semibold font-heading text-white">{prof.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{prof.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
             <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-primary/10 border-primary/30 flex flex-col items-center justify-center p-8">
                   <h3 className="text-2xl font-bold font-heading">Ready to Focus on Your Passion?</h3>
                    <p className="mt-2 text-muted-foreground">Let us handle the marketing.</p>
                    <Button onClick={handleUnimplementedClick} className="mt-6" size="lg">Let's Talk</Button>
                </Card>
             </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
};

export default WhoWeHelpPage;