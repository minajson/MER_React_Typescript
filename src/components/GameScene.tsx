import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GameState } from '../types';
import { getScenesForSet, SCENE_ORDER } from '../data/scenes';
import { Timer } from './Timer';
import { HealthIndicator } from './HealthIndicator';
import { ECGDisplay } from './ECGDisplay';
import { DecisionPanel } from './DecisionPanel';
import { FeedbackOverlay } from './FeedbackOverlay';
import { SceneProgress } from './SceneProgress';

interface GameSceneProps {
  state: GameState;
  onTick: () => void;
  onDecide: (id: string) => void;
  onClearFeedback: () => void;
  sounds: {
    playCorrect: () => void;
    playWrong: () => void;
    playUrgent: () => void;
    startHeartbeat: (bpm?: number) => void;
    stopHeartbeat: () => void;
    startAlarm: () => void;
    stopAlarm: () => void;
  };
}

export function GameScene({ state, onTick, onDecide, onClearFeedback, sounds }: GameSceneProps) {
  const scenes = getScenesForSet(state.sceneset);
  const scene = scenes[state.currentScene];
  const sceneIndex = SCENE_ORDER.indexOf(state.currentScene);
  const isUrgent = state.timeRemaining <= 60;
  const isCritical = state.timeRemaining <= 30;

  useEffect(() => {
    if (state.showFeedback) return;
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
  }, [onTick, state.showFeedback]);

  useEffect(() => {
    const bpm = state.healthStatus === 'green' ? 72 : state.healthStatus === 'yellow' ? 100 : 140;
    sounds.startHeartbeat(bpm);
    return () => sounds.stopHeartbeat();
  }, [state.healthStatus, sounds.startHeartbeat, sounds.stopHeartbeat]);

  useEffect(() => {
    if (isCritical || state.healthStatus === 'red') {
      sounds.startAlarm();
    } else {
      sounds.stopAlarm();
    }
    return () => sounds.stopAlarm();
  }, [isCritical, state.healthStatus, sounds.startAlarm, sounds.stopAlarm]);

  const handleDecide = useCallback(
    (id: string) => {
      const dec = scene?.decisions.find((d) => d.id === id);
      if (dec?.correct) sounds.playCorrect();
      else sounds.playWrong();
      onDecide(id);
    },
    [scene, sounds, onDecide]
  );

  if (!scene) return null;

  return (
    <div
      className={`relative w-full h-full flex flex-col overflow-hidden ${isCritical ? 'border-2 border-red-900' : ''}`}
      style={{ background: '#111827' }}
    >
      <div className="crt-overlay absolute inset-0 z-10 pointer-events-none" />
      <div className="vignette absolute inset-0 z-10 pointer-events-none" />
      {isCritical && <div className="scan-line z-20" />}

      <FeedbackOverlay
        show={state.showFeedback}
        message={state.feedbackMessage}
        correct={state.feedbackCorrect}
        onDismiss={onClearFeedback}
      />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div
        className="relative z-30 flex items-center justify-between px-5 md:px-8 py-3 border-b border-gray-800"
        style={{ background: '#1c2436' }}
      >
        <Timer seconds={state.timeRemaining} />

        <div className="flex flex-col items-center">
          <div className={`font-display text-xl md:text-3xl font-black tracking-widest glow-red ${isCritical ? 'pulse-red' : ''} text-red-500`}>
            MER
          </div>
          <div className="font-body text-[10px] text-green-700 tracking-widest uppercase">
            Renaissance OH
          </div>
          <div className="font-body text-[10px] text-gray-600 tracking-widest">
            Scenario {state.sceneset}
          </div>
        </div>

        <HealthIndicator status={state.healthStatus} value={state.health} />
      </div>

      {/* ── ECG ─────────────────────────────────────────────────────── */}
      <div className="relative z-30 px-5 md:px-8 py-2 border-b border-gray-800" style={{ background: '#1c2436' }}>
        <ECGDisplay status={state.healthStatus} />
      </div>

      {/* ── Progress ─────────────────────────────────────────────────── */}
      <div className="relative z-30 px-5 md:px-8 py-3 border-b border-gray-800" style={{ background: '#1c2436' }}>
        <SceneProgress currentIndex={sceneIndex} />
      </div>

      {/* ── Scene content ─────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentScene}
          className="relative z-30 flex-1 flex flex-col overflow-y-auto px-5 md:px-10 py-5 gap-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {/* Scene header */}
          <div className="flex flex-col gap-2">
            {scene.urgencyLabel && (
              <motion.div
                className={`font-body text-sm md:text-base tracking-widest font-bold uppercase
                  ${isUrgent ? 'text-red-500 pulse-red' : 'text-red-700'}`}
                animate={isUrgent ? { opacity: [1, 0.45, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ▶ {scene.urgencyLabel}
              </motion.div>
            )}
            <h2 className="font-display text-white text-3xl md:text-5xl font-black tracking-wide leading-tight">
              {scene.title}
            </h2>
            <p className="font-body text-gray-400 text-sm md:text-base tracking-widest uppercase">
              {scene.subtitle}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-red-900 via-red-600 to-transparent" />

          {/* Narrative */}
          <motion.div
            className="border border-gray-700 rounded-xl p-5 md:p-6"
            style={{ background: '#1c2436' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <p className="font-body text-gray-100 text-base md:text-xl leading-relaxed">
              {scene.narrative}
            </p>
          </motion.div>

          {/* Decisions */}
          {scene.decisions.length > 0 && (
            <DecisionPanel
              decisions={scene.decisions}
              onDecide={handleDecide}
              disabled={state.showFeedback}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <div
        className="relative z-30 px-5 md:px-8 py-3 border-t border-gray-800 flex items-center justify-between"
        style={{ background: '#1c2436' }}
      >
        <span className="font-body text-sm text-gray-600 tracking-widest">
          TEAM: <span className="text-gray-400 font-semibold">{state.teamName}</span>
        </span>
        <span className="font-body text-sm text-gray-600 tracking-widest">
          {state.correctCount}/{state.totalDecisions} CORRECT
        </span>
        <span className="font-body text-sm text-gray-600 tracking-widest">
          Q{sceneIndex + 1} / {SCENE_ORDER.length - 1}
        </span>
      </div>
    </div>
  );
}
