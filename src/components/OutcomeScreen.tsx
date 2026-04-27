import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GameState, OutcomeType } from '../types';

interface OutcomeScreenProps {
  state: GameState;
  onNextTeam: () => void;
  sounds: {
    playSuccess: () => void;
    playFlatline: () => void;
    stopHeartbeat: () => void;
    stopAlarm: () => void;
  };
}

const OUTCOMES: Record<
  OutcomeType,
  { label: string; sublabel: string; color: string; glowClass: string; borderClass: string; icon: string; message: string }
> = {
  success: {
    label: 'LIFE SAVED',
    sublabel: 'SUCCESSFUL RESPONSE',
    color: 'text-green-400',
    glowClass: 'glow-green',
    borderClass: 'border-green-600 border-glow-green',
    icon: '♥',
    message:
      'Outstanding. Your team responded swiftly and correctly at every decision point. The MER protocol was activated in time, CPR was initiated without delay, and the AED was deployed correctly. The patient was stabilised before paramedics arrived. This is what preparation looks like.',
  },
  delayed: {
    label: 'CRITICAL DELAY',
    sublabel: 'DELAYED RESPONSE',
    color: 'text-yellow-400',
    glowClass: 'glow-yellow',
    borderClass: 'border-yellow-600 border-glow-yellow',
    icon: '⚠',
    message:
      'The patient survived — but with complications. Delays in the response chain caused prolonged hypoxia. In a real emergency, these same hesitations can mean permanent neurological damage or death. Review each decision point carefully.',
  },
  failed: {
    label: 'PATIENT LOST',
    sublabel: 'FAILED RESPONSE',
    color: 'text-red-500',
    glowClass: 'glow-red',
    borderClass: 'border-red-700 border-glow-red',
    icon: '✗',
    message:
      'The patient did not survive. Critical errors and delays resulted in irreversible cardiac arrest. This simulation exists precisely so that in a real emergency, your team is ready. Review every scene. Train again. Lives depend on it.',
  },
};

const LESSONS: Record<OutcomeType, string[]> = {
  success: [
    'Scene safety assessed before approach',
    'Responsiveness confirmed using correct technique',
    'MER activated with clear location and clinical status',
    'Tasks delegated effectively to multiple responders',
    'CPR started without waiting for MER arrival',
    'AED deployed with correct pad placement',
  ],
  delayed: [
    'Response initiation was above acceptable threshold',
    'Some decisions lacked urgency or clinical precision',
    'Communication to MER was incomplete or delayed',
    'Review Protocol Scenes 3, 4, and 6 in debrief',
  ],
  failed: [
    'Critical time lost in the first 1–2 scenes',
    'MER was not activated with sufficient information',
    'CPR was not initiated or was significantly delayed',
    'AED was not used or was used incorrectly',
    'Scene management compromised rescuer access',
  ],
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function OutcomeScreen({ state, onNextTeam, sounds }: OutcomeScreenProps) {
  const outcome = state.outcome ?? 'failed';
  const cfg = OUTCOMES[outcome];
  const lessons = LESSONS[outcome];
  const nextTeamNumber = state.scores.length + 1;

  useEffect(() => {
    sounds.stopHeartbeat();
    sounds.stopAlarm();
    if (outcome === 'success') sounds.playSuccess();
    else sounds.playFlatline();
  }, [outcome]);

  const accuracy = state.totalDecisions > 0
    ? Math.round((state.correctCount / state.totalDecisions) * 100)
    : 0;

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-start overflow-y-auto"
      style={{ background: '#0b0e1a' }}
    >
      <div className="crt-overlay absolute inset-0 pointer-events-none" />
      <div className="vignette absolute inset-0 pointer-events-none" />

      {outcome === 'failed' && (
        <motion.div
          className="absolute inset-0 bg-red-950/15"
          animate={{ opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center gap-7 px-6 py-10 max-w-2xl w-full text-center">
        {/* Outcome icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className={`font-display text-8xl md:text-[9rem] font-black ${cfg.color} ${cfg.glowClass}
            ${outcome === 'success' ? 'heartbeat' : outcome === 'failed' ? 'pulse-red' : ''}`}
        >
          {cfg.icon}
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="font-body text-sm md:text-base tracking-[0.4em] uppercase text-gray-500">
            {cfg.sublabel}
          </div>
          <div className={`font-display text-5xl md:text-7xl font-black tracking-wider ${cfg.color} ${cfg.glowClass}`}>
            {cfg.label}
          </div>
        </motion.div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent" />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`w-full border ${cfg.borderClass} rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-5`}
          style={{ background: '#111520' }}
        >
          {[
            { label: 'Team', value: state.teamName },
            { label: 'Accuracy', value: `${accuracy}%` },
            { label: 'Time Left', value: formatTime(state.timeRemaining) },
            { label: 'Patient', value: state.healthStatus.toUpperCase() },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-body text-xs md:text-sm text-gray-500 tracking-widest uppercase">{s.label}</span>
              <span className={`font-display text-xl md:text-2xl font-black ${cfg.color}`}>{s.value}</span>
            </div>
          ))}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-body text-gray-200 text-base md:text-lg leading-relaxed max-w-lg"
        >
          {cfg.message}
        </motion.p>

        {/* Learning points */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="w-full text-left"
        >
          <div className="font-body text-sm tracking-widest text-gray-500 uppercase mb-3">
            {outcome === 'success' ? 'What Went Right' : 'Key Learning Points'}
          </div>
          <ul className="flex flex-col gap-2">
            {lessons.map((l, i) => (
              <li key={i} className="font-body flex items-start gap-3 text-base md:text-lg text-gray-300">
                <span className={`${cfg.color} mt-0.5 font-bold`}>{outcome === 'success' ? '✓' : '▸'}</span>
                {l}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />

        {/* Next team button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full max-w-sm"
        >
          <button
            onClick={onNextTeam}
            className="font-display w-full py-5 border-2 border-red-600 text-red-400 font-black
              text-xl tracking-[0.3em] uppercase rounded-xl hover:bg-red-600 hover:text-black
              transition-all cursor-pointer border-glow-red"
          >
            NEXT TEAM ▶
          </button>
          <p className="font-body text-xs text-gray-600 mt-2 tracking-widest text-center">
            Team {nextTeamNumber} will receive Scenario {nextTeamNumber % 2 === 0 ? 'B' : 'A'}
          </p>
        </motion.div>

        {/* Leaderboard */}
        {state.scores.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="w-full"
          >
            <div className="font-body text-sm tracking-widest text-gray-500 uppercase mb-3">
              Leaderboard — {state.scores.length} Teams
            </div>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {[...state.scores]
                .sort((a, b) => {
                  const rank = { success: 0, delayed: 1, failed: 2 };
                  return rank[a.outcome] - rank[b.outcome] || b.timeRemaining - a.timeRemaining;
                })
                .map((s, i) => (
                  <div
                    key={`${s.teamName}-${s.timestamp}`}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-gray-800"
                    style={{ background: '#111520' }}
                  >
                    <span className="font-body text-sm text-gray-600">#{i + 1}</span>
                    <span className="font-body text-base text-gray-200 font-semibold truncate mx-3">{s.teamName}</span>
                    <span className={`font-display text-base font-black ${
                      s.outcome === 'success' ? 'text-green-400'
                      : s.outcome === 'delayed' ? 'text-yellow-400'
                      : 'text-red-500'
                    }`}>
                      {s.outcome === 'success' ? 'SAVED' : s.outcome === 'delayed' ? 'DELAYED' : 'FAILED'}
                    </span>
                    <span className="font-mono text-sm text-gray-500 ml-3 tabular-nums">
                      {formatTime(s.timeRemaining)}
                    </span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
