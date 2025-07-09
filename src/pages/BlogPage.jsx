import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { seedInitialPosts } from '@/data/blogPosts';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      await seedInitialPosts(); 
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Blog | Marketing Car</title>
        <meta name="description" content="Explore the latest insights, tips, and strategies in digital marketing from the experts at Marketing Car." />
      </Helmet>
      <div className="bg-background text-foreground">
        <header className="bg-primary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold tracking-tight text-foreground"
            >
              The Marketing Car Blog
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Your roadmap to digital marketing success. Insights, strategies, and news from the driver's seat.
            </motion.p>
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center text-lg">Loading posts...</div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border-border/20 group">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                       src={post.image_url} />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col">
                      <CardDescription className="line-clamp-3 mb-4">{post.excerpt}</CardDescription>
                      <div className="mt-auto">
                        <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-highlight">
                          <Link to={`/blog/${post.slug}`}>
                            Read Full Post <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
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