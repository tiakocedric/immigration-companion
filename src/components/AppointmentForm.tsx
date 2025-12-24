import { useState } from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface AppointmentFormProps {
  language: 'fr' | 'en';
}

export default function AppointmentForm({ language }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service_type: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const content = {
    fr: {
      sectionLabel: 'Consultation stratégique et réglementée',
      title: 'Planifier une consultation',
      subtitle: 'Dossier analysé, stratégie proposée et calendrier confirmé.',
      highlights: ['Confiance', 'Professionnalisme', 'Immigration réglementée'],
      responseTime: 'Délai moyen de réponse',
      responseTimeValue: '24h',
      responseNote: 'Nous confirmons chaque rendez-vous avec un briefing écrit et des documents requis.',
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      service: 'Service souhaité',
      selectService: '-- Sélectionnez un service --',
      date: 'Date préférée',
      time: 'Heure préférée',
      selectTime: '-- Sélectionnez une heure --',
      message: 'Message (optionnel)',
      submit: 'Confirmer le rendez-vous',
      submitting: 'Envoi en cours...',
      success: 'Rendez-vous demandé avec succès! Confirmation par email sous 24h.',
      services: [
        'Résidence permanente',
        'Permis de travail',
        'Permis d\'études',
        'Visa visiteur',
        'Demande d\'asile',
      ],
      times: [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
      ],
    },
    en: {
      sectionLabel: 'Strategic and regulated consultation',
      title: 'Schedule a consultation',
      subtitle: 'File analyzed, strategy proposed and calendar confirmed.',
      highlights: ['Trust', 'Professionalism', 'Regulated immigration'],
      responseTime: 'Average response time',
      responseTimeValue: '24h',
      responseNote: 'We confirm each appointment with a written briefing and required documents.',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone',
      service: 'Desired service',
      selectService: '-- Select a service --',
      date: 'Preferred date',
      time: 'Preferred time',
      selectTime: '-- Select a time --',
      message: 'Message (optional)',
      submit: 'Confirm appointment',
      submitting: 'Sending...',
      success: 'Appointment requested successfully! Email confirmation within 24h.',
      services: [
        'Permanent residence',
        'Work permit',
        'Study permit',
        'Visitor visa',
        'Asylum application',
      ],
      times: [
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
      ],
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    toast.success(content[language].success);
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      service_type: '',
      preferred_date: '',
      preferred_time: '',
      message: '',
    });
    setIsSubmitting(false);
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="appointment" className="py-20 bg-surface">
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

            <div className="flex flex-wrap gap-3 mb-8">
              {content[language].highlights.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 bg-background rounded-full border border-border text-sm text-txt-primary"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="bg-background rounded-3xl p-8 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-txt-secondary">{content[language].responseTime}</p>
                  <p className="text-3xl font-heading font-bold text-brand-red">{content[language].responseTimeValue}</p>
                </div>
              </div>
              <p className="text-txt-secondary text-sm">
                {content[language].responseNote}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {isSuccess ? (
              <div className="bg-background rounded-3xl p-8 border border-brand-red/30 text-center">
                <CheckCircle className="w-16 h-16 text-brand-red mx-auto mb-4" />
                <p className="text-xl font-heading font-semibold text-txt-primary">
                  {content[language].success}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-background rounded-3xl p-8 border border-border space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].name}
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].service}
                    </label>
                    <select
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    >
                      <option value="">{content[language].selectService}</option>
                      {content[language].services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].date}
                    </label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].time}
                    </label>
                    <select
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                    >
                      <option value="">{content[language].selectTime}</option>
                      {content[language].times.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
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
                    rows={4}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-txt-primary placeholder:text-txt-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-red/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-red text-primary-foreground rounded-xl font-semibold hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? content[language].submitting : content[language].submit}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
