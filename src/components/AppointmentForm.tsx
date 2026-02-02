import { useState } from 'react';
import { Calendar, CheckCircle, Clock, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { createAppointment } from '@/lib/appointmentService';
import PhoneInput from '@/components/PhoneInput';

interface AppointmentFormProps {
  language: 'fr' | 'en';
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export default function AppointmentForm({ language }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country_code: '+1',
    phone_local: '',
    service_type: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const content = {
    fr: {
      sectionLabel: 'Consultation',
      title: 'Planifier une consultation',
      subtitle: 'Prenez rendez-vous avec un consultant réglementé pour discuter de votre projet d\'immigration.',
      features: [
        { icon: Clock, text: 'Réponse sous 24h' },
        { icon: Shield, text: 'Consultation confidentielle' },
        { icon: Calendar, text: 'Horaires flexibles' },
      ],
      responseTime: 'Délai de réponse moyen',
      responseTimeValue: '< 24 heures',
      name: 'Nom complet',
      email: 'Adresse email',
      phone: 'Téléphone',
      service: 'Service souhaité',
      selectService: 'Sélectionnez un service',
      date: 'Date préférée',
      time: 'Heure préférée',
      selectTime: 'Sélectionnez une heure',
      message: 'Message (optionnel)',
      messagePlaceholder: 'Décrivez brièvement votre situation...',
      submit: 'Confirmer le rendez-vous',
      submitting: 'Envoi en cours...',
      success: 'Demande envoyée avec succès!',
      successSubtext: 'Vous recevrez une confirmation par email sous 24h.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      services: [
        'Résidence permanente',
        'Permis de travail',
        'Permis d\'études',
        'Visa visiteur',
        'Super visa',
        'Demande d\'asile',
        'Autre',
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
      sectionLabel: 'Consultation',
      title: 'Schedule a consultation',
      subtitle: 'Book an appointment with a regulated consultant to discuss your immigration project.',
      features: [
        { icon: Clock, text: 'Response within 24h' },
        { icon: Shield, text: 'Confidential consultation' },
        { icon: Calendar, text: 'Flexible schedule' },
      ],
      responseTime: 'Average response time',
      responseTimeValue: '< 24 hours',
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone',
      service: 'Desired service',
      selectService: 'Select a service',
      date: 'Preferred date',
      time: 'Preferred time',
      selectTime: 'Select a time',
      message: 'Message (optional)',
      messagePlaceholder: 'Briefly describe your situation...',
      submit: 'Confirm appointment',
      submitting: 'Sending...',
      success: 'Request sent successfully!',
      successSubtext: 'You will receive an email confirmation within 24h.',
      error: 'An error occurred. Please try again.',
      services: [
        'Permanent residence',
        'Work permit',
        'Study permit',
        'Visitor visa',
        'Super visa',
        'Asylum application',
        'Other',
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
    
    const result = await createAppointment({
      name: formData.full_name,
      email: formData.email,
      country_code: formData.country_code,
      phone_local: formData.phone_local,
      service_type: formData.service_type,
      preferred_date: formData.preferred_date,
      preferred_time: formData.preferred_time,
      message: formData.message,
    });

    if (!result.success) {
      toast.error(content[language].error);
    } else {
      setIsSuccess(true);
      toast.success(content[language].success);
      setFormData({
        full_name: '',
        email: '',
        country_code: '+1',
        phone_local: '',
        service_type: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = `w-full px-3 sm:px-4 py-2.5 sm:py-3 
    bg-background border border-border rounded-lg 
    text-txt-primary placeholder:text-muted-foreground 
    focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 
    transition-all text-sm sm:text-base`;
  
  const selectClasses = `w-full px-3 sm:px-4 py-2.5 sm:py-3 
    bg-background border border-border rounded-lg 
    text-txt-primary focus:outline-none focus:ring-2 
    focus:ring-primary/40 focus:border-primary/50 
    transition-all appearance-none cursor-pointer text-sm sm:text-base`;

  return (
    <section id="appointment" className="py-16 sm:py-20 lg:py-24 bg-section-gradient">
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
          {/* Info Column */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            {...fadeInUp}
          >
            {/* Features */}
            <div className="space-y-4">
              {content[language].features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-txt-primary font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Response Time Card */}
            <motion.div 
              className="p-6 bg-primary/5 rounded-xl border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-txt-secondary mb-2">{content[language].responseTime}</p>
              <p className="text-3xl font-heading font-bold text-primary">{content[language].responseTimeValue}</p>
            </motion.div>

            {/* Trust Badge */}
            <motion.div 
              className="p-5 bg-surface rounded-xl border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-txt-primary">CICC Member</p>
                  <p className="text-sm text-txt-secondary">Regulated Consultant</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            className="lg:col-span-3"
            {...fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isSuccess ? (
              <div className="bg-surface rounded-2xl p-12 border border-primary/20 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
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
                  {/* Row 1: Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].name} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].email} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Service */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].phone} <span className="text-primary">*</span>
                      </label>
                      <PhoneInput
                        countryCode={formData.country_code}
                        phoneNumber={formData.phone_local}
                        onCountryCodeChange={(code) => setFormData({ ...formData, country_code: code })}
                        onPhoneNumberChange={(phone) => setFormData({ ...formData, phone_local: phone })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].service} <span className="text-primary">*</span>
                      </label>
                      <select
                        name="service_type"
                        value={formData.service_type}
                        onChange={handleChange}
                        required
                        className={selectClasses}
                      >
                        <option value="">{content[language].selectService}</option>
                        {content[language].services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Date & Time */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].date} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-txt-primary mb-2">
                        {content[language].time} <span className="text-primary">*</span>
                      </label>
                      <select
                        name="preferred_time"
                        value={formData.preferred_time}
                        onChange={handleChange}
                        required
                        className={selectClasses}
                      >
                        <option value="">{content[language].selectTime}</option>
                        {content[language].times.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      {content[language].message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={content[language].messagePlaceholder}
                      rows={4}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  {/* Submit Button */}
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
