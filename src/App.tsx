import { AnimatePresence, motion } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { useSoundEngine } from './hooks/useSoundEngine';
import { SplashScreen } from './components/SplashScreen';
import { GameScene } from './components/GameScene';
import { OutcomeScreen } from './components/OutcomeScreen';

export default function App() {
  const { state, startGame, tick, decide, clearFeedback, nextTeam } = useGameState();
  const sounds = useSoundEngine();

  // Team 1 is first to play; after each round scores grows by 1
  const nextTeamNumber = state.scores.length + 1;

  return (
    <div className="w-full h-full" style={{ background: '#0b0e1a' }}>
      <AnimatePresence mode="wait">
        {state.phase === 'splash' && (
          <motion.div
            key="splash"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SplashScreen onStart={startGame} nextTeamNumber={nextTeamNumber} />
          </motion.div>
        )}

        {state.phase === 'game' && (
          <motion.div
            key="game"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GameScene
              state={state}
              onTick={tick}
              onDecide={decide}
              onClearFeedback={clearFeedback}
              sounds={sounds}
            />
          </motion.div>
        )}

        {state.phase === 'outcome' && (
          <motion.div
            key="outcome"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OutcomeScreen
              state={state}
              onNextTeam={nextTeam}
              sounds={sounds}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
