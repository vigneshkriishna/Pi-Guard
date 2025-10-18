import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import LoadingSpinner from './ui/LoadingSpinner';

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="flex flex-col items-center gap-8"
      >
        <ShieldCheck size={48} className="text-primary animate-pulse" />
        <LoadingSpinner size="large" />
        <p className="text-xl font-medium text-foreground/80">
          Loading Pi-Guard...
        </p>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;
