import { motion } from 'framer-motion';
import { MessageSquare, FileSearch, FileCheck, Plane, CheckCircle } from 'lucide-react';

interface ProcessProps {
  language: 'fr' | 'en';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function Process({ language }: ProcessProps) {
  const content = {
    fr: {
      subtitle: 'Notre Processus',
      title: 'Un accompagnement étape par étape',
      description: 'De la première consultation à l\'obtention de votre visa, nous vous guidons à chaque étape de votre projet d\'immigration.',
      steps: [
        {
          icon: MessageSquare,
          title: 'Consultation Initiale',
          description: 'Évaluation gratuite de votre profil et discussion de vos objectifs d\'immigration au Canada.',
        },
        {
          icon: FileSearch,
          title: 'Analyse du Dossier',
          description: 'Étude approfondie de votre éligibilité et identification du programme le plus adapté.',
        },
        {
          icon: FileCheck,
          title: 'Préparation du Dossier',
          description: 'Constitution et vérification de tous les documents requis pour votre demande.',
        },
        {
          icon: Plane,
          title: 'Soumission & Suivi',
          description: 'Dépôt de votre dossier et suivi régulier auprès des autorités d\'immigration.',
        },
        {
          icon: CheckCircle,
          title: 'Décision Favorable',
          description: 'Réception de votre visa et préparation de votre nouvelle vie au Canada.',
        },
      ],
    },
    en: {
      subtitle: 'Our Process',
      title: 'Step-by-step guidance',
      description: 'From the first consultation to obtaining your visa, we guide you through every step of your immigration project.',
      steps: [
        {
          icon: MessageSquare,
          title: 'Initial Consultation',
          description: 'Free assessment of your profile and discussion of your Canadian immigration goals.',
        },
        {
          icon: FileSearch,
          title: 'File Analysis',
          description: 'In-depth study of your eligibility and identification of the most suitable program.',
        },
        {
          icon: FileCheck,
          title: 'File Preparation',
          description: 'Compilation and verification of all required documents for your application.',
        },
        {
          icon: Plane,
          title: 'Submission & Follow-up',
          description: 'Filing of your case and regular follow-up with immigration authorities.',
        },
        {
          icon: CheckCircle,
          title: 'Favorable Decision',
          description: 'Receipt of your visa and preparation for your new life in Canada.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block text-primary font-medium text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">
            {t.subtitle}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            {t.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-4">
            {t.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step number */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:top-0 md:right-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold flex items-center justify-center z-10">
                    {index + 1}
                  </div>
                  
                  {/* Icon container */}
                  <div className="relative mb-3 sm:mb-4 lg:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center group-hover:border-primary group-hover:shadow-primary/10 transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" />
                    </div>
                    {/* Pulse effect on hover */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/20 scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-heading font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm lg:text-lg leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] sm:text-xs lg:text-sm leading-relaxed max-w-[140px] sm:max-w-[180px] lg:max-w-[200px] hidden sm:block">
                    {step.description}
                  </p>
                  
                  {/* Mobile connector - only between rows on mobile */}
                  {index < t.steps.length - 1 && index !== 1 && index !== 3 && (
                    <div className="lg:hidden w-0.5 h-4 sm:h-6 lg:h-8 bg-gradient-to-b from-primary to-primary/20 mt-3 sm:mt-4 lg:mt-6 hidden sm:block" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
