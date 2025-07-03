import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/lib/customSupabaseClient';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading post...</div>;
  }

  if (!post) {
    return (
      <PageTransition>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <p className="text-muted-foreground mt-4">The post you are looking for does not exist.</p>
          <Button asChild className="mt-8">
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </PageTransition>
    );
  }

  const postDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | Marketing Car Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="bg-background text-foreground">
        <div className="relative h-96">
          <div className="absolute inset-0 bg-black/50" />
          <img 
            alt={post.title}
            className="w-full h-full object-cover"
           src="https://images.unsplash.com/photo-1597096337857-1de36e3ae34b" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white px-4"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">{post.title}</h1>
              <div className="mt-4 flex justify-center items-center space-x-6 text-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>{postDate}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-16">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-highlight"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <Button asChild variant="outline">
              <Link to="/blog" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BlogPostPage;
