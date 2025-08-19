import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Calendar, Clock, Video } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

const webinars = [
  {
    part: 1,
    category: 'The GPS – Marketing Strategy',
    title: 'Small Business Roadmap: Building a Marketing Strategy That Gets Results',
    focus: 'How to create a realistic, results-focused plan for your small business, set achievable goals, and align every marketing component so it works toward your growth.',
    date: 'September 16, 2025',
    time: '12:00PM-12:30PM EST',
    link: 'https://zoom.us/webinar/register/4417556050965/WN_oe6iPjC1QRKdj5Y0DNyq7w',
    status: 'Upcoming'
  },
  {
    part: 2,
    category: 'The Headlights – Local/Near Me Marketing',
    title: 'Owning Your Backyard: Local Marketing Strategies for Small Business Growth',
    focus: 'How small businesses can win in local searches, capture “near me” customers, and become the go-to choice in their community.',
    date: 'October 14, 2025',
    time: '12:00PM-12:30PM EST',
    link: 'https://zoom.us/webinar/register/3017556086677/WN_zFqlNoywSyWvtaFZ6S17sA',
    status: 'Upcoming'
  },
  {
    part: 3,
    category: 'The Paint Job – Graphic Design',
    title: 'First Impressions that Last: Small Business Visuals That Make Your Customers Remember You',
    focus: 'How to create brand-consistent, attention-grabbing designs that make your small business instantly recognizable in any channel.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 4,
    category: 'The Hitch – B2B Marketing',
    title: 'Building Business Partnerships: B2B Marketing for Small Business Owners',
    focus: 'Strategies for small business owners to connect with other businesses, generate leads, and close high-value deals.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 5,
    category: 'The Body – Brand Strategy and Design',
    title: 'Small Business Identity: Building a Brand That Sticks',
    focus: 'How to define your brand voice, visuals, and values so customers remember you and trust you over the competition.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 6,
    category: 'The Mechanic – Marketing Consultation',
    title: 'Tuning Up Your Marketing Engine: Small Business Consultations That Work',
    focus: 'How professional consultation can uncover gaps, prioritize fixes, and help small businesses get back on track faster.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 7,
    category: 'The Engine – SEO Strategy',
    title: 'Search Engine Power: SEO for Small Business Visibility',
    focus: 'Step-by-step SEO tactics to help small businesses rank higher– achieving long-term visibility and attracting the right customers without overspending.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 8,
    category: 'The Gas – Content Marketing',
    title: 'Fueling Small Business Growth with Content That Converts',
    focus: 'How to create blogs, videos, and resources that educate customers, build trust, and keep your small business top of mind and drive conversions over time.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 9,
    category: 'The Accelerator – Paid Advertising',
    title: 'Step on the Gas: Paid Ads That Deliver for Small Businesses',
    focus: 'How small businesses can run targeted, affordable PPC and social ads that produce measurable results.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 10,
    category: 'The Horn – Social Media Management',
    title: 'Getting Heard: Social Media That Amplifies Your Small Business',
    focus: 'How to grow an engaged following, interact with customers, and use social media to drive repeat business.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 11,
    category: 'The Steering Wheel – Email Marketing',
    title: 'Keeping Your Small Business on Course with Email Marketing',
    focus: 'Building an email list, segmenting audiences, and sending campaigns that guide customers from awareness to loyalty.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  },
  {
    part: 12,
    category: 'The Wheels – Web Design and Development',
    title: 'Rolling Ahead: Small Business Websites That Win Customers',
    focus: 'How to design and develop a high-performing website that loads fast, looks great, and turns visitors into buyers.',
    date: 'TBD',
    time: '',
    link: null,
    status: 'Coming Soon'
  }
];

const WebinarsPage = () => {
    const pageTitle = "Marketing Webinars for Small Business | Marketing Car";
    const pageDescription = "Join our free webinar series designed to help small businesses master their marketing, from strategy and SEO to social media and design.";

    const eventsSchema = webinars
    .filter(webinar => webinar.link && webinar.time)
    .map(webinar => {
        const timeParts = webinar.time.replace(' EST', '').split('-');
        if (timeParts.length < 2) return null;
        
        const startDate = new Date(`${webinar.date} ${timeParts[0]} GMT-0500`);
        const endDate = new Date(`${webinar.date} ${timeParts[1]} GMT-0500`);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null;

        return {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": webinar.title,
            "startDate": startDate.toISOString(),
            "endDate": endDate.toISOString(),
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
            "location": {
                "@type": "VirtualLocation",
                "url": webinar.link
            },
            "description": webinar.focus,
            "organizer": {
                "@type": "Organization",
                "name": "Marketing Car",
                "url": "https://marketingcar.com"
            }
        };
    }).filter(Boolean);


  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Helmet>
      {eventsSchema.length > 0 && <SchemaMarkup schema={eventsSchema} />}

      <div className="py-24 sm:py-32 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-6 lg:px-8 text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/1738024f15e0e33532ffe6123b2a44fb.png"
                alt="Marketing Car Webinar Series Banner"
                className="rounded-lg shadow-xl mx-auto"
              />
            </motion.div>
        </div>
      </div>

      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar, index) => (
              <motion.div
                key={webinar.part}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full flex"
              >
                <Card className="flex flex-col w-full bg-secondary/10 border-border/20 hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <p className="text-sm font-semibold" style={{ color: '#25EBD1' }}>{webinar.category}</p>
                    <CardTitle className="text-2xl font-bold font-heading text-white">{webinar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{webinar.focus}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start space-y-4 pt-4 border-t border-border/20">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{webinar.date}</span>
                    </div>
                    {webinar.time && (
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{webinar.time}</span>
                        </div>
                    )}
                    {webinar.link ? (
                      <Button asChild className="w-full mt-auto">
                        <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                          <Video className="mr-2 h-4 w-4" />
                          Register Now
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" disabled className="w-full mt-auto">
                        Registration Coming Soon!
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default WebinarsPage;