import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';
import { signalPrerenderReady } from '@/lib/prerenderReady';
import { getProcessedContent } from '@/lib/contentSanitizer';

// Import static pages data
import { getPageBySlug } from '@/data/staticPages';

const GhostPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPage = () => {
      setLoading(true);
      try {
        const foundPage = getPageBySlug(slug);
        if (foundPage) {
          setPage(foundPage);
          setError(null);
        } else {
          setError('Page not found.');
          setPage(null);
        }
      } catch (error) {
        console.error('Error loading Ghost page:', error);
        setError('Could not load this page.');
        setPage(null);
      }
      setLoading(false);
    };

    loadPage();
  }, [slug]);

  // Signal prerender readiness
  useEffect(() => {
    if (!loading) signalPrerenderReady();
  }, [loading, error, page]);

  if (loading) {
    return <div className="text-center py-24">Loading...</div>;
  }

  if (error || !page) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'This page does not exist.'}</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "headline": page.title,
    "description": page.meta_description || page.excerpt,
    "image": page.image_url,
    "datePublished": page.created_at,
    "author": {
      "@type": "Organization",
      "name": page.author || "Marketing Car"
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>{page.meta_title || page.title} | Marketing Car</title>
        <meta name="description" content={page.meta_description || page.excerpt} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.marketingcar.com/${slug}`} />
        <meta property="og:title" content={page.og_title || page.title} />
        <meta property="og:description" content={page.og_description || page.excerpt} />
        {page.og_image && <meta property="og:image" content={page.og_image} />}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.marketingcar.com/${slug}`} />
        <meta property="twitter:title" content={page.twitter_title || page.title} />
        <meta property="twitter:description" content={page.twitter_description || page.excerpt} />
        {page.twitter_image && <meta property="twitter:image" content={page.twitter_image} />}

        <link rel="canonical" href={`https://www.marketingcar.com/${slug}`} />
      </Helmet>
      <SchemaMarkup schema={schema} />

      <article className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Image */}
          {page.image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <img
                src={page.image_url}
                alt={page.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black mb-6 text-primary font-heading"
          >
            {page.title}
          </motion.h1>

          {/* Excerpt */}
          {page.excerpt && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-8"
            >
              {page.excerpt}
            </motion.p>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="post-content prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: getProcessedContent(page.content) }}
          />

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </article>
    </PageTransition>
  );
};

export default GhostPage;
