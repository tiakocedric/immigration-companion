import { CheckCircle, FileCheck, Scale, Shield, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface LegalComplianceProps {
  language: 'fr' | 'en';
}

export default function LegalCompliance({ language }: LegalComplianceProps) {
  const content = {
    fr: {
      title: 'Conformité légale et réglementation',
      subtitle: 'Autorisé par le Collège des consultants en immigration et en citoyenneté',
      description:
        'En tant que consultant réglementé membre du CICC (Collège des consultants en immigration et en citoyenneté du Canada), je suis légalement autorisé à représenter mes clients devant Immigration, Réfugiés et Citoyenneté Canada (IRCC).',
      guarantees: [
        {
          icon: Shield,
          title: 'Protection garantie',
          description:
            'Tous les consultants réglementés sont couverts par une assurance responsabilité professionnelle pour protéger vos intérêts.',
        },
        {
          icon: Scale,
          title: 'Code déontologique',
          description:
            'Soumis à un code de conduite strict et à des normes professionnelles élevées établies par le CICC.',
        },
        {
          icon: FileCheck,
          title: 'Formation continue',
          description:
            'Obligation de suivre une formation continue pour rester à jour avec les lois et politiques d\'immigration.',
        },
        {
          icon: CheckCircle,
          title: 'Recours disponible',
          description:
            'Le CICC offre un mécanisme de plaintes pour les clients insatisfaits des services reçus.',
        },
      ],
      verifyTitle: 'Vérifiez mon statut',
      verifyDescription:
        'Vous pouvez vérifier mon statut de membre en règle sur le registre public du CICC.',
      verifyButton: 'Consulter le registre CICC',
      importantTitle: 'Important',
      importantText:
        'Au Canada, seuls les consultants réglementés en immigration (CRCIC), les avocats et les notaires du Québec sont autorisés à facturer des honoraires pour des conseils ou représentations en matière d\'immigration.',
    },
    en: {
      title: 'Legal Compliance & Regulation',
      subtitle: 'Authorized by the College of Immigration and Citizenship Consultants',
      description:
        'As a regulated consultant and member of the CICC (College of Immigration and Citizenship Consultants of Canada), I am legally authorized to represent my clients before Immigration, Refugees and Citizenship Canada (IRCC).',
      guarantees: [
        {
          icon: Shield,
          title: 'Guaranteed Protection',
          description:
            'All regulated consultants are covered by professional liability insurance to protect your interests.',
        },
        {
          icon: Scale,
          title: 'Code of Ethics',
          description:
            'Subject to a strict code of conduct and high professional standards established by the CICC.',
        },
        {
          icon: FileCheck,
          title: 'Continuing Education',
          description:
            'Required to complete continuing education to stay current with immigration laws and policies.',
        },
        {
          icon: CheckCircle,
          title: 'Recourse Available',
          description:
            'The CICC offers a complaints mechanism for clients dissatisfied with services received.',
        },
      ],
      verifyTitle: 'Verify My Status',
      verifyDescription:
        'You can verify my status as a member in good standing on the CICC public registry.',
      verifyButton: 'Check CICC Registry',
      importantTitle: 'Important',
      importantText:
        'In Canada, only regulated immigration consultants (RCICs), lawyers, and Quebec notaries are authorized to charge fees for immigration advice or representation.',
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-txt-primary mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-lg max-w-3xl mx-auto">
            {content[language].subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="bg-surface border border-border rounded-3xl p-8 lg:p-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-full bg-brand-red flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-xl">★</span>
            </div>
            <div>
              <p className="text-txt-primary leading-relaxed text-lg">
                {content[language].description}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {content[language].guarantees.map((item, index) => (
              <motion.div
                key={item.title}
                className="flex gap-4 p-6 rounded-2xl bg-background/50 border border-border hover:border-brand-red/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-txt-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-txt-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-surface border border-border rounded-3xl p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-semibold text-xl text-txt-primary mb-4">
              {content[language].verifyTitle}
            </h3>
            <p className="text-txt-secondary mb-6">
              {content[language].verifyDescription}
            </p>
            <a
              href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-primary-foreground rounded-full font-semibold hover:bg-brand-red/90 transition-colors"
            >
              {content[language].verifyButton}
              <ExternalLink size={16} />
            </a>
          </motion.div>

          <motion.div 
            className="bg-brand-red/10 border border-brand-red/30 rounded-3xl p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-semibold text-xl text-txt-primary mb-4">
              {content[language].importantTitle}
            </h3>
            <p className="text-txt-secondary leading-relaxed">
              {content[language].importantText}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
