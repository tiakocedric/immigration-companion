import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent, Testimonial } from '@/hooks/useSiteContent';

interface TestimonialsProps {
  language: 'fr' | 'en';
}

export default function Testimonials({ language }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { testimonials, isLoading } = useSiteContent();

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

  // Filter only active testimonials (approved ones will be fetched due to RLS)
  const activeTestimonials = testimonials?.filter(t => t.is_active) || [];

  const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % activeTestimonials.length);
  const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + activeTestimonials.length) % activeTestimonials.length);

  if (isLoading || activeTestimonials.length === 0) {
    return null;
  }

  const currentTestimonial = activeTestimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-txt-primary mb-3 sm:mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-sm sm:text-base lg:text-lg px-4">{content[language].subtitle}</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-surface rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-12 border border-border shadow-card"
            >
              <Quote className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary/20 mb-4 sm:mb-5 lg:mb-6" />
              <p className="text-base sm:text-lg lg:text-2xl text-txt-primary leading-relaxed mb-5 sm:mb-6 lg:mb-8">
                "{language === 'fr' ? currentTestimonial.content_fr : currentTestimonial.content_en}"
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <div>
                  <p className="font-heading font-semibold text-base sm:text-lg text-txt-primary">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-txt-secondary text-xs sm:text-sm">
                    {language === 'fr' ? currentTestimonial.location_fr : currentTestimonial.location_en}
                  </p>
                </div>
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-accent fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button onClick={prevTestimonial} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-txt-primary hover:bg-hover transition-colors">
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {activeTestimonials.map((_, index) => (
                <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-border'}`} />
              ))}
            </div>
            <button onClick={nextTestimonial} className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-surface border border-border flex items-center justify-center text-txt-primary hover:bg-hover transition-colors">
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}