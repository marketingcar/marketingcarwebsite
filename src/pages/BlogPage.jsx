import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllBlogPosts } from '@/data/staticBlogPosts';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQueryParams } from '@/contexts/QueryParamContext';
import SchemaMarkup from '@/components/SchemaMarkup';
import { signalPrerenderReady } from '@/lib/prerenderReady'; // ✅ NEW
import OptimizedImage from '@/components/OptimizedImage';


const POSTS_PER_PAGE = 9;

const BlogPage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { queryParams } = useQueryParams();

  useEffect(() => {
    const loadStaticPosts = () => {
      setLoading(true);
      try {
        const staticPosts = getAllBlogPosts();
        setAllPosts(staticPosts || []);
        setError(null);
      } catch (error) {
        console.error('Error loading static posts:', error);
        setError('Could not load blog posts. Please try again later.');
        setAllPosts([]);
      }
      setLoading(false);
    };

    loadStaticPosts();
  }, []);

  // ✅ Signal prerender readiness when loading has finished (success or error)
  useEffect(() => {
    if (!loading) {
      signalPrerenderReady();
    }
  }, [loading, error, allPosts.length]);

  // Calculate pagination
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "url": "https://www.marketingcar.com/blog",
    "name": "Marketing Insights | Marketing Car Blog",
    "description": "Explore the latest marketing insights, tips, and strategies from Marketing Car to fuel your business growth and stay ahead of the competition.",
    "publisher": {
      "@type": "Organization",
      "name": "Marketing Car",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.marketingcar.com/mainlogo.png"
      }
    },
    "blogPost": currentPosts.map(post => ({
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.marketingcar.com/blog/${post.slug}`
      },
      "headline": post.title,
      "image": post.image_url,
      "datePublished": post.created_at,
      "dateModified": post.created_at,
      "author": {
        "@type": "Organization",
        "name": "Marketing Car"
      },
      "description": post.excerpt
    }))
  };

  return (
    <PageTransition>

      <Helmet>
        
        <title>Marketing Insights | Marketing Car Blog</title>
        <meta name="description" content="Explore the latest marketing insights, tips, and strategies from Marketing Car to fuel your business growth and stay ahead of the competition." />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={blogSchema} />
      <div className="bg-gradient-to-b from-primary/5 to-background pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="container mx-auto px-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-primary font-heading tracking-tight">Marketing Insights</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            Actionable advice and strategies to fuel your business growth.
          </p>
        </motion.div>
      </div>

      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {loading && <p className="text-center">Loading posts...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link 
                    to={{ pathname: `/blog/${post.slug}`, search: queryParams }}
                    className="block h-full"
                  >
                    <Card className="h-full flex flex-col overflow-hidden bg-secondary/20 border-border/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                      <OptimizedImage 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-48 object-cover aspect-[16/9]" 
                        width={400} 
                        height={225} 
                      />
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold font-heading">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground" />
                        <Button variant="ghost" className="pointer-events-none">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination Controls */}
          {!loading && !error && totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center mt-16 space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  const isCurrentPage = page === currentPage;

                  // Show first, last, current, and pages around current
                  const shouldShow =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  if (!shouldShow) {
                    // Show ellipsis if there's a gap
                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-2 py-2 text-muted-foreground">...</span>;
                    }
                    return null;
                  }

                  return (
                    <Button
                      key={page}
                      variant={isCurrentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="min-w-[40px]"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Post count indicator */}
          {!loading && !error && allPosts.length > 0 && (
            <motion.div
              className="text-center mt-8 text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Showing {startIndex + 1}-{Math.min(endIndex, allPosts.length)} of {allPosts.length} posts
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPage;
