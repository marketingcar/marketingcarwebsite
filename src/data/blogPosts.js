import React from 'react';
export const blogPosts = [
  {
    title: 'The Importance of a Marketing Dashboard',
    slug: 'the-importance-of-a-marketing-dashboard',
    content: `<p>Imagine driving a high-performance sports car, but the entire dashboard is blacked out. You don't know your speed, your fuel level, or if the engine is overheating. This is what running marketing campaigns without a proper metrics dashboard is like. You're moving, but you have no idea if it's in the right direction or if you're about to run out of gas.</p>
        <h3>Real-Time Visibility</h3>
        <p>A marketing dashboard consolidates all your key performance indicators (KPIs) in one place. Website traffic, conversion rates, cost per acquisition, social media engagement—everything is visible at a glance. This allows you to make informed, real-time decisions instead of waiting for monthly reports.</p>
        <h3>Measuring ROI</h3>
        <p>A dashboard makes it crystal clear which channels and campaigns are delivering a return on investment (ROI). Are your Facebook Ads outperforming your Google Ads? Is your blog driving more qualified leads than your email newsletter? A dashboard answers these questions with data, not guesswork, allowing you to allocate your budget more effectively.</p>
        <p>Ultimately, a marketing dashboard transforms abstract data into actionable insights. It's the GPS for your marketing journey, helping you navigate turns, avoid obstacles, and reach your destination faster and more efficiently.</p>`,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    title: 'The Importance of a Marketing Dashboard',
    slug: 'the-importance-of-a-marketing-dashboard',
    content: `<p>Imagine driving a high-performance sports car, but the entire dashboard is blacked out. You don't know your speed, your fuel level, or if the engine is overheating. This is what running marketing campaigns without a proper metrics dashboard is like. You're moving, but you have no idea if it's in the right direction or if you're about to run out of gas.</p>
        <h3>Real-Time Visibility</h3>
        <p>A marketing dashboard consolidates all your key performance indicators (KPIs) in one place. Website traffic, conversion rates, cost per acquisition, social media engagement—everything is visible at a glance. This allows you to make informed, real-time decisions instead of waiting for monthly reports.</p>
        <h3>Measuring ROI</h3>
        <p>A dashboard makes it crystal clear which channels and campaigns are delivering a return on investment (ROI). Are your Facebook Ads outperforming your Google Ads? Is your blog driving more qualified leads than your email newsletter? A dashboard answers these questions with data, not guesswork, allowing you to allocate your budget more effectively.</p>
        <p>Ultimately, a marketing dashboard transforms abstract data into actionable insights. It's the GPS for your marketing journey, helping you navigate turns, avoid obstacles, and reach your destination faster and more efficiently.</p>`,
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
];

export async function seedInitialPosts() {
  console.log('Mock seeding function called. In a real scenario, this would interact with Supabase.');
  // This function is kept for structural consistency.
  // In a real setup, it would use the actual Supabase client to seed data.
  // With the mock client, this function doesn't need to do anything.
  return Promise.resolve();
}
