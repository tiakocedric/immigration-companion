import { ArrowRight, Award, MapPin, Phone, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/useSiteContent';

interface HeroProps {
  language: 'fr' | 'en';
}

export default function Hero({ language }: HeroProps) {
  const { getContent, getImage } = useSiteContent();
  
  const consultantPhoto = getImage('consultant_photo');
  const consultantName = getContent('consultant_name', language) || 'Mimb Franklin';
  const consultantTitle = getContent('consultant_title', language) || (language === 'fr' ? 'Consultant CRIC' : 'RCIC Consultant');
  const contactPhone = getContent('contact_phone', language) || '(514) 462-7623';
  const contactAddress = getContent('contact_address', language) || 'Montréal, Québec';

  const content = {
    fr: {
      badge: 'Consultant réglementé CICC',
      title: 'Votre partenaire de confiance en',
      titleHighlight: 'immigration canadienne',
      description: 'Accompagnement professionnel et personnalisé pour concrétiser votre projet d\'immigration. Expertise réglementée, processus transparent, résultats prouvés.',
      cta: 'Planifier une consultation',
      ctaSecondary: 'Découvrir nos services',
      stats: [
        { value: '500+', label: 'Dossiers traités' },
        { value: '98%', label: 'Taux de satisfaction' },
        { value: '15+', label: 'Programmes maîtrisés' },
      ],
      credentials: [
        { icon: Shield, text: 'Membre CICC' },
        { icon: Award, text: 'Consultant réglementé' },
      ],
    },
    en: {
      badge: 'CICC Regulated Consultant',
      title: 'Your trusted partner in',
      titleHighlight: 'Canadian immigration',
      description: 'Professional and personalized guidance to make your immigration project a reality. Regulated expertise, transparent process, proven results.',
      cta: 'Schedule a Consultation',
      ctaSecondary: 'Explore Services',
      stats: [
        { value: '500+', label: 'Cases handled' },
        { value: '98%', label: 'Satisfaction rate' },
        { value: '15+', label: 'Programs mastered' },
      ],
      credentials: [
        { icon: Shield, text: 'CICC Member' },
        { icon: Award, text: 'Regulated Consultant' },
      ],
    },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">{content[language].badge}</span>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold text-txt-primary leading-tight">
                {content[language].title}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight">
                {content[language].titleHighlight}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-txt-secondary leading-relaxed max-w-xl">
              {content[language].description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('#appointment')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                {content[language].cta}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-border text-txt-primary rounded-lg font-semibold hover:bg-hover hover:border-primary/30 transition-all"
              >
                {content[language].ctaSecondary}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {content[language].stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <p className="text-2xl sm:text-3xl font-heading font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-txt-secondary mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consultant Card */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-surface border border-border rounded-2xl p-8 shadow-corporate-lg">
              {/* Photo & Info */}
              <div className="flex items-center gap-5 pb-6 border-b border-border">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex items-center justify-center border-2 border-primary/20">
                  {consultantPhoto ? (
                    <img src={consultantPhoto} alt={consultantName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-txt-secondary" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-txt-primary">{consultantName}</h3>
                  <p className="text-primary font-medium text-sm mt-1">{consultantTitle}</p>
                </div>
              </div>

              {/* Credentials */}
              <div className="py-6 space-y-3 border-b border-border">
                {content[language].credentials.map((cred) => (
                  <div key={cred.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <cred.icon size={16} className="text-primary" />
                    </div>
                    <span className="text-txt-primary font-medium">{cred.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="pt-6 space-y-4">
                <a href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 text-txt-secondary hover:text-txt-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <span className="font-medium">{contactPhone}</span>
                </a>
                <div className="flex items-center gap-3 text-txt-secondary">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <span className="font-medium">{contactAddress}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToSection('#appointment')}
                className="w-full mt-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {language === 'fr' ? 'Prendre rendez-vous' : 'Book Appointment'}
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}