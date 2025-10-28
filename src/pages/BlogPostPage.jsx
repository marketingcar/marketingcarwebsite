import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogPostBySlug } from '@/data/blogPosts';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useQueryParams } from '@/contexts/QueryParamContext';
import SchemaMarkup from '@/components/SchemaMarkup';
import SEOHelmet from '@/components/SEOHelmet';
import { signalPrerenderReady } from '@/lib/prerenderReady';
import { getProcessedContent } from '@/lib/contentSanitizer';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { queryParams } = useQueryParams();

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const foundPost = await getBlogPostBySlug(slug);
        if (foundPost) {
          setPost(foundPost);
          setError(null);
        } else {
          setError('Could not find this post. It might have been moved or deleted.');
          setPost(null);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setError('Could not find this post. It might have been moved or deleted.');
        setPost(null);
      }
      setLoading(false);
    };

    loadPost();
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

  const pageUrl = `https://www.marketingcar.com/blog/${post.slug}`;
  const pageTitle = post.title;

  // Get processed and sanitized content
  const sanitizedContent = getProcessedContent(post);

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
      {/* SEO metadata is injected during build - no React Helmet needed */}
      {/* Schema is also injected during build */}

      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8" aria-label="Back to Blog">
              <Link to={{ pathname: "/blog", search: queryParams }}>
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