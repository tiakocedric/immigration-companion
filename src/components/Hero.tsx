import { Mail, MapPin, Phone, User } from 'lucide-react';
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
  const contactEmail = getContent('contact_email', language) || 'fmimb@yahoo.fr';
  const contactAddress = getContent('contact_address', language) || 'Montréal, Québec, Canada';

  const content = {
    fr: {
      badge: 'MIMBIMMIGRATION CONSULTANCY INC.',
      title: 'Immigration réglementée, confiance garantie.',
      description:
        'Accompagnement structuré, sérieux et conforme aux normes canadiennes pour transformer vos projets en réalité. Nous défendons vos intérêts avec la rigueur d\'un cabinet corporate.',
      highlights: ['Confiance', 'Professionnalisme', 'Immigration réglementée'],
      ctaAppointment: 'Planifier une consultation',
      ctaContact: 'Parler à un expert',
      stats: [
        { value: '98%', label: 'Clients satisfaits' },
        { value: '15+', label: 'Programmes d\'immigration' },
        { value: '2 langues', label: 'Français & Anglais' },
      ],
      ciccBadge: 'Membre réglementé',
    },
    en: {
      badge: 'MIMBIMMIGRATION CONSULTANCY INC.',
      title: 'Regulated immigration, trust assured.',
      description:
        'Structured, corporate-grade guidance that keeps every file compliant and every family confident. We secure your future in Canada with rigour and clarity.',
      highlights: ['Trust', 'Professionalism', 'Regulated expertise'],
      ctaAppointment: 'Schedule a consultation',
      ctaContact: 'Speak with an expert',
      stats: [
        { value: '98%', label: 'Satisfied clients' },
        { value: '15+', label: 'Immigration streams' },
        { value: '2 languages', label: 'French & English' },
      ],
      ciccBadge: 'Regulated member',
    },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 lg:pt-32 pb-16 bg-hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center px-6 py-2 rounded-full bg-foreground/10 text-txt-primary uppercase font-bold tracking-[0.3em] text-xs sm:text-sm">
                {content[language].badge}
              </span>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-red border-2 border-foreground/30 shadow-lg">
                <div className="w-8 h-8 rounded-full bg-foreground/20 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">★</span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-bold tracking-widest text-primary-foreground">
                    CICC-ICCRC
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-primary-foreground/90">
                    {content[language].ciccBadge}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold leading-tight text-txt-primary">
              {content[language].title}
            </h1>

            <p className="text-lg text-txt-secondary leading-relaxed max-w-2xl">
              {content[language].description}
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {content[language].highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="rounded-2xl border border-border bg-surface px-4 py-5 text-center text-sm font-semibold tracking-wide text-txt-primary shadow-sm hover:shadow-md transition-all hover:bg-hover"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('#appointment')}
                className="px-8 py-4 bg-brand-red text-primary-foreground rounded-full font-semibold shadow-lg shadow-brand-red/30 hover:bg-brand-red/90 hover:-translate-y-0.5 transition-all"
              >
                {content[language].ctaAppointment}
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 border border-border text-txt-primary rounded-full font-semibold hover:bg-hover transition-colors"
              >
                {content[language].ctaContact}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-sm text-txt-secondary">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center shadow-md">
                  <Phone size={20} className="text-primary-foreground" />
                </span>
                <a href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`} className="hover:text-txt-primary transition-colors">
                  {contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center shadow-md">
                  <Mail size={20} className="text-primary-foreground" />
                </span>
                <a href={`mailto:${contactEmail}`} className="hover:text-txt-primary transition-colors">
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center shadow-md">
                  <MapPin size={20} className="text-primary-foreground" />
                </span>
                <span>{contactAddress}</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-surface border border-border rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full border-2 border-brand-red overflow-hidden shadow-xl bg-brand-red/20 flex items-center justify-center">
                  {consultantPhoto ? (
                    <img src={consultantPhoto} alt={consultantName} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-brand-red" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-heading font-semibold text-txt-primary">
                    {consultantName}
                  </p>
                  <p className="text-brand-red tracking-[0.2em] text-xs uppercase">
                    {consultantTitle}
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                {content[language].stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between rounded-2xl bg-surface border border-border px-6 py-4 hover:shadow-md transition-all hover:bg-hover"
                  >
                    <p className="text-3xl font-heading font-semibold text-brand-red">{stat.value}</p>
                    <p className="text-sm text-txt-secondary text-right">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-brand-red/20 blur-2xl opacity-70" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-brand-light/20 blur-3xl opacity-70" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
