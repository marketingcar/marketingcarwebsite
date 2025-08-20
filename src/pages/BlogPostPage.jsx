import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useQueryParams } from '@/contexts/QueryParamContext';
import SchemaMarkup from '@/components/SchemaMarkup';
import { signalPrerenderReady } from '@/lib/prerenderReady'; // ✅ NEW

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { queryParams } = useQueryParams();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`*`)
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setError('Could not find this post. It might have been moved or deleted.');
        setPost(null);
      } else {
        setPost(data);
        setError(null);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  // ✅ Tell the prerender plugin the page is ready (success OR error)
  useEffect(() => {
    if (!loading) signalPrerenderReady();
  }, [loading, error, post]);

  if (loading) {
    return <div className="text-center py-24">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center py-24 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-24">Post not found.</div>;
  }

  const pageUrl = `https://www.marketingcar.com/about/blog/${post.slug}`;
  const pageTitle = `${post.title} | Marketing Car Blog`;

  // Remove a duplicate H1 from the post HTML (keeps the template H1 as the only page H1)
  const sanitizedContent =
    typeof post.content === 'string'
      ? post.content.replace(/<h1[\s\S]*?<\/h1>/i, '')
      : post.content;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image_url,
    "author": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Marketing Car",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.marketingcar.com/mainlogo.png"
      }
    },
    "datePublished": post.created_at,
    "dateModified": post.created_at
  };

  return (
    <PageTransition>
      <SEOHelmet
  title={`${post.title} | Marketing Car Blog`}
  description={post.excerpt}
  image={post.image_url}
  url={`/about/blog/${post.slug}`}
/>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image_url} />
        <meta property="og:url" content={pageUrl} />

        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>

      <SchemaMarkup schema={blogPostingSchema} />

      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8" aria-label="Back to Blog">
              <Link to={{ pathname: "/about/blog", search: queryParams }}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <h1 className="text-4xl md:text-6xl font-black text-primary font-heading tracking-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 text-muted-foreground mb-8">
              {/* Date intentionally omitted */}
            </div>

            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-12"
                width="1200"
                height="630"
                loading="eager"
                fetchpriority="high"
              />
            )}

            <div
              className="prose prose-invert max-w-none lg:prose-xl prose-h3:text-primary prose-a:text-highlight hover:prose-a:text-primary post-content"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default BlogPostPage;