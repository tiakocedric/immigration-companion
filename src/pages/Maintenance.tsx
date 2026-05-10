import { Wrench, Clock, Mail, HelpCircle, Phone, BellRing, CheckCircle2, Loader2 } from 'lucide-react';
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

const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Adresse email invalide' })
  .max(255, { message: 'Email trop long' });

function formatRemaining(ms: number, lang: 'fr' | 'en' = 'fr') {
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
  // Variables d'environnement (configurables sans redéploiement via .env)
  const message =
    import.meta.env.VITE_MAINTENANCE_MESSAGE ||
    "Nous effectuons actuellement des améliorations sur notre plateforme. Le site sera de retour très prochainement.";
  const title =
    import.meta.env.VITE_MAINTENANCE_TITLE || 'Site en maintenance';
  const endTimeRaw = import.meta.env.VITE_MAINTENANCE_END_TIME as
    | string
    | undefined;
  const contactEmail =
    import.meta.env.VITE_MAINTENANCE_CONTACT_EMAIL || 'info@mimbimmigration.com';

  const endTime = endTimeRaw ? new Date(endTimeRaw).getTime() : null;
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!endTime) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const remaining = endTime ? endTime - now : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
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

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          {title}
        </h1>

        <p className="text-lg text-muted-foreground mb-8 whitespace-pre-line">
          {message}
        </p>

        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-foreground mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {endTime
                ? remaining && remaining > 0
                  ? `Retour dans ${formatRemaining(remaining)}`
                  : 'Retour imminent'
                : 'Retour prévu sous peu'}
            </span>
          </div>
          {endTime && (
            <p className="text-sm text-muted-foreground">
              Réouverture prévue le{' '}
              {new Date(endTime).toLocaleString('fr-CA', {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </p>
          )}
          {!endTime && (
            <p className="text-sm text-muted-foreground">
              Merci de votre patience. Nous travaillons pour vous offrir une
              meilleure expérience.
            </p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Questions fréquentes
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="duree">
              <AccordionTrigger className="text-left">
                Combien de temps va durer la maintenance ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {endTime
                  ? `La réouverture est prévue le ${new Date(endTime).toLocaleString('fr-CA', { dateStyle: 'long', timeStyle: 'short' })}. Nous mettons tout en œuvre pour respecter ce délai.`
                  : "Notre équipe technique travaille activement pour rétablir le service au plus vite. La durée estimée est de quelques heures seulement."}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger className="text-left">
                Comment vous contacter pendant la maintenance ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>Vous pouvez nous joindre par les moyens suivants :</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href={`mailto:${contactEmail}`} className="text-primary hover:underline break-all">
                    {contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a href="tel:+15145550123" className="text-primary hover:underline">
                    +1 (514) 555-0123
                  </a>
                </div>
                <p className="text-sm pt-2">Nous répondons généralement sous 24 heures ouvrables.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rendez-vous">
              <AccordionTrigger className="text-left">
                Puis-je prendre un rendez-vous malgré la maintenance ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Bien sûr ! Envoyez-nous un email avec vos disponibilités et le motif de votre demande.
                Notre équipe vous proposera un créneau de consultation dans les meilleurs délais,
                en personne ou en visioconférence.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
              <AccordionTrigger className="text-left">
                Quels services proposez-vous ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>Nous accompagnons nos clients sur l'ensemble des démarches d'immigration canadienne :</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Résidence permanente (Entrée Express, PEQ, parrainage)</li>
                  <li>Permis de travail et permis d'études</li>
                  <li>Visas de visiteur et super visa</li>
                  <li>Citoyenneté canadienne</li>
                  <li>Évaluation de profil et conseils stratégiques</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="dossier">
              <AccordionTrigger className="text-left">
                Mon dossier en cours est-il impacté ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Non, la maintenance concerne uniquement le site web. Tous les dossiers en cours
                continuent d'être traités normalement par notre équipe. Vous serez contacté
                directement par votre conseiller pour toute mise à jour.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="securite">
              <AccordionTrigger className="text-left">
                Mes données personnelles sont-elles en sécurité ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolument. Toutes vos données restent protégées et confidentielles. La maintenance
                vise justement à améliorer la sécurité et la performance de notre plateforme,
                conformément aux normes du CICC.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          MIMBIMMIGRATION CONSULTANCY INC. — Consultant en Immigration Réglementé
        </p>
      </motion.div>
    </div>
  );
}
