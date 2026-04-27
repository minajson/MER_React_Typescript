import { useReducer, useCallback } from 'react';
import type { GameState, HealthStatus, OutcomeType, SceneId, TeamScore } from '../types';
import { getScenesForSet } from '../data/scenes';

const INITIAL_TIME = 300; // 5 minutes

function healthToStatus(h: number): HealthStatus {
  if (h >= 60) return 'green';
  if (h >= 30) return 'yellow';
  return 'red';
}

function computeOutcome(health: number, timeRemaining: number, correct: number, total: number): OutcomeType {
  const score = (correct / Math.max(total, 1)) * 100;
  if (health >= 60 && timeRemaining > 60 && score >= 60) return 'success';
  if (health >= 20 && timeRemaining > 0) return 'delayed';
  return 'failed';
}

type Action =
  | { type: 'START_GAME'; teamName: string }
  | { type: 'TICK' }
  | { type: 'DECIDE'; decisionId: string }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'ADVANCE_SCENE' }
  | { type: 'NEXT_TEAM' }
  | { type: 'SET_TEAM_NAME'; name: string };

const initialState: GameState = {
  phase: 'splash',
  currentScene: 'collapse',
  timeRemaining: INITIAL_TIME,
  health: 75,
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

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME': {
      // Alternate between Set A (odd teams) and Set B (even teams)
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

    case 'SET_TEAM_NAME':
      return { ...state, teamName: action.name };

    case 'TICK': {
      if (state.phase !== 'game' || state.showFeedback) return state;
      const newTime = state.timeRemaining - 1;
      if (newTime <= 0) {
        const outcome = computeOutcome(state.health, 0, state.correctCount, state.totalDecisions);
        const score: TeamScore = {
          teamName: state.teamName,
          outcome,
          timeRemaining: 0,
          healthAtEnd: state.healthStatus,
          correctDecisions: state.correctCount,
          totalDecisions: state.totalDecisions,
          timestamp: Date.now(),
        };
        return {
          ...state,
          timeRemaining: 0,
          phase: 'outcome',
          outcome,
          scores: [...state.scores, score],
        };
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
      const nextScene = (decision.nextScene || scene.nextScene || 'outcome') as SceneId;

      if (nextScene === 'outcome' || newTime <= 0) {
        const outcome = computeOutcome(newHealth, newTime, newCorrect, newTotal);
        const score: TeamScore = {
          teamName: state.teamName,
          outcome,
          timeRemaining: newTime,
          healthAtEnd: newStatus,
          correctDecisions: newCorrect,
          totalDecisions: newTotal,
          timestamp: Date.now(),
        };
        return {
          ...state,
          health: newHealth,
          healthStatus: newStatus,
          timeRemaining: newTime,
          correctCount: newCorrect,
          totalDecisions: newTotal,
          feedbackMessage: decision.feedback,
          feedbackCorrect: decision.correct,
          showFeedback: true,
          currentScene: nextScene,
          sceneHistory: [...state.sceneHistory, state.currentScene],
          phase: 'outcome',
          outcome,
          scores: [...state.scores, score],
        };
      }

      return {
        ...state,
        health: newHealth,
        healthStatus: newStatus,
        timeRemaining: newTime,
        correctCount: newCorrect,
        totalDecisions: newTotal,
        feedbackMessage: decision.feedback,
        feedbackCorrect: decision.correct,
        showFeedback: true,
        currentScene: nextScene,
        sceneHistory: [...state.sceneHistory, state.currentScene],
      };
    }

    case 'CLEAR_FEEDBACK':
      return { ...state, showFeedback: false, feedbackMessage: null };

    case 'ADVANCE_SCENE': {
      const scenes = getScenesForSet(state.sceneset);
      const scene = scenes[state.currentScene];
      const next = (scene?.nextScene || 'outcome') as SceneId;
      if (next === 'outcome') {
        const outcome = computeOutcome(state.health, state.timeRemaining, state.correctCount, state.totalDecisions);
        const score: TeamScore = {
          teamName: state.teamName,
          outcome,
          timeRemaining: state.timeRemaining,
          healthAtEnd: state.healthStatus,
          correctDecisions: state.correctCount,
          totalDecisions: state.totalDecisions,
          timestamp: Date.now(),
        };
        return {
          ...state,
          currentScene: next,
          phase: 'outcome',
          outcome,
          scores: [...state.scores, score],
        };
      }
      return { ...state, currentScene: next };
    }

    case 'NEXT_TEAM':
      return {
        ...initialState,
        scores: state.scores,
        phase: 'splash',
      };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = useCallback((teamName: string) => {
    dispatch({ type: 'START_GAME', teamName });
  }, []);

  const tick = useCallback(() => {
    dispatch({ type: 'TICK' });
  }, []);

  const decide = useCallback((decisionId: string) => {
    dispatch({ type: 'DECIDE', decisionId });
  }, []);

  const clearFeedback = useCallback(() => {
    dispatch({ type: 'CLEAR_FEEDBACK' });
  }, []);

  const advanceScene = useCallback(() => {
    dispatch({ type: 'ADVANCE_SCENE' });
  }, []);

  const nextTeam = useCallback(() => {
    dispatch({ type: 'NEXT_TEAM' });
  }, []);

  const setTeamName = useCallback((name: string) => {
    dispatch({ type: 'SET_TEAM_NAME', name });
  }, []);

  return { state, startGame, tick, decide, clearFeedback, advanceScene, nextTeam, setTeamName };
}
