import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Code, GraduationCap, Heart, Shield, Pickaxe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OpportunitiesProps {
  language: 'fr' | 'en';
}

const sectors = {
  fr: [
    { icon: Code, title: 'STIM & Technologies', desc: 'Développeurs, ingénieurs logiciels, IA, data scientists' },
    { icon: Heart, title: 'Soins de santé', desc: 'Médecins, infirmiers, techniciens de laboratoire' },
    { icon: Shield, title: 'Cybersécurité', desc: 'Analystes SOC, ingénieurs sécurité, protection des données' },
    { icon: Pickaxe, title: 'Ressources naturelles', desc: 'Ingénieurs miniers, experts en environnement' },
    { icon: GraduationCap, title: 'Éducation', desc: 'Enseignants sciences, maths, IT et formateurs' },
    { icon: Briefcase, title: 'Professionnels qualifiés', desc: 'Expérience 1-3 ans, diplôme reconnu, bilingue' },
  ],
  en: [
    { icon: Code, title: 'STEM & Technology', desc: 'Developers, software engineers, AI, data scientists' },
    { icon: Heart, title: 'Healthcare', desc: 'Doctors, nurses, laboratory technicians' },
    { icon: Shield, title: 'Cybersecurity', desc: 'SOC analysts, security engineers, data protection' },
    { icon: Pickaxe, title: 'Natural Resources', desc: 'Mining engineers, environmental experts' },
    { icon: GraduationCap, title: 'Education', desc: 'Science, math, IT teachers and trainers' },
    { icon: Briefcase, title: 'Skilled Professionals', desc: '1-3 years experience, recognized diploma, bilingual' },
  ],
};

const content = {
  fr: {
    badge: 'Opportunités',
    title: 'Le Canada recrute des talents qualifiés',
    subtitle: 'Des opportunités concrètes dans des secteurs stratégiques en forte demande.',
    cta: 'Voir tous les détails',
  },
  en: {
    badge: 'Opportunities',
    title: 'Canada is recruiting skilled talent',
    subtitle: 'Real opportunities in high-demand strategic sectors.',
    cta: 'See full details',
  },
};

export default function Opportunities({ language }: OpportunitiesProps) {
  const t = content[language];
  const items = sectors[language];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20">
            🇨🇦 {t.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-txt-primary mb-3 sm:mb-4">
            {t.title}
          </h2>
          <p className="text-txt-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-surface rounded-xl p-5 sm:p-6 border border-border hover:border-primary/30 transition-all hover:shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-txt-primary text-sm sm:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-txt-secondary leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            {t.cta}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
