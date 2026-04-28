export type HealthStatus = 'green' | 'yellow' | 'red';
export type OutcomeType = 'success' | 'delayed' | 'failed';
export type SceneId = string; // q1–q10, outcome

export interface Decision {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
  timePenalty: number;
  healthDelta: number;
}

export interface Scene {
  id: SceneId;
  sceneNumber: number;
  title: string;
  subtitle: string;
  narrative: string;
  urgencyLabel: string;
  decisions: Decision[];
  nextScene?: SceneId;
}

export interface TeamScore {
  teamName: string;
  sceneset: 'A' | 'B';
  outcome: OutcomeType;
  timeRemaining: number;
  healthAtEnd: HealthStatus;
  correctDecisions: number;
  totalDecisions: number;
  battleScore: number;
  timestamp: number;
}

export interface GameState {
  phase: 'splash' | 'game' | 'outcome' | 'comparison';
  currentScene: SceneId;
  timeRemaining: number;
  health: number;
  healthStatus: HealthStatus;
  correctCount: number;
  totalDecisions: number;
  outcome: OutcomeType | null;
  feedbackMessage: string | null;
  feedbackCorrect: boolean;
  showFeedback: boolean;
  teamName: string;
  sceneset: 'A' | 'B';
  scores: TeamScore[];
  sceneHistory: SceneId[];
}
