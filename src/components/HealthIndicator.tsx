import { motion } from 'framer-motion';
import type { HealthStatus } from '../types';

interface HealthIndicatorProps {
  status: HealthStatus;
  value: number;
}

const CONFIG: Record<HealthStatus, { label: string; color: string; glow: string; border: string; barColor: string }> = {
  green:  { label: 'STABLE',        color: 'text-green-400',  glow: 'glow-green',  border: 'border-green-600 border-glow-green',   barColor: 'bg-green-500' },
  yellow: { label: 'DETERIORATING', color: 'text-yellow-400', glow: 'glow-yellow', border: 'border-yellow-500 border-glow-yellow', barColor: 'bg-yellow-400' },
  red:    { label: 'CRITICAL',      color: 'text-red-500',    glow: 'glow-red',    border: 'border-red-500 border-glow-red',       barColor: 'bg-red-500' },
};

export function HealthIndicator({ status, value }: HealthIndicatorProps) {
  const cfg = CONFIG[status];

  return (
    <div className="flex flex-col items-center gap-1 w-full max-w-xs">
      <div className="font-body text-xs md:text-sm tracking-widest text-gray-500 uppercase">
        Patient Status
      </div>
      <motion.div
        className={`w-full border ${cfg.border} rounded-lg px-3 py-2 flex flex-col gap-1.5`}
        animate={{ borderColor: status === 'red' ? ['#ef4444', '#7f1d1d', '#ef4444'] : undefined }}
        transition={{ duration: 0.8, repeat: status === 'red' ? Infinity : 0 }}
      >
        <div className="flex justify-between items-center">
          <span className={`font-body text-sm md:text-base font-bold tracking-widest ${cfg.color} ${cfg.glow} ${status === 'red' ? 'pulse-red' : ''}`}>
            ● {cfg.label}
          </span>
          <span className={`font-mono text-sm md:text-base font-bold ${cfg.color}`}>{value}%</span>
        </div>
        <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${cfg.barColor} rounded-full`}
            initial={{ width: '75%' }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
