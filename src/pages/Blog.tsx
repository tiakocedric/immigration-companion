import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

interface BlogPost {
  id: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  category_fr: string;
  category_en: string;
  date: string;
  readTime: number;
  image: string;
}

// Static blog posts - can be replaced with database later
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title_fr: 'Entrée Express 2024 : Les nouveaux critères de sélection',
    title_en: 'Express Entry 2024: New Selection Criteria',
    excerpt_fr: 'Découvrez les dernières modifications apportées au système Entrée Express et comment maximiser vos chances de recevoir une invitation.',
    excerpt_en: 'Discover the latest changes to the Express Entry system and how to maximize your chances of receiving an invitation.',
    category_fr: 'Entrée Express',
    category_en: 'Express Entry',
    date: '2024-12-15',
    readTime: 5,
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800&h=500&fit=crop'
  },
  {
    id: '2',
    title_fr: 'Programme des Travailleurs Qualifiés du Québec : Guide Complet',
    title_en: 'Quebec Skilled Worker Program: Complete Guide',
    excerpt_fr: 'Tout ce que vous devez savoir sur le PRTQ et les étapes pour immigrer au Québec en tant que travailleur qualifié.',
    excerpt_en: 'Everything you need to know about the QSWP and the steps to immigrate to Quebec as a skilled worker.',
    category_fr: 'Immigration Québec',
    category_en: 'Quebec Immigration',
    date: '2024-12-10',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1559131397-f94da358f7ca?w=800&h=500&fit=crop'
  },
  {
    id: '3',
    title_fr: 'Réunification Familiale : Parrainer un membre de sa famille',
    title_en: 'Family Reunification: Sponsoring a Family Member',
    excerpt_fr: 'Les conditions et procédures pour parrainer votre conjoint, vos enfants ou vos parents pour immigrer au Canada.',
    excerpt_en: 'The conditions and procedures for sponsoring your spouse, children or parents to immigrate to Canada.',
    category_fr: 'Parrainage Familial',
    category_en: 'Family Sponsorship',
    date: '2024-12-05',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=500&fit=crop'
  },
  {
    id: '4',
    title_fr: 'Permis de Travail Ouvert : Qui peut en bénéficier?',
    title_en: 'Open Work Permit: Who Can Benefit?',
    excerpt_fr: 'Comprendre les différents types de permis de travail et les conditions pour obtenir un permis ouvert au Canada.',
    excerpt_en: 'Understanding the different types of work permits and the conditions for obtaining an open permit in Canada.',
    category_fr: 'Permis de Travail',
    category_en: 'Work Permits',
    date: '2024-11-28',
    readTime: 4,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop'
  },
  {
    id: '5',
    title_fr: 'Étudier au Canada : Les programmes post-diplôme',
    title_en: 'Study in Canada: Post-Graduation Programs',
    excerpt_fr: 'Comment obtenir un permis de travail post-diplôme et les voies vers la résidence permanente pour les étudiants internationaux.',
    excerpt_en: 'How to obtain a post-graduation work permit and pathways to permanent residence for international students.',
    category_fr: 'Études',
    category_en: 'Studies',
    date: '2024-11-20',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop'
  },
  {
    id: '6',
    title_fr: 'Citoyenneté Canadienne : Les étapes et délais actuels',
    title_en: 'Canadian Citizenship: Current Steps and Timelines',
    excerpt_fr: 'Guide complet sur le processus de naturalisation et les exigences pour devenir citoyen canadien.',
    excerpt_en: 'Complete guide on the naturalization process and requirements to become a Canadian citizen.',
    category_fr: 'Citoyenneté',
    category_en: 'Citizenship',
    date: '2024-11-15',
    readTime: 6,
    image: 'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800&h=500&fit=crop'
  },
];

const categories = {
  fr: ['Tous', 'Entrée Express', 'Immigration Québec', 'Parrainage Familial', 'Permis de Travail', 'Études', 'Citoyenneté'],
  en: ['All', 'Express Entry', 'Quebec Immigration', 'Family Sponsorship', 'Work Permits', 'Studies', 'Citizenship']
};

export default function Blog() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const content = {
    fr: {
      title: 'Blog & Actualités',
      subtitle: 'Restez informé des dernières nouvelles en immigration canadienne',
      searchPlaceholder: 'Rechercher un article...',
      readMore: 'Lire la suite',
      minRead: 'min de lecture',
      noResults: 'Aucun article trouvé',
      backHome: 'Retour à l\'accueil',
    },
    en: {
      title: 'Blog & News',
      subtitle: 'Stay informed about the latest Canadian immigration news',
      searchPlaceholder: 'Search articles...',
      readMore: 'Read more',
      minRead: 'min read',
      noResults: 'No articles found',
      backHome: 'Back to home',
    },
  };

  const t = content[language];

  const filteredPosts = blogPosts.filter(post => {
    const title = language === 'fr' ? post.title_fr : post.title_en;
    const excerpt = language === 'fr' ? post.excerpt_fr : post.excerpt_en;
    const category = language === 'fr' ? post.category_fr : post.category_en;
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tous' || selectedCategory === 'All' || 
                           category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg bg-card border-border"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories[language].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={language === 'fr' ? post.title_fr : post.title_en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                        <Tag size={12} />
                        {language === 'fr' ? post.category_fr : post.category_en}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {post.readTime} {t.minRead}
                      </span>
                    </div>

                    <h2 className="font-heading text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {language === 'fr' ? post.title_fr : post.title_en}
                    </h2>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {language === 'fr' ? post.excerpt_fr : post.excerpt_en}
                    </p>

                    <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      {t.readMore}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground mb-6">{t.noResults}</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
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
