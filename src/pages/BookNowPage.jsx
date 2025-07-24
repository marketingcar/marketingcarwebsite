
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { CheckCircle } from 'lucide-react';
import { useQueryParams } from '@/contexts/QueryParamContext';

const HubSpotEmbed = () => {
  const { queryParams } = useQueryParams();
  const hubspotUrl = `https://meetings.hubspot.com/your-marketing-car/ymc-consultation?embed=true${queryParams.replace('?', '&')}`;

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const hsScript = document.querySelector('script[src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"]');
      if (hsScript) {
        document.body.removeChild(hsScript);
      }
    };
  }, []);

  return (
    <div className="meetings-iframe-container" data-src={hubspotUrl}></div>
  );
};

const BookNowPage = () => {
  const features = [
    "A quick review of your current online presence",
    "Honest insights into what’s working — and what’s not",
    "Clear ideas to improve your visibility and attract more leads",
    "A no-pressure, real conversation with a marketing pro"
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>Book a Free Consultation | Marketing Car</title>
        <meta name="description" content="Schedule a free 30-minute marketing consultation with Marketing Car to review your online presence and get actionable ideas to attract more leads for your business." />
      </Helmet>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-invert max-w-none lg:prose-xl">
            <h1 className="bg-gradient-to-r from-primary via-highlight to-secondary bg-clip-text text-transparent pb-4">
              Let’s Grow Your Business — Together
            </h1>
            <p className="text-lg text-muted-foreground">
              This free 30-minute consultation is all about helping you connect with more of the right clients or customers.
            </p>
            <h3 className="mt-8">What You Can Expect:</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-highlight mr-3 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm italic text-muted-foreground">
              Need ads in Spanish? We do that too.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl shadow-primary/20 min-h-[650px]">
            <HubSpotEmbed />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BookNowPage;
