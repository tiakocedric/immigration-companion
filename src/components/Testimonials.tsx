import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsProps {
  language: 'fr' | 'en';
}

export default function Testimonials({ language }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = {
    fr: {
      sectionLabel: 'Témoignages',
      title: 'La confiance de nos clients',
      subtitle: 'Découvrez les expériences de ceux qui ont réalisé leur projet canadien.',
    },
    en: {
      sectionLabel: 'Testimonials',
      title: 'Our clients trust us',
      subtitle: 'Discover the experiences of those who achieved their Canadian dream.',
    },
  };

  const testimonials = [
    {
      id: 1,
      name: 'Marie Dubois',
      country: 'France',
      service: language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence',
      content: language === 'fr' 
        ? "Service exceptionnel! M. Mimb m'a guidé tout au long du processus de résidence permanente. Grâce à son expertise, ma famille et moi vivons maintenant à Montréal."
        : "Exceptional service! Mr. Mimb guided me throughout the permanent residence process. Thanks to his expertise, my family and I now live in Montreal.",
      rating: 5,
    },
    {
      id: 2,
      name: 'Jean-Pierre Kamga',
      country: 'Cameroun',
      service: language === 'fr' ? 'Permis de travail' : 'Work Permit',
      content: language === 'fr'
        ? "Professionnel, disponible et très compétent. M. Mimb a traité mon dossier avec une rigueur exemplaire. Mon permis de travail a été approuvé en un temps record."
        : "Professional, available and very competent. Mr. Mimb handled my file with exemplary rigor. My work permit was approved in record time.",
      rating: 5,
    },
    {
      id: 3,
      name: 'Sofia Martinez',
      country: 'Mexique',
      service: language === 'fr' ? 'Permis d\'études' : 'Study Permit',
      content: language === 'fr'
        ? "Grâce à l'accompagnement de M. Mimb, j'ai pu obtenir mon permis d'études et réaliser mon rêve d'étudier au Canada. Un consultant de confiance!"
        : "Thanks to Mr. Mimb's support, I was able to obtain my study permit and fulfill my dream of studying in Canada. A trusted consultant!",
      rating: 5,
    },
  ];

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-txt-primary mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-lg">{content[language].subtitle}</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-surface rounded-2xl p-8 lg:p-12 border border-border shadow-card"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6" />
              <p className="text-xl lg:text-2xl text-txt-primary leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-heading font-semibold text-lg text-txt-primary">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-txt-secondary text-sm">{testimonials[currentIndex].country}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md">
                    {testimonials[currentIndex].service}
                  </span>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prevTestimonial} className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-txt-primary hover:bg-hover transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2.5 h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <button onClick={nextTestimonial} className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-txt-primary hover:bg-hover transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}