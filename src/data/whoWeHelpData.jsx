
import React from 'react';
import { BrainCircuit, Wrench, HeartPulse, Calculator, ShieldCheck, Languages, Store, Users } from 'lucide-react';

export const professionals = [
  { 
    slug: 'small-business-owners',
    icon: <Users size={48} className="text-white" />, 
    title: 'Small Business Owners', 
    description: 'Your passion is your business. Our passion is marketing it. We help you attract more local customers and stand out in a crowded market.',
    subtitle: 'Your passion is your business. Our passion is marketing it.',
    longDescription: `
      <h3>Your Dedicated Marketing Partner</h3>
      <p>As a small business owner, you wear many hats. Marketing shouldn't be a burden. We act as your dedicated marketing partner, creating strategies that drive local traffic, increase brand awareness, and ultimately, grow your bottom line so you can focus on what you do best: serving your community.</p>
    `,
    howWeHelp: [
      'Local SEO & Google Business Profile Optimization',
      'Hyper-targeted Social Media Advertising',
      'Community Engagement Campaigns',
      'Affordable, High-Performance Website Design',
      'Reputation Management & Review Generation',
    ],
    meta: {
      title: "Marketing for Small Business Owners | Marketing Car",
      description: "We help small business owners attract more local customers and stand out in a crowded market with tailored marketing solutions.",
      ogTitle: "Marketing Solutions for Small Business Owners",
      ogDescription: "Your passion is your business. Our passion is marketing it. Let us help you grow with effective, affordable marketing strategies.",
    }
  },
  { 
    slug: 'therapists-counselors',
    icon: <BrainCircuit size={48} className="text-white" />, 
    title: 'Therapists & Counselors', 
    description: 'Focus on your clients while we handle your digital presence. We create sensitive and effective marketing to connect you with those who need your help.',
    subtitle: 'Ethical, effective marketing for mental health professionals.',
    longDescription: `
      <h3>Marketing with Empathy and Ethics</h3>
      <p>Your work is incredibly important. Our marketing approach for therapists is built on a foundation of ethics, empathy, and confidentiality. We help you reach potential clients who are actively seeking support, building trust and authority through professional, discreet, and effective digital strategies so you can focus on providing care.</p>
    `,
    howWeHelp: [
      'HIPAA-compliant Marketing Strategies',
      'Psychology Today & Directory Optimization',
      'Content Creation for Building Trust',
      'Targeted ads for specific specializations',
      'Professional Website Design with Secure Contact Forms',
    ],
    meta: {
      title: "Marketing for Therapists & Counselors | Marketing Car",
      description: "Grow your private practice with our ethical and effective marketing strategies for therapists, counselors, and mental health professionals.",
      ogTitle: "Attract More Ideal Clients to Your Therapy Practice",
      ogDescription: "Focus on your clients, we'll handle the marketing. We help therapists connect with those who need their help through sensitive, professional marketing.",
    }
  },
  { 
    slug: 'trades-contractors',
    icon: <Wrench size={48} className="text-white" />, 
    title: 'Trades & Contractors', 
    description: 'We wire up your marketing so you can focus on the job. We ensure your services are found by the right customers at the right time.',
    subtitle: 'Get found by local customers when they need you most.',
    longDescription: `
      <h3>Turning Searches into Service Calls</h3>
      <p>When a pipe bursts or the power goes out, customers need to find you—fast. We specialize in "need-based" marketing for the trades, ensuring your business appears at the top of search results when local customers need you most. We build a reliable system that turns emergency searches into booked jobs, so you can focus on your craft.</p>
    `,
    howWeHelp: [
      'Top-Ranking "Near Me" SEO Strategies',
      '24/7 Google Ads Management for Emergency Calls',
      'Service Area-Specific Landing Pages',
      'Building Trust with Online Reviews & Testimonials',
      'Simple, Mobile-First Website for Easy Contact',
    ],
    meta: {
      title: "Marketing for Trades & Contractors | Marketing Car",
      description: "Get more leads for your trade business. We specialize in local SEO and ads for electricians, plumbers, HVAC, and other contractors.",
      ogTitle: "Book More Jobs with Marketing for the Trades",
      ogDescription: "We help contractors get found by local customers who need their services now. Let's get your phone ringing.",
    }
  },
  { 
    slug: 'veterinarians',
    icon: <HeartPulse size={48} className="text-white" />, 
    title: 'Veterinarians', 
    description: 'Care for pets, and we’ll fetch new clients for you. We help clinics connect with pet owners looking for compassionate, expert care.',
    subtitle: 'Connecting your clinic with compassionate pet owners.',
    longDescription: `
      <h3>Marketing for a Compassionate Practice</h3>
      <p>Your veterinary clinic is a place of healing and compassion. Our marketing reflects that. We help you connect with the pet-loving community in your area, highlighting your unique services, compassionate staff, and state-of-the-art facilities to attract new clients and build lasting relationships with pet owners.</p>
    `,
    howWeHelp: [
      'Community-building Social Media Management',
      'Educational Content for Pet Owners',
      'Appointment-driving Digital Ad Campaigns',
      'Online Reputation Management',
      'Website Design Featuring Staff Bios and Services',
    ],
    meta: {
      title: "Veterinary Marketing Services | Marketing Car",
      description: "Attract more clients to your veterinary clinic with our specialized marketing services. We help you connect with local pet owners.",
      ogTitle: "Grow Your Veterinary Practice with Expert Marketing",
      ogDescription: "You care for pets, we'll fetch the clients. Our marketing services for veterinarians help you build a thriving practice.",
    }
  },
  { 
    slug: 'financial-professionals',
    icon: <Calculator size={48} className="text-white" />, 
    title: 'Financial Professionals', 
    description: 'We crunch the marketing numbers so you can focus on the real ones. We elevate your professional standing and bring in high-quality clients.',
    subtitle: 'Building trust and authority for financial experts.',
    longDescription: `
      <h3>Marketing Built on Trust</h3>
      <p>Trust is the currency of the financial world. We build marketing strategies that establish your authority and credibility. By targeting specific industries or client types, we help you attract high-value clients looking for your specific expertise, from tax preparation to financial planning and wealth management.</p>
    `,
    howWeHelp: [
      'LinkedIn Marketing & Professional Networking',
      'Authoritative Content (Articles, Guides, Webinars)',
      'Targeted Advertising for B2B or High-Net-Worth Individuals',
      'Email Marketing for Nurturing Leads',
      'Building a Professional and Trustworthy Online Presence',
    ],
    meta: {
      title: "Marketing for Accountants & Financial Professionals | Marketing Car",
      description: "Attract high-value clients with our marketing services for accountants, financial advisors, and other financial professionals.",
      ogTitle: "Marketing That Builds Trust for Financial Experts",
      ogDescription: "We help financial professionals elevate their standing and attract high-quality clients through sophisticated, authority-building marketing.",
    }
  },
  { 
    slug: 'bilingual-businesses',
    icon: <Languages size={48} className="text-white" />, 
    title: 'Bilingual Businesses', 
    description: 'Conectamos con tu comunidad, en su idioma. We develop culturally relevant marketing to reach your Spanish-speaking audience effectively.',
    subtitle: 'Connecting with your community, in their language.',
    longDescription: `
      <h3>Marketing That Speaks Volumes</h3>
      <p>Marketing is more than just language—it's about cultural connection. We create authentic, bilingual marketing campaigns that resonate deeply with the Hispanic community. From language to imagery to cultural nuances, we ensure your message is not just understood, but felt, building strong relationships with your Spanish-speaking audience.</p>
    `,
    howWeHelp: [
      'Bilingual SEO and SEM Campaigns',
      'Culturally-Aware Social Media Content',
      'Spanish-Language Ad Creatives and Landing Pages',
      'Community Engagement with Local Hispanic Organizations',
      'WhatsApp and SMS Marketing Strategies',
    ],
    meta: {
      title: "Bilingual & Spanish Marketing Services | Marketing Car",
      description: "Reach the Spanish-speaking community with our culturally relevant bilingual marketing services. Conectamos con tu comunidad.",
      ogTitle: "Effective Bilingual Marketing to Reach Your Audience",
      ogDescription: "We create authentic marketing campaigns that connect with your Spanish-speaking customers on a cultural level. Hablemos.",
    }
  },
  { 
    slug: 'farmers-markets',
    icon: <Store size={48} className="text-white" />, 
    title: 'Farmers Markets', 
    description: 'From local roots to loyal customers, we help you grow. We attract more visitors to your market, boosting sales for all your vendors.',
    subtitle: 'Cultivating community and growing your market.',
    longDescription: `
      <h3>Growing Your Market, Rain or Shine</h3>
      <p>A farmers market is a vibrant community hub. Our marketing celebrates that. We create buzz and excitement, highlighting your unique vendors, seasonal produce, and special events to draw in crowds of enthusiastic shoppers, turning casual visitors into loyal weekly customers and boosting sales for everyone involved.</p>
    `,
    howWeHelp: [
      'Event Promotion on Social Media and Local Calendars',
      'Vendor Spotlights to Showcase Your Community',
      'Email Newsletters with Weekly Highlights',
      'Collaborations with Local Food Bloggers and Influencers',
      'Geotargeted Ads to Attract Nearby Shoppers',
    ],
    meta: {
      title: "Marketing for Farmers Markets | Marketing Car",
      description: "Attract more visitors and boost vendor sales with our marketing services for farmers markets. We help you cultivate a thriving community.",
      ogTitle: "Grow Your Farmers Market with Targeted Marketing",
      ogDescription: "From local roots to loyal customers, we help you attract more visitors to your market and support your community of vendors.",
    }
  },
  { 
    slug: 'licensed-professionals',
    icon: <ShieldCheck size={48} className="text-white" />, 
    title: 'Licensed Professionals', 
    description: 'You have the expertise. We have the marketing engine. We tailor solutions that elevate your professional standing and bring in high-quality clients.',
    subtitle: 'Sophisticated marketing for specialized experts.',
    longDescription: `
      <h3>Showcasing Your Expertise</h3>
      <p>Whether you're an architect, engineer, consultant, or another licensed expert, your reputation is everything. We develop sophisticated marketing strategies that showcase your expertise, build professional credibility, and attract the high-caliber clients and projects you deserve. We help translate your professional excellence into marketing success.</p>
    `,
    howWeHelp: [
      'Case Study and Portfolio Development',
      'Building Authority through Thought Leadership Content',
      'Targeted B2B Lead Generation',
      'Professional Networking on Platforms like LinkedIn',
      'PR and Media Outreach to Industry Publications',
    ],
    meta: {
      title: "Marketing for Licensed Professionals | Marketing Car",
      description: "We provide sophisticated marketing solutions for architects, engineers, consultants, and other licensed professionals to attract high-caliber clients.",
      ogTitle: "Expert Marketing for Licensed Professionals",
      ogDescription: "You're an expert in your field. We're experts in marketing it. Let us help you build your reputation and attract the clients you deserve.",
    }
  },
];
