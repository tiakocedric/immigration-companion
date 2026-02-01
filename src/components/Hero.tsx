import { ArrowRight, Award, MapPin, Phone, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSiteContent } from '@/hooks/useSiteContent';
import franclinPhoto from '@/assets/franclin-profile.jpeg';

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
      badge: 'MIMBIMMIGRATION CONSULTANCY INC.',
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
      badge: 'MIMBIMMIGRATION CONSULTANCY INC.',
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
    <section id="home" className="relative min-h-screen flex items-center pt-16 sm:pt-20 pb-8 sm:pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-5 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20">
              <Shield size={14} className="text-primary sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium text-primary">{content[language].badge}</span>
            </div>

            {/* Title */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-txt-primary leading-tight">
                {content[language].title}
              </h1>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight">
                {content[language].titleHighlight}
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-txt-secondary leading-relaxed max-w-xl">
              {content[language].description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => scrollToSection('#appointment')}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                {content[language].cta}
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button
                onClick={() => scrollToSection('#services')}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-2 border-border text-txt-primary rounded-lg font-semibold text-sm sm:text-base hover:bg-hover hover:border-primary/30 transition-all"
              >
                {content[language].ctaSecondary}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-border">
              {content[language].stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <p className="text-lg sm:text-2xl lg:text-3xl font-heading font-bold text-primary">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-txt-secondary mt-0.5 sm:mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Consultant Card */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-surface border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-corporate-lg">
              {/* Photo & Info */}
              <div className="flex items-center gap-3 sm:gap-5 pb-4 sm:pb-6 border-b border-border">
                <div className="w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-muted flex items-center justify-center border-2 border-primary/20 flex-shrink-0">
                  <img src={franclinPhoto} alt={consultantName} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-heading font-semibold text-txt-primary truncate">{consultantName}</h3>
                  <p className="text-primary font-medium text-xs sm:text-sm mt-0.5 sm:mt-1">{consultantTitle}</p>
                </div>
              </div>

              {/* Credentials */}
              <div className="py-4 sm:py-6 space-y-2 sm:space-y-3 border-b border-border">
                {content[language].credentials.map((cred) => (
                  <div key={cred.text} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <cred.icon size={14} className="text-primary sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-txt-primary font-medium text-sm sm:text-base">{cred.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                <a href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-2 sm:gap-3 text-txt-secondary hover:text-txt-primary transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-primary sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{contactPhone}</span>
                </a>
                <div className="flex items-center gap-2 sm:gap-3 text-txt-secondary">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-primary sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{contactAddress}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => scrollToSection('#appointment')}
                className="w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                {language === 'fr' ? 'Prendre rendez-vous' : 'Book Appointment'}
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-accent/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}