import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

interface BlogPost {
  id: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  content_fr: string;
  content_en: string;
  category_fr: string;
  category_en: string;
  image_url: string;
  read_time: number;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
}

export default function Blog() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const content = {
    fr: {
      title: 'Blog & Actualités',
      subtitle: 'Restez informé des dernières nouvelles en immigration canadienne',
      searchPlaceholder: 'Rechercher un article...',
      readMore: 'Lire la suite',
      minRead: 'min de lecture',
      noResults: 'Aucun article trouvé',
      backHome: "Retour à l'accueil",
      back: 'Retour aux articles',
      allCategories: 'Tous',
      loading: 'Chargement...',
    },
    en: {
      title: 'Blog & News',
      subtitle: 'Stay informed about the latest Canadian immigration news',
      searchPlaceholder: 'Search articles...',
      readMore: 'Read more',
      minRead: 'min read',
      noResults: 'No articles found',
      backHome: 'Back to home',
      back: 'Back to articles',
      allCategories: 'All',
      loading: 'Loading...',
    },
  };

  const t = content[language];

  const categories = Array.from(new Set(posts.map(p => language === 'fr' ? p.category_fr : p.category_en).filter(Boolean)));

  const filteredPosts = posts.filter(post => {
    const title = language === 'fr' ? post.title_fr : post.title_en;
    const excerpt = language === 'fr' ? post.excerpt_fr : post.excerpt_en;
    const category = language === 'fr' ? post.category_fr : post.category_en;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Simple markdown-like rendering for content
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-xl sm:text-2xl font-heading font-semibold text-txt-primary mt-8 mb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-txt-secondary text-sm sm:text-base ml-4 mb-1">{line.replace('- ', '')}</li>;
      }
      if (line.startsWith('💡')) {
        return <p key={i} className="text-primary font-medium text-sm sm:text-base mt-2 mb-4 bg-primary/5 p-3 rounded-lg border border-primary/10">{line}</p>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-txt-primary text-sm sm:text-base mb-2">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={i} className="text-txt-secondary text-sm sm:text-base mb-2">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-txt-primary">{part}</strong> : part)}
          </p>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-txt-secondary text-sm sm:text-base mb-2">{line}</p>;
    });
  };

  // Single post view
  if (selectedPost) {
    const postContent = language === 'fr' ? selectedPost.content_fr : selectedPost.content_en;
    const postTitle = language === 'fr' ? selectedPost.title_fr : selectedPost.title_en;
    const postCategory = language === 'fr' ? selectedPost.category_fr : selectedPost.category_en;

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation language={language} setLanguage={setLanguage} />
        <section className="pt-28 sm:pt-32 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSelectedPost(null)} className="inline-flex items-center gap-2 text-primary font-medium text-sm mb-6 hover:gap-3 transition-all">
              <ArrowLeft size={16} /> {t.back}
            </button>
            {selectedPost.image_url && (
              <div className="rounded-xl overflow-hidden mb-6 sm:mb-8">
                <img src={selectedPost.image_url} alt={postTitle} className="w-full h-48 sm:h-64 lg:h-80 object-cover" />
              </div>
            )}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                <Tag size={12} /> {postCategory}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-txt-secondary">
                <Calendar size={14} /> {formatDate(selectedPost.created_at)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-txt-secondary">
                <Clock size={14} /> {selectedPost.read_time} {t.minRead}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-txt-primary mb-6 sm:mb-8">{postTitle}</h1>
            <div className="prose-custom">{renderContent(postContent)}</div>
          </div>
        </section>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} setLanguage={setLanguage} />
      
      <section className="pt-28 sm:pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center mb-12">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 py-6 text-lg bg-card border-border" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                {t.allCategories}
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">{t.loading}</div>
          ) : filteredPosts.length > 0 ? (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image_url} alt={language === 'fr' ? post.title_fr : post.title_en} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          <Tag size={12} /> {language === 'fr' ? post.category_fr : post.category_en}
                        </span>
                      </div>
                      {post.is_featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">⭐</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {formatDate(post.created_at)}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {post.read_time} {t.minRead}</span>
                    </div>
                    <h2 className="font-heading text-lg sm:text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {language === 'fr' ? post.title_fr : post.title_en}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {language === 'fr' ? post.excerpt_fr : post.excerpt_en}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      {t.readMore} <ArrowRight size={16} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-6">{t.noResults}</p>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                {t.backHome}
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <Footer language={language} />
    </div>
  );
}
