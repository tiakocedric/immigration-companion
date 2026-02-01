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
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-16"
          {...fadeInUp}
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-heading font-semibold text-txt-primary mb-2 sm:mb-3 lg:mb-4 px-2">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-xs sm:text-sm lg:text-lg max-w-3xl mx-auto px-4">
            {content[language].subtitle}
          </p>
        </motion.div>

        {/* Main content card */}
        <motion.div 
          className="bg-surface border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-10 mb-6 sm:mb-8 lg:mb-12"
          {...fadeInUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-base sm:text-lg lg:text-xl text-txt-primary mb-1 sm:mb-2">CICC Member</h3>
              <p className="text-txt-secondary text-xs sm:text-sm lg:text-base leading-relaxed">{content[language].description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {content[language].guarantees.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-3 sm:p-4 lg:p-5 rounded-lg sm:rounded-xl bg-background border border-border hover:border-primary/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 lg:mb-4">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-txt-primary text-xs sm:text-sm mb-1 sm:mb-2">{item.title}</h4>
                <p className="text-[10px] sm:text-xs lg:text-sm text-txt-secondary leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <motion.div 
            className="bg-surface border border-border rounded-xl p-4 sm:p-5 lg:p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-heading font-semibold text-sm sm:text-base lg:text-lg text-txt-primary mb-2 sm:mb-3">
              {content[language].verifyTitle}
            </h3>
            <p className="text-txt-secondary text-xs sm:text-sm mb-4 sm:mb-5">{content[language].verifyDescription}</p>
            <a
              href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-xs sm:text-sm hover:bg-primary/90 transition-colors"
            >
              {content[language].verifyButton}
              <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
            </a>
          </motion.div>

          <motion.div 
            className="bg-accent/5 border border-accent/20 rounded-xl p-4 sm:p-5 lg:p-6"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-heading font-semibold text-sm sm:text-base lg:text-lg text-txt-primary mb-2 sm:mb-3">
              {content[language].importantTitle}
            </h3>
            <p className="text-txt-secondary text-xs sm:text-sm leading-relaxed">{content[language].importantText}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}