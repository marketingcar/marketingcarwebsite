// case-studies.js
// Drop-in replacement. Crow River Market left exactly as-is.
// Adds KeyMetricsGrid component and the Liam Counseling case study.

import React from 'react';
import { Store } from 'lucide-react';

// Simple, reusable metrics grid for percent-based wins.
// Use with any case study by passing an array of { label, value, note? }.
export function KeyMetricsGrid({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {items.map((m, i) => (
        <div
          key={`${m.label}-${i}`}
          className="rounded-2xl border border-gray-200 p-4 shadow-sm"
        >
          <div className="text-sm text-gray-500">{m.label}</div>
          <div className="text-2xl font-semibold">{m.value}</div>
          {m.note ? (
            <div className="text-xs text-gray-500 mt-1">{m.note}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export const caseStudies = [
  {
    slug: "crow-river-market-launch",
    title: "Case Study: Launching The Crow River Market",
    client: "The Crow River Market, Hanover, MN",
    result: "600+ Opening Day Attendees",
    icon: <Store className="h-8 w-8 text-primary" />,
    oneLiner:
      "From zero presence to a buzzing Saturday destination—The Crow River Market proves that small-town roots and savvy storytelling go hand-in-hand.",

    marketingGoal:
      "To launch and grow awareness for a brand-new seasonal farmers market in Hanover, MN, driving weekly foot traffic, encouraging vendor participation, and building a loyal local following through grassroots and digital marketing.",

    process: [
      "Launched a branded Facebook and Instagram presence.",
      "Wrote fun, shareable weekly social posts with weather tie-ins, vendor highlights, and humor.",
      "Created an email list and weekly newsletters.",
      "Crafted and launched Meta Ads.",
      "Developed a clean, vendor-focused website with a gallery and application process.",
      "Promoted the market through local Facebook groups, a ribbon-cutting event, and signage around town.",
      "Encouraged community engagement through like/share/comment CTAs and vendor cross-promotion."
    ],

    resultsSummary: [
      { metric: "Almost 600", description: "Attendees at opening market day." },
      {
        metric: "Rapid Growth",
        description:
          "Of local email subscribers and social followers within the first month."
      },
      {
        metric: "Fully Booked",
        description: "Vendor schedule of 30+ vendors for the opening weeks."
      },
      {
        metric: "Strong Buzz",
        description:
          "And repeat foot traffic fueled by regular content updates and word-of-mouth."
      }
    ],

    successStory: {
      title: "A Sweet Success Story",
      content:
        "Three of four baking vendors completely sold out of all products more than an hour before the market ended for the day! That kind of local love became a ripple effect for others."
    },

    image:
      "https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/e903b1a60267a154541fd5a3de985b61.jpg",
    imageAlt:
      "Crow River Market ribbon cutting with vendors and shoppers at Hanover Elementary parking lot",
    logo:
      "https://storage.googleapis.com/hostinger-horizons-assets-prod/4d4ac5ee-065d-4104-9e56-34e1c9915a10/c3dcff069aab2055b29836cd34d8f989.png",

    meta: {
      title: "Crow River Market Launch | Marketing Car Case Study",
      description:
        "How The Crow River Market grew from zero to 600+ attendees through strategic branding, grassroots outreach, and digital marketing.",
      ogTitle: "The Crow River Market: From Zero to a Saturday Staple",
      ogDescription:
        "See how a new farmers market in Hanover, MN captured hearts and foot traffic with community-first marketing, vendor buzz, and sold-out cinnamon rolls.",
      ogImageAlt:
        "Crow River Market ribbon cutting with vendors and shoppers at Hanover Elementary parking lot"
    }
  },

  // New case study
  {
    slug: "liam-counseling-growth",
    title: "Case Study: Liam Counseling & Body Kind, Mind Strong",
    client: "Liam Counseling | Marietta, GA",
    result: "Multi-Platform Engagement Surge",
    icon: <Store className="h-8 w-8 text-primary" />,
    oneLiner:
      "From a brand-new website to a full-blown social movement, ‘Body Kind, Mind Strong’ turned therapy into something vivid, physical, and relatable.",

    // Origin story: She came for ideas, left with a brand and a growth engine.
    origin:
      "Jen came to us looking for ideas to grow her marketing. We created the Body Kind, Mind Strong name and identity, launched a new website at liamcounseling.com, and pushed into short-form social at scale.",

    marketingGoal:
      "Unify Jen Liam’s clinical expertise and athletic identity under one brand system, grow visibility across TikTok, Instagram, Facebook, and LinkedIn, and drive steady inbound for therapy, supervision, and workshops.",

    process: [
      "Designed and launched an SEO-focused site at liamcounseling.com with clear pathways for therapy and clinical supervision.",
      "Developed the Body Kind, Mind Strong brand to anchor social storytelling around movement, mindfulness, and nervous-system-informed care.",
      "Produced and published consistent short-form video content across TikTok, Instagram, Facebook, and LinkedIn.",
      "Rolled out paid media on Meta and Google to amplify validated creatives.",
      "Reviewed weekly analytics and iterated on creative hooks, scripts, and CTAs for retention and engagement."
    ],

    // Percent-based, no spend displayed.
    keyMetrics: [
      { label: "TikTok Followers", value: "+833%" , note: "Launch window growth" },
      { label: "TikTok Video Engagement", value: "+100%", note: "Likes, comments, shares up across launch period" },
      { label: "Instagram Reach", value: "+100%" , note: "Launch period lift" },
      { label: "Facebook Engagements", value: "+100%" , note: "Launch period lift" },
      { label: "LinkedIn Engagement Rate", value: "~54%", note: "Organization profile engagement during period" },
      // Paid media phrased as percentage gain without revealing spend.
      { label: "Paid Social CTR", value: "Double-digit lift", note: "Improved after creative iteration" }
    ],

    resultsSummary: [
      {
        metric: "+800% Growth",
        description:
          "Rapid follower expansion on TikTok from a cold start, validating the movement-as-therapy positioning."
      },
      {
        metric: "+100% Engagement",
        description:
          "Consistent, platform-wide lift on Meta and Instagram during the first reporting window."
      },
      {
        metric: "High Retention",
        description:
          "Short-form videos held attention and drove repeat exposure across channels."
      },
      {
        metric: "Efficient Paid",
        description:
          "CTR improved as winning hooks were scaled, with cost efficiency preserved by creative testing."
      }
    ],

    successStory: {
      title: "Movement as Medicine",
      content:
        "Jen’s presence as therapist, supervisor, and athlete anchored a distinctive content lane. Videos featuring balance work, boxing, and strength routines reframed therapy as embodied practice. The Body Kind, Mind Strong identity gave the audience a banner to gather under and multiplied reach across platforms."
    },


    // Visuals and brand links
    image:
      "/casestudies/bodykindmindstrong.jpg",
    imageAlt:
      "Jen Liam demonstrating movement-based therapy in her office",
    logo: "/casestudies/liamcounseling.png",

    links: {
      website: "https://liamcounseling.com",
      tiktok: "https://www.tiktok.com/@bodykindmindstrong",
      instagram: "https://www.instagram.com/bodykindmindstrong/",
      facebook: "https://www.facebook.com/bodykindmindstrong",
      linkedinCompany: "https://www.linkedin.com/company/liam-counseling/",
      linkedinPersonal: "https://www.linkedin.com/in/jen-liam-900363370/"
    },

    meta: {
      title: "Liam Counseling Growth | Marketing Car Case Study",
      description:
        "How movement-first content and cross-platform execution produced +800% TikTok growth and doubled engagement for Liam Counseling.",
      ogTitle: "Liam Counseling: Body Kind, Mind Strong",
      ogDescription:
        "Therapy in motion. See how a grounded, athletic brand voice translated into real social growth and efficient paid performance.",
      ogImageAlt:
        "Jen Liam demonstrating movement-based therapy at Liam Counseling"
    }
  }
];

/*
USAGE EXAMPLE:

import { KeyMetricsGrid, caseStudies } from "./case-studies";

function CaseStudyPage({ slug }) {
  const cs = caseStudies.find(c => c.slug === slug);
  if (!cs) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <header className="flex items-center gap-3">
        {cs.icon}
        <div>
          <h1 className="text-3xl font-bold">{cs.title}</h1>
          <p className="text-gray-600">{cs.client}</p>
        </div>
      </header>

      <p className="mt-6 text-lg">{cs.oneLiner}</p>
      {cs.origin ? <p className="mt-4 text-gray-700">{cs.origin}</p> : null}

      <img
        src={cs.image}
        alt={cs.imageAlt}
        className="rounded-2xl mt-6 w-full object-cover"
      />

      {cs.keyMetrics ? <KeyMetricsGrid items={cs.keyMetrics} /> : null}

      <h2 className="text-2xl font-semibold mt-10">Marketing Goal</h2>
      <p className="mt-2 text-gray-700">{cs.marketingGoal}</p>

      <h2 className="text-2xl font-semibold mt-8">Process</h2>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        {cs.process.map((step, i) => <li key={i}>{step}</li>)}
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Results Summary</h2>
      <ul className="list-disc pl-6 mt-2 space-y-1">
        {cs.resultsSummary.map((r, i) => (
          <li key={i}>
            <span className="font-semibold">{r.metric}:</span> {r.description}
          </li>
        ))}
      </ul>

      {cs.links ? (
        <>
          <h2 className="text-2xl font-semibold mt-8">Links</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {Object.entries(cs.links).map(([k, v]) => (
              <li key={k}>
                <a className="text-primary underline" href={v} target="_blank" rel="noreferrer">
                  {k}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
*/

