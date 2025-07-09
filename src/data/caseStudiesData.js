import React from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';

export const caseStudies = [
  {
    slug: "ecommerce-seo-overhaul",
    title: "E-commerce SEO Overhaul",
    client: "Global Retailer",
    result: "+250% Organic Traffic",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    challenge: "A major global retailer was facing stagnant organic growth and declining visibility in a competitive online market. Their outdated SEO strategy was failing to attract qualified traffic, leading to missed revenue opportunities.",
    solution: "We conducted a comprehensive technical SEO audit, revamped their content strategy to target high-intent keywords, and built a high-quality backlink profile. The focus was on improving site speed, mobile-friendliness, and creating valuable, shareable content.",
    results: [
      { metric: "250%", description: "Increase in organic search traffic in 6 months." },
      { metric: "Top 3 Rankings", description: "For 50+ high-value commercial keywords." },
      { metric: "40%", description: "Increase in organic revenue contribution." },
    ],
    testimonial: {
      quote: "Marketing Car didn't just get us more traffic; they got us the right traffic. Their strategic approach to SEO has become a cornerstone of our growth.",
      author: "CEO, Global Retailer"
    }
  },
  {
    slug: "targeted-ppc-campaign",
    title: "Targeted PPC Campaign",
    client: "Local Service Provider",
    result: "4.5x Return on Ad Spend",
    icon: <Target className="h-8 w-8 text-highlight" />,
    challenge: "A local service provider struggled to generate qualified leads through digital advertising. Their previous campaigns had high costs per click and low conversion rates, making it difficult to justify the ad spend.",
    solution: "We developed a hyper-targeted PPC strategy across Google Ads and social media. This involved deep keyword research, compelling ad copy, A/B testing landing pages, and implementing conversion tracking to optimize for lead generation.",
    results: [
      { metric: "4.5x", description: "Return on Ad Spend (ROAS) within the first quarter." },
      { metric: "60%", description: "Decrease in cost-per-lead." },
      { metric: "300%", description: "Increase in qualified monthly leads." },
    ],
    testimonial: {
      quote: "The results were almost immediate. We're now getting a steady stream of high-quality leads at a fraction of our previous cost. It's been a game-changer for our business.",
      author: "Owner, Local Service Provider"
    }
  },
  {
    slug: "brand-awareness-launch",
    title: "Brand Awareness Launch",
    client: "Tech Startup",
    result: "10M+ Social Impressions",
    icon: <Award className="h-8 w-8 text-secondary" />,
    challenge: "A new tech startup needed to build brand awareness from scratch in a crowded market. They had an innovative product but no market presence or audience recognition.",
    solution: "We launched a multi-channel brand awareness campaign focused on storytelling and community building. This included a viral social media contest, influencer partnerships, and a PR push that secured features in key industry publications.",
    results: [
      { metric: "10M+", description: "Impressions across all social platforms in 3 months." },
      { metric: "50k+", description: "New followers and community members." },
      { metric: "25+", description: "Features in major tech blogs and news sites." },
    ],
    testimonial: {
      quote: "They put us on the map. The creative energy and strategic execution from Marketing Car gave us the launch momentum we desperately needed.",
      author: "Founder, Tech Startup"
    }
  }
];