import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
  language: 'fr' | 'en';
}

export default function FAQ({ language }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const content = {
    fr: {
      sectionLabel: 'FAQ',
      title: 'Questions fréquentes',
      subtitle: "Réponses aux questions les plus courantes sur l'immigration",
      faqs: [
        { question: 'Combien de temps prend une demande de résidence permanente?', answer: "Le délai varie selon le programme choisi. Pour l'Entrée Express, le traitement prend généralement 6 mois. Pour d'autres programmes, cela peut prendre de 12 à 24 mois." },
        { question: "Ai-je besoin d'une offre d'emploi pour immigrer au Canada?", answer: "Pas nécessairement. Certains programmes comme l'Entrée Express ne requièrent pas d'offre d'emploi. Cependant, une offre validée peut augmenter vos points." },
        { question: 'Quels sont vos honoraires?', answer: "Les honoraires varient selon le type de service et la complexité du dossier. Je propose une consultation initiale pour évaluer votre situation et vous fournir un devis détaillé." },
        { question: 'Comment puis-je vérifier que vous êtes un consultant réglementé?', answer: "Vous pouvez vérifier mon statut sur le registre public du CICC. C'est votre garantie que je suis autorisé à pratiquer." },
        { question: 'Offrez-vous des services en anglais et en français?', answer: "Oui! Je suis parfaitement bilingue et peux vous accompagner dans la langue de votre choix." },
      ],
    },
    en: {
      sectionLabel: 'FAQ',
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to the most common questions about immigration',
      faqs: [
        { question: 'How long does a permanent residence application take?', answer: 'The timeframe varies depending on the program. For Express Entry, processing typically takes 6 months. For other programs, it can take 12 to 24 months.' },
        { question: 'Do I need a job offer to immigrate to Canada?', answer: 'Not necessarily. Some programs like Express Entry do not require a job offer. However, a validated offer can increase your points.' },
        { question: 'What are your fees?', answer: 'Fees vary depending on the type of service and complexity of the file. I offer an initial consultation to assess your situation and provide a detailed quote.' },
        { question: 'How can I verify that you are a regulated consultant?', answer: "You can verify my status on the CICC public registry. This is your guarantee that I am authorized to practice." },
        { question: 'Do you offer services in English and French?', answer: 'Yes! I am fully bilingual and can assist you in your preferred language.' },
      ],
    },
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-8 sm:mb-10 lg:mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-txt-primary mb-3 sm:mb-4">{content[language].title}</h2>
          <p className="text-txt-secondary text-sm sm:text-base lg:text-lg px-4">{content[language].subtitle}</p>
        </motion.div>

        <div className="space-y-2 sm:space-y-3">
          {content[language].faqs.map((faq, index) => (
            <motion.div key={index} className="bg-surface rounded-lg sm:rounded-xl border border-border overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left">
                <span className="font-medium text-txt-primary pr-3 sm:pr-4 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-txt-secondary flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-txt-secondary leading-relaxed text-sm sm:text-base">{faq.answer}</div>
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