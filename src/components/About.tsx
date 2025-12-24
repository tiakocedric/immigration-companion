import { Award, Globe, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutProps {
  language: 'fr' | 'en';
}

export default function About({ language }: AboutProps) {
  const content = {
    fr: {
      sectionLabel: 'Expertise',
      title: 'À propos de Mimb Franklin',
      subtitle: 'Un accompagnement corporate pour un parcours réglementé.',
      bio: 'Consultant réglementé en immigration canadienne, je défends les dossiers avec la rigueur d\'un cabinet d\'affaires. Depuis Montréal, j\'accompagne des familles, talents et entreprises dans toutes les juridictions canadiennes.',
      mission: 'Mission',
      missionText:
        'Faciliter des décisions claires, conformes et stratégiques pour chaque client. La confiance s\'installe lorsque la méthode est structurée et transparente.',
      company: 'MIMBIMMIGRATION CONSULTANCY INC.',
      companySubtext: 'Inscrit au registre du CICC',
      values: 'Piliers',
      valueItems: [
        {
          icon: Shield,
          title: 'Conformité',
          description: 'Processus audité et respect strict des normes canadiennes.',
        },
        {
          icon: Award,
          title: 'Excellence',
          description: 'Analyse approfondie et mémorandums clairs pour chaque dossier.',
        },
        {
          icon: Users,
          title: 'Accompagnement',
          description: 'Relation suivie et mise à jour proactive des clients.',
        },
        {
          icon: Globe,
          title: 'Bilinguisme',
          description: 'Service complet en français et en anglais.',
        },
      ],
    },
    en: {
      sectionLabel: 'Expertise',
      title: 'About Mimb Franklin',
      subtitle: 'Corporate-grade support for regulated immigration.',
      bio: 'Regulated Canadian immigration consultant, I manage files with the rigor of a corporate law firm. Based in Montreal, I support families, talents and businesses across all Canadian jurisdictions.',
      mission: 'Mission',
      missionText:
        'Facilitate clear, compliant and strategic decisions for each client. Trust is built when the methodology is structured and transparent.',
      company: 'MIMBIMMIGRATION CONSULTANCY INC.',
      companySubtext: 'Registered with the CICC',
      values: 'Pillars',
      valueItems: [
        {
          icon: Shield,
          title: 'Compliance',
          description: 'Audited processes and strict adherence to Canadian standards.',
        },
        {
          icon: Award,
          title: 'Excellence',
          description: 'In-depth analysis and clear memoranda for each file.',
        },
        {
          icon: Users,
          title: 'Support',
          description: 'Ongoing relationship and proactive client updates.',
        },
        {
          icon: Globe,
          title: 'Bilingualism',
          description: 'Full service in both French and English.',
        },
      ],
    },
  };

  return (
    <section id="about" className="py-20 bg-surface">
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
          <p className="text-txt-secondary text-lg max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-txt-secondary leading-relaxed">
              {content[language].bio}
            </p>

            <div className="bg-background rounded-3xl p-8 border border-border">
              <h3 className="font-heading font-semibold text-brand-red mb-3">
                {content[language].mission}
              </h3>
              <p className="text-txt-secondary leading-relaxed">
                {content[language].missionText}
              </p>
            </div>

            <div className="bg-brand-red/10 rounded-3xl p-8 border border-brand-red/30">
              <p className="font-heading font-semibold text-txt-primary tracking-wider mb-2">
                {content[language].company}
              </p>
              <p className="text-sm text-txt-secondary">
                {content[language].companySubtext}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-semibold text-xl text-txt-primary mb-6">
              {content[language].values}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {content[language].valueItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-background rounded-2xl p-6 border border-border hover:border-brand-red/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <h4 className="font-heading font-semibold text-txt-primary mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-txt-secondary">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
