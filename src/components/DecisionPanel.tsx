import { motion } from 'framer-motion';
import type { Decision } from '../types';

interface DecisionPanelProps {
  decisions: Decision[];
  onDecide: (id: string) => void;
  disabled: boolean;
}

export function DecisionPanel({ decisions, onDecide, disabled }: DecisionPanelProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="font-body text-sm tracking-widest text-gray-500 uppercase mb-1 text-center">
        — Choose Your Response —
      </div>
      {decisions.map((d, i) => (
        <motion.button
          key={d.id}
          disabled={disabled}
          onClick={() => onDecide(d.id)}
          className={`w-full text-left px-5 py-4 border rounded-lg font-body text-base md:text-lg leading-snug
            tracking-wide transition-all btn-emergency
            ${disabled
              ? 'opacity-40 cursor-not-allowed border-gray-800 text-gray-600'
              : 'border-gray-600 text-gray-100 hover:border-red-500 hover:text-white hover:bg-red-950/25 cursor-pointer'
            }`}
          style={{ background: disabled ? undefined : '#111520' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          whileHover={!disabled ? { x: 5 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
        >
          <span className="font-display text-red-500 mr-3 font-black text-xl">{String.fromCharCode(65 + i)}.</span>
          {d.text}
        </motion.button>
      ))}
    </div>
  );
}
