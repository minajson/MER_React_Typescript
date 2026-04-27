import { motion, AnimatePresence } from 'framer-motion';

interface TimerProps {
  seconds: number;
}

export function Timer({ seconds }: TimerProps) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isUrgent = seconds <= 60;
  const isCritical = seconds <= 30;

  return (
    <div className="flex flex-col items-center">
      <div className="font-body text-xs md:text-sm tracking-widest text-gray-500 mb-1 uppercase">
        Time Remaining
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={display}
          initial={{ scale: isCritical ? 1.15 : 1 }}
          animate={{ scale: 1 }}
          className={`font-mono text-4xl md:text-6xl font-bold tracking-widest tabular-nums
            ${isCritical
              ? 'text-red-500 glow-red pulse-red'
              : isUrgent
              ? 'text-yellow-400 glow-yellow'
              : 'text-green-400 glow-green'
            }`}
        >
          {display}
        </motion.div>
      </AnimatePresence>
      {isUrgent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`font-body text-xs md:text-sm mt-1 tracking-widest font-bold ${isCritical ? 'text-red-500 pulse-red' : 'text-yellow-400'}`}
        >
          {isCritical ? '⚠ CRITICAL ⚠' : '⚠ URGENT'}
        </motion.div>
      )}
    </div>
  );
}
