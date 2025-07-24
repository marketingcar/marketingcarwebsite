import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import PageTransition from '@/components/PageTransition';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQueryParams } from '@/contexts/QueryParamContext';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { queryParams } = useQueryParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          image_url,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        setError('Could not fetch blog posts. Please try again later.');
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

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

  return (
    <PageTransition>
      <Helmet>
        <title>Blog | Your Marketing Car</title>
        <meta name="description" content="Insights, tips, and strategies on digital marketing for licensed professionals and small businesses." />
      </Helmet>
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
              {posts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col overflow-hidden bg-secondary/20 border-border/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <img src={post.image_url} alt={post.title} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold font-heading">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        {/* Date removed from blog summary page */}
                      </div>
                      <Button asChild>
                        <Link to={{ pathname: `/blog/${post.slug}`, search: queryParams }}>Read More</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPage;