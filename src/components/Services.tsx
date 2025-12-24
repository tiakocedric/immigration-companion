import { Briefcase, GraduationCap, Heart, Home, Plane, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesProps {
  language: 'fr' | 'en';
}

export default function Services({ language }: ServicesProps) {
  const content = {
    fr: {
      sectionLabel: 'Services',
      title: 'Solutions corporate pour chaque programme',
      subtitle: 'Stratège dédié, contrôle de conformité et suivi proactif.',
      cta: 'Planifier une consultation',
      guarantees: [
        'Analyse complète du dossier',
        'Documents préparés et vérifiés',
        'Relation bilingue FR/EN',
      ],
      badge: 'Réglementé',
      services: [
        {
          icon: Home,
          title: 'Résidence permanente',
          description:
            'Planification Entrée Express, travailleurs qualifiés, parrainage familial et programmes provinciaux.',
        },
        {
          icon: Briefcase,
          title: 'Permis de travail',
          description:
            'EIMT, mobilité francophone, transferts intra-entreprises et permis ouverts.',
        },
        {
          icon: GraduationCap,
          title: 'Permis d\'études',
          description:
            'Stratégie CAQ, permis d\'études, permis post-diplôme et changements de statut.',
        },
        {
          icon: Plane,
          title: 'Visas visiteurs',
          description:
            'Visas visiteurs, super visas, prolongations de séjour et restaurations de statut.',
        },
        {
          icon: Heart,
          title: 'Protection et asile',
          description: 'Demandes d\'asile, statuts de réfugiés et mesures de protection.',
        },
      ],
    },
    en: {
      sectionLabel: 'Services',
      title: 'Corporate solutions for every program',
      subtitle: 'Dedicated strategist, compliance control and proactive follow-up.',
      cta: 'Schedule a consultation',
      guarantees: [
        'Complete file analysis',
        'Prepared and verified documents',
        'Bilingual FR/EN relationship',
      ],
      badge: 'Regulated',
      services: [
        {
          icon: Home,
          title: 'Permanent Residence',
          description:
            'Express Entry planning, skilled workers, family sponsorship and provincial programs.',
        },
        {
          icon: Briefcase,
          title: 'Work Permits',
          description:
            'LMIA, Francophone mobility, intra-company transfers and open permits.',
        },
        {
          icon: GraduationCap,
          title: 'Study Permits',
          description:
            'CAQ strategy, study permits, post-graduation permits and status changes.',
        },
        {
          icon: Plane,
          title: 'Visitor Visas',
          description:
            'Visitor visas, super visas, extensions of stay and status restorations.',
        },
        {
          icon: Heart,
          title: 'Protection & Asylum',
          description: 'Asylum claims, refugee status and protection measures.',
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
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-brand-red/10 text-brand-red text-sm font-semibold mb-4">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-txt-primary mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-lg max-w-3xl mx-auto mb-8">
            {content[language].subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {content[language].guarantees.map((guarantee) => (
              <div
                key={guarantee}
                className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-border"
              >
                <CheckCircle className="w-4 h-4 text-brand-red" />
                <span className="text-sm text-txt-primary">{guarantee}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('#appointment')}
            className="px-8 py-4 bg-brand-red text-primary-foreground rounded-full font-semibold shadow-lg shadow-brand-red/30 hover:bg-brand-red/90 transition-colors"
          >
            {content[language].cta}
          </button>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content[language].services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-surface rounded-3xl p-8 border border-border hover:border-brand-red/30 transition-all hover:shadow-lg group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:bg-brand-red/20 transition-colors">
                <service.icon className="w-7 h-7 text-brand-red" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-txt-primary mb-3">
                {service.title}
              </h3>
              <p className="text-txt-secondary leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-semibold rounded-full">
                {content[language].badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
