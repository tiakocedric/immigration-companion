import { Wrench, Clock, Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center"
      >
        {/* Animated gear icon */}
        <motion.div 
          className="mx-auto mb-8 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Wrench className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Site en maintenance
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Nous effectuons actuellement des améliorations sur notre plateforme. 
          Le site sera de retour très prochainement.
        </p>

        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-3 text-foreground mb-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">Retour prévu sous peu</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Merci de votre patience. Nous travaillons pour vous offrir une meilleure expérience.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="mailto:info@mimbimmigration.com"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>info@mimbimmigration.com</span>
          </a>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          MIMBIMMIGRATION CONSULTANCY INC. — Consultant en Immigration Réglementé
        </p>
      </motion.div>
    </div>
  );
}
