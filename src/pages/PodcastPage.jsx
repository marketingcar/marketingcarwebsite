import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mic, CheckCircle2, Youtube, Music, Lightbulb } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import SEOHelmet from '@/components/SEOHelmet';
import FormspreeForm from '@/components/FormspreeForm';

const PodcastPage = () => {
  const pageTitle = "Under The Hood Podcast | Marketing Car";
  const pageDescription = "Straightforward conversations with small business owners about the challenges that shape their businesses.";

  const podcastSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "Under The Hood",
    "description": "Straightforward conversations with small business owners about the challenges that shape their businesses.",
    "url": "https://marketingcar.com/podcast",
    "author": {
      "@type": "Organization",
      "name": "Marketing Car"
    }
  };

  const whatYouWillHear = [
    "The actual challenges small business owners run into",
    "What those challenges cost them",
    "What they tried and why it didn't work",
    "What finally solved the problem",
    "What they wish they knew sooner",
    "Practical advice listeners can use immediately"
  ];

  const guestCriteria = [
    "You've operated your business for at least one year",
    "You're comfortable speaking openly about one major challenge",
    "You're willing to share what worked and what didn't",
    "You want to help other owners learn from your experience"
  ];

  const guestFormFields = [
    {
      name: 'name',
      label: 'Your Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@company.com',
      required: true
    },
    {
      name: 'business',
      label: 'Business Name',
      type: 'text',
      placeholder: 'Your Business Name',
      required: true
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'text',
      placeholder: 'e.g., Retail, Healthcare, Construction',
      required: true
    },
    {
      name: 'years',
      label: 'Years in Business',
      type: 'select',
      options: ['1-2 years', '3-5 years', '6-10 years', '10+ years'],
      required: true
    },
    {
      name: 'challenge',
      label: 'What challenge would you like to discuss?',
      type: 'textarea',
      placeholder: 'Briefly describe the challenge you faced and overcame...',
      rows: 4,
      required: true
    },
    {
      name: 'website',
      label: 'Website (Optional)',
      type: 'url',
      placeholder: 'https://yourwebsite.com',
      required: false
    }
  ];

  const topicFormFields = [
    {
      name: 'name',
      label: 'Your Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'you@company.com',
      required: true
    },
    {
      name: 'topic',
      label: 'Suggested Topic',
      type: 'text',
      placeholder: 'What topic would you like us to cover?',
      required: true
    },
    {
      name: 'details',
      label: 'Why this topic?',
      type: 'textarea',
      placeholder: 'Tell us why this topic would be valuable for small business owners...',
      rows: 4,
      required: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <PageTransition>
      {/* SEO */}
      <SEOHelmet
        title={pageTitle}
        description={pageDescription}
        path="/podcast"
        type="website"
      />
      <SchemaMarkup schema={podcastSchema} />

      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Mic className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mb-6 text-white">
              Under The Hood
            </h1>
            <p className="text-2xl sm:text-3xl text-muted-foreground mb-4">
              A Marketing Car Podcast
            </p>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Straightforward conversations with small business owners about the challenges that shape their businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About the Show Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-center text-white"
            >
              About the Show
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-foreground">
              <p>
                Every business owner runs into challenges that don't show up in highlight reels. Under The Hood brings those real moments to light.
              </p>
              <p>
                Each episode is a fast-paced, twenty-minute conversation focused on one challenge an owner faced and the practical steps they took to overcome it. No theory. No jargon. Just honest stories and useful insights from people building their businesses day by day.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Hear Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold font-heading mb-12 text-center text-white"
            >
              What You'll Hear
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whatYouWillHear.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-4 bg-background/50 p-6 rounded-lg border border-border/20"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Be a Guest Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-center text-white"
            >
              Be a Guest
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-white">
                    Share Your Story
                  </CardTitle>
                  <CardDescription className="text-lg">
                    We feature small business owners across every industry.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">You should apply if:</h3>
                    <div className="space-y-3">
                      {guestCriteria.map((criterion, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <p className="text-muted-foreground">{criterion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border/20">
                    <FormspreeForm
                      formId="xeonoyrv"
                      fields={guestFormFields}
                      submitButtonText="Apply to Be a Guest"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* For Listeners Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-white"
            >
              For Listeners
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Under The Hood is built for owners who want real, practical guidance without filler. Each episode includes clear lessons, honest conversations, and examples you can put into practice right away.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="default" className="text-lg" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-5 w-5" />
                  YouTube
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                  <Music className="mr-2 h-5 w-5" />
                  Spotify
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">
                  <Music className="mr-2 h-5 w-5" />
                  Apple Podcasts
                </a>
              </Button>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mt-6"
            >
              Listen on YouTube, Spotify, or Apple Podcasts.<br />
              New episodes every week.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Suggest a Topic Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-center text-white"
            >
              Suggest a Topic
            </motion.h2>
            <motion.div variants={itemVariants}>
              <Card className="bg-secondary/10 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Lightbulb className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-heading text-white text-center">
                    Have an idea for a topic?
                  </CardTitle>
                  <CardDescription className="text-lg text-center">
                    We're always looking for relevant challenges and topics that matter to small business owners. Let us know what you'd like to hear about.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormspreeForm
                    formId="xeonoyrv"
                    fields={topicFormFields}
                    submitButtonText="Submit Topic Suggestion"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Behind the Mic Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-center text-white"
            >
              Behind the Mic
            </motion.h2>
            <motion.div variants={itemVariants} className="text-lg text-muted-foreground space-y-4">
              <p>
                Under The Hood is hosted by the Marketing Car team: <span className="text-white font-semibold">Kelly Baltzell</span>, <span className="text-white font-semibold">Tom Kiesel</span>, and <span className="text-white font-semibold">Nicole Hall</span>. Together, they bring broad experience across strategy, operations, SEO, websites, creative, and small business growth. Their day-to-day work helping business owners gives the show a grounded, practical perspective.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default PodcastPage;
