import { Wrench, Clock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
        className="max-w-lg w-full text-center"
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>{contactEmail}</span>
          </a>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          MIMBIMMIGRATION CONSULTANCY INC. — Consultant en Immigration Réglementé
        </p>
      </motion.div>
    </div>
  );
}
