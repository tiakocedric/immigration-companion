import { Menu, X, Sun, Moon, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-surface/98 backdrop-blur-lg shadow-corporate border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-heading font-bold text-lg">M</span>
              </div>
              <div className="hidden sm:block">
                <p className="font-heading font-semibold text-txt-primary text-sm tracking-wide">MIMBIMMIGRATION</p>
                <p className="text-[10px] text-txt-secondary tracking-widest uppercase">Consultant réglementé CICC</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems[language].map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href, item.isPage)}
                className="px-4 py-2 text-sm font-medium text-txt-secondary hover:text-txt-primary transition-colors rounded-md hover:bg-hover"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-muted/50 hover:bg-muted text-txt-secondary hover:text-txt-primary transition-all"
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-txt-secondary hover:text-txt-primary font-medium text-sm transition-all"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('#appointment')}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-all shadow-sm"
            >
              {language === 'fr' ? 'Consultation' : 'Book Now'}
              <ChevronRight size={16} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-txt-primary rounded-lg hover:bg-muted/50 transition-colors"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in bg-surface/98 backdrop-blur-lg">
            <div className="flex flex-col gap-1">
              {navItems[language].map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href, item.isPage)}
                  className="px-4 py-3 text-left text-txt-secondary hover:text-txt-primary hover:bg-hover rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#appointment')}
                className="mt-4 mx-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center hover:bg-primary/90 transition-colors"
              >
                {language === 'fr' ? 'Planifier une consultation' : 'Schedule a Consultation'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}