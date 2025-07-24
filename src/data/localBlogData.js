const localBlogData = {
  posts: [
    {
      id: 1,
      slug: 'the-importance-of-a-marketing-dashboard',
      title: 'The Importance of a Marketing Dashboard',
      excerpt: 'Discover why a marketing dashboard is the most critical tool in your arsenal for tracking success and making data-driven decisions.',
      content: `
        <p>Imagine driving a high-performance sports car, but the entire dashboard is blacked out. You don't know your speed, your fuel level, or if the engine is overheating. This is what running marketing campaigns without a proper metrics dashboard is like. You're moving, but you have no idea if it's in the right direction or if you're about to run out of gas.</p>
        <h3 class="text-2xl font-bold my-4">Real-Time Visibility</h3>
        <p>A marketing dashboard consolidates all your key performance indicators (KPIs) in one place. Website traffic, conversion rates, cost per acquisition, social media engagement—everything is visible at a glance. This allows you to make informed, real-time decisions instead of waiting for monthly reports.</p>
        <h3 class="text-2xl font-bold my-4">Measuring ROI</h3>
        <p>A dashboard makes it crystal clear which channels and campaigns are delivering a return on investment (ROI). Are your Facebook Ads outperforming your Google Ads? Is your blog driving more qualified leads than your email newsletter? A dashboard answers these questions with data, not guesswork, allowing you to allocate your budget more effectively.</p>
        <p>Ultimately, a marketing dashboard transforms abstract data into actionable insights. It's the GPS for your marketing journey, helping you navigate turns, avoid obstacles, and reach your destination faster and more efficiently.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      slug: '5-seo-tips-for-local-businesses',
      title: '5 SEO Tips for Local Businesses',
      excerpt: 'Boost your local search rankings and attract more customers with these five essential SEO strategies for small and local businesses.',
      content: `
        <p>For local businesses, appearing in local search results is not just important—it's essential. Here are five tips to get you started.</p>
        <h3 class="text-2xl font-bold my-4">1. Claim Your Google Business Profile</h3>
        <p>This is the single most important thing you can do for local SEO. It's free, and it allows you to appear in Google Maps and the local pack results.</p>
        <h3 class="text-2xl font-bold my-4">2. Optimize for Local Keywords</h3>
        <p>Think like your customer. Use terms like "plumber in [Your City]" or "best coffee near me" in your website content and meta descriptions.</p>
        <h3 class="text-2xl font-bold my-4">3. Build Local Citations</h3>
        <p>Ensure your business name, address, and phone number (NAP) are consistent across all online directories like Yelp, Yellow Pages, and industry-specific sites.</p>
        <h3 class="text-2xl font-bold my-4">4. Get Online Reviews</h3>
        <p>Encourage satisfied customers to leave reviews on Google, Facebook, and other relevant platforms. Positive reviews build trust and boost rankings.</p>
        <h3 class="text-2xl font-bold my-4">5. Create Local Content</h3>
        <p>Write blog posts about local events, news, or guides. This shows Google that you are an active member of your community and an authority in your area.</p>
      `,
      image_url: 'https://images.unsplash.com/photo-1560439539-5da8554d7633?q=80&w=1974&auto=format&fit=crop',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ]
};

export default localBlogData;