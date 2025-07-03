import { supabase } from '@/lib/customSupabaseClient';

export const blogPosts = [
  {
    id: 1,
    title: 'The Four Wheels of Digital Marketing: A Comprehensive Guide',
    slug: 'four-wheels-digital-marketing',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Just like a car needs four wheels to run smoothly, your digital marketing strategy needs four key components. Discover what they are and how to balance them for optimal performance.',
    content: `<p>In the world of digital marketing, it's easy to get lost in the sea of strategies, tools, and platforms. However, by simplifying our approach and thinking of it like a vehicle, we can gain clarity. A car needs four wheels to move forward effectively, and similarly, a robust digital marketing strategy is built upon four fundamental pillars.</p>
      <h3>1. The Front Left Wheel: A High-Performance Website</h3>
      <p>Your website is often the first interaction a potential customer has with your brand. It's your digital storefront, your online brochure, and your 24/7 salesperson. A well-designed, fast-loading, and mobile-responsive website is non-negotiable. It's the wheel that steers the customer experience.</p>
      <h3>2. The Front Right Wheel: Search Engine Optimization (SEO)</h3>
      <p>If your website is the car, SEO is the map and the road signs that guide traffic to it. Without SEO, even the most beautiful website will sit empty. It involves optimizing your site's structure and content to rank higher on search engines like Google, making it easy for customers to find you when they need you most.</p>
      <h3>3. The Back Left Wheel: Compelling Content & Social Media</h3>
      <p>Content is the fuel, and social media is the engine that distributes it. Engaging blog posts, videos, infographics, and social media updates build brand authority, foster a community, and keep your audience engaged. This wheel provides the power and momentum for your marketing journey.</p>
      <h3>4. The Back Right Wheel: Online Reputation & Reviews</h3>
      <p>In today's digital world, trust is everything. Your online reviews and reputation are the tires that grip the road. Positive reviews on platforms like Google, Yelp, and industry-specific sites build credibility and social proof, giving new customers the confidence to choose you over the competition.</p>
      <p>By ensuring all four wheels are balanced, inflated, and working in harmony, your business can accelerate past the competition and cruise towards success.</p>`,
    author_name: 'Jane Doe',
    author_avatar: 'https://i.pravatar.cc/150?u=jane-doe',
  },
  {
    id: 2,
    title: 'Why Your Business Needs a Marketing Dashboard',
    slug: 'business-needs-marketing-dashboard',
    image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Driving without a dashboard is reckless. The same goes for marketing. Learn how a marketing dashboard provides the critical data you need to navigate your strategy and measure success.',
    content: `<p>Imagine driving a high-performance sports car, but the entire dashboard is blacked out. You don't know your speed, your fuel level, or if the engine is overheating. This is what running marketing campaigns without a proper metrics dashboard is like. You're moving, but you have no idea if it's in the right direction or if you're about to run out of gas.</p>
        <h3>Real-Time Visibility</h3>
        <p>A marketing dashboard consolidates all your key performance indicators (KPIs) in one place. Website traffic, conversion rates, cost per acquisition, social media engagement—everything is visible at a glance. This allows you to make informed, real-time decisions instead of waiting for monthly reports.</p>
        <h3>Measuring ROI</h3>
        <p>A dashboard makes it crystal clear which channels and campaigns are delivering a return on investment (ROI). Are your Facebook Ads outperforming your Google Ads? Is your blog driving more qualified leads than your email newsletter? A dashboard answers these questions with data, not guesswork, allowing you to allocate your budget more effectively.</p>
        <p>Ultimately, a marketing dashboard transforms abstract data into actionable insights. It's the GPS for your marketing journey, helping you navigate turns, avoid obstacles, and reach your destination faster and more efficiently.</p>`,
    author_name: 'John Smith',
    author_avatar: 'https://i.pravatar.cc/150?u=john-smith',
  },
];

export async function seedInitialPosts() {
  console.log('Checking for existing posts...');
  const { data: existingPosts, error: checkError } = await supabase.from('posts').select('id').limit(1);

  if (checkError) {
    console.error('Error checking for posts:', checkError);
    return;
  }

  if (existingPosts && existingPosts.length > 0) {
    console.log('Posts already exist. Skipping seed.');
    return;
  }

  console.log('No posts found. Seeding initial posts...');
  const postsToInsert = blogPosts.map(post => ({
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt,
    image_url: post.image_url,
  }));

  const { error: insertError } = await supabase.from('posts').insert(postsToInsert);

  if (insertError) {
    console.error('Error seeding posts:', insertError);
  } else {
    console.log('Successfully seeded initial posts.');
  }
}
