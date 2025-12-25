import { Briefcase, GraduationCap, Heart, Home, Plane, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesProps {
  language: 'fr' | 'en';
}

export default function Services({ language }: ServicesProps) {
  const content = {
    fr: {
      sectionLabel: 'Services',
      title: 'Solutions d\'immigration complètes',
      subtitle: 'Expertise réglementée pour tous les programmes d\'immigration canadienne.',
      cta: 'Planifier une consultation',
      guarantees: [
        'Analyse complète du dossier',
        'Documents préparés et vérifiés',
        'Service bilingue FR/EN',
      ],
      services: [
        {
          icon: Home,
          title: 'Résidence permanente',
          description: 'Entrée Express, travailleurs qualifiés, parrainage familial et programmes provinciaux.',
          features: ['Entrée Express', 'PNP', 'Parrainage familial'],
        },
        {
          icon: Briefcase,
          title: 'Permis de travail',
          description: 'EIMT, mobilité francophone, transferts intra-entreprises et permis ouverts.',
          features: ['EIMT', 'Mobilité francophone', 'Transferts'],
        },
        {
          icon: GraduationCap,
          title: 'Permis d\'études',
          description: 'CAQ, permis d\'études, permis post-diplôme et changements de statut.',
          features: ['CAQ', 'PTPD', 'Changement de statut'],
        },
        {
          icon: Plane,
          title: 'Visas visiteurs',
          description: 'Visas visiteurs, super visas, prolongations et restaurations de statut.',
          features: ['Visa visiteur', 'Super visa', 'Prolongation'],
        },
        {
          icon: Heart,
          title: 'Protection et asile',
          description: 'Demandes d\'asile, statuts de réfugiés et mesures de protection humanitaire.',
          features: ['Demande d\'asile', 'Statut de réfugié'],
        },
      ],
    },
    en: {
      sectionLabel: 'Services',
      title: 'Complete immigration solutions',
      subtitle: 'Regulated expertise for all Canadian immigration programs.',
      cta: 'Schedule a consultation',
      guarantees: [
        'Complete file analysis',
        'Prepared and verified documents',
        'Bilingual FR/EN service',
      ],
      services: [
        {
          icon: Home,
          title: 'Permanent Residence',
          description: 'Express Entry, skilled workers, family sponsorship and provincial programs.',
          features: ['Express Entry', 'PNP', 'Family sponsorship'],
        },
        {
          icon: Briefcase,
          title: 'Work Permits',
          description: 'LMIA, Francophone mobility, intra-company transfers and open permits.',
          features: ['LMIA', 'Francophone mobility', 'Transfers'],
        },
        {
          icon: GraduationCap,
          title: 'Study Permits',
          description: 'CAQ, study permits, post-graduation permits and status changes.',
          features: ['CAQ', 'PGWP', 'Status change'],
        },
        {
          icon: Plane,
          title: 'Visitor Visas',
          description: 'Visitor visas, super visas, extensions and status restorations.',
          features: ['Visitor visa', 'Super visa', 'Extension'],
        },
        {
          icon: Heart,
          title: 'Protection & Asylum',
          description: 'Asylum claims, refugee status and humanitarian protection measures.',
          features: ['Asylum claim', 'Refugee status'],
        },
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
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-txt-primary mb-3 sm:mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-sm sm:text-base lg:text-lg px-4">
            {content[language].subtitle}
          </p>
        </motion.div>

        {/* Guarantees */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {content[language].guarantees.map((guarantee) => (
            <div
              key={guarantee}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-surface rounded-lg border border-border"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm text-txt-primary font-medium">{guarantee}</span>
            </div>
          ))}
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {content[language].services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group bg-surface rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 border border-border hover:border-primary/30 transition-all hover:shadow-card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-base sm:text-lg lg:text-xl text-txt-primary mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-txt-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-muted text-txt-secondary text-[10px] sm:text-xs rounded-md font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => scrollToSection('#appointment')}
            className="inline-flex items-center gap-2 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm sm:text-base shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            {content[language].cta}
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}