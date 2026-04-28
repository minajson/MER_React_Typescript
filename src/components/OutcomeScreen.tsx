import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { GameState, OutcomeType } from '../types';

interface OutcomeScreenProps {
  state: GameState;
  onNextTeam: () => void;
  onShowComparison: () => void;
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
      'Outstanding. Your team responded swiftly and correctly at every critical decision point. The patient received optimal first-response care and was successfully handed over to the Medevac team. This is exactly what the MER protocol is designed to produce.',
  },
  delayed: {
    label: 'CRITICAL DELAY',
    sublabel: 'DELAYED RESPONSE',
    color: 'text-yellow-400',
    glowClass: 'glow-yellow',
    borderClass: 'border-yellow-600 border-glow-yellow',
    icon: '⚠',
    message:
      'The patient survived — but with complications from delayed or incorrect interventions. In a real Medevac scenario, these delays translate directly into secondary brain injury, prolonged ICU admission, or permanent disability. Review your decision points carefully.',
  },
  failed: {
    label: 'PATIENT LOST',
    sublabel: 'FAILED RESPONSE',
    color: 'text-red-500',
    glowClass: 'glow-red',
    borderClass: 'border-red-700 border-glow-red',
    icon: '✗',
    message:
      'The patient did not survive. Critical errors broke the chain of survival at one or more decision points. This simulation exists so that in a real emergency your team has already faced the hardest choices. Debrief every scene — then train again.',
  },
};

const LESSONS: Record<OutcomeType, string[]> = {
  success: [
    'Scene safety confirmed before any patient contact',
    'Correct pattern recognition (agonal breathing / resp arrest)',
    'MER activated with structured SBAR communication',
    'CPR/ventilation started without hesitation',
    'AED prepared and deployed correctly',
    'Clinical handover with full "downtime" data',
  ],
  delayed: [
    'One or more decisions lacked clinical urgency',
    'Possible misidentification of arrest type (cardiac vs respiratory)',
    'Communication gaps slowed MER or Medevac response',
    'Review decisions 2, 5, and 9 in detail during debrief',
  ],
  failed: [
    'Scene safety or early assessment was incorrect',
    'Wrong intervention for the type of arrest',
    'MER activation was delayed or incomplete',
    'Airway management or CPR was not initiated promptly',
    'Clinical handover was insufficient for hospital team',
  ],
};

function formatTime(s: number): string {
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

export function OutcomeScreen({ state, onNextTeam, onShowComparison, sounds }: OutcomeScreenProps) {
  const outcome = state.outcome ?? 'failed';
  const cfg = OUTCOMES[outcome];
  const lessons = LESSONS[outcome];

  // After this team's score is saved, scores.length is already incremented
  const showBattleButton = state.scores.length >= 2 && state.scores.length % 2 === 0;
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
      style={{ background: '#111827' }}
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

      <div className="relative z-10 flex flex-col items-center gap-6 px-5 py-8 max-w-2xl w-full text-center">
        {/* Org label */}
        <div className="font-display text-sm tracking-[0.4em] text-green-500 uppercase">
          Renaissance Occupational Health
        </div>

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
          <div className="font-body text-sm tracking-[0.4em] uppercase text-gray-500">{cfg.sublabel}</div>
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
          className={`w-full border ${cfg.borderClass} rounded-xl p-5 grid grid-cols-2 md:grid-cols-4 gap-4`}
          style={{ background: '#1c2436' }}
        >
          {[
            { label: 'Team', value: state.teamName },
            { label: 'Accuracy', value: `${accuracy}%` },
            { label: 'Time Left', value: formatTime(state.timeRemaining) },
            { label: 'Scenario', value: `Set ${state.sceneset}` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-body text-xs text-gray-500 tracking-widest uppercase">{s.label}</span>
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
            {outcome === 'success' ? 'What You Did Right' : 'Key Learning Points'}
          </div>
          <ul className="flex flex-col gap-2">
            {lessons.map((l, i) => (
              <li key={i} className="font-body flex items-start gap-3 text-base text-gray-300">
                <span className={`${cfg.color} mt-0.5 font-bold`}>{outcome === 'success' ? '✓' : '▸'}</span>
                {l}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full max-w-sm flex flex-col gap-3"
        >
          {showBattleButton ? (
            <>
              <button
                onClick={onShowComparison}
                className="font-display w-full py-5 border-2 border-green-500 text-green-400 font-black
                  text-xl tracking-[0.25em] uppercase rounded-xl hover:bg-green-600 hover:text-black
                  transition-all cursor-pointer border-glow-green"
              >
                ⚔ SEE BATTLE RESULTS
              </button>
              <p className="font-body text-xs text-gray-600 tracking-widest text-center">
                Team 1 vs Team 2 — who performed better?
              </p>
            </>
          ) : (
            <>
              <button
                onClick={onNextTeam}
                className="font-display w-full py-5 border-2 border-red-600 text-red-400 font-black
                  text-xl tracking-[0.3em] uppercase rounded-xl hover:bg-red-600 hover:text-black
                  transition-all cursor-pointer border-glow-red"
              >
                NEXT TEAM ▶
              </button>
              <p className="font-body text-xs text-gray-600 mt-1 tracking-widest text-center">
                Team {nextTeamNumber} will receive Scenario {nextTeamNumber % 2 === 0 ? 'B' : 'A'}
              </p>
            </>
          )}
        </motion.div>

        {/* Running leaderboard */}
        {state.scores.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="w-full"
          >
            <div className="font-body text-sm tracking-widest text-gray-500 uppercase mb-3">
              Session Scores — {state.scores.length} Team{state.scores.length !== 1 ? 's' : ''}
            </div>
            <div className="flex flex-col gap-2 max-h-44 overflow-y-auto">
              {[...state.scores]
                .sort((a, b) => b.battleScore - a.battleScore)
                .map((s, i) => (
                  <div
                    key={`${s.teamName}-${s.timestamp}`}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-800"
                    style={{ background: '#1c2436' }}
                  >
                    <span className="font-body text-sm text-gray-600">#{i + 1}</span>
                    <span className="font-body text-base text-gray-200 font-semibold truncate flex-1">{s.teamName}</span>
                    <span className="font-body text-xs text-gray-600">Set {s.sceneset}</span>
                    <span className={`font-display text-base font-black ${
                      s.outcome === 'success' ? 'text-green-400'
                      : s.outcome === 'delayed' ? 'text-yellow-400'
                      : 'text-red-500'
                    }`}>
                      {s.outcome === 'success' ? 'SAVED' : s.outcome === 'delayed' ? 'DELAYED' : 'FAILED'}
                    </span>
                    <span className="font-mono text-sm text-gray-500 tabular-nums">{s.battleScore}pt</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
