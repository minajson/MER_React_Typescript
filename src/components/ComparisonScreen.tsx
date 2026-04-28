import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TeamScore } from '../types';
import { computeBattleScore } from '../hooks/useGameState';

interface ComparisonScreenProps {
  scores: TeamScore[];
  onNextRound: () => void;
}

const CONFETTI_COLORS = [
  '#22c55e','#ef4444','#facc15','#ffffff','#3b82f6','#f97316','#a855f7','#06b6d4',
];

function Confetti() {
  const particles = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2.5,
      duration: 2.5 + Math.random() * 2,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 6 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 120,
      rotate: Math.random() * 720 - 360,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{ left: `${p.x}%`, width: p.size, height: p.size * 0.6, background: p.color }}
          animate={{ y: ['0vh', '110vh'], x: [0, p.drift], rotate: [0, p.rotate], opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, repeatDelay: Math.random() * 2, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function speakAnnouncement(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.82;
  utter.pitch = 1.15;
  utter.volume = 1.0;

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.lang === 'en-GB' && v.name.includes('Female')) ||
      voices.find((v) => v.lang.startsWith('en') && !v.name.toLowerCase().includes('google')) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];
    if (preferred) utter.voice = preferred;
    window.speechSynthesis.speak(utter);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }
}

function formatTime(s: number) {
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function getOutcomeLabel(o: string) {
  return o === 'success' ? 'SAVED' : o === 'delayed' ? 'DELAYED' : 'FAILED';
}

function getOutcomeColor(o: string) {
  return o === 'success' ? 'text-green-400' : o === 'delayed' ? 'text-yellow-400' : 'text-red-500';
}

export function ComparisonScreen({ scores, onNextRound }: ComparisonScreenProps) {
  const [revealed, setRevealed] = useState(false);

  const team1 = scores[scores.length - 2];
  const team2 = scores[scores.length - 1];

  if (!team1 || !team2) return null;

  const score1 = computeBattleScore(team1);
  const score2 = computeBattleScore(team2);
  const isDraw = score1 === score2;
  const winner = isDraw ? null : score1 > score2 ? team1 : team2;
  const loser = isDraw ? null : score1 > score2 ? team2 : team1;

  const winnerScore = winner ? computeBattleScore(winner) : score1;
  const loserScore = loser ? computeBattleScore(loser) : score2;
  const margin = Math.abs(score1 - score2);

  useEffect(() => {
    const t = setTimeout(() => {
      setRevealed(true);
      let speech: string;
      if (isDraw) {
        speech = `It's a draw! Both ${team1.teamName} and ${team2.teamName} scored equally. Outstanding performance from both teams. Well done, everyone!`;
      } else {
        speech = `Congratulations to ${winner!.teamName}! You are the winning team with a score of ${winnerScore} points — ${margin} points ahead of ${loser!.teamName}. Exceptional performance!`;
      }
      speakAnnouncement(speech);
    }, 1200);
    return () => {
      clearTimeout(t);
      window.speechSynthesis?.cancel();
    };
  }, []);

  const nextTeamNumber = scores.length + 1;
  const roundNumber = Math.ceil(scores.length / 2);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-start overflow-y-auto"
      style={{ background: '#111827' }}
    >
      {/* Confetti only for winner */}
      {revealed && !isDraw && <Confetti />}

      <div className="crt-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 py-8 max-w-3xl w-full text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="font-body text-sm tracking-[0.5em] text-green-500 uppercase">
            Renaissance Occupational Health
          </div>
          <div className="font-display text-4xl md:text-6xl font-black text-white tracking-wide">
            BATTLE RESULTS
          </div>
          <div className="font-body text-base text-gray-500 tracking-widest">
            ROUND {roundNumber} — MER SIMULATION
          </div>
        </motion.div>

        {/* VS cards */}
        <div className="w-full grid grid-cols-2 gap-4 mt-2">
          {[team1, team2].map((team, idx) => {
            const isWinner = winner?.teamName === team.teamName && !isDraw;
            const teamScore = computeBattleScore(team);
            const accuracy = Math.round((team.correctDecisions / Math.max(team.totalDecisions, 1)) * 100);
            return (
              <motion.div
                key={`${team.teamName}-${idx}`}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.2, type: 'spring', damping: 16 }}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 overflow-hidden
                  ${isWinner
                    ? 'border-green-500 border-glow-green'
                    : isDraw
                    ? 'border-yellow-500 border-glow-yellow'
                    : 'border-gray-700'
                  }`}
                style={{ background: isWinner ? '#061a10' : isDraw ? '#1a1800' : '#161b2d' }}
              >
                {/* Winner crown */}
                <AnimatePresence>
                  {revealed && isWinner && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: 'spring', delay: 0.5 }}
                      className="font-display text-3xl md:text-5xl text-yellow-400"
                      style={{ filter: 'drop-shadow(0 0 12px #facc15)' }}
                    >
                      👑
                    </motion.div>
                  )}
                  {revealed && isDraw && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-display text-2xl text-yellow-400"
                    >
                      🤝
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Team name */}
                <div className={`font-display text-xl md:text-2xl font-black tracking-wide
                  ${isWinner ? 'text-green-300 glow-green' : isDraw ? 'text-yellow-300' : 'text-gray-300'}`}>
                  {team.teamName}
                </div>

                <div className="font-body text-xs text-gray-500 tracking-widest">
                  SCENARIO {team.sceneset}
                </div>

                {/* Score */}
                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', delay: 0.8 + idx * 0.15 }}
                      className={`font-display text-5xl md:text-7xl font-black
                        ${isWinner ? 'text-green-400 glow-green' : isDraw ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                      {teamScore}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="font-body text-xs text-gray-600 tracking-widest">BATTLE SCORE / 200</div>

                {/* Outcome badge */}
                <div className={`font-display text-lg md:text-xl font-black tracking-widest px-4 py-1 rounded-full border
                  ${team.outcome === 'success'
                    ? 'border-green-600 text-green-400 bg-green-950/50'
                    : team.outcome === 'delayed'
                    ? 'border-yellow-600 text-yellow-400 bg-yellow-950/50'
                    : 'border-red-700 text-red-400 bg-red-950/50'
                  }`}>
                  {getOutcomeLabel(team.outcome)}
                </div>

                {/* Stats */}
                <div className="w-full grid grid-cols-3 gap-2 mt-1">
                  {[
                    { label: 'Accuracy', value: `${accuracy}%` },
                    { label: 'Time Left', value: formatTime(team.timeRemaining) },
                    { label: 'Patient', value: team.healthAtEnd.toUpperCase() },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center">
                      <span className="font-body text-[10px] text-gray-600 tracking-wide uppercase">{s.label}</span>
                      <span className={`font-display text-base font-black ${getOutcomeColor(team.outcome)}`}>{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar for score */}
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${isWinner ? 'bg-green-500' : isDraw ? 'bg-yellow-500' : 'bg-gray-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: revealed ? `${(teamScore / 200) * 100}%` : 0 }}
                    transition={{ duration: 1.2, delay: 1.0 + idx * 0.2, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* VS divider label */}
        <div className="font-display text-2xl font-black text-gray-700 -mt-2">VS</div>

        {/* Winner announcement banner */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14, delay: 0.6 }}
              className={`w-full p-5 rounded-2xl border-2 text-center
                ${isDraw
                  ? 'border-yellow-500 border-glow-yellow'
                  : 'border-green-500 border-glow-green'
                }`}
              style={{ background: isDraw ? '#1a1800' : '#061a10' }}
            >
              {isDraw ? (
                <>
                  <div className="font-display text-3xl md:text-4xl font-black text-yellow-400 glow-yellow mb-2">
                    🤝 IT'S A DRAW!
                  </div>
                  <p className="font-body text-base text-gray-300 leading-relaxed">
                    Both <span className="text-white font-bold">{team1.teamName}</span> and{' '}
                    <span className="text-white font-bold">{team2.teamName}</span> scored equally.
                    Excellent performance from both teams!
                  </p>
                </>
              ) : (
                <>
                  <div className="font-display text-3xl md:text-5xl font-black text-green-400 glow-green mb-2">
                    🏆 {winner!.teamName.toUpperCase()} WINS!
                  </div>
                  <p className="font-body text-base md:text-lg text-gray-200 leading-relaxed">
                    Congratulations to <span className="text-green-300 font-bold">{winner!.teamName}</span>!{' '}
                    You outperformed <span className="text-gray-400">{loser!.teamName}</span> by{' '}
                    <span className="text-green-300 font-bold">{margin} points</span>.
                    Outstanding clinical decision-making under pressure.
                  </p>
                  <p className="font-body text-sm text-gray-500 mt-2">
                    {winnerScore} vs {loserScore} battle score
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Debrief comparison */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="w-full rounded-xl border border-gray-700 p-5 text-left"
              style={{ background: '#1c2436' }}
            >
              <div className="font-body text-sm tracking-widest text-gray-500 uppercase mb-4">
                Performance Comparison
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="font-body text-gray-500 text-xs tracking-wide uppercase">{team1.teamName}</div>
                <div className="font-body text-gray-600 text-xs tracking-wide uppercase">Metric</div>
                <div className="font-body text-gray-500 text-xs tracking-wide uppercase">{team2.teamName}</div>

                {[
                  { label: 'Score', v1: computeBattleScore(team1), v2: computeBattleScore(team2), higher: true },
                  { label: 'Accuracy', v1: `${Math.round((team1.correctDecisions / Math.max(team1.totalDecisions, 1)) * 100)}%`, v2: `${Math.round((team2.correctDecisions / Math.max(team2.totalDecisions, 1)) * 100)}%`, higher: true },
                  { label: 'Correct', v1: `${team1.correctDecisions}/${team1.totalDecisions}`, v2: `${team2.correctDecisions}/${team2.totalDecisions}`, higher: true },
                  { label: 'Time Left', v1: formatTime(team1.timeRemaining), v2: formatTime(team2.timeRemaining), higher: true },
                  { label: 'Patient', v1: team1.healthAtEnd.toUpperCase(), v2: team2.healthAtEnd.toUpperCase(), higher: false },
                  { label: 'Result', v1: getOutcomeLabel(team1.outcome), v2: getOutcomeLabel(team2.outcome), higher: false },
                ].map((row) => (
                  <>
                    <div key={`v1-${row.label}`} className={`font-display text-base font-black py-1 ${getOutcomeColor(team1.outcome)}`}>{row.v1}</div>
                    <div key={`label-${row.label}`} className="font-body text-xs text-gray-600 py-1 self-center tracking-widest uppercase">{row.label}</div>
                    <div key={`v2-${row.label}`} className={`font-display text-base font-black py-1 ${getOutcomeColor(team2.outcome)}`}>{row.v2}</div>
                  </>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score history */}
        {scores.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="w-full"
          >
            <div className="font-body text-sm tracking-widest text-gray-500 uppercase mb-3">
              All-Time Leaderboard
            </div>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
              {[...scores]
                .sort((a, b) => b.battleScore - a.battleScore)
                .map((s, i) => (
                  <div
                    key={`${s.teamName}-${s.timestamp}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-800 text-sm"
                    style={{ background: '#1c2436' }}
                  >
                    <span className="font-body text-gray-600 w-5">#{i + 1}</span>
                    <span className="font-body text-gray-200 font-semibold flex-1 truncate">{s.teamName}</span>
                    <span className="font-body text-gray-500 text-xs">Set {s.sceneset}</span>
                    <span className={`font-display font-black text-base ${getOutcomeColor(s.outcome)}`}>
                      {getOutcomeLabel(s.outcome)}
                    </span>
                    <span className="font-mono text-gray-500 w-12 text-right tabular-nums">{s.battleScore}pt</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Start next round */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="w-full max-w-sm mt-2"
        >
          <button
            onClick={onNextRound}
            className="font-display w-full py-5 border-2 border-green-600 text-green-400 font-black
              text-xl tracking-[0.3em] uppercase rounded-xl hover:bg-green-600 hover:text-black
              transition-all cursor-pointer border-glow-green"
          >
            START NEXT ROUND ▶
          </button>
          <p className="font-body text-xs text-gray-600 mt-2 tracking-widest text-center">
            Next: Team {nextTeamNumber} — Scenario {nextTeamNumber % 2 === 0 ? 'B' : 'A'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
