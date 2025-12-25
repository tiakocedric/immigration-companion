import { useState } from 'react';
import { CheckCircle, Clock, Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormProps {
  language: 'fr' | 'en';
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.1 }
  },
  viewport: { once: true }
};

export default function ContactForm({ language }: ContactFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const content = {
    fr: {
      sectionLabel: 'Contact',
      title: 'Prenez contact avec nous',
      subtitle: 'Une question? Notre équipe vous répond rapidement.',
      name: 'Nom complet',
      email: 'Adresse email',
      phone: 'Téléphone',
      message: 'Votre message',
      submit: 'Envoyer le message',
      submitting: 'Envoi en cours...',
      success: 'Message envoyé avec succès!',
      successSubtext: 'Nous vous répondrons dans les plus brefs délais.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      namePlaceholder: 'Votre nom complet',
      emailPlaceholder: 'votre@email.com',
      phonePlaceholder: '+1 (514) 000-0000',
      messagePlaceholder: 'Décrivez votre projet d\'immigration ou posez votre question...',
      hours: 'Heures d\'ouverture',
      hoursValue: 'Lun - Ven: 9h - 17h EST',
      hoursNote: 'Disponibilité flexible pour les clients internationaux.',
      contactInfo: 'Informations de contact',
    },
    en: {
      sectionLabel: 'Contact',
      title: 'Get in touch with us',
      subtitle: 'Have a question? Our team responds quickly.',
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone',
      message: 'Your message',
      submit: 'Send message',
      submitting: 'Sending...',
      success: 'Message sent successfully!',
      successSubtext: 'We will get back to you shortly.',
      error: 'An error occurred. Please try again.',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: '+1 (514) 000-0000',
      messagePlaceholder: 'Describe your immigration project or ask your question...',
      hours: 'Business hours',
      hoursValue: 'Mon - Fri: 9am - 5pm EST',
      hoursNote: 'Flexible availability for international clients.',
      contactInfo: 'Contact information',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await supabase.from('contact_submissions').insert({
      name: formData.full_name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    if (error) {
      toast.error(content[language].error);
    } else {
      setIsSuccess(true);
      toast.success(content[language].success);
      setFormData({ full_name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-3.5 bg-background border border-border rounded-lg text-txt-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all";

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          {...fadeInUp}
        >
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-primary/20">
            {content[language].sectionLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-txt-primary mb-3 sm:mb-4">
            {content[language].title}
          </h2>
          <p className="text-txt-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            {content[language].subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="font-heading font-semibold text-lg text-txt-primary mb-6">
                {content[language].contactInfo}
              </h3>
            </motion.div>

            <motion.a 
              href="tel:+15144627623" 
              className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-primary/30 transition-all group"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-txt-secondary mb-1">Téléphone</p>
                <p className="text-txt-primary font-medium">(514) 462-7623</p>
              </div>
            </motion.a>

            <motion.a 
              href="mailto:fmimb@yahoo.fr" 
              className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-primary/30 transition-all group"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-txt-secondary mb-1">Email</p>
                <p className="text-txt-primary font-medium">fmimb@yahoo.fr</p>
              </div>
            </motion.a>

            <motion.div 
              className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border"
              variants={fadeInUp}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-txt-secondary mb-1">Adresse</p>
                <p className="text-txt-primary font-medium">Montréal, Québec, Canada</p>
              </div>
            </motion.div>

            <motion.div 
              className="p-5 bg-surface rounded-xl border border-border"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-medium text-txt-primary">{content[language].hours}</h4>
              </div>
              <p className="text-txt-primary font-semibold mb-1">{content[language].hoursValue}</p>
              <p className="text-sm text-txt-secondary">{content[language].hoursNote}</p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div 
            className="lg:col-span-3"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSuccess ? (
              <div className="bg-surface rounded-2xl p-12 border border-primary/20 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-txt-primary mb-2">
                  {content[language].success}
                </h3>
                <p className="text-txt-secondary">{content[language].successSubtext}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 border border-border">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].name} <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder={content[language].namePlaceholder}
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].email} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={content[language].emailPlaceholder}
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={content[language].phonePlaceholder}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].message} <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={content[language].messagePlaceholder}
                      rows={5}
                      required
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      content[language].submitting
                    ) : (
                      <>
                        {content[language].submit}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}