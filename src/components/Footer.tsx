import { ExternalLink, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  language: 'fr' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const content = {
    fr: {
      contact: 'Contact',
      quickLinks: 'Navigation',
      legal: 'Légal',
      links: [
        { label: 'Accueil', href: '#home' },
        { label: 'Expertise', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Témoignages', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
      rights: 'Tous droits réservés.',
      designedBy: 'Propulsé par',
      verifyText: 'Vérifiez mon statut sur le registre du CICC',
      backToTop: 'Retour en haut',
    },
    en: {
      contact: 'Contact',
      quickLinks: 'Navigation',
      legal: 'Legal',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'Expertise', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
      rights: 'All rights reserved.',
      designedBy: 'Powered by',
      verifyText: 'Verify my status on the CICC registry',
      backToTop: 'Back to top',
    },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-footer text-footer-text">
      {/* Back to top */}
      <div className="border-b border-footer-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={scrollToTop}
            className="w-full py-4 flex items-center justify-center gap-2 text-footer-muted hover:text-footer-text transition-colors"
          >
            <ArrowUp size={16} />
            <span className="text-sm font-medium">{content[language].backToTop}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">M</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-footer-text text-sm tracking-wide">MIMBIMMIGRATION</p>
                <p className="text-[10px] text-footer-muted tracking-widest uppercase">Consultancy Inc.</p>
              </div>
            </div>
            <div className="mt-4">
              <a
                href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-footer-muted hover:text-footer-text transition-colors"
              >
                {content[language].verifyText}
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-footer-text mb-4 uppercase tracking-wider">
              {content[language].quickLinks}
            </h4>
            <ul className="space-y-2">
              {content[language].links.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-footer-muted hover:text-footer-text transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-footer-text mb-4 uppercase tracking-wider">
              {content[language].legal}
            </h4>
            <ul className="space-y-2">
              {content[language].links.slice(4).map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-footer-muted hover:text-footer-text transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="/auth" className="text-sm text-footer-muted hover:text-footer-text transition-colors">
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-footer-text mb-4 uppercase tracking-wider">
              {content[language].contact}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+15144627623" className="flex items-center gap-3 text-sm text-footer-muted hover:text-footer-text transition-colors">
                  <Phone size={14} />
                  (514) 462-7623
                </a>
              </li>
              <li>
                <a href="mailto:fmimb@yahoo.fr" className="flex items-center gap-3 text-sm text-footer-muted hover:text-footer-text transition-colors">
                  <Mail size={14} />
                  fmimb@yahoo.fr
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-footer-muted">
                <MapPin size={14} />
                Montréal, QC, Canada
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-footer-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-footer-muted">
            <p>© {new Date().getFullYear()} MIMBIMMIGRATION CONSULTANCY INC. {content[language].rights}</p>
            <p>
              {content[language].designedBy}{' '}
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-footer-text hover:text-primary transition-colors"
              >
                Lovable
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}