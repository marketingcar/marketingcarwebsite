import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Edit, Save, Trash2 } from 'lucide-react';

const AdminPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [githubToken, setGithubToken] = useState('');

  // GitHub API configuration
  const GITHUB_OWNER = 'marketingcar';
  const GITHUB_REPO = 'marketingcarwebsite';
  const CONTENT_PATH = 'content/blog';

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('github_admin_token');
    if (token) {
      setGithubToken(token);
      setIsAuthenticated(true);
      loadBlogPosts();
    }
  }, []);

  const authenticateWithGitHub = async () => {
    if (!githubToken) return;

    try {
      // Test the token with a simple API call
      const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        localStorage.setItem('github_admin_token', githubToken);
        setIsAuthenticated(true);
        loadBlogPosts();
      } else {
        alert('Invalid GitHub token. Please check your token.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Error authenticating with GitHub.');
    }
  };

  const loadBlogPosts = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const files = await response.json();
        const markdownFiles = files.filter(file => file.name.endsWith('.md'));
        setBlogPosts(markdownFiles);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
    }
  };

  const loadPostContent = async (post) => {
    try {
      const response = await fetch(post.download_url);
      const content = await response.text();

      // Parse frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const body = frontmatterMatch[2];

        // Simple YAML parsing (basic)
        const metadata = {};
        frontmatter.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            metadata[key.trim()] = value;
          }
        });

        setCurrentPost({
          ...post,
          metadata,
          body: body.trim(),
          originalContent: content
        });
      }
    } catch (error) {
      console.error('Error loading post content:', error);
    }
  };

  const savePost = async () => {
    if (!currentPost) return;

    try {
      // Reconstruct markdown with frontmatter
      const frontmatter = Object.entries(currentPost.metadata)
        .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
        .join('\n');

      const newContent = `---\n${frontmatter}\n---\n\n${currentPost.body}`;

      // Get current file to get SHA
      const fileResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}/${currentPost.name}`, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      const fileData = await fileResponse.json();

      // Update file via GitHub API
      const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}/${currentPost.name}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Update blog post: ${currentPost.metadata.title}`,
          content: btoa(newContent), // Base64 encode
          sha: fileData.sha,
        }),
      });

      if (updateResponse.ok) {
        alert('Post saved successfully!');
        setIsEditing(false);
        loadBlogPosts();
      } else {
        alert('Error saving post');
      }
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
  };

  const updateMetadata = (key, value) => {
    setCurrentPost(prev => ({
      ...prev,
      metadata: { ...prev.metadata, [key]: value }
    }));
  };

  const updateBody = (body) => {
    setCurrentPost(prev => ({ ...prev, body }));
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="token">GitHub Personal Access Token</Label>
              <Input
                id="token"
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="Enter your GitHub token"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Create a personal access token at GitHub → Settings → Developer settings → Personal access tokens with 'repo' scope.
              </p>
            </div>
            <Button onClick={authenticateWithGitHub} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Content Admin</h1>
        <Button onClick={() => setIsAuthenticated(false)} variant="outline">
          Logout
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Posts List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlusCircle size={20} />
              Blog Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {blogPosts.map((post) => (
                <div
                  key={post.sha}
                  className={`p-3 border rounded cursor-pointer hover:bg-accent ${
                    currentPost?.sha === post.sha ? 'bg-accent' : ''
                  }`}
                  onClick={() => loadPostContent(post)}
                >
                  <div className="font-medium">{post.name.replace('.md', '')}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Post Editor */}
        {currentPost && (
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Edit size={20} />
                Edit Post
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  size="sm"
                >
                  {isEditing ? 'Preview' : 'Edit'}
                </Button>
                <Button onClick={savePost} size="sm">
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="metadata">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>

                <TabsContent value="metadata" className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={currentPost.metadata.title || ''}
                      onChange={(e) => updateMetadata('title', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={currentPost.metadata.slug || ''}
                      onChange={(e) => updateMetadata('slug', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={currentPost.metadata.date || ''}
                      onChange={(e) => updateMetadata('date', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={currentPost.metadata.excerpt || ''}
                      onChange={(e) => updateMetadata('excerpt', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={currentPost.metadata.author || 'Marketing Car'}
                      onChange={(e) => updateMetadata('author', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={currentPost.metadata.published === 'true'}
                      onCheckedChange={(checked) => updateMetadata('published', checked ? 'true' : 'false')}
                      disabled={!isEditing}
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                </TabsContent>

                <TabsContent value="content">
                  <div>
                    <Label htmlFor="body">Content (Markdown)</Label>
                    <Textarea
                      id="body"
                      value={currentPost.body}
                      onChange={(e) => updateBody(e.target.value)}
                      disabled={!isEditing}
                      rows={20}
                      className="font-mono"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPage;