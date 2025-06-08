
import { Link, useSearchParams } from "react-router-dom";
import { blogStore, CATEGORIES } from "@/store/blogStore";
import { Calendar, User, ArrowRight, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  
  const posts = selectedCategory 
    ? blogStore.getPostsByCategory(selectedCategory)
    : blogStore.getPublishedPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const clearCategory = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Minimal Blog</h1>
              <p className="text-muted-foreground text-sm">Thoughts on design, life, and everything in between</p>
            </div>
            <Link to="/backoffice">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Backoffice
              </Button>
            </Link>
          </div>
          
          {/* Category Navigation */}
          <nav className="flex gap-2 flex-wrap">
            <Button
              variant={!selectedCategory ? "default" : "ghost"}
              size="sm"
              onClick={clearCategory}
              className="text-sm"
            >
              All Posts
            </Button>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCategoryClick(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-light text-foreground leading-tight">
            Welcome to my
            <span className="block font-bold">digital space</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of thoughts, insights, and stories about design, technology, and the art of living intentionally.
          </p>
          {selectedCategory && (
            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
                Showing posts in: {selectedCategory}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found in this category yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post, index) => (
              <article 
                key={post.id} 
                className="group animate-fade-in hover-scale cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={`/post/${post.id}`} className="block">
                  <div className="border-l-2 border-transparent group-hover:border-primary transition-all duration-300 pl-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {post.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all duration-200">
                          Read more
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>© 2024 Minimal Blog. Crafted with care and attention to detail.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
