import { useReducer, useCallback } from 'react';
import type { GameState, HealthStatus, OutcomeType, TeamScore } from '../types';
import { getScenesForSet } from '../data/scenes';

const INITIAL_TIME = 300;  // 5 minutes
const INITIAL_HEALTH = 80;

function healthToStatus(h: number): HealthStatus {
  if (h >= 65) return 'green';
  if (h >= 30) return 'yellow';
  return 'red';
}

function computeOutcome(health: number, timeRemaining: number, correct: number, total: number): OutcomeType {
  const accuracy = (correct / Math.max(total, 1)) * 100;
  if (health >= 65 && timeRemaining > 60 && accuracy >= 60) return 'success';
  if (health >= 20 && timeRemaining > 0) return 'delayed';
  return 'failed';
}

export function computeBattleScore(s: TeamScore): number {
  const outcomePoints = s.outcome === 'success' ? 100 : s.outcome === 'delayed' ? 50 : 0;
  const accuracyPoints = Math.round((s.correctDecisions / Math.max(s.totalDecisions, 1)) * 60);
  const timePoints = Math.round((s.timeRemaining / INITIAL_TIME) * 40);
  return outcomePoints + accuracyPoints + timePoints;
}

type Action =
  | { type: 'START_GAME'; teamName: string }
  | { type: 'TICK' }
  | { type: 'DECIDE'; decisionId: string }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'NEXT_TEAM' }
  | { type: 'SHOW_COMPARISON' }
  | { type: 'NEXT_ROUND' };

const initialState: GameState = {
  phase: 'splash',
  currentScene: 'q1',
  timeRemaining: INITIAL_TIME,
  health: INITIAL_HEALTH,
  healthStatus: 'green',
  correctCount: 0,
  totalDecisions: 0,
  outcome: null,
  feedbackMessage: null,
  feedbackCorrect: false,
  showFeedback: false,
  teamName: '',
  sceneset: 'A',
  scores: [],
  sceneHistory: [],
};

function makeScore(
  state: GameState,
  health: number,
  healthStatus: HealthStatus,
  timeRemaining: number,
  correctCount: number,
  totalDecisions: number,
  outcome: OutcomeType
): TeamScore {
  const s: TeamScore = {
    teamName: state.teamName,
    sceneset: state.sceneset,
    outcome,
    timeRemaining,
    healthAtEnd: healthStatus,
    correctDecisions: correctCount,
    totalDecisions,
    battleScore: 0,
    timestamp: Date.now(),
  };
  s.battleScore = computeBattleScore(s);
  return s;
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const teamNumber = state.scores.length + 1;
      const sceneset: 'A' | 'B' = teamNumber % 2 === 0 ? 'B' : 'A';
      return {
        ...initialState,
        phase: 'game',
        teamName: action.teamName,
        sceneset,
        scores: state.scores,
      };
    }

    case 'TICK': {
      if (state.phase !== 'game' || state.showFeedback) return state;
      const newTime = state.timeRemaining - 1;
      if (newTime <= 0) {
        const outcome = computeOutcome(state.health, 0, state.correctCount, state.totalDecisions);
        const score = makeScore(state, state.health, state.healthStatus, 0, state.correctCount, state.totalDecisions, outcome);
        return { ...state, timeRemaining: 0, phase: 'outcome', outcome, scores: [...state.scores, score] };
      }
      return { ...state, timeRemaining: newTime };
    }

    case 'DECIDE': {
      const scenes = getScenesForSet(state.sceneset);
      const scene = scenes[state.currentScene];
      if (!scene) return state;
      const decision = scene.decisions.find((d) => d.id === action.decisionId);
      if (!decision) return state;

      const newHealth = Math.max(0, Math.min(100, state.health + decision.healthDelta));
      const newTime = Math.max(0, state.timeRemaining - decision.timePenalty);
      const newCorrect = state.correctCount + (decision.correct ? 1 : 0);
      const newTotal = state.totalDecisions + 1;
      const newStatus = healthToStatus(newHealth);
      const nextSceneId = scene.nextScene ?? 'outcome';

      if (nextSceneId === 'outcome' || newTime <= 0) {
        const outcome = computeOutcome(newHealth, newTime, newCorrect, newTotal);
        const score = makeScore(state, newHealth, newStatus, newTime, newCorrect, newTotal, outcome);
        return {
          ...state,
          health: newHealth, healthStatus: newStatus, timeRemaining: newTime,
          correctCount: newCorrect, totalDecisions: newTotal,
          feedbackMessage: decision.feedback, feedbackCorrect: decision.correct, showFeedback: true,
          currentScene: nextSceneId,
          sceneHistory: [...state.sceneHistory, state.currentScene],
          phase: 'outcome', outcome,
          scores: [...state.scores, score],
        };
      }

      return {
        ...state,
        health: newHealth, healthStatus: newStatus, timeRemaining: newTime,
        correctCount: newCorrect, totalDecisions: newTotal,
        feedbackMessage: decision.feedback, feedbackCorrect: decision.correct, showFeedback: true,
        currentScene: nextSceneId,
        sceneHistory: [...state.sceneHistory, state.currentScene],
      };
    }

    case 'CLEAR_FEEDBACK':
      return { ...state, showFeedback: false, feedbackMessage: null };

    case 'NEXT_TEAM':
      return { ...initialState, scores: state.scores, phase: 'splash' };

    case 'SHOW_COMPARISON':
      return { ...state, phase: 'comparison' };

    case 'NEXT_ROUND':
      return { ...initialState, scores: state.scores, phase: 'splash' };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = useCallback((teamName: string) => dispatch({ type: 'START_GAME', teamName }), []);
  const tick = useCallback(() => dispatch({ type: 'TICK' }), []);
  const decide = useCallback((id: string) => dispatch({ type: 'DECIDE', decisionId: id }), []);
  const clearFeedback = useCallback(() => dispatch({ type: 'CLEAR_FEEDBACK' }), []);
  const nextTeam = useCallback(() => dispatch({ type: 'NEXT_TEAM' }), []);
  const showComparison = useCallback(() => dispatch({ type: 'SHOW_COMPARISON' }), []);
  const nextRound = useCallback(() => dispatch({ type: 'NEXT_ROUND' }), []);

  return { state, startGame, tick, decide, clearFeedback, nextTeam, showComparison, nextRound };
}
