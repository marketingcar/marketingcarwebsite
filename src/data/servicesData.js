import React from 'react';
import {
  TrendingUp, MapPin, Palette, Handshake, Sparkles, Lightbulb,
  Search, PenTool, Target, Heart, Mail, Monitor
} from 'lucide-react';
export const services = [
  { 
    slug: "marketing-strategy",
    title: "Marketing Strategy", 
    description: "Develop a comprehensive plan to achieve your business goals.",
    subtitle: "A clear roadmap to navigate the competitive landscape and drive measurable growth.",
    longDescription: "<p>We dive deep into your business to craft a bespoke marketing strategy that aligns with your objectives. Our process includes market research, competitive analysis, and identifying your target audience to create a roadmap for success. We focus on measurable results and long-term growth.</p>",
    whatsIncluded: [
      "In-depth market and competitor analysis",
      "Target audience profiling and segmentation",
      "Goal setting and KPI definition",
      "Multi-channel strategy development (digital & offline)",
      "Budget allocation and ROI forecasting",
    ],
    meta: {
      title: "Marketing Strategy Services | Marketing Car",
      description: "Develop a comprehensive marketing plan with Marketing Car to achieve your business goals through expert analysis, planning, and execution.",
      ogTitle: "Custom Marketing Strategy Services | Marketing Car",
      ogDescription: "Let's build a roadmap for your success. Our marketing strategy services include in-depth analysis, goal setting, and multi-channel planning to drive growth."
    },
    icon: <TrendingUp className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "local-near-me-marketing",
    title: "Local/Near Me Marketing", 
    description: "Attract local customers and dominate your geographic market.",
    subtitle: "Be the first choice for customers in your neighborhood.",
    longDescription: "<p>Capture the 'near me' search traffic and drive footfall to your physical locations. We optimize your online presence for local search, manage your local listings, and run geographically targeted campaigns to make you the go-to choice in your area.</p>",
    whatsIncluded: [
      "Google Business Profile optimization",
      "Local SEO and citation building",
      "Geofenced advertising campaigns",
      "Reputation management on local review sites",
      "Local content and event marketing",
    ],
    meta: {
      title: "Local Marketing & Near Me SEO | Marketing Car",
      description: "Dominate your local market with our Local & 'Near Me' Marketing services. We help you attract nearby customers through targeted SEO and advertising.",
      ogTitle: "Attract Local Customers | Near Me Marketing Services",
      ogDescription: "Be the top choice in your area. Our local marketing strategies boost your visibility in 'near me' searches and drive foot traffic to your business."
    },
    icon: <MapPin className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "graphic-design",
    title: "Graphic Design", 
    description: "Create stunning visuals that capture attention and convey your message.",
    subtitle: "Make a lasting impression with designs that tell your story.",
    longDescription: "<p>Our talented designers create visually compelling assets that tell your brand's story. From digital ads to print materials, we ensure every design is not only beautiful but also strategically effective in communicating your message and driving engagement.</p>",
    whatsIncluded: [
      "Logo and brand identity design",
      "Social media graphics and templates",
      "Digital ad creatives",
      "Infographics and data visualization",
      "Brochures, flyers, and print materials",
    ],
    meta: {
      title: "Graphic Design Services | Marketing Car",
      description: "Capture attention with stunning visuals from Marketing Car. Our graphic design services cover everything from brand identity to digital and print materials.",
      ogTitle: "Creative Graphic Design for Your Brand | Marketing Car",
      ogDescription: "From logos to social media graphics, our designers create visuals that are not only beautiful but strategically effective. Tell your brand's story with style."
    },
    icon: <Palette className="h-12 w-12 text-primary" />,
  },
  {
    slug: "b2b-marketing",
    title: "B2B Marketing",
    description: "Drive growth with strategies tailored for business-to-business clients.",
    subtitle: "Connect with key decision-makers and build valuable partnerships.",
    longDescription: "<p>Navigating the B2B landscape requires a specialized approach. We develop targeted marketing strategies that focus on long sales cycles, multiple decision-makers, and building valuable business relationships. Our goal is to generate high-quality leads and establish your company as an industry leader.</p>",
    whatsIncluded: [
      "Account-Based Marketing (ABM) strategy and execution",
      "LinkedIn and professional network advertising",
      "B2B lead generation and nurturing funnels",
      "Content creation for decision-makers (whitepapers, case studies)",
      "CRM and marketing automation integration",
    ],
    meta: {
      title: "B2B Marketing Services | Marketing Car",
      description: "Drive growth with B2B marketing strategies from Marketing Car. We specialize in lead generation, ABM, and connecting you with key business clients.",
      ogTitle: "Expert B2B Marketing Strategies | Marketing Car",
      ogDescription: "Navigate the B2B landscape with confidence. We develop targeted campaigns to generate high-quality leads and build lasting business relationships."
    },
    icon: <Handshake className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "brand-strategy-design",
    title: "Brand Strategy & Design", 
    description: "Build a powerful and memorable brand identity from the ground up.",
    subtitle: "Craft a brand that connects, resonates, and stands out.",
    longDescription: "<p>A strong brand is more than just a logo. We help you define your brand's purpose, values, and voice. Then, we translate that strategy into a cohesive visual identity that resonates with your audience and sets you apart from the competition.</p>",
    whatsIncluded: [
      "Brand discovery and positioning workshops",
      "Voice and tone development",
      "Complete visual identity system (logo, color, typography)",
      "Comprehensive brand guidelines",
      "Brand messaging and storytelling framework",
    ],
    meta: {
      title: "Brand Strategy & Design Services | Marketing Car",
      description: "Build a memorable brand with Marketing Car. Our services cover brand strategy, messaging, and complete visual identity design to make you stand out.",
      ogTitle: "Craft a Powerful Brand Identity | Marketing Car",
      ogDescription: "Go beyond a logo. We help you build a cohesive brand experience, from strategy and voice to a stunning visual identity that connects with your audience."
    },
    icon: <Sparkles className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "marketing-consultation",
    title: "Marketing Consultation", 
    description: "Get expert advice and actionable insights tailored to your unique challenges.",
    subtitle: "Expert guidance to navigate your marketing roadblocks.",
    longDescription: "<p>Need a fresh perspective or expert guidance? Our marketing consultations provide you with direct access to our strategists. We'll help you tackle specific challenges, evaluate your current efforts, and identify opportunities for growth.</p>",
    whatsIncluded: [
      "One-on-one strategy sessions",
      "Marketing audit and performance review",
      "Campaign planning and brainstorming",
      "Technology stack recommendations",
      "Team training and upskilling",
    ],
    meta: {
      title: "Marketing Consultation Services | Marketing Car",
      description: "Get expert marketing advice from Marketing Car. Our consultation services provide actionable insights to overcome your challenges and identify growth opportunities.",
      ogTitle: "Expert Marketing Advice & Consultation | Marketing Car",
      ogDescription: "Stuck on a marketing problem? Book a consultation for a fresh perspective, performance reviews, and strategic guidance to get you back on the road to growth."
    },
    icon: <Lightbulb className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "seo-strategy",
    title: "SEO", 
    description: "Climb search rankings and drive organic traffic.",
    subtitle: "Drive high-quality, organic traffic to your website.",
    longDescription: "<p>We improve your visibility on search engines like Google to attract high-quality organic traffic. Our approach covers all pillars of SEO, including technical optimization, on-page content, and authoritative link building, to secure sustainable rankings.</p>",
    whatsIncluded: [
      "Comprehensive SEO audits",
      "Keyword research and mapping",
      "Technical SEO (site speed, structured data)",
      "On-page content optimization",
      "Link building and digital PR",
    ],
    meta: {
      title: "SEO Services | Marketing Car",
      description: "Climb search rankings and drive organic traffic with our expert SEO services. We cover technical SEO, content optimization, and link building for sustainable growth.",
      ogTitle: "Boost Your Rankings with Expert SEO | Marketing Car",
      ogDescription: "Improve your visibility on Google and attract more qualified traffic. Our comprehensive SEO services are designed for long-term, sustainable results."
    },
    icon: <Search className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "content-marketing",
    title: "Content Marketing", 
    description: "Engage your audience with compelling stories and content.",
    subtitle: "Build authority and connect with your audience through valuable content.",
    longDescription: "<p>Content is king, and we help you wear the crown. We develop and execute content strategies that attract, engage, and convert your target audience. From blog posts to videos, we create content that builds authority and drives action.</p>",
    whatsIncluded: [
      "Content strategy and editorial calendar planning",
      "Blog writing and article creation",
      "Video scripting and production",
      "Ebooks, whitepapers, and lead magnets",
      "Content distribution and promotion",
    ],
    meta: {
      title: "Content Marketing Services | Marketing Car",
      description: "Engage your audience with compelling content from Marketing Car. We create strategic content, from blogs to videos, that builds authority and drives results.",
      ogTitle: "Strategic Content Marketing to Engage Your Audience | Marketing Car",
      ogDescription: "Attract, engage, and convert with content that matters. We develop and execute content strategies that build your brand and your bottom line."
    },
    icon: <PenTool className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "paid-advertising",
    title: "Paid Advertising", 
    description: "Maximize ROI with targeted PPC campaigns.",
    subtitle: "Get immediate visibility and measurable results with targeted ads.",
    longDescription: "<p>Get immediate visibility and drive targeted traffic with our paid advertising services. We manage campaigns across platforms like Google Ads and social media, constantly optimizing for performance to ensure you get the most out of your ad spend.</p>",
    whatsIncluded: [
      "Google Ads (Search, Display, Shopping)",
      "Social Media Ads (Facebook, Instagram, LinkedIn)",
      "A/B testing of ad copy and creatives",
      "Landing page optimization",
      "Performance tracking and ROI analysis",
    ],
    meta: {
      title: "Paid Advertising & PPC Services | Marketing Car",
      description: "Maximize your ROI with targeted paid advertising campaigns from Marketing Car. We manage PPC on Google, Facebook, LinkedIn, and more for immediate results.",
      ogTitle: "Maximize ROI with Paid Advertising | Marketing Car",
      ogDescription: "Drive targeted traffic and get immediate results. Our paid advertising services cover Google Ads and social media, optimized for maximum performance."
    },
    icon: <Target className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "social-media-management",
    title: "Social Media", 
    description: "Build a vibrant community around your brand.",
    subtitle: "Engage your audience and build a loyal following.",
    longDescription: "<p>We manage your social media presence to build brand awareness, foster engagement, and drive business results. We handle everything from content creation and scheduling to community management and performance reporting.</p>",
    whatsIncluded: [
      "Platform-specific content strategy",
      "Content creation and scheduling",
      "Community engagement and moderation",
      "Influencer outreach and collaboration",
      "Analytics and performance reporting",
    ],
    meta: {
      title: "Social Media Management Services | Marketing Car",
      description: "Build a vibrant community with our social media management services. We handle content creation, engagement, and strategy to grow your brand online.",
      ogTitle: "Engaging Social Media Management | Marketing Car",
      ogDescription: "Let's build your community. We manage your social media presence from strategy and content creation to engagement and reporting."
    },
    icon: <Heart className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "email-marketing",
    title: "Email Marketing", 
    description: "Nurture leads and retain customers effectively.",
    subtitle: "The most direct line to your customers' inboxes.",
    longDescription: "<p>Email remains one of the most effective marketing channels. We design and manage email campaigns that nurture leads, onboard new customers, and drive repeat business. From newsletters to complex automation, we've got you covered.</p>",
    whatsIncluded: [
      "Email list growth and segmentation",
      "Campaign design and copywriting",
      "Marketing automation and drip campaigns",
      "A/B testing and optimization",
      "Performance analysis and reporting",
    ],
    meta: {
      title: "Email Marketing Services | Marketing Car",
      description: "Nurture leads and retain customers with effective email marketing from Marketing Car. We design campaigns, set up automation, and analyze performance.",
      ogTitle: "Effective Email Marketing & Automation | Marketing Car",
      ogDescription: "From newsletters to complex automation, we create email campaigns that nurture leads, drive sales, and build customer loyalty."
    },
    icon: <Mail className="h-12 w-12 text-primary" />,
  },
  { 
    slug: "web-design-development",
    title: "Web Design & Development", 
    description: "Create stunning, high-performance websites.",
    subtitle: "Your digital storefront, designed for performance and conversions.",
    longDescription: "<p>Your website is your digital storefront. We design and build beautiful, responsive, and user-friendly websites that are optimized for performance and conversions. We ensure your site not only looks great but also works flawlessly on all devices.</p>",
    whatsIncluded: [
      "Custom web design (UI/UX)",
      "Responsive web development",
      "E-commerce solutions",
      "Content Management System (CMS) integration",
      "Website maintenance and support",
    ],
    meta: {
      title: "Web Design & Development Services | Marketing Car",
      description: "Create a stunning, high-performance website with Marketing Car. Our services include custom UI/UX design, responsive development, and e-commerce solutions.",
      ogTitle: "Custom Web Design & Development | Marketing Car",
      ogDescription: "Your website is your most important marketing tool. We build beautiful, user-friendly sites that are optimized for performance and conversions."
    },
    icon: <Monitor className="h-12 w-12 text-primary" />,
  },
];