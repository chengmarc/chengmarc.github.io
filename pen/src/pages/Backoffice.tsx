import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogStore, BlogPost, CATEGORIES } from "@/store/blogStore";
import { Plus, Edit, Trash2, Eye, ArrowLeft, Save, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/LoginForm";

const Backoffice = () => {
  const { isAuthenticated, logout } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setPosts(blogStore.getAllPosts());
  }, []);

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
  };

  const handleNewPost = () => {
    setEditingPost({
      title: "",
      content: "",
      excerpt: "",
      author: "Jane Doe",
      publishedAt: new Date().toISOString().split('T')[0],
      tags: [],
      published: false,
      category: "Design"
    });
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleSavePost = () => {
    if (!editingPost || !editingPost.title || !editingPost.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingPost.id) {
      // Update existing post
      blogStore.updatePost(editingPost.id, editingPost);
      toast({
        title: "Success",
        description: "Post updated successfully"
      });
    } else {
      // Create new post
      blogStore.addPost(editingPost as Omit<BlogPost, 'id'>);
      toast({
        title: "Success", 
        description: "Post created successfully"
      });
    }

    setPosts(blogStore.getAllPosts());
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      blogStore.deletePost(id);
      setPosts(blogStore.getAllPosts());
      toast({
        title: "Success",
        description: "Post deleted successfully"
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost(null);
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setEditingPost(prev => prev ? { ...prev, tags } : null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">
              {editingPost?.id ? 'Edit Post' : 'New Post'}
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSavePost} className="gap-2">
                <Save className="h-4 w-4" />
                Save Post
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                <Input
                  value={editingPost?.title || ""}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                  placeholder="Enter post title..."
                  className="text-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Excerpt</label>
                <Textarea
                  value={editingPost?.excerpt || ""}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, excerpt: e.target.value } : null)}
                  placeholder="Brief description of the post..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Author</label>
                  <Input
                    value={editingPost?.author || ""}
                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, author: e.target.value } : null)}
                    placeholder="Author name..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Publish Date</label>
                  <Input
                    type="date"
                    value={editingPost?.publishedAt || ""}
                    onChange={(e) => setEditingPost(prev => prev ? { ...prev, publishedAt: e.target.value } : null)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <Select
                    value={editingPost?.category || ""}
                    onValueChange={(value) => setEditingPost(prev => prev ? { ...prev, category: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
                  <Input
                    value={editingPost?.tags?.join(', ') || ""}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="tag1, tag2, tag3..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingPost?.published || false}
                  onCheckedChange={(checked) => setEditingPost(prev => prev ? { ...prev, published: checked } : null)}
                />
                <label className="text-sm font-medium text-foreground">Published</label>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Content</label>
                <Textarea
                  value={editingPost?.content || ""}
                  onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                  placeholder="Write your post content here... (Use # for headings, ## for subheadings, etc.)"
                  rows={20}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use markdown-style formatting: # for main headings, ## for subheadings, ### for smaller headings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Backoffice</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleNewPost} className="gap-2">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">No blog posts yet</p>
                <Button onClick={handleNewPost} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create your first post
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="hover-scale">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By {post.author}</span>
                        <span>{formatDate(post.publishedAt)}</span>
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        <Badge variant="outline">
                          {post.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/post/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Backoffice;
