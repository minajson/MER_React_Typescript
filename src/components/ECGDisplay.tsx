import { motion } from 'framer-motion';
import type { HealthStatus } from '../types';

interface ECGDisplayProps {
  status: HealthStatus;
}

function buildECGPath(status: HealthStatus): string {
  if (status === 'red') {
    // Irregular, low amplitude
    return 'M0,25 L20,25 L25,20 L30,30 L35,25 L60,25 L65,22 L70,28 L75,25 L100,25 L105,20 L110,28 L115,25 L140,25 L145,22 L150,27 L155,25 L180,25 L185,18 L190,30 L195,25 L220,25';
  }
  if (status === 'yellow') {
    // Slightly irregular
    return 'M0,25 L18,25 L20,22 L22,25 L30,25 L32,5 L34,40 L36,25 L60,25 L62,22 L64,25 L70,25 L72,8 L74,38 L76,25 L100,25 L102,22 L104,25 L112,25 L114,6 L116,40 L118,25 L140,25 L142,22 L144,25 L150,25 L152,7 L154,39 L156,25 L180,25 L182,21 L184,25 L190,25 L192,5 L194,40 L196,25 L220,25';
  }
  // Normal sinus rhythm
  return 'M0,25 L15,25 L17,22 L19,25 L25,25 L27,2 L29,45 L31,25 L55,25 L57,22 L59,25 L65,25 L67,3 L69,44 L71,25 L95,25 L97,22 L99,25 L105,25 L107,2 L109,45 L111,25 L135,25 L137,22 L139,25 L145,25 L147,3 L149,44 L151,25 L175,25 L177,22 L179,25 L185,25 L187,2 L189,45 L191,25 L215,25 L220,25';
}

export function ECGDisplay({ status }: ECGDisplayProps) {
  const path = buildECGPath(status);
  const color = status === 'green' ? '#22c55e' : status === 'yellow' ? '#facc15' : '#ef4444';

  return (
    <div className="w-full h-12 overflow-hidden relative">
      <svg
        viewBox="0 0 220 50"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="ecg-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecg-glow)"
          initial={{ pathLength: 0, opacity: 0.5 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
          key={status}
        />
      </svg>
    </div>
  );
}
