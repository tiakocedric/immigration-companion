import { Award, CheckCircle, Globe, Shield, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutProps {
  language: 'fr' | 'en';
}

export default function About({ language }: AboutProps) {
  const content = {
    fr: {
      sectionLabel: 'À propos',
      title: 'Expertise réglementée au service de votre réussite',
      description: 'Consultant réglementé en immigration canadienne, j\'accompagne familles, professionnels et entreprises avec la rigueur et la transparence d\'un cabinet d\'affaires. Chaque dossier bénéficie d\'une analyse approfondie et d\'une stratégie personnalisée.',
      mission: {
        title: 'Notre mission',
        text: 'Faciliter des décisions claires, conformes et stratégiques pour chaque client. La confiance s\'installe lorsque la méthode est structurée et transparente.',
      },
      company: 'MIMBIMMIGRATION CONSULTANCY INC.',
      companySubtext: 'Membre en règle du CICC',
      values: [
        {
          icon: Shield,
          title: 'Conformité',
          description: 'Processus audité et respect strict des normes canadiennes.',
        },
        {
          icon: Award,
          title: 'Excellence',
          description: 'Analyse approfondie et documentation rigoureuse.',
        },
        {
          icon: Users,
          title: 'Accompagnement',
          description: 'Suivi personnalisé et mises à jour proactives.',
        },
        {
          icon: Globe,
          title: 'Bilinguisme',
          description: 'Service complet en français et en anglais.',
        },
      ],
      approach: [
        'Évaluation initiale gratuite',
        'Stratégie personnalisée',
        'Documentation complète',
        'Suivi continu du dossier',
        'Communication transparente',
      ],
    },
    en: {
      sectionLabel: 'About',
      title: 'Regulated expertise at the service of your success',
      description: 'As a regulated Canadian immigration consultant, I support families, professionals and businesses with the rigor and transparency of a corporate firm. Each file receives thorough analysis and a personalized strategy.',
      mission: {
        title: 'Our mission',
        text: 'Facilitate clear, compliant and strategic decisions for each client. Trust is built when the methodology is structured and transparent.',
      },
      company: 'MIMBIMMIGRATION CONSULTANCY INC.',
      companySubtext: 'CICC Member in Good Standing',
      values: [
        {
          icon: Shield,
          title: 'Compliance',
          description: 'Audited processes and strict adherence to Canadian standards.',
        },
        {
          icon: Award,
          title: 'Excellence',
          description: 'In-depth analysis and rigorous documentation.',
        },
        {
          icon: Users,
          title: 'Support',
          description: 'Personalized follow-up and proactive updates.',
        },
        {
          icon: Globe,
          title: 'Bilingualism',
          description: 'Full service in both French and English.',
        },
      ],
      approach: [
        'Free initial assessment',
        'Personalized strategy',
        'Complete documentation',
        'Continuous file monitoring',
        'Transparent communication',
      ],
    },
  };

  return (
    <section id="about" className="py-24 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-txt-primary mb-6">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-lg leading-relaxed">
            {content[language].description}
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Mission & Company */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Mission card */}
            <div className="bg-surface rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-txt-primary">
                  {content[language].mission.title}
                </h3>
              </div>
              <p className="text-txt-secondary leading-relaxed">
                {content[language].mission.text}
              </p>
            </div>

            {/* Company card */}
            <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
              <p className="font-heading font-semibold text-lg text-txt-primary tracking-wide">
                {content[language].company}
              </p>
              <p className="text-primary font-medium text-sm mt-2">
                {content[language].companySubtext}
              </p>
            </div>

            {/* Approach list */}
            <div className="bg-surface rounded-xl p-8 border border-border">
              <h4 className="font-heading font-semibold text-txt-primary mb-4">
                {language === 'fr' ? 'Notre approche' : 'Our approach'}
              </h4>
              <ul className="space-y-3">
                {content[language].approach.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary flex-shrink-0" />
                    <span className="text-txt-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Values grid */}
          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {content[language].values.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-surface rounded-xl p-6 border border-border hover:border-primary/30 transition-all hover:shadow-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-semibold text-txt-primary mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-txt-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}