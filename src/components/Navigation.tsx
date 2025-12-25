import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import cricLogo from '@/assets/cric-logo.png';
interface NavigationProps {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
}

export default function Navigation({ language, setLanguage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = {
    fr: [
      { label: 'Accueil', href: '#home' },
      { label: 'Expertise', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Processus', href: '#process' },
      { label: 'Témoignages', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Blog', href: '/blog', isPage: true },
      { label: 'Contact', href: '#contact' },
    ],
    en: [
      { label: 'Home', href: '#home' },
      { label: 'Expertise', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Blog', href: '/blog', isPage: true },
      { label: 'Contact', href: '#contact' },
    ],
  };

  const handleNavClick = (href: string, isPage?: boolean) => {
    if (isPage) {
      navigate(href);
      setIsMenuOpen(false);
      return;
    }
    
    // If we're not on home page, go home first then scroll
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  // Animation variants for hamburger icon
  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  };
  
  const middleLineVariants = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: -10 }
  };
  
  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  };

  // Menu animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
        when: "afterChildren" as const
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.05
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen
        ? 'bg-surface/98 backdrop-blur-lg shadow-corporate border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2 sm:gap-3"
            >
              <img 
                src={cricLogo} 
                alt="CRIC-CISR - Consultant réglementé en immigration canadienne" 
                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
              />
              <div className="hidden md:block">
                <p className="font-heading font-semibold text-txt-primary text-xs sm:text-sm tracking-wide">MIMBIMMIGRATION</p>
                <p className="text-[9px] sm:text-[10px] text-txt-secondary tracking-widest uppercase">Consultant réglementé CICC</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems[language].map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href, item.isPage)}
                className="px-3 xl:px-4 py-2 text-sm font-medium text-txt-secondary hover:text-txt-primary transition-colors rounded-md hover:bg-hover"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-lg bg-muted/50 hover:bg-muted text-txt-secondary hover:text-txt-primary transition-all"
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
              </motion.div>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-muted/50 hover:bg-muted text-txt-secondary hover:text-txt-primary font-medium text-xs sm:text-sm transition-all"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('#appointment')}
              className="hidden md:flex items-center gap-2 px-4 xl:px-5 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-sm"
            >
              {language === 'fr' ? 'Consultation' : 'Book Now'}
              <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </button>

            {/* Mobile Menu Button - Animated Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 text-txt-primary rounded-lg hover:bg-muted/50 transition-colors relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <div className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between items-center">
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full origin-center"
                  variants={topLineVariants}
                  animate={isMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  variants={middleLineVariants}
                  animate={isMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full origin-center"
                  variants={bottomLineVariants}
                  animate={isMenuOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Animated */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="py-4 sm:py-6 border-t border-border">
                <div className="flex flex-col gap-1">
                  {navItems[language].map((item, index) => (
                    <motion.button
                      key={item.href}
                      variants={menuItemVariants}
                      onClick={() => handleNavClick(item.href, item.isPage)}
                      className="px-4 py-3 sm:py-3.5 text-left text-txt-secondary hover:text-txt-primary hover:bg-hover rounded-lg transition-colors font-medium text-sm sm:text-base flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={16} className="text-txt-secondary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                  <motion.div 
                    variants={menuItemVariants}
                    className="pt-4 px-4"
                  >
                    <button
                      onClick={() => handleNavClick('#appointment')}
                      className="w-full py-3.5 sm:py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-sm sm:text-base text-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      {language === 'fr' ? 'Planifier une consultation' : 'Schedule a Consultation'}
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMenuOpen(false)}
            style={{ top: '64px' }}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
