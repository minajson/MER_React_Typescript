import type { Scene } from '../types';

// ─── TEAM SET A — General first-responder framing ──────────────────────────

export const SCENES_A: Record<string, Scene> = {
  collapse: {
    id: 'collapse',
    sceneNumber: 1,
    title: 'SCENE 1 — COLLAPSE',
    subtitle: 'Worker Down on the Factory Floor',
    urgencyLabel: 'CRITICAL — IMMEDIATE ACTION REQUIRED',
    narrative:
      'A 45-year-old male production worker collapses suddenly on the factory floor. He falls against a workbench and slumps to the ground. Bystanders freeze. His face is pale and he is not moving. You are the first person on scene.',
    decisions: [
      {
        id: 'a_c_correct',
        text: 'Shout for help loudly, confirm the area is safe, then approach the victim immediately',
        correct: true,
        feedback: 'CORRECT — Scene secured. You called for backup and approached safely. Every second from collapse to intervention matters.',
        timePenalty: 0,
        healthDelta: 0,
        nextScene: 'response_check',
      },
      {
        id: 'a_c_wrong1',
        text: 'Stand back and observe for 30 seconds to see if he regains consciousness on his own',
        correct: false,
        feedback: 'WRONG — Irreversible brain damage begins after 4–6 minutes without oxygen. There is no safe observation period.',
        timePenalty: 40,
        healthDelta: -15,
        nextScene: 'response_check',
      },
      {
        id: 'a_c_wrong2',
        text: 'Send a nearby colleague to help and return to your workstation until they respond',
        correct: false,
        feedback: 'WRONG — Delegation without direct assessment delays the entire response chain. You must be the anchor.',
        timePenalty: 30,
        healthDelta: -10,
        nextScene: 'response_check',
      },
    ],
  },

  response_check: {
    id: 'response_check',
    sceneNumber: 2,
    title: 'SCENE 2 — RESPONSE CHECK',
    subtitle: 'Assessing Level of Consciousness',
    urgencyLabel: 'ASSESS — DO NOT DELAY',
    narrative:
      'You kneel beside the victim. Eyes are closed. He is not moving. You must quickly and correctly assess his level of responsiveness before deciding your next action.',
    decisions: [
      {
        id: 'a_rc_correct',
        text: 'Tap both shoulders firmly and shout clearly: "Can you hear me? Open your eyes!"',
        correct: true,
        feedback: 'CORRECT — Unresponsiveness confirmed using the correct stimulus-response check. Proceed to airway assessment.',
        timePenalty: 0,
        healthDelta: 0,
        nextScene: 'mer_activation',
      },
      {
        id: 'a_rc_wrong1',
        text: 'Grip and shake him by the neck to stimulate a response',
        correct: false,
        feedback: 'WRONG — Cervical spine must never be manipulated during an unwitnessed collapse. Risk of permanent spinal injury.',
        timePenalty: 20,
        healthDelta: -10,
        nextScene: 'mer_activation',
      },
      {
        id: 'a_rc_wrong2',
        text: 'Pour water on his face and wait 15 seconds for a reaction',
        correct: false,
        feedback: 'WRONG — Not a recognised assessment technique. Wastes critical time and risks aspiration if airway is compromised.',
        timePenalty: 25,
        healthDelta: -5,
        nextScene: 'mer_activation',
      },
    ],
  },

  mer_activation: {
    id: 'mer_activation',
    sceneNumber: 3,
    title: 'SCENE 3 — MER ACTIVATION',
    subtitle: 'Calling the Emergency Response',
    urgencyLabel: 'ACTIVATE MER NOW — DO NOT WAIT',
    narrative:
      'The victim is unresponsive and not breathing normally. The MER team must be activated immediately. Survival from cardiac arrest drops by approximately 10% for every minute without defibrillation.',
    decisions: [
      {
        id: 'a_ma_correct',
        text: 'Call the MER hotline immediately. State: exact location, number of victims, current status',
        correct: true,
        feedback: 'CORRECT — MER activated with a complete handoff. Team is now en route. Begin CPR without delay.',
        timePenalty: 0,
        healthDelta: 10,
        nextScene: 'communication',
      },
      {
        id: 'a_ma_wrong1',
        text: 'Run to the supervisor\'s office to report the incident in person',
        correct: false,
        feedback: 'WRONG — You abandoned the patient. Use your mobile or direct a bystander to call while you stay with the victim.',
        timePenalty: 40,
        healthDelta: -15,
        nextScene: 'communication',
      },
      {
        id: 'a_ma_wrong2',
        text: 'Begin CPR and assume a bystander will call for help on their own',
        correct: false,
        feedback: 'WRONG — Never assume someone else has called. CPR without a defibrillator and MER team is insufficient alone.',
        timePenalty: 20,
        healthDelta: -5,
        nextScene: 'communication',
      },
    ],
  },

  communication: {
    id: 'communication',
    sceneNumber: 4,
    title: 'SCENE 4 — COMMUNICATION',
    subtitle: 'Coordinating the Scene',
    urgencyLabel: 'CLEAR DIRECTION SAVES TIME',
    narrative:
      'MER is en route — ETA 3 minutes. The facility is large. Workers are panicking in the corridor. The MER team will struggle to find the exact location without guidance.',
    decisions: [
      {
        id: 'a_co_correct',
        text: 'Point to a specific person: "You — go to the main entrance now and bring the MER team directly here"',
        correct: true,
        feedback: 'CORRECT — A named individual with a clear task reduces response time significantly. MER will arrive without delay.',
        timePenalty: 0,
        healthDelta: 5,
        nextScene: 'crowd_control',
      },
      {
        id: 'a_co_wrong1',
        text: 'Announce over the PA system and let the MER team navigate the facility themselves',
        correct: false,
        feedback: 'WRONG — In large facilities, vague directions cost 1–2 extra minutes. Time the patient does not have.',
        timePenalty: 30,
        healthDelta: -10,
        nextScene: 'crowd_control',
      },
      {
        id: 'a_co_wrong2',
        text: 'Keep calling the MER line for progress updates while staying with the patient',
        correct: false,
        feedback: 'WRONG — Repeatedly calling wastes the MER team\'s time. Trust the system — stay focused on the patient.',
        timePenalty: 15,
        healthDelta: -5,
        nextScene: 'crowd_control',
      },
    ],
  },

  crowd_control: {
    id: 'crowd_control',
    sceneNumber: 5,
    title: 'SCENE 5 — CROWD CONTROL',
    subtitle: 'Securing the Immediate Environment',
    urgencyLabel: 'CLEAR THE SCENE — RESCUERS NEED SPACE',
    narrative:
      'More than 20 workers have gathered within 2 metres of the victim. Someone is attempting to sit him up. Another is recording on a phone. The noise and chaos is escalating rapidly.',
    decisions: [
      {
        id: 'a_cc_correct',
        text: 'Designate a colleague to hold the crowd back at least 3 metres and establish a clear access corridor',
        correct: true,
        feedback: 'CORRECT — Scene controlled. MER has unobstructed access. Dignity protected. Rescuers can work safely.',
        timePenalty: 0,
        healthDelta: 5,
        nextScene: 'patient_support',
      },
      {
        id: 'a_cc_wrong1',
        text: 'Let the crowd remain — more people available means faster help if needed',
        correct: false,
        feedback: 'WRONG — Overcrowding creates panic, blocks airway access, and physically prevents the MER team from reaching the patient.',
        timePenalty: 20,
        healthDelta: -10,
        nextScene: 'patient_support',
      },
      {
        id: 'a_cc_wrong2',
        text: 'Take out your phone to photograph the scene for the incident report',
        correct: false,
        feedback: 'WRONG — Documentation happens after. Every action right now must be directed at preserving life.',
        timePenalty: 35,
        healthDelta: -15,
        nextScene: 'patient_support',
      },
    ],
  },

  patient_support: {
    id: 'patient_support',
    sceneNumber: 6,
    title: 'SCENE 6 — PATIENT SUPPORT',
    subtitle: 'Maintaining the Chain of Survival',
    urgencyLabel: 'START CPR — DO NOT WAIT FOR MER',
    narrative:
      'The victim has no palpable pulse and is apnoeic. MER is 2 minutes away. The AED cabinet is 25 metres down the corridor. You are the senior-most person on scene.',
    decisions: [
      {
        id: 'a_ps_correct',
        text: 'Commence CPR immediately at 30:2. Direct a bystander to retrieve the AED without leaving the patient yourself',
        correct: true,
        feedback: 'CORRECT — CPR initiated. AED delegated. Hands-on-chest within minutes of arrest gives the best survival odds.',
        timePenalty: 0,
        healthDelta: 20,
        nextScene: 'outcome',
      },
      {
        id: 'a_ps_wrong1',
        text: 'Run to retrieve the AED yourself before starting CPR',
        correct: false,
        feedback: 'WRONG — Never abandon a pulseless patient. Delegate AED retrieval. Even 30 seconds without CPR reduces survival odds significantly.',
        timePenalty: 45,
        healthDelta: -20,
        nextScene: 'outcome',
      },
      {
        id: 'a_ps_wrong2',
        text: 'Place the victim in the recovery position and monitor until MER arrives',
        correct: false,
        feedback: 'WRONG — Recovery position is contraindicated in cardiac arrest. This patient has no pulse and is not breathing. CPR is mandatory.',
        timePenalty: 30,
        healthDelta: -25,
        nextScene: 'outcome',
      },
    ],
  },

  outcome: {
    id: 'outcome',
    sceneNumber: 7,
    title: 'OUTCOME',
    subtitle: 'The Verdict',
    urgencyLabel: '',
    narrative: '',
    decisions: [],
    autoAdvanceAfter: 500,
  },
};

// ─── TEAM SET B — Clinical framing (occupational health level knowledge) ───

export const SCENES_B: Record<string, Scene> = {
  collapse: {
    id: 'collapse',
    sceneNumber: 1,
    title: 'SCENE 1 — COLLAPSE',
    subtitle: 'Lab Technician Unresponsive at Workbench',
    urgencyLabel: 'CRITICAL — IMMEDIATE CLINICAL ASSESSMENT',
    narrative:
      'A 52-year-old female laboratory technician is found slumped over her workbench, unresponsive. Colleagues attempted to rouse her verbally with no result. There is a faint chemical odour in the lab. You arrive first.',
    decisions: [
      {
        id: 'b_c_correct',
        text: 'Don gloves, confirm scene safety from chemical hazards, then approach and call for immediate help',
        correct: true,
        feedback: 'CORRECT — Rescuer safety is the first step. Gloves on, hazard assessed, help called. Clinical assessment begins now.',
        timePenalty: 0,
        healthDelta: 0,
        nextScene: 'response_check',
      },
      {
        id: 'b_c_wrong1',
        text: 'Rush directly to the patient without checking for chemical or environmental hazards',
        correct: false,
        feedback: 'WRONG — If you become a casualty, you cannot help. Scene safety must precede patient contact in any occupational setting.',
        timePenalty: 20,
        healthDelta: -5,
        nextScene: 'response_check',
      },
      {
        id: 'b_c_wrong2',
        text: 'Call from the doorway and wait for senior staff or the supervisor before approaching',
        correct: false,
        feedback: 'WRONG — Delayed approach costs vital minutes. Confirm safety, then go to the patient immediately.',
        timePenalty: 35,
        healthDelta: -10,
        nextScene: 'response_check',
      },
    ],
  },

  response_check: {
    id: 'response_check',
    sceneNumber: 2,
    title: 'SCENE 2 — PRIMARY SURVEY',
    subtitle: 'Airway, Breathing, and Circulation',
    urgencyLabel: 'COMPLETE PRIMARY SURVEY — UNDER 30 SECONDS',
    narrative:
      'You are at the patient\'s side. She is unresponsive to verbal stimuli. You must perform a rapid primary survey. Your findings will determine the entire response that follows.',
    decisions: [
      {
        id: 'b_rc_correct',
        text: 'Open airway with head-tilt chin-lift, look, listen, and feel for breathing for no more than 10 seconds',
        correct: true,
        feedback: 'CORRECT — Airway opened. No breathing detected in 10 seconds. Confirmed cardiac arrest. Proceed to MER activation and CPR.',
        timePenalty: 0,
        healthDelta: 0,
        nextScene: 'mer_activation',
      },
      {
        id: 'b_rc_wrong1',
        text: 'Begin rescue breaths immediately before assessing for breathing or circulation',
        correct: false,
        feedback: 'WRONG — Ventilating a patient with an occluded airway or an unconfirmed arrest wastes time and risks gastric inflation.',
        timePenalty: 20,
        healthDelta: -10,
        nextScene: 'mer_activation',
      },
      {
        id: 'b_rc_wrong2',
        text: 'Palpate the carotid pulse for up to 45 seconds to be certain before acting',
        correct: false,
        feedback: 'WRONG — Guidelines allow a maximum of 10 seconds for pulse check. Prolonged assessment is a delay, not diligence.',
        timePenalty: 30,
        healthDelta: -10,
        nextScene: 'mer_activation',
      },
    ],
  },

  mer_activation: {
    id: 'mer_activation',
    sceneNumber: 3,
    title: 'SCENE 3 — MER ACTIVATION',
    subtitle: 'Structured Emergency Communication',
    urgencyLabel: 'COMMUNICATE CLEARLY — EVERY SECOND COUNTS',
    narrative:
      'Cardiac arrest confirmed. You must activate the MER team with a clear, structured communication. Vague calls slow the response. The right information gets the right team in the right place.',
    decisions: [
      {
        id: 'b_ma_correct',
        text: 'Use SBAR: Situation — cardiac arrest. Background — 52F, lab tech. Assessment — pulseless, apnoeic. Recommendation — MER to Lab Block B immediately',
        correct: true,
        feedback: 'CORRECT — SBAR communication gives the MER team everything they need to prepare en route. Optimal dispatch achieved.',
        timePenalty: 0,
        healthDelta: 10,
        nextScene: 'communication',
      },
      {
        id: 'b_ma_wrong1',
        text: 'Shout down the corridor: "Someone has collapsed!" and return to the patient',
        correct: false,
        feedback: 'WRONG — Unstructured alerts lead to delayed and under-equipped response. Location, nature, and severity must all be communicated.',
        timePenalty: 35,
        healthDelta: -15,
        nextScene: 'communication',
      },
      {
        id: 'b_ma_wrong2',
        text: 'Contact the patient\'s occupational health file first to check for relevant medical history',
        correct: false,
        feedback: 'WRONG — Medical history is useful but never a first step in arrest. Call MER, start CPR — history comes later.',
        timePenalty: 40,
        healthDelta: -15,
        nextScene: 'communication',
      },
    ],
  },

  communication: {
    id: 'communication',
    sceneNumber: 4,
    title: 'SCENE 4 — TASK DELEGATION',
    subtitle: 'Deploying Your Team Effectively',
    urgencyLabel: 'LEAD THE SCENE — ASSIGN ROLES NOW',
    narrative:
      'Three colleagues are present. MER is 2.5 minutes away. You cannot do everything. Effective delegation is a clinical skill — the wrong task assignment can be as fatal as the wrong clinical decision.',
    decisions: [
      {
        id: 'b_co_correct',
        text: 'Assign clearly: Colleague 1 — CPR with you. Colleague 2 — AED retrieval. Colleague 3 — meet MER at entrance',
        correct: true,
        feedback: 'CORRECT — All critical tasks running simultaneously. This is optimal parallel resuscitation management.',
        timePenalty: 0,
        healthDelta: 5,
        nextScene: 'crowd_control',
      },
      {
        id: 'b_co_wrong1',
        text: 'Attempt to manage CPR, the AED, communication, and crowd control yourself',
        correct: false,
        feedback: 'WRONG — Task overload leads to critical omissions. Effective leaders delegate; they do not try to do everything alone.',
        timePenalty: 30,
        healthDelta: -10,
        nextScene: 'crowd_control',
      },
      {
        id: 'b_co_wrong2',
        text: 'Wait for the MER team to arrive and take over before doing anything, since they are trained',
        correct: false,
        feedback: 'WRONG — Every minute without CPR reduces survival by 10%. Waiting is not a clinical decision — it is negligence.',
        timePenalty: 45,
        healthDelta: -20,
        nextScene: 'crowd_control',
      },
    ],
  },

  crowd_control: {
    id: 'crowd_control',
    sceneNumber: 5,
    title: 'SCENE 5 — CPR IN PROGRESS',
    subtitle: 'Quality Compressions and AED Readiness',
    urgencyLabel: 'MAINTAIN CPR QUALITY — MINIMISE INTERRUPTIONS',
    narrative:
      'CPR is underway. The AED has arrived. After 2 minutes of compressions, you must decide the correct next step. The quality of this decision directly affects the likelihood of return of spontaneous circulation.',
    decisions: [
      {
        id: 'b_cc_correct',
        text: 'Pause CPR briefly to attach AED pads and analyse rhythm. Resume compressions immediately after shock delivery or if no shock advised',
        correct: true,
        feedback: 'CORRECT — AED integrated correctly. Rhythm analysis and defibrillation with minimal hands-off time is the evidence-based standard.',
        timePenalty: 0,
        healthDelta: 5,
        nextScene: 'patient_support',
      },
      {
        id: 'b_cc_wrong1',
        text: 'Stop CPR after 60 seconds and check for signs of life before continuing',
        correct: false,
        feedback: 'WRONG — Guidelines recommend 2-minute CPR cycles before reassessment. Early interruption reduces coronary perfusion pressure.',
        timePenalty: 20,
        healthDelta: -10,
        nextScene: 'patient_support',
      },
      {
        id: 'b_cc_wrong2',
        text: 'Continue CPR indefinitely without using the AED — wait for the paramedics to decide on defibrillation',
        correct: false,
        feedback: 'WRONG — Early defibrillation is a key link in the chain of survival. AED use by first responders saves lives paramedics cannot.',
        timePenalty: 25,
        healthDelta: -15,
        nextScene: 'patient_support',
      },
    ],
  },

  patient_support: {
    id: 'patient_support',
    sceneNumber: 6,
    title: 'SCENE 6 — AED DEPLOYMENT',
    subtitle: 'Correct Pad Placement and Shock Protocol',
    urgencyLabel: 'CLEAR — ANALYSING RHYTHM',
    narrative:
      'The AED is powered on. You must place the pads correctly and follow the device prompts precisely. An error here — wrong placement, contact during shock, or ignoring advice — can be fatal to the patient or the rescuer.',
    decisions: [
      {
        id: 'b_ps_correct',
        text: 'Right pad below right clavicle, left pad lateral to the left nipple on the chest wall. Clear all contact, follow all AED voice prompts',
        correct: true,
        feedback: 'CORRECT — Correct anatomical placement. Everyone clear. AED delivered shock. Continue CPR immediately after.',
        timePenalty: 0,
        healthDelta: 20,
        nextScene: 'outcome',
      },
      {
        id: 'b_ps_wrong1',
        text: 'Place both pads on the left side of the chest for better cardiac proximity',
        correct: false,
        feedback: 'WRONG — Both pads on the same side prevents adequate transthoracic current. The shock will be ineffective or deliver no benefit.',
        timePenalty: 30,
        healthDelta: -20,
        nextScene: 'outcome',
      },
      {
        id: 'b_ps_wrong2',
        text: 'Attach the pads while CPR continues to minimise the hands-off interval',
        correct: false,
        feedback: 'WRONG — Attaching pads during live compressions risks electrical injury to the rescuer and corrupts rhythm analysis. Everyone must clear before analysis.',
        timePenalty: 20,
        healthDelta: -15,
        nextScene: 'outcome',
      },
    ],
  },

  outcome: {
    id: 'outcome',
    sceneNumber: 7,
    title: 'OUTCOME',
    subtitle: 'The Verdict',
    urgencyLabel: '',
    narrative: '',
    decisions: [],
    autoAdvanceAfter: 500,
  },
};

export const SCENE_ORDER: string[] = [
  'collapse',
  'response_check',
  'mer_activation',
  'communication',
  'crowd_control',
  'patient_support',
  'outcome',
];

export function getScenesForSet(set: 'A' | 'B'): Record<string, Scene> {
  return set === 'B' ? SCENES_B : SCENES_A;
}
