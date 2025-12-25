import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LegalCompliance from '@/components/LegalCompliance';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import AppointmentForm from '@/components/AppointmentForm';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <LegalCompliance language={language} />
      <About language={language} />
      <Services language={language} />
      <Testimonials language={language} />
      <FAQ language={language} />
      <AppointmentForm language={language} />
      <ContactForm language={language} />
      <Footer language={language} />
      <Chatbot language={language} />
    </div>
  );
};

export default Index;
