import { Wrench, Clock, Mail, HelpCircle, Phone, BellRing, CheckCircle2, Loader2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

type Lang = 'fr' | 'en';

// ============================================================
// i18n dictionary
// ============================================================
const translations = {
  fr: {
    pageTitle: 'Site en maintenance — MIMBIMMIGRATION CONSULTANCY INC.',
    title: 'Site en maintenance',
    message:
      "Nous effectuons actuellement des améliorations sur notre plateforme. Le site sera de retour très prochainement.",
    backIn: (formatted: string) => `Retour dans ${formatted}`,
    backImminent: 'Retour imminent',
    backSoon: 'Retour prévu sous peu',
    reopeningOn: (date: string) => `Réouverture prévue le ${date}`,
    patience:
      "Merci de votre patience. Nous travaillons pour vous offrir une meilleure expérience.",
    notifyTitle: 'Soyez prévenu du retour',
    notifyDesc:
      "Laissez votre email et nous vous enverrons un message dès que le site sera de nouveau accessible.",
    emailPlaceholder: 'votre@email.com',
    emailLabel: 'Adresse email',
    submit: 'Me prévenir',
    submitting: 'Envoi...',
    invalidEmail: 'Adresse email invalide',
    emailTooLong: 'Email trop long',
    alreadySubscribed: 'Vous êtes déjà inscrit à la liste de notification.',
    subscribeSuccess: 'Inscription confirmée ! Vous serez prévenu dès le retour.',
    subscribeConfirmed: 'Inscription confirmée — à très bientôt !',
    subscribeError: 'Une erreur est survenue. Merci de réessayer plus tard.',
    faqTitle: 'Questions fréquentes',
    faq: {
      duration: {
        q: 'Combien de temps va durer la maintenance ?',
        aWithDate: (date: string) =>
          `La réouverture est prévue le ${date}. Nous mettons tout en œuvre pour respecter ce délai.`,
        aNoDate:
          "Notre équipe technique travaille activement pour rétablir le service au plus vite. La durée estimée est de quelques heures seulement.",
      },
      contact: {
        q: 'Comment vous contacter pendant la maintenance ?',
        intro: 'Vous pouvez nous joindre par les moyens suivants :',
        replyTime: 'Nous répondons généralement sous 24 heures ouvrables.',
      },
      appointment: {
        q: 'Puis-je prendre un rendez-vous malgré la maintenance ?',
        a: "Bien sûr ! Envoyez-nous un email avec vos disponibilités et le motif de votre demande. Notre équipe vous proposera un créneau de consultation dans les meilleurs délais, en personne ou en visioconférence.",
      },
      services: {
        q: 'Quels services proposez-vous ?',
        intro: "Nous accompagnons nos clients sur l'ensemble des démarches d'immigration canadienne :",
        items: [
          'Résidence permanente (Entrée Express, PEQ, parrainage)',
          "Permis de travail et permis d'études",
          'Visas de visiteur et super visa',
          'Citoyenneté canadienne',
          'Évaluation de profil et conseils stratégiques',
        ],
      },
      ongoing: {
        q: 'Mon dossier en cours est-il impacté ?',
        a: "Non, la maintenance concerne uniquement le site web. Tous les dossiers en cours continuent d'être traités normalement par notre équipe. Vous serez contacté directement par votre conseiller pour toute mise à jour.",
      },
      security: {
        q: 'Mes données personnelles sont-elles en sécurité ?',
        a: "Absolument. Toutes vos données restent protégées et confidentielles. La maintenance vise justement à améliorer la sécurité et la performance de notre plateforme, conformément aux normes du CICC.",
      },
    },
    footer: 'MIMBIMMIGRATION CONSULTANCY INC. — Consultant en Immigration Réglementé',
    locale: 'fr-CA',
  },
  en: {
    pageTitle: 'Site under maintenance — MIMBIMMIGRATION CONSULTANCY INC.',
    title: 'Site under maintenance',
    message:
      "We are currently making improvements to our platform. The site will be back very soon.",
    backIn: (formatted: string) => `Back in ${formatted}`,
    backImminent: 'Back imminent',
    backSoon: 'Back soon',
    reopeningOn: (date: string) => `Reopening on ${date}`,
    patience:
      "Thank you for your patience. We are working to bring you a better experience.",
    notifyTitle: 'Get notified when we are back',
    notifyDesc:
      "Leave your email and we will let you know as soon as the site is accessible again.",
    emailPlaceholder: 'your@email.com',
    emailLabel: 'Email address',
    submit: 'Notify me',
    submitting: 'Sending...',
    invalidEmail: 'Invalid email address',
    emailTooLong: 'Email too long',
    alreadySubscribed: 'You are already subscribed to the notification list.',
    subscribeSuccess: 'Subscription confirmed! You will be notified as soon as we are back.',
    subscribeConfirmed: 'Subscription confirmed — see you soon!',
    subscribeError: 'An error occurred. Please try again later.',
    faqTitle: 'Frequently asked questions',
    faq: {
      duration: {
        q: 'How long will the maintenance last?',
        aWithDate: (date: string) =>
          `Reopening is scheduled for ${date}. We are doing everything we can to meet this deadline.`,
        aNoDate:
          'Our technical team is actively working to restore service as quickly as possible. The estimated duration is only a few hours.',
      },
      contact: {
        q: 'How can I contact you during the maintenance?',
        intro: 'You can reach us through the following channels:',
        replyTime: 'We usually reply within 24 business hours.',
      },
      appointment: {
        q: 'Can I book an appointment during the maintenance?',
        a: 'Of course! Send us an email with your availability and the reason for your request. Our team will offer you a consultation slot as soon as possible, in person or by video call.',
      },
      services: {
        q: 'What services do you offer?',
        intro: 'We support our clients with all Canadian immigration procedures:',
        items: [
          'Permanent residence (Express Entry, PEQ, sponsorship)',
          'Work permits and study permits',
          'Visitor visas and super visa',
          'Canadian citizenship',
          'Profile assessment and strategic advice',
        ],
      },
      ongoing: {
        q: 'Is my ongoing file affected?',
        a: 'No, the maintenance only concerns the website. All ongoing files continue to be processed normally by our team. You will be contacted directly by your advisor for any updates.',
      },
      security: {
        q: 'Is my personal data safe?',
        a: 'Absolutely. All your data remains protected and confidential. The maintenance is precisely aimed at improving the security and performance of our platform, in accordance with CICC standards.',
      },
    },
    footer: 'MIMBIMMIGRATION CONSULTANCY INC. — Regulated Canadian Immigration Consultant',
    locale: 'en-CA',
  },
} as const;

// ============================================================
// Language detection: env var > localStorage > browser > 'fr'
// ============================================================
function detectLanguage(): Lang {
  const envLang = (import.meta.env.VITE_MAINTENANCE_LANG as string | undefined)?.toLowerCase();
  if (envLang === 'fr' || envLang === 'en') return envLang;

  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem('maintenance_lang');
    if (stored === 'fr' || stored === 'en') return stored;

    const navLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (navLang.startsWith('en')) return 'en';
  }
  return 'fr';
}

function formatRemaining(ms: number, lang: Lang) {
  if (ms <= 0) return lang === 'fr' ? 'Bientôt de retour' : 'Back soon';
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (lang === 'fr') {
    if (days > 0) return `${days}j ${hours}h ${minutes}min`;
    if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
    return `${minutes}min ${seconds}s`;
  }
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export default function MaintenancePage() {
  const [lang, setLang] = useState<Lang>(() => detectLanguage());
  const t = translations[lang];

  // Allow user to switch language manually (persisted)
  const toggleLang = () => {
    const next: Lang = lang === 'fr' ? 'en' : 'fr';
    setLang(next);
    try {
      window.localStorage.setItem('maintenance_lang', next);
    } catch {
      /* ignore */
    }
  };

  // Env overrides for title / message (per-language with fallback)
  const envTitle =
    (lang === 'fr'
      ? import.meta.env.VITE_MAINTENANCE_TITLE_FR || import.meta.env.VITE_MAINTENANCE_TITLE
      : import.meta.env.VITE_MAINTENANCE_TITLE_EN || import.meta.env.VITE_MAINTENANCE_TITLE) as
      | string
      | undefined;
  const envMessage =
    (lang === 'fr'
      ? import.meta.env.VITE_MAINTENANCE_MESSAGE_FR || import.meta.env.VITE_MAINTENANCE_MESSAGE
      : import.meta.env.VITE_MAINTENANCE_MESSAGE_EN || import.meta.env.VITE_MAINTENANCE_MESSAGE) as
      | string
      | undefined;

  const title = envTitle || t.title;
  const message = envMessage || t.message;
  const endTimeRaw = import.meta.env.VITE_MAINTENANCE_END_TIME as string | undefined;
  const contactEmail =
    (import.meta.env.VITE_MAINTENANCE_CONTACT_EMAIL as string | undefined) ||
    'info@mimbimmigration.com';
  const contactPhone =
    (import.meta.env.VITE_MAINTENANCE_CONTACT_PHONE as string | undefined) || '+1 (514) 555-0123';

  const endTime = endTimeRaw ? new Date(endTimeRaw).getTime() : null;
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!endTime) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  // SEO: noindex during maintenance
  useEffect(() => {
    const previousTitle = document.title;
    document.title = t.pageTitle;

    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const hadRobotsMeta = !!robotsMeta;
    const previousRobots = robotsMeta?.content;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow, noarchive, nosnippet';

    let googlebotMeta = document.querySelector('meta[name="googlebot"]') as HTMLMetaElement | null;
    const hadGooglebotMeta = !!googlebotMeta;
    if (!googlebotMeta) {
      googlebotMeta = document.createElement('meta');
      googlebotMeta.name = 'googlebot';
      document.head.appendChild(googlebotMeta);
    }
    googlebotMeta.content = 'noindex, nofollow';

    // Reflect current language on <html lang="..">
    const previousHtmlLang = document.documentElement.lang;
    document.documentElement.lang = t.locale;

    const canonical = document.querySelector('link[rel="canonical"]');
    const canonicalParent = canonical?.parentElement;
    canonical?.remove();

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousHtmlLang;
      if (!hadRobotsMeta) robotsMeta?.remove();
      else if (robotsMeta && previousRobots !== undefined) robotsMeta.content = previousRobots;
      if (!hadGooglebotMeta) googlebotMeta?.remove();
      if (canonical && canonicalParent) canonicalParent.appendChild(canonical);
    };
  }, [t.pageTitle, t.locale]);

  const remaining = endTime ? endTime - now : null;

  // Email subscription
  const emailSchema = z
    .string()
    .trim()
    .email({ message: t.invalidEmail })
    .max(255, { message: t.emailTooLong });

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('maintenance_subscribers')
        .insert({ email: result.data.toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          setSubscribed(true);
          toast.success(t.alreadySubscribed);
        } else {
          throw error;
        }
      } else {
        setSubscribed(true);
        toast.success(t.subscribeSuccess);
      }
    } catch (err) {
      console.error('Subscription error:', err);
      toast.error(t.subscribeError);
    } finally {
      setSubmitting(false);
    }
  };

  const formattedEndDate = endTime
    ? new Date(endTime).toLocaleString(t.locale, {
        dateStyle: 'long',
        timeStyle: 'short',
      })
    : '';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative">
      {/* Language toggle (top-right) */}
      <button
        onClick={toggleLang}
        className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60 hover:bg-muted text-sm font-medium text-foreground transition-colors"
        aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
      >
        <Globe className="w-4 h-4" />
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center py-12"
      >
        <motion.div
          className="mx-auto mb-8 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Wrench className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h1>

        <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">{message}</p>

        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-foreground mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {endTime
                ? remaining && remaining > 0
                  ? t.backIn(formatRemaining(remaining, lang))
                  : t.backImminent
                : t.backSoon}
            </span>
          </div>
          {endTime ? (
            <p className="text-sm text-muted-foreground">{t.reopeningOn(formattedEndDate)}</p>
          ) : (
            <p className="text-sm text-muted-foreground">{t.patience}</p>
          )}
        </div>

        {/* Email subscription */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 justify-center mb-3">
            <BellRing className="w-6 h-6 text-primary" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">{t.notifyTitle}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">{t.notifyDesc}</p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-primary font-medium py-3"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{t.subscribeConfirmed}</span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                required
                className="flex-1"
                aria-label={t.emailLabel}
              />
              <Button type="submit" disabled={submitting} className="sm:w-auto">
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
            </form>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{contactEmail}</span>
          </a>
        </div>

        {/* FAQ Section */}
        <div className="text-left bg-card border border-border rounded-xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t.faqTitle}</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="duration">
              <AccordionTrigger className="text-left">{t.faq.duration.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {endTime ? t.faq.duration.aWithDate(formattedEndDate) : t.faq.duration.aNoDate}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger className="text-left">{t.faq.contact.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>{t.faq.contact.intro}</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-primary hover:underline break-all"
                  >
                    {contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`}
                    className="text-primary hover:underline"
                  >
                    {contactPhone}
                  </a>
                </div>
                <p className="text-sm pt-2">{t.faq.contact.replyTime}</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="appointment">
              <AccordionTrigger className="text-left">{t.faq.appointment.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.appointment.a}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
              <AccordionTrigger className="text-left">{t.faq.services.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>{t.faq.services.intro}</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {t.faq.services.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ongoing">
              <AccordionTrigger className="text-left">{t.faq.ongoing.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{t.faq.ongoing.a}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="security">
              <AccordionTrigger className="text-left">{t.faq.security.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {t.faq.security.a}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{t.footer}</p>
      </motion.div>
    </div>
  );
}
