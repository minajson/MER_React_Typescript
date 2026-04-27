export type HealthStatus = 'green' | 'yellow' | 'red';
export type OutcomeType = 'success' | 'delayed' | 'failed';
export type SceneId =
  | 'collapse'
  | 'response_check'
  | 'mer_activation'
  | 'communication'
  | 'crowd_control'
  | 'patient_support'
  | 'outcome';

export interface Decision {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
  timePenalty: number;        // seconds to subtract (positive = penalty, negative = bonus)
  healthDelta: number;        // -2 = worsen 2 levels, +1 = improve, 0 = no change
  nextScene?: SceneId;
}

export interface Scene {
  id: SceneId;
  sceneNumber: number;
  title: string;
  subtitle: string;
  narrative: string;
  urgencyLabel: string;
  decisions: Decision[];
  autoAdvanceAfter?: number;  // ms, if no decision needed
  nextScene?: SceneId;
}

export interface TeamScore {
  teamName: string;
  outcome: OutcomeType;
  timeRemaining: number;
  healthAtEnd: HealthStatus;
  correctDecisions: number;
  totalDecisions: number;
  timestamp: number;
}

export interface GameState {
  phase: 'splash' | 'game' | 'outcome';
  currentScene: SceneId;
  timeRemaining: number;       // seconds
  health: number;              // 0–100
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
