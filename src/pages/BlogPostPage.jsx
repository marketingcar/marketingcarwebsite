import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import PageTransition from '@/components/PageTransition';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useQueryParams } from '@/contexts/QueryParamContext';

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
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-24">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center py-24 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-24">Post not found.</div>;
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | Your Marketing Car Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <Button asChild variant="ghost" className="mb-8">
              <Link to={{ pathname: "/blog", search: queryParams }}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <h1 className="text-4xl md:text-6xl font-black text-primary font-heading tracking-tight mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mb-8">
              {/* Date removed from blog post page */}
            </div>

            <img src={post.image_url} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-12" />

            <div
              className="prose prose-invert max-w-none lg:prose-xl prose-h3:text-primary prose-a:text-highlight hover:prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default BlogPostPage;