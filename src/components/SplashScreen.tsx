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

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0b0e1a' }}
    >
      {/* CRT / vignette */}
      <div className="crt-overlay absolute inset-0 z-10" />
      <div className="vignette absolute inset-0 z-10" />
      <div className="scan-line z-20" />

      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(220,40,40,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,40,40,0.6) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-30 flex flex-col items-center gap-7 px-6 max-w-2xl w-full text-center">
        {/* Org label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-base md:text-lg tracking-[0.5em] text-red-600 uppercase"
        >
          Renaissance Occupational Health
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="font-display text-red-500 text-7xl md:text-9xl font-black tracking-tight glow-red flicker leading-none">
            MER
          </div>
          <div className="font-display text-white text-3xl md:text-5xl font-bold tracking-widest leading-tight">
            5 MINUTES TO SAVE A LIFE
          </div>
          <div className="font-body text-gray-400 text-base md:text-lg tracking-widest mt-1">
            MEDICAL EMERGENCY RESPONSE — TRAINING SIMULATION
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full h-px bg-linear-to-r from-transparent via-red-600 to-transparent"
        />

        {/* Briefing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-body text-gray-300 text-base md:text-lg leading-relaxed max-w-md"
        >
          A worker has collapsed. You have{' '}
          <span className="text-red-400 font-bold">5 minutes</span> to make the right decisions.
          Every second counts. Every choice matters.
          Wrong decisions cost time — and lives.
        </motion.p>

        {/* Team input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <label className="font-body text-sm text-gray-400 tracking-widest uppercase text-left">
            Team Name / Number
            {nextTeamNumber > 1 && (
              <span className="ml-2 text-red-700 normal-case">
                (Team {nextTeamNumber} — Scenario {nextTeamNumber % 2 === 0 ? 'B' : 'A'})
              </span>
            )}
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="e.g. Team Alpha / Group 3"
            maxLength={40}
            className="font-body w-full border border-gray-700 text-white px-5 py-4 rounded-lg
              text-base tracking-wide placeholder-gray-600 focus:outline-none focus:border-red-600
              focus:ring-1 focus:ring-red-800"
            style={{ background: '#111520' }}
          />
          <motion.button
            onClick={handleStart}
            disabled={!teamName.trim()}
            whileHover={teamName.trim() ? { scale: 1.03 } : {}}
            whileTap={teamName.trim() ? { scale: 0.97 } : {}}
            className={`font-display w-full py-5 rounded-lg border-2 font-black text-xl tracking-[0.35em] uppercase transition-all
              ${teamName.trim()
                ? 'border-red-600 text-red-400 hover:bg-red-600 hover:text-black cursor-pointer border-glow-red'
                : 'border-gray-800 text-gray-700 cursor-not-allowed'
              }`}
          >
            ACTIVATE RESPONSE
          </motion.button>
        </motion.div>

        {/* Feature icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-3 gap-6 w-full max-w-md mt-1"
        >
          {[
            { icon: '⏱', label: '5-Minute Clock' },
            { icon: '🫀', label: 'Health Monitor' },
            { icon: '⚡', label: 'Live Feedback' },
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
