
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  tags: string[];
  published: boolean;
  category: string;
}

export const CATEGORIES = [
  'Design',
  'Technology', 
  'Lifestyle',
  'Business'
] as const;

class BlogStore {
  private posts: BlogPost[] = [
    {
      id: "1",
      title: "The Art of Minimalist Design",
      content: `# The Art of Minimalist Design

Minimalism in design is not about having less for the sake of less. It's about having just enough to communicate your message effectively, without unnecessary distractions.

## Key Principles

### 1. Clarity Over Complexity
Every element should serve a purpose. If it doesn't add value to the user experience, it should be removed.

### 2. White Space is Your Friend
White space, or negative space, gives your content room to breathe. It guides the eye and creates hierarchy.

### 3. Typography Matters
In minimalist design, typography often becomes the hero. Choose fonts that are readable and reflect your brand's personality.

## Implementation in Web Design

When creating minimalist web designs:

- Use a limited color palette
- Focus on typography hierarchy
- Embrace white space
- Simplify navigation
- Remove unnecessary elements

The result is a clean, focused experience that allows your content to shine.`,
      excerpt: "Exploring the principles of minimalist design and how less can truly be more in creating meaningful user experiences.",
      author: "Jane Doe",
      publishedAt: "2024-01-15",
      tags: ["design", "minimalism", "ui/ux"],
      published: true,
      category: "Design"
    },
    {
      id: "2",
      title: "Building Sustainable Habits",
      content: `# Building Sustainable Habits

Creating lasting change in our lives often comes down to the small, consistent actions we take every day. Here's how to build habits that stick.

## The Power of Small Steps

Instead of trying to overhaul your entire life overnight, focus on tiny, almost ridiculously small changes. Want to read more? Start with just one page a day.

## Consistency Over Intensity

It's better to do something small every day than something big once in a while. Consistency builds momentum and creates neural pathways that make habits automatic.

## Environmental Design

Your environment plays a huge role in habit formation. Make good habits obvious and easy, while making bad habits invisible and difficult.

Remember: you don't rise to the level of your goals, you fall to the level of your systems.`,
      excerpt: "Simple strategies for creating lasting positive changes through small, consistent actions that compound over time.",
      author: "Jane Doe",
      publishedAt: "2024-01-10",
      tags: ["productivity", "habits", "self-improvement"],
      published: true,
      category: "Lifestyle"
    },
    {
      id: "3",
      title: "The Future of Web Development",
      content: `# The Future of Web Development

Web development is evolving at breakneck speed. From AI-powered coding assistants to revolutionary frameworks, the landscape is changing dramatically.

## Key Trends

### 1. AI Integration
AI is becoming integral to how we build web applications, from code generation to automated testing.

### 2. Edge Computing
Moving computation closer to users for better performance and user experience.

### 3. WebAssembly Growth
Opening up new possibilities for web applications with near-native performance.

The future is bright for web developers willing to adapt and learn.`,
      excerpt: "Exploring the emerging trends and technologies that will shape the future of web development.",
      author: "Jane Doe",
      publishedAt: "2024-01-12",
      tags: ["web development", "ai", "future"],
      published: true,
      category: "Technology"
    },
    {
      id: "4",
      title: "Scaling Your Startup",
      content: `# Scaling Your Startup

Growing a startup from idea to successful business requires careful planning, smart decisions, and the right strategies.

## Essential Steps

### 1. Product-Market Fit
Before scaling, ensure your product truly solves a real problem for your target market.

### 2. Build the Right Team
Hire people who complement your skills and share your vision.

### 3. Focus on Unit Economics
Make sure your business model is profitable at the unit level before scaling.

### 4. Preserve Company Culture
As you grow, maintain the values and culture that made you successful.

Scaling is exciting but challenging. Take it one step at a time.`,
      excerpt: "Essential strategies and considerations for successfully scaling your startup from early stage to growth.",
      author: "Jane Doe",
      publishedAt: "2024-01-08",
      tags: ["startup", "business", "growth"],
      published: true,
      category: "Business"
    }
  ];

  getAllPosts(): BlogPost[] {
    return this.posts;
  }

  getPublishedPosts(): BlogPost[] {
    return this.posts.filter(post => post.published);
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.posts.filter(post => post.published && post.category === category);
  }

  getPostById(id: string): BlogPost | undefined {
    return this.posts.find(post => post.id === id);
  }

  addPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  updatePost(id: string, updates: Partial<BlogPost>): BlogPost | undefined {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updates };
      return this.posts[index];
    }
    return undefined;
  }

  deletePost(id: string): boolean {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const blogStore = new BlogStore();
