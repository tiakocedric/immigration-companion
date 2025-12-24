import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
  language: 'fr' | 'en';
}

export default function FAQ({ language }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const content = {
    fr: {
      sectionLabel: 'Clarté',
      title: 'Questions fréquentes',
      subtitle: "Réponses aux questions les plus courantes sur l'immigration",
      faqs: [
        {
          question: 'Combien de temps prend une demande de résidence permanente?',
          answer:
            "Le délai varie selon le programme choisi. Pour l'Entrée Express, le traitement prend généralement 6 mois. Pour d'autres programmes, cela peut prendre de 12 à 24 mois. Je vous guide pour choisir le programme le plus rapide adapté à votre profil.",
        },
        {
          question: "Ai-je besoin d'une offre d'emploi pour immigrer au Canada?",
          answer:
            "Pas nécessairement. Certains programmes comme l'Entrée Express (catégorie fédérale des travailleurs qualifiés) ne requièrent pas d'offre d'emploi. Cependant, une offre validée peut augmenter vos points et accélérer votre candidature.",
        },
        {
          question: 'Quels sont vos honoraires?',
          answer:
            "Les honoraires varient selon le type de service et la complexité du dossier. Je propose une consultation initiale pour évaluer votre situation et vous fournir un devis détaillé. Contactez-moi pour plus d'informations.",
        },
        {
          question: 'Puis-je travailler pendant le traitement de ma demande?',
          answer:
            "Cela dépend de votre statut actuel au Canada. Si vous avez un permis de travail valide ou un statut implicite, vous pouvez continuer à travailler pendant le traitement. Je vous conseille sur les options disponibles.",
        },
        {
          question: 'Comment puis-je vérifier que vous êtes un consultant réglementé?',
          answer:
            "Vous pouvez vérifier mon statut sur le registre public du CICC (Collège des consultants en immigration et en citoyenneté). C'est votre garantie que je suis autorisé à pratiquer et soumis à des normes professionnelles strictes.",
        },
        {
          question: 'Offrez-vous des services en anglais et en français?',
          answer:
            "Oui, absolument! Je suis parfaitement bilingue et peux vous accompagner dans la langue de votre choix. Tous les documents et communications peuvent être préparés en français ou en anglais.",
        },
      ],
    },
    en: {
      sectionLabel: 'Clarity',
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions about immigration',
      faqs: [
        {
          question: 'How long does a permanent residence application take?',
          answer:
            'The timeframe varies depending on the program chosen. For Express Entry, processing typically takes 6 months. For other programs, it can take 12 to 24 months. I guide you to choose the fastest program suited to your profile.',
        },
        {
          question: 'Do I need a job offer to immigrate to Canada?',
          answer:
            'Not necessarily. Some programs like Express Entry (Federal Skilled Worker category) do not require a job offer. However, a validated offer can increase your points and accelerate your application.',
        },
        {
          question: 'What are your fees?',
          answer:
            'Fees vary depending on the type of service and complexity of the file. I offer an initial consultation to assess your situation and provide a detailed quote. Contact me for more information.',
        },
        {
          question: 'Can I work while my application is being processed?',
          answer:
            'It depends on your current status in Canada. If you have a valid work permit or implied status, you can continue working during processing. I advise you on available options.',
        },
        {
          question: 'How can I verify that you are a regulated consultant?',
          answer:
            "You can verify my status on the CICC (College of Immigration and Citizenship Consultants) public registry. This is your guarantee that I am authorized to practice and subject to strict professional standards.",
        },
        {
          question: 'Do you offer services in English and French?',
          answer:
            'Yes, absolutely! I am fully bilingual and can assist you in your preferred language. All documents and communications can be prepared in French or English.',
        },
      ],
    },
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <p className="text-txt-secondary text-lg">
            {content[language].subtitle}
          </p>
        </motion.div>

        <div className="space-y-4">
          {content[language].faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-surface rounded-2xl border border-border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-heading font-semibold text-txt-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-txt-secondary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-txt-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
