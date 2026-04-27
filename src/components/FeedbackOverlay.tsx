import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackOverlayProps {
  show: boolean;
  message: string | null;
  correct: boolean;
  onDismiss: () => void;
}

export function FeedbackOverlay({ show, message, correct, onDismiss }: FeedbackOverlayProps) {
  return (
    <AnimatePresence>
      {show && message && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/85" onClick={onDismiss} />
          <motion.div
            className={`relative z-10 max-w-xl w-full mx-4 p-7 border-2 rounded-xl text-center
              ${correct
                ? 'border-green-500 border-glow-green'
                : 'border-red-500 border-glow-red'
              }`}
            style={{ background: correct ? '#061a0e' : '#1a0606' }}
            initial={{ scale: 0.85, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 280 }}
          >
            <div className={`font-display text-5xl mb-3 font-black ${correct ? 'text-green-400 glow-green' : 'text-red-400 glow-red'}`}>
              {correct ? '✓' : '✗'}
            </div>
            <div
              className={`font-display text-2xl md:text-3xl font-black mb-3 tracking-widest
                ${correct ? 'text-green-300 glow-green' : 'text-red-300 glow-red'}`}
            >
              {correct ? 'CORRECT DECISION' : 'WRONG DECISION'}
            </div>
            <p className="font-body text-gray-200 text-base md:text-lg leading-relaxed mb-6">{message}</p>
            <button
              onClick={onDismiss}
              className={`font-display px-10 py-3 border-2 rounded-lg text-base font-black tracking-widest transition-all cursor-pointer
                ${correct
                  ? 'border-green-500 text-green-400 hover:bg-green-800'
                  : 'border-red-500 text-red-400 hover:bg-red-900'
                }`}
            >
              CONTINUE →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
