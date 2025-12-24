import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  language: 'fr' | 'en';
}

export default function Footer({ language }: FooterProps) {
  const content = {
    fr: {
      contact: 'Contact',
      quickLinks: 'Liens rapides',
      links: [
        { label: 'Accueil', href: '#home' },
        { label: 'À propos', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Témoignages', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
      rights: 'Tous droits réservés.',
      designedBy: 'Site conçu par',
      verifyText: 'Vérifiez mon statut sur le registre du CICC',
    },
    en: {
      contact: 'Contact',
      quickLinks: 'Quick Links',
      links: [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
      rights: 'All rights reserved.',
      designedBy: 'Site designed by',
      verifyText: 'Verify my status on the CICC registry',
    },
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-footer-gradient text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-semibold tracking-widest">
              MIMBIMMIGRATION
            </h3>
            <p className="text-primary-foreground/80 text-sm">
              CONSULTANCY INC.
            </p>
            <div className="pt-4">
              <a
                href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {content[language].verifyText}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">
              {content[language].contact}
            </h4>
            <div className="space-y-3">
              <a href="tel:+15144627623" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Phone size={16} />
                (514) 462-7623
              </a>
              <a href="mailto:fmimb@yahoo.fr" className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Mail size={16} />
                fmimb@yahoo.fr
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin size={16} />
                Montréal, Québec, Canada
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-lg">
              {content[language].quickLinks}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {content[language].links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} MIMBIMMIGRATION CONSULTANCY INC. {content[language].rights}
            </p>
            <p>
              {content[language].designedBy}{' '}
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:underline"
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
