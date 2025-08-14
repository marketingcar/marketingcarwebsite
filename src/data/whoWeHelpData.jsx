import React from 'react';
import { BrainCircuit, Wrench, HeartPulse, Calculator, ShieldCheck, Languages, Store, Users } from 'lucide-react';

export const professionals = [
  { 
    slug: 'small-business-owners',
    icon: <Users size={48} className="text-white" />, 
    name: 'Small Business Owners', 
    summary: 'Your passion is your business. Our passion is marketing it. We help you attract more local customers and stand out in a crowded market.',
    details: 'As a small business owner, you wear many hats. Marketing shouldn\'t be a burden. We act as your dedicated marketing partner, creating strategies that drive local traffic, increase brand awareness, and ultimately, grow your bottom line so you can focus on serving your community.',
    solutions: [
      'Local SEO & Google Business Profile Optimization',
      'Hyper-targeted Social Media Advertising',
      'Community Engagement Campaigns',
      'Affordable, High-Performance Website Design',
      'Reputation Management & Review Generation',
    ]
  },
  { 
    slug: 'therapists-counselors',
    icon: <BrainCircuit size={48} className="text-white" />, 
    name: 'Therapists & Counselors', 
    summary: 'Focus on your clients while we handle your digital presence. We create sensitive and effective marketing to connect you with those who need your help.',
    details: 'Your work is incredibly important. Our marketing approach for therapists is built on a foundation of ethics, empathy, and confidentiality. We help you reach potential clients who are actively seeking support, building trust and authority through professional, discreet, and effective digital strategies.',
    solutions: [
      'HIPAA-compliant Marketing Strategies',
      'Psychology Today Profile Optimization',
      'Content Creation for Building Trust',
      'Targeted ads for specific specializations (e.g., anxiety, couples)',
      'Professional Website Design with Secure Contact Forms',
    ]
  },
  { 
    slug: 'electricians-plumbers',
    icon: <Wrench size={48} className="text-white" />, 
    name: 'Electricians & Plumbers', 
    summary: 'We wire up your marketing so you can focus on the job. We ensure your services are found by the right customers at the right time.',
    details: 'When a pipe bursts or the power goes out, customers need to find you—fast. We specialize in "need-based" marketing for the trades, ensuring your business appears at the top of search results when local customers need you most. We turn emergency searches into booked jobs.',
    solutions: [
      'Top-Ranking "Near Me" SEO Strategies',
      '24/7 Google Ads Management for Emergency Calls',
      'Service Area-Specific Landing Pages',
      'Building Trust with Online Reviews & Testimonials',
      'Simple, Mobile-First Website for Easy Contact',
    ]
  },
  { 
    slug: 'global-veterinarians',
    icon: <HeartPulse size={48} className="text-white" />, 
    name: 'Global Veterinarians', 
    summary: 'Care for pets, and we’ll fetch new clients for you. We help clinics connect with pet owners looking for compassionate, expert care.',
    details: 'Your veterinary clinic is a place of healing and compassion. Our marketing reflects that. We help you connect with the pet-loving community in your area, highlighting your unique services, compassionate staff, and state-of-the-art facilities to attract new clients and build lasting relationships.',
    solutions: [
      'Community-building Social Media Management',
      'Educational Content for Pet Owners',
      'Appointment-driving Digital Ad Campaigns',
      'Online Reputation Management on Pet-centric Platforms',
      'Website Design Featuring Staff Bios and Services',
    ]
  },
  { 
    slug: 'accountants-financial-pros',
    icon: <Calculator size={48} className="text-white" />, 
    name: 'Accountants & Financial Pros', 
    summary: 'We crunch the marketing numbers so you can focus on the real ones. We elevate your professional standing and bring in high-quality clients.',
    details: 'Trust is the currency of the financial world. We build marketing strategies that establish your authority and credibility. By targeting specific industries or client types, we help you attract high-value clients looking for your specific expertise, from tax preparation to financial planning.',
    solutions: [
      'LinkedIn Marketing & Professional Networking',
      'Authoritative Content (Articles, Guides, Webinars)',
      'Targeted Advertising for B2B or High-Net-Worth Individuals',
      'Email Marketing for Nurturing Leads',
      'Building a Professional and Trustworthy Online Presence',
    ]
  },
  { 
    slug: 'spanish-speaking-businesses',
    icon: <Languages size={48} className="text-white" />, 
    name: 'Spanish-Speaking Businesses', 
    summary: 'Conectamos con tu comunidad, en su idioma. We develop culturally relevant marketing to reach your Spanish-speaking audience effectively.',
    details: 'Marketing is more than just language—it\'s about cultural connection. We create authentic, bilingual marketing campaigns that resonate deeply with the Hispanic community. From language to imagery to cultural nuances, we ensure your message is not just understood, but felt.',
    solutions: [
      'Bilingual SEO and SEM Campaigns',
      'Culturally-Aware Social Media Content',
      'Spanish-Language Ad Creatives and Landing Pages',
      'Community Engagement with Local Hispanic Organizations',
      'WhatsApp and SMS Marketing Strategies',
    ]
  },
  { 
    slug: 'farmers-markets',
    icon: <Store size={48} className="text-white" />, 
    name: 'Farmers Markets', 
    summary: 'From local roots to loyal customers, we help you grow. We attract more visitors to your market, boosting sales for all your vendors.',
    details: 'A farmers market is a vibrant community hub. Our marketing celebrates that. We create buzz and excitement, highlighting your unique vendors, seasonal produce, and special events to draw in crowds of enthusiastic shoppers, turning casual visitors into loyal weekly customers.',
    solutions: [
      'Event Promotion on Social Media and Local Calendars',
      'Vendor Spotlights to Showcase Your Community',
      'Email Newsletters with Weekly Highlights',
      'Collaborations with Local Food Bloggers and Influencers',
      'Geotargeted Ads to Attract Nearby Shoppers',
    ]
  },
  { 
    slug: 'other-licensed-professionals',
    icon: <ShieldCheck size={48} className="text-white" />, 
    name: 'Other Licensed Professionals', 
    summary: 'You have the expertise. We have the marketing engine. We tailor solutions that elevate your professional standing and bring in high-quality clients.',
    details: 'Whether you\'re an architect, engineer, consultant, or another licensed expert, your reputation is everything. We develop sophisticated marketing strategies that showcase your expertise, build professional credibility, and attract the high-caliber clients and projects you deserve.',
    solutions: [
      'Case Study and Portfolio Development',
      'Building Authority through Thought Leadership Content',
      'Targeted B2B Lead Generation',
      'Professional Networking on Platforms like LinkedIn',
      'PR and Media Outreach to Industry Publications',
    ]
  },
];