import { useState } from 'react';
import { CheckCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ContactFormProps {
  language: 'fr' | 'en';
}

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
      sectionLabel: 'Disponibilité',
      title: 'Contact corporate',
      subtitle: 'Équipe dédiée, disponible et réglementée.',
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
      submit: 'Envoyer',
      submitting: 'Envoi...',
      success: 'Message bien reçu! Nous revenons vers vous rapidement.',
      namePlaceholder: 'Votre nom complet',
      emailPlaceholder: 'votre@email.com',
      phonePlaceholder: '+1 (514) 000-0000',
      messagePlaceholder: 'Décrivez votre projet d\'immigration...',
      hours: 'Horaires',
      hoursValue: '09h - 17h EST',
      hoursNote: 'Disponibilité flexible pour les clients internationaux.',
    },
    en: {
      sectionLabel: 'Availability',
      title: 'Corporate contact',
      subtitle: 'Dedicated, compliant and responsive team.',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Send',
      submitting: 'Sending...',
      success: 'Message received! We will get back shortly.',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: '+1 (514) 000-0000',
      messagePlaceholder: 'Describe your immigration project...',
      hours: 'Hours',
      hoursValue: '09h - 17h EST',
      hoursNote: 'Flexible availability for international clients.',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    toast.success(content[language].success);
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      message: '',
    });
    setIsSubmitting(false);
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-brand-red/10 text-brand-red text-sm font-semibold mb-4">
              {content[language].sectionLabel}
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-txt-primary mb-4">
              {content[language].title}
            </h2>
            <p className="text-txt-secondary text-lg mb-8">
              {content[language].subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <a href="tel:+15144627623" className="text-txt-primary hover:text-brand-red transition-colors">
                  (514) 462-7623
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <a href="mailto:fmimb@yahoo.fr" className="text-txt-primary hover:text-brand-red transition-colors">
                  fmimb@yahoo.fr
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-txt-primary">Montréal, Québec, Canada</span>
              </div>
            </div>

            <div className="mt-8 bg-surface rounded-3xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <p className="text-sm text-txt-secondary">{content[language].hours}</p>
                  <p className="text-xl font-heading font-semibold text-txt-primary">{content[language].hoursValue}</p>
                </div>
              </div>
              <p className="text-txt-secondary text-sm">
                {content[language].hoursNote}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSuccess ? (
              <div className="bg-surface rounded-3xl p-8 border border-brand-red/30 text-center h-full flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-brand-red mb-4" />
                <p className="text-xl font-heading font-semibold text-txt-primary">
                  {content[language].success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface rounded-3xl p-8 border border-border space-y-6">
                <div>
                  <label className="block text-sm font-medium text-txt-primary mb-2">
                    {content[language].name}
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder={content[language].namePlaceholder}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={content[language].emailPlaceholder}
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-txt-primary mb-2">
                    {content[language].message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={content[language].messagePlaceholder}
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-red text-primary-foreground rounded-xl font-semibold hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? content[language].submitting : (
                    <>
                      {content[language].submit}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
