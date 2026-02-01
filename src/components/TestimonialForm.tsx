import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface TestimonialFormProps {
  language: 'fr' | 'en';
}

export default function TestimonialForm({ language }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    content: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    fr: {
      sectionLabel: 'Partagez votre expérience',
      title: 'Laissez votre témoignage',
      subtitle: 'Votre avis compte! Partagez votre expérience avec notre cabinet.',
      namePlaceholder: 'Votre nom complet',
      locationPlaceholder: 'Votre pays → Canada (ex: France → Montréal)',
      contentPlaceholder: 'Décrivez votre expérience avec nos services d\'immigration...',
      ratingLabel: 'Votre note',
      submitButton: 'Soumettre mon témoignage',
      submitting: 'Envoi en cours...',
      successTitle: 'Merci pour votre témoignage!',
      successMessage: 'Votre témoignage a été soumis et sera publié après validation par notre équipe.',
      submitAnother: 'Soumettre un autre témoignage',
    },
    en: {
      sectionLabel: 'Share your experience',
      title: 'Leave your testimonial',
      subtitle: 'Your opinion matters! Share your experience with our firm.',
      namePlaceholder: 'Your full name',
      locationPlaceholder: 'Your country → Canada (e.g. France → Montreal)',
      contentPlaceholder: 'Describe your experience with our immigration services...',
      ratingLabel: 'Your rating',
      submitButton: 'Submit my testimonial',
      submitting: 'Submitting...',
      successTitle: 'Thank you for your testimonial!',
      successMessage: 'Your testimonial has been submitted and will be published after validation by our team.',
      submitAnother: 'Submit another testimonial',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.content.trim()) {
      toast.error(language === 'fr' ? 'Veuillez remplir tous les champs requis' : 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('testimonials').insert({
        name: formData.name.trim(),
        location_fr: formData.location.trim(),
        location_en: formData.location.trim(),
        content_fr: formData.content.trim(),
        content_en: formData.content.trim(),
        rating: formData.rating,
        display_order: 999,
        is_active: true,
        status: 'pending',
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success(language === 'fr' ? 'Témoignage soumis avec succès!' : 'Testimonial submitted successfully!');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error(language === 'fr' ? 'Erreur lors de l\'envoi' : 'Error submitting testimonial');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', location: '', content: '', rating: 5 });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 border border-border text-center"
          >
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-heading font-semibold text-txt-primary mb-2 sm:mb-4">
              {content[language].successTitle}
            </h3>
            <p className="text-txt-secondary text-sm sm:text-base mb-6 sm:mb-8">
              {content[language].successMessage}
            </p>
            <button
              onClick={handleReset}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary/90 transition-colors"
            >
              {content[language].submitAnother}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonial-form" className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-6 sm:mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-2 sm:mb-3 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-txt-primary mb-2 sm:mb-3">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-xs sm:text-sm lg:text-base px-4">
            {content[language].subtitle}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-surface rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 border border-border space-y-4 sm:space-y-5 lg:space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {/* Name */}
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={content[language].namePlaceholder}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-lg sm:rounded-xl text-sm sm:text-base text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Location */}
          <div>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder={content[language].locationPlaceholder}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-lg sm:rounded-xl text-sm sm:text-base text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-txt-secondary mb-2">
              {content[language].ratingLabel}
            </label>
            <div className="flex gap-0.5 sm:gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-0.5 sm:p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      star <= formData.rating
                        ? 'text-accent fill-current'
                        : 'text-border'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder={content[language].contentPlaceholder}
              rows={4}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-lg sm:rounded-xl text-sm sm:text-base text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                {content[language].submitting}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                {content[language].submitButton}
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
