import { useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onStart: (teamName: string) => void;
  nextTeamNumber: number;
}

export function SplashScreen({ onStart, nextTeamNumber }: SplashScreenProps) {
  const [teamName, setTeamName] = useState('');

  const handleStart = () => {
    if (teamName.trim()) onStart(teamName.trim());
  };

  const sceneset = nextTeamNumber % 2 === 0 ? 'B' : 'A';

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#111827' }}
    >
      <div className="crt-overlay absolute inset-0 z-10" />
      <div className="vignette absolute inset-0 z-10" />
      <div className="scan-line z-20" />

      {/* Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-30 flex flex-col items-center gap-6 px-6 max-w-2xl w-full text-center">
        {/* Org name — GREEN */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-base md:text-xl tracking-[0.5em] text-green-500 uppercase glow-green"
        >
          Renaissance Occupational Health
        </motion.div>

        {/* MER title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="font-display text-red-500 text-8xl md:text-[9rem] font-black tracking-tight glow-red flicker leading-none">
            MER
          </div>
          <div className="font-display text-white text-3xl md:text-5xl font-bold tracking-widest leading-tight">
            3 MINUTES TO SAVE A LIFE
          </div>
          <div className="font-body text-gray-400 text-base md:text-lg tracking-widest">
            MEDICAL EMERGENCY RESPONSE — TRAINING SIMULATION
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full h-px bg-linear-to-r from-transparent via-green-600 to-transparent"
        />

        {/* Briefing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-body text-gray-300 text-base md:text-lg leading-relaxed max-w-md"
        >
          A worker has collapsed in a remote site. You have{' '}
          <span className="text-red-400 font-bold">3 minutes</span> to make 10 critical decisions.
          Every choice matters. Wrong decisions cost time — and lives.
        </motion.p>

        {/* Team input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <label className="font-body text-sm text-gray-400 tracking-widest uppercase">
              Team Name / Number
            </label>
            <span className="font-body text-xs text-green-600 tracking-widest">
              SCENARIO {sceneset}
            </span>
          </div>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="e.g. Team Alpha / Group 3"
            maxLength={40}
            className="font-body w-full border border-gray-700 text-white px-5 py-4 rounded-xl
              text-lg tracking-wide placeholder-gray-600 focus:outline-none focus:border-green-600
              focus:ring-1 focus:ring-green-800"
            style={{ background: '#1c2436' }}
          />
          <motion.button
            onClick={handleStart}
            disabled={!teamName.trim()}
            whileHover={teamName.trim() ? { scale: 1.03 } : {}}
            whileTap={teamName.trim() ? { scale: 0.97 } : {}}
            className={`font-display w-full py-5 rounded-xl border-2 font-black text-xl tracking-[0.35em] uppercase transition-all
              ${teamName.trim()
                ? 'border-red-600 text-red-400 hover:bg-red-600 hover:text-black cursor-pointer border-glow-red'
                : 'border-gray-800 text-gray-700 cursor-not-allowed'
              }`}
          >
            ACTIVATE RESPONSE
          </motion.button>
        </motion.div>

        {/* Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-3 gap-6 w-full max-w-md"
        >
          {[
            { icon: '⏱', label: '3-Minute Clock' },
            { icon: '🫀', label: 'Health Monitor' },
            { icon: '⚡', label: '10 Decisions' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5">
              <span className="text-3xl">{item.icon}</span>
              <span className="font-body text-sm text-gray-500 tracking-wide">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
