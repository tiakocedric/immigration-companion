import { CheckCircle, FileCheck, Scale, Shield, ExternalLink, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface LegalComplianceProps {
  language: 'fr' | 'en';
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export default function LegalCompliance({ language }: LegalComplianceProps) {
  const content = {
    fr: {
      sectionLabel: 'Conformité',
      title: 'Conformité légale et réglementation',
      subtitle: 'Autorisé par le Collège des consultants en immigration et en citoyenneté',
      description:
        'En tant que consultant réglementé membre du CICC, je suis légalement autorisé à représenter mes clients devant Immigration, Réfugiés et Citoyenneté Canada (IRCC).',
      guarantees: [
        {
          icon: Shield,
          title: 'Protection garantie',
          description: 'Couvert par une assurance responsabilité professionnelle.',
        },
        {
          icon: Scale,
          title: 'Code déontologique',
          description: 'Soumis à des normes professionnelles strictes.',
        },
        {
          icon: FileCheck,
          title: 'Formation continue',
          description: 'Toujours à jour avec les lois d\'immigration.',
        },
        {
          icon: CheckCircle,
          title: 'Recours disponible',
          description: 'Mécanisme de plaintes CICC accessible.',
        },
      ],
      verifyTitle: 'Vérifiez mon statut',
      verifyDescription: 'Consultez le registre public du CICC pour confirmer mon statut de membre.',
      verifyButton: 'Consulter le registre',
      importantTitle: 'Important',
      importantText: 'Seuls les consultants réglementés (CRCIC), avocats et notaires du Québec peuvent facturer des honoraires pour des conseils en immigration.',
    },
    en: {
      sectionLabel: 'Compliance',
      title: 'Legal Compliance & Regulation',
      subtitle: 'Authorized by the College of Immigration and Citizenship Consultants',
      description:
        'As a regulated CICC member, I am legally authorized to represent clients before Immigration, Refugees and Citizenship Canada (IRCC).',
      guarantees: [
        {
          icon: Shield,
          title: 'Guaranteed Protection',
          description: 'Covered by professional liability insurance.',
        },
        {
          icon: Scale,
          title: 'Code of Ethics',
          description: 'Subject to strict professional standards.',
        },
        {
          icon: FileCheck,
          title: 'Continuing Education',
          description: 'Always current with immigration laws.',
        },
        {
          icon: CheckCircle,
          title: 'Recourse Available',
          description: 'CICC complaints mechanism accessible.',
        },
      ],
      verifyTitle: 'Verify My Status',
      verifyDescription: 'Check the CICC public registry to confirm my member status.',
      verifyButton: 'Check Registry',
      importantTitle: 'Important',
      importantText: 'Only regulated consultants (RCICs), lawyers, and Quebec notaries can charge fees for immigration advice.',
    },
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-txt-primary mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-lg max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </motion.div>

        {/* Main content card */}
        <motion.div 
          className="bg-surface border border-border rounded-2xl p-8 lg:p-10 mb-12"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-start gap-5 mb-8 pb-8 border-b border-border">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-xl text-txt-primary mb-2">CICC Member</h3>
              <p className="text-txt-secondary leading-relaxed">{content[language].description}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content[language].guarantees.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-5 rounded-xl bg-background border border-border hover:border-primary/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-txt-primary mb-2">{item.title}</h4>
                <p className="text-sm text-txt-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-surface border border-border rounded-xl p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              {content[language].verifyTitle}
            </h3>
            <p className="text-txt-secondary text-sm mb-5">{content[language].verifyDescription}</p>
            <a
              href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              {content[language].verifyButton}
              <ExternalLink size={14} />
            </a>
          </motion.div>

          <motion.div 
            className="bg-accent/5 border border-accent/20 rounded-xl p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-heading font-semibold text-lg text-txt-primary mb-3">
              {content[language].importantTitle}
            </h3>
            <p className="text-txt-secondary text-sm leading-relaxed">{content[language].importantText}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}