import type { Scene } from '../types';

// ─── SHARED SCENE ORDER ────────────────────────────────────────────────────
export const SCENE_ORDER: string[] = [
  'q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','outcome',
];

// ─── TEAM SET A — Generator House / Remote Site Clinic ────────────────────
// A 42-year-old contractor found collapsed in the generator house.
// Answer key: C B B B B A B B B B

export const SCENES_A: Record<string, Scene> = {
  q1: {
    id: 'q1', sceneNumber: 1,
    title: 'DECISION 1 — SCENE SAFETY',
    subtitle: 'Generator Room Entry',
    urgencyLabel: 'HAZARDOUS ENVIRONMENT — ASSESS BEFORE ENTRY',
    narrative:
      'You find a 42-year-old male contractor lying motionless on the floor of the generator house. The generator is running. The air is thick with exhaust fumes and the atmosphere feels heavy. He is not responding to shouts from the doorway.',
    nextScene: 'q2',
    decisions: [
      {
        id: 'a_q1_a', text: 'Shout for help and immediately enter to check the airway.',
        correct: false,
        feedback: 'WRONG — Entering a fume-filled space without ensuring personal safety turns you into a second casualty. The MER loses its anchor.',
        timePenalty: 20, healthDelta: -12,
      },
      {
        id: 'a_q1_b', text: 'Drag the patient out by their arms to the clinic immediately.',
        correct: false,
        feedback: 'WRONG — Uncontrolled dragging risks spinal injury. And you just entered a toxic atmosphere without PPE.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'a_q1_c', text: 'Ensure personal safety — hold your breath, ventilate the space or cover your airway, and move the patient to fresh air before assessing.',
        correct: true,
        feedback: 'CORRECT — Scene safety is always step one. A rescuer who becomes incapacitated cannot help anyone. Patient is now in a safe zone.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q1_d', text: 'Start chest compressions immediately while still in the generator room.',
        correct: false,
        feedback: 'WRONG — You are now both the patient and the rescuer. CO exposure will incapacitate you within minutes in that environment.',
        timePenalty: 25, healthDelta: -15,
      },
    ],
  },

  q2: {
    id: 'q2', sceneNumber: 2,
    title: 'DECISION 2 — PATTERN RECOGNITION',
    subtitle: 'Agonal Breathing — Cardiac Arrest',
    urgencyLabel: 'CRITICAL ASSESSMENT — DO NOT BE FOOLED',
    narrative:
      'Now in fresh air, the patient is unresponsive. You observe slow, infrequent gasping breaths — irregular and shallow. You recall that agonal breathing can mimic "breathing" but is actually a sign of dying.',
    nextScene: 'q3',
    decisions: [
      {
        id: 'a_q2_a', text: 'Give him a few minutes to wake up naturally — he is still breathing.',
        correct: false,
        feedback: 'WRONG — Agonal gasps are NOT breathing. Every minute you wait without CPR reduces survival by 10%. He is in cardiac arrest.',
        timePenalty: 25, healthDelta: -20,
      },
      {
        id: 'a_q2_b', text: 'Recognise agonal breathing as cardiac arrest, activate the MER immediately, and begin CPR.',
        correct: true,
        feedback: 'CORRECT — Agonal gasps are a cardinal sign of cardiac arrest. MER activated. CPR begun. Survival chain is intact.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q2_c', text: 'Check for a medical alert bracelet before doing anything else.',
        correct: false,
        feedback: 'WRONG — Medical history is irrelevant right now. He is pulseless. Activate MER and start CPR — bracelet can wait.',
        timePenalty: 20, healthDelta: -10,
      },
      {
        id: 'a_q2_d', text: 'Place him in the recovery position and monitor his breathing.',
        correct: false,
        feedback: 'WRONG — Recovery position is for unconscious patients who ARE breathing with a pulse. This patient is in cardiac arrest.',
        timePenalty: 25, healthDelta: -15,
      },
    ],
  },

  q3: {
    id: 'q3', sceneNumber: 3,
    title: 'DECISION 3 — SOLO CPR QUALITY',
    subtitle: 'Performing Compressions Alone',
    urgencyLabel: 'CPR IN PROGRESS — MAINTAIN QUALITY',
    narrative:
      'You are alone. The MER has been activated by radio. The backup team and AED are en route — ETA 4 minutes. You are performing CPR. Quality matters more than speed right now.',
    nextScene: 'q4',
    decisions: [
      {
        id: 'a_q3_a', text: 'Stop CPR briefly to document the exact time you found the patient.',
        correct: false,
        feedback: 'WRONG — Documentation never interrupts CPR. Delegate this or record it from memory later. Hands-off time costs lives.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q3_b', text: 'Perform high-quality chest compressions: rate 100–120/min, depth 5–6 cm, full chest recoil between compressions.',
        correct: true,
        feedback: 'CORRECT — This is the standard. Maintaining perfusion pressure during CPR is the single most important factor in survival.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q3_c', text: 'Search the patient\'s pockets for their ID and emergency contact.',
        correct: false,
        feedback: 'WRONG — You abandoned CPR to search pockets. Every second without compressions costs coronary perfusion pressure.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q3_d', text: 'Administer a shot of adrenaline into the thigh to stimulate the heart.',
        correct: false,
        feedback: 'WRONG — Adrenaline administration is outside first-responder scope in this setting. Unauthorised drug administration is dangerous.',
        timePenalty: 25, healthDelta: -15,
      },
    ],
  },

  q4: {
    id: 'q4', sceneNumber: 4,
    title: 'DECISION 4 — AED PREPARATION',
    subtitle: 'Wet Chest — Pad Placement',
    urgencyLabel: 'AED ARRIVED — PREPARE BEFORE ATTACHING',
    narrative:
      'The AED has arrived. You open the patient\'s shirt to apply the pads. His chest is soaking wet — sweat and humidity from the generator environment. An effective shock depends on good pad-to-skin contact.',
    nextScene: 'q5',
    decisions: [
      {
        id: 'a_q4_a', text: 'Place the pads directly over the wet skin to save time.',
        correct: false,
        feedback: 'WRONG — Wet skin causes current to arc across the surface rather than pass through the heart. The shock will be ineffective and risks burns.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'a_q4_b', text: 'Quickly but thoroughly wipe the chest dry before applying the pads in the correct positions.',
        correct: true,
        feedback: 'CORRECT — Dry skin ensures the electrical current passes through the myocardium, not across the chest surface. Good preparation.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q4_c', text: 'Use only one pad to reduce the risk of a short circuit.',
        correct: false,
        feedback: 'WRONG — Both pads are required to complete the circuit through the heart. One pad delivers no therapeutic shock.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'a_q4_d', text: 'Wait for the patient to air-dry naturally before applying pads.',
        correct: false,
        feedback: 'WRONG — Waiting introduces a critical delay. Wipe the chest dry quickly with available material — shirt, cloth, anything.',
        timePenalty: 20, healthDelta: -12,
      },
    ],
  },

  q5: {
    id: 'q5', sceneNumber: 5,
    title: 'DECISION 5 — POST-SHOCK PROTOCOL',
    subtitle: 'After Defibrillation — The Deadly Pause',
    urgencyLabel: 'SHOCK DELIVERED — RESUME IMMEDIATELY',
    narrative:
      'The AED delivered a shock. You notice the patient\'s hand twitch slightly. A bystander says, "He moved! He might be waking up." This is the most dangerous moment in the resuscitation.',
    nextScene: 'q6',
    decisions: [
      {
        id: 'a_q5_a', text: 'Stop CPR and wait for the patient to regain consciousness.',
        correct: false,
        feedback: 'WRONG — The "post-shock pause" kills. A twitch is NOT return of spontaneous circulation. Resume compressions immediately without checking for a pulse.',
        timePenalty: 25, healthDelta: -20,
      },
      {
        id: 'a_q5_b', text: 'Immediately resume CPR starting with chest compressions, regardless of the twitching.',
        correct: true,
        feedback: 'CORRECT — Resume CPR immediately after shock delivery. The myocardium needs continued support. A rhythm check happens after 2 full minutes.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q5_c', text: 'Turn off the AED to preserve the battery.',
        correct: false,
        feedback: 'WRONG — The AED must remain on to monitor, re-analyse, and deliver further shocks if needed. Never power it off during resuscitation.',
        timePenalty: 20, healthDelta: -10,
      },
      {
        id: 'a_q5_d', text: 'Check the blood pressure and pulse for 2 full minutes to confirm ROSC.',
        correct: false,
        feedback: 'WRONG — Two minutes without compressions during a non-confirmed ROSC causes catastrophic perfusion failure. Resume CPR now.',
        timePenalty: 25, healthDelta: -15,
      },
    ],
  },

  q6: {
    id: 'q6', sceneNumber: 6,
    title: 'DECISION 6 — AIRWAY PROTECTION',
    subtitle: 'ROSC with Active Vomiting',
    urgencyLabel: 'RETURN OF PULSE — PROTECT THE AIRWAY',
    narrative:
      'The patient has regained a pulse (ROSC) but remains unconscious. Suddenly he begins to vomit. You are the sole respondent. Without airway protection, aspiration pneumonitis can be fatal within hours.',
    nextScene: 'q7',
    decisions: [
      {
        id: 'a_q6_a', text: 'Use a manual suction pump to clear the airway, or log-roll the patient as a unit into the lateral recovery position.',
        correct: true,
        feedback: 'CORRECT — Log-rolling protects the spine while draining vomit. Manual suction clears the oropharynx. Aspiration risk minimised.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q6_b', text: 'Keep the patient flat on their back and tilt the head forward.',
        correct: false,
        feedback: 'WRONG — This position pools vomit directly in the airway. Aspiration will cause immediate hypoxaemia and chemical pneumonitis.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'a_q6_c', text: 'Insert a gauze pad into the mouth to soak up the vomit.',
        correct: false,
        feedback: 'WRONG — Gauze in the airway of an unconscious patient is a choking hazard that will cause complete obstruction.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'a_q6_d', text: 'Leave the patient and run to find a more senior officer immediately.',
        correct: false,
        feedback: 'WRONG — You abandoned a patient who is actively vomiting and unconscious. Aspiration in your absence is near certain.',
        timePenalty: 25, healthDelta: -20,
      },
    ],
  },

  q7: {
    id: 'q7', sceneNumber: 7,
    title: 'DECISION 7 — OXYGENATION',
    subtitle: 'Dropping Oxygen Saturation',
    urgencyLabel: 'SpO₂ DROPPING — INTERVENE NOW',
    narrative:
      'The patient is now breathing weakly. His oxygen saturation is dropping steadily — currently 84% and falling. The Medevac is 15 minutes away. You have access to oxygen equipment in the clinic.',
    nextScene: 'q8',
    decisions: [
      {
        id: 'a_q7_a', text: 'Restart the generator to improve the lighting in the area.',
        correct: false,
        feedback: 'WRONG — The generator produces carbon monoxide. Reintroducing that atmosphere will cause carboxyhaemoglobin poisoning and accelerate hypoxia.',
        timePenalty: 20, healthDelta: -12,
      },
      {
        id: 'a_q7_b', text: 'Administer high-flow oxygen via a non-rebreather mask at 15 litres per minute.',
        correct: true,
        feedback: 'CORRECT — NRB at 15L/min delivers approximately 90–95% FiO₂. This directly counteracts CO poisoning and corrects the dropping saturation.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q7_c', text: 'Perform an emergency tracheostomy using a sterilised pen to improve airflow.',
        correct: false,
        feedback: 'WRONG — This is a surgical procedure far outside the scope of a site first-responder. It would cause haemorrhage and death.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'a_q7_d', text: 'Instruct the patient to "take deep breaths."',
        correct: false,
        feedback: 'WRONG — The patient is unconscious. They cannot follow commands. You need oxygen delivery, not verbal instruction.',
        timePenalty: 20, healthDelta: -10,
      },
    ],
  },

  q8: {
    id: 'q8', sceneNumber: 8,
    title: 'DECISION 8 — DOCUMENTATION',
    subtitle: 'Handover Format for Flight Crew',
    urgencyLabel: 'DOCUMENT NOW — BEFORE DETAILS FADE',
    narrative:
      'The Medevac has been confirmed. The flight crew will need a concise, structured clinical summary the moment they land. Poor documentation leads to medication errors and missed diagnoses at the receiving hospital.',
    nextScene: 'q9',
    decisions: [
      {
        id: 'a_q8_a', text: 'Write a long narrative essay describing the incident from your perspective.',
        correct: false,
        feedback: 'WRONG — Lengthy prose wastes time and is unreadable during a clinical handover. Flight crews need structured, scannable data.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q8_b', text: 'Use the SBAR format: Situation, Background, Assessment, Recommendation.',
        correct: true,
        feedback: 'CORRECT — SBAR is the international standard for clinical handovers. It delivers all critical information in under 90 seconds.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q8_c', text: 'Wait until the patient has been transported to write anything, so you\'re not distracted.',
        correct: false,
        feedback: 'WRONG — Memory degrades rapidly under stress. Document in real-time or immediately after the acute event.',
        timePenalty: 20, healthDelta: -10,
      },
      {
        id: 'a_q8_d', text: 'Record only the patient\'s name and age.',
        correct: false,
        feedback: 'WRONG — Grossly insufficient. The flight crew needs: clinical status, interventions performed, vitals trend, and time of collapse.',
        timePenalty: 20, healthDelta: -10,
      },
    ],
  },

  q9: {
    id: 'q9', sceneNumber: 9,
    title: 'DECISION 9 — MEDEVAC PREPARATION',
    subtitle: 'Preparing the Patient for Transport',
    urgencyLabel: 'HELICOPTER 5 MINUTES OUT — PREPARE NOW',
    narrative:
      'The Medevac helicopter is 5 minutes away. You have a narrow window to ensure the patient is ready for safe air transport. This is your final intervention before clinical handover.',
    nextScene: 'q10',
    decisions: [
      {
        id: 'a_q9_a', text: 'Clean the patient\'s boots and straighten their uniform before the flight crew arrives.',
        correct: false,
        feedback: 'WRONG — This is clinically irrelevant. You are wasting the only time available to prepare the patient\'s airway, access, and vitals.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q9_b', text: 'Confirm the airway is secured, IV access is patent (if established), and latest vitals are documented.',
        correct: true,
        feedback: 'CORRECT — These are the three pillars of safe patient transfer: Airway, Access, and Assessment data. Flight crew can take over seamlessly.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q9_c', text: 'Call the patient\'s family to explain what has happened before the helicopter arrives.',
        correct: false,
        feedback: 'WRONG — Family notification is a management-level task. Your clinical priority is ensuring the patient is transport-ready.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q9_d', text: 'Lock the clinic doors and turn off the lights to secure the facility.',
        correct: false,
        feedback: 'WRONG — Locking the clinic obstructs MER access. The patient is still inside. This is a life-threatening error.',
        timePenalty: 20, healthDelta: -12,
      },
    ],
  },

  q10: {
    id: 'q10', sceneNumber: 10,
    title: 'DECISION 10 — CLINICAL HANDOVER',
    subtitle: '"Downtime" — The Most Critical Number',
    urgencyLabel: 'FLIGHT MEDIC ON SCENE — COMPLETE HANDOVER',
    narrative:
      'The flight medic steps off the helicopter and asks: "What is the downtime?" This single data point determines the receiving hospital\'s resuscitation strategy, drug dosing, and neurological prognosis.',
    nextScene: 'outcome',
    decisions: [
      {
        id: 'a_q10_a', text: 'Report what the patient had for breakfast and whether they appeared well this morning.',
        correct: false,
        feedback: 'WRONG — Dietary history is irrelevant at handover. The medic needs clinical data, not social history.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q10_b', text: 'State: time of collapse, total CPR duration, number of shocks delivered, and the most recent set of vitals.',
        correct: true,
        feedback: 'CORRECT — This is the clinical "downtime package." Every element affects the hospital team\'s treatment plan. Perfect handover.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'a_q10_c', text: 'Provide the name and contact number of the site supervisor.',
        correct: false,
        feedback: 'WRONG — Administrative information. The medic needs clinical data to make immediate treatment decisions.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'a_q10_d', text: 'Describe the weather conditions at the time of the incident.',
        correct: false,
        feedback: 'WRONG — Weather does not determine treatment. Collapse time, CPR duration, shocks, and current vitals are what matter.',
        timePenalty: 15, healthDelta: -8,
      },
    ],
  },

  outcome: {
    id: 'outcome', sceneNumber: 11,
    title: 'OUTCOME', subtitle: 'The Verdict', urgencyLabel: '', narrative: '', decisions: [],
  },
};

// ─── TEAM SET B — Chemical Storage Shed / Remote Swamp Site ───────────────
// A 38-year-old worker found collapsed in a chemical storage shed.
// Answer key: B B B C B B B B C A

export const SCENES_B: Record<string, Scene> = {
  q1: {
    id: 'q1', sceneNumber: 1,
    title: 'DECISION 1 — CHEMICAL HAZARD ENTRY',
    subtitle: 'Hot Zone — Responder Safety',
    urgencyLabel: 'CHEMICAL ENVIRONMENT — DO NOT RUSH IN',
    narrative:
      'You find a 38-year-old male worker slumped against a barrel in a chemical storage shed. There is a strong sweet odour in the air and a spilled container of solvent at his feet. The air appears slightly hazy.',
    nextScene: 'q2',
    decisions: [
      {
        id: 'b_q1_a', text: 'Run in immediately, grab his shoulders, and pull him out as fast as possible.',
        correct: false,
        feedback: 'WRONG — You just entered a chemical hot zone without PPE. You are now the second casualty. The MER has lost its only responder.',
        timePenalty: 25, healthDelta: -20,
      },
      {
        id: 'b_q1_b', text: 'Don a respirator and gloves from the emergency kit, ventilate the area, and then enter to remove the patient.',
        correct: true,
        feedback: 'CORRECT — In chemical scenarios, the first rule is responder protection. PPE on, zone ventilated, then safe patient extraction.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q1_c', text: 'Perform the primary assessment where he lies to avoid moving him unnecessarily.',
        correct: false,
        feedback: 'WRONG — You entered a chemical hot zone and began assessment in a toxic atmosphere. This decision costs two lives, not one.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q1_d', text: 'Call the logistics manager to ask what chemicals are stored in the shed before approaching.',
        correct: false,
        feedback: 'WRONG — Seeking administrative approval while a patient is collapsing costs critical minutes. Don appropriate PPE and act.',
        timePenalty: 15, healthDelta: -8,
      },
    ],
  },

  q2: {
    id: 'q2', sceneNumber: 2,
    title: 'DECISION 2 — RESPIRATORY COMPROMISE',
    subtitle: 'Slow Snoring Breaths — Airway at Risk',
    urgencyLabel: 'AIRWAY COMPROMISED — ACTIVATE MER NOW',
    narrative:
      'In the cold zone (fresh air), the patient is unconscious. His skin is pale and clammy. He is breathing — but the breaths are very slow and produce a loud snoring sound, suggesting partial airway obstruction. His lips are slightly blue.',
    nextScene: 'q3',
    decisions: [
      {
        id: 'b_q2_a', text: 'Assume he is sleeping off a long shift. Leave him to rest and monitor from a distance.',
        correct: false,
        feedback: 'WRONG — This patient is in respiratory failure with partial airway obstruction. "Snoring" is a sign of a blocked airway, not sleep. He will die.',
        timePenalty: 25, healthDelta: -20,
      },
      {
        id: 'b_q2_b', text: 'Recognise airway compromise and possible respiratory failure; perform a jaw thrust and activate MER immediately.',
        correct: true,
        feedback: 'CORRECT — Snoring = partial airway obstruction. Jaw thrust opens the airway. MER activated. This is correct primary survey management.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q2_c', text: 'Shake him vigorously and pour cold water on his face to revive him.',
        correct: false,
        feedback: 'WRONG — This manoeuvre is clinically inappropriate. It does not address the airway obstruction and wastes time.',
        timePenalty: 20, healthDelta: -10,
      },
      {
        id: 'b_q2_d', text: 'Check his carotid pulse for a full 2 minutes to confirm it is present before calling for help.',
        correct: false,
        feedback: 'WRONG — Two minutes of pulse checking without airway intervention. His oxygen saturation is dropping every second.',
        timePenalty: 25, healthDelta: -15,
      },
    ],
  },

  q3: {
    id: 'q3', sceneNumber: 3,
    title: 'DECISION 3 — RESPIRATORY ARREST',
    subtitle: 'Pulse Present — No Breathing',
    urgencyLabel: 'BREATHING HAS STOPPED — PULSE IS STILL PRESENT',
    narrative:
      'While managing the airway, the patient\'s breathing stops entirely. You check for a pulse — it is present but very weak and slow. This is respiratory arrest, NOT cardiac arrest. Your response must be different.',
    nextScene: 'q4',
    decisions: [
      {
        id: 'b_q3_a', text: 'Start full chest compressions immediately at 100–120/min.',
        correct: false,
        feedback: 'WRONG — This patient has a pulse. Performing compressions on a beating heart can cause ventricular fibrillation and induce cardiac arrest.',
        timePenalty: 25, healthDelta: -20,
      },
      {
        id: 'b_q3_b', text: 'Provide rescue breaths using a Bag-Valve-Mask at 1 breath every 6 seconds (10 breaths/min).',
        correct: true,
        feedback: 'CORRECT — Respiratory arrest with a present pulse requires ventilation only. BVM at 10 breaths/min maintains oxygenation without causing cardiac complications.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q3_c', text: 'Wait for the AED to analyse the rhythm and tell you what to do.',
        correct: false,
        feedback: 'WRONG — The AED assesses cardiac rhythm, not respiratory status. While you wait, the patient is apnoeic and brain-dead in 4 minutes.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q3_d', text: 'Sit the patient upright against a wall to help his lungs expand.',
        correct: false,
        feedback: 'WRONG — An unconscious patient cannot maintain a sitting position and will slump, further obstructing the airway.',
        timePenalty: 20, healthDelta: -12,
      },
    ],
  },

  q4: {
    id: 'q4', sceneNumber: 4,
    title: 'DECISION 4 — SEIZURE MANAGEMENT',
    subtitle: 'Generalised Tonic-Clonic Convulsions',
    urgencyLabel: 'ACTIVE SEIZURE — PROTECT, DO NOT RESTRAIN',
    narrative:
      'The patient begins a generalised tonic-clonic seizure — his whole body is convulsing rhythmically. You are alone in the clinic area. There is equipment and a metal trolley nearby.',
    nextScene: 'q5',
    decisions: [
      {
        id: 'b_q4_a', text: 'Insert a padded tongue blade into his mouth to prevent him biting his tongue.',
        correct: false,
        feedback: 'WRONG — This is outdated and dangerous practice. It risks breaking teeth, lacerating the mouth, and causing aspiration. Never insert anything into a seizing patient\'s mouth.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q4_b', text: 'Restrain his arms and legs as firmly as possible to stop the convulsions.',
        correct: false,
        feedback: 'WRONG — Forceful restraint during a seizure causes dislocations, fractures, and rhabdomyolysis. You cannot "stop" a seizure by restraint.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q4_c', text: 'Clear the area of hard objects, cushion his head, protect him from injury, and do not place anything in his mouth.',
        correct: true,
        feedback: 'CORRECT — This is the evidence-based management of a seizure. Protect, do not restrain, do not insert anything orally. Time the seizure.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q4_d', text: 'Crush an oral sedative and place it under his tongue immediately.',
        correct: false,
        feedback: 'WRONG — Placing anything in the mouth of a seizing patient risks complete airway obstruction and aspiration. This is dangerous regardless of intent.',
        timePenalty: 20, healthDelta: -12,
      },
    ],
  },

  q5: {
    id: 'q5', sceneNumber: 5,
    title: 'DECISION 5 — CHEMICAL BURN',
    subtitle: 'Active Solvent Burn on Forearm',
    urgencyLabel: 'DECONTAMINATE NOW — CHEMICAL STILL ACTIVE',
    narrative:
      'Post-seizure, the patient remains unconscious. You notice a large area of reddened, blistered skin on his left forearm with visible chemical residue still on the surface. The burn is still active.',
    nextScene: 'q6',
    decisions: [
      {
        id: 'b_q5_a', text: 'Apply a thick layer of antibiotic ointment and wrap it tightly in a bandage.',
        correct: false,
        feedback: 'WRONG — Ointment over an active chemical burn seals the chemical against the skin and accelerates tissue destruction. Never apply ointment first.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q5_b', text: 'Immediately flush the burn area with copious amounts of clean lukewarm water for a minimum of 20 minutes.',
        correct: true,
        feedback: 'CORRECT — Continuous water irrigation is the only correct first-aid decontamination for chemical burns. 20 minutes minimum. Do not stop early.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q5_c', text: 'Pour a different chemical (vinegar or bicarbonate solution) to neutralise the burn agent.',
        correct: false,
        feedback: 'WRONG — Chemical neutralisation creates an exothermic reaction that deepens the burn. Water is always the correct decontaminant.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q5_d', text: 'Leave the burn entirely and wait for the flight physician to manage it.',
        correct: false,
        feedback: 'WRONG — The chemical is still active. Every minute without irrigation means deeper tissue destruction — potentially down to bone.',
        timePenalty: 20, healthDelta: -12,
      },
    ],
  },

  q6: {
    id: 'q6', sceneNumber: 6,
    title: 'DECISION 6 — COMMAND DECISION',
    subtitle: 'Supervisor Wants to Cancel the Helicopter',
    urgencyLabel: 'HOLD YOUR POSITION — DO NOT CANCEL',
    narrative:
      'The site supervisor approaches and says: "He looks better now that he\'s stopped shaking. Cancel the helicopter — the paperwork will be a nightmare. Can\'t we just drive him to the nearest town?" The helicopter is 12 minutes away.',
    nextScene: 'q7',
    decisions: [
      {
        id: 'b_q6_a', text: '"Agreed. Let\'s monitor him here for 24 hours and reassess before deciding."',
        correct: false,
        feedback: 'WRONG — A post-seizure, post-chemical-exposure unconscious patient requires hospital care. "Monitoring" without diagnostic capability is not an option.',
        timePenalty: 25, healthDelta: -20,
      },
      {
        id: 'b_q6_b', text: '"Negative. This patient has had a seizure, is unconscious, and has had significant chemical exposure. This is a medical emergency — the helicopter is not optional."',
        correct: true,
        feedback: 'CORRECT — You held the clinical ground. Post-ictal unconsciousness following chemical exposure has high mortality risk without hospital-level intervention.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q6_c', text: '"I\'m not certain — let me check the company emergency response policy manual first."',
        correct: false,
        feedback: 'WRONG — The clinical indication is clear. Referencing policy manuals while a patient deteriorates is not clinical decision-making.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'b_q6_d', text: '"Cancel the helicopter, but prepare the site boat for a 6-hour river transport instead."',
        correct: false,
        feedback: 'WRONG — Six hours without clinical monitoring or intervention for this patient is likely fatal. Air Medevac was the right call.',
        timePenalty: 25, healthDelta: -15,
      },
    ],
  },

  q7: {
    id: 'q7', sceneNumber: 7,
    title: 'DECISION 7 — SHOCK MANAGEMENT',
    subtitle: 'BP 80/40 — Patient in Shock',
    urgencyLabel: 'HAEMODYNAMIC INSTABILITY DETECTED',
    narrative:
      'While monitoring vitals, the patient\'s blood pressure drops to 80/40 mmHg and his heart rate is 120/min. He is in shock — most likely distributive from systemic chemical absorption. You are the first-responder.',
    nextScene: 'q8',
    decisions: [
      {
        id: 'b_q7_a', text: 'Give him a hot cup of coffee or sweet beverage to stimulate his heart and raise his blood pressure.',
        correct: false,
        feedback: 'WRONG — This patient is unconscious. Oral fluids to an unconscious patient cause aspiration. Coffee has no haemodynamic effect in shock.',
        timePenalty: 25, healthDelta: -15,
      },
      {
        id: 'b_q7_b', text: 'Keep him warm, passively elevate his legs if no head injury is suspected, and monitor closely for cardiac arrest.',
        correct: true,
        feedback: 'CORRECT — These are the first-responder shock management principles: warmth, positioning, and continuous monitoring. Definitive treatment requires hospital.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q7_c', text: 'Perform a vigorous sternal rub to stimulate a pain response and raise the blood pressure.',
        correct: false,
        feedback: 'WRONG — Sternal rub is an assessment tool, not a treatment. It has no haemodynamic effect and will not reverse shock.',
        timePenalty: 20, healthDelta: -10,
      },
      {
        id: 'b_q7_d', text: 'Administer 4 tablets of Aspirin orally to thin the blood and improve circulation.',
        correct: false,
        feedback: 'WRONG — Aspirin is an antiplatelet agent — not a vasopressor. It will not raise blood pressure and risks GI haemorrhage in a shocked patient.',
        timePenalty: 20, healthDelta: -12,
      },
    ],
  },

  q8: {
    id: 'q8', sceneNumber: 8,
    title: 'DECISION 8 — HAZMAT DOCUMENTATION',
    subtitle: 'Critical Information for the Receiving Hospital',
    urgencyLabel: 'DOCUMENT THE CHEMICAL — THIS CHANGES TREATMENT',
    narrative:
      'While the patient is being monitored, you must document for the receiving hospital. The treatment for chemical poisoning differs entirely based on the substance involved. What is the most critical documentation to prepare?',
    nextScene: 'q9',
    decisions: [
      {
        id: 'b_q8_a', text: 'The patient\'s next of kin and home address in the city.',
        correct: false,
        feedback: 'WRONG — Administrative data. The toxicologist at the receiving hospital needs to know WHAT chemical and HOW LONG the exposure lasted.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'b_q8_b', text: 'The chemical name from the Safety Data Sheet, estimated duration of exposure, and the full seizure timeline.',
        correct: true,
        feedback: 'CORRECT — This is the clinical triad: substance identity, exposure duration, and symptom progression. The toxicology team can act the moment the helicopter lands.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q8_c', text: 'A full list of all witnesses who were standing outside the shed at the time.',
        correct: false,
        feedback: 'WRONG — Witness lists are for the incident investigation, not clinical handover. The hospital team does not need witness names.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'b_q8_d', text: 'The patient\'s salary grade, department code, and contractor ID number.',
        correct: false,
        feedback: 'WRONG — HR data. The receiving physicians will not consult a payroll system to determine treatment for solvent poisoning.',
        timePenalty: 20, healthDelta: -10,
      },
    ],
  },

  q9: {
    id: 'q9', sceneNumber: 9,
    title: 'DECISION 9 — SBAR RADIO BRIEFING',
    subtitle: 'The "A" in SBAR — Assessment',
    urgencyLabel: 'HELICOPTER 2 MINUTES OUT — RADIO BRIEFING NOW',
    narrative:
      'You are transmitting a pre-arrival SBAR briefing over the radio to the incoming flight medic. You have completed Situation (chemical exposure, collapse) and Background (38M, solvent shed). The medic asks: "What is your Assessment?"',
    nextScene: 'q10',
    decisions: [
      {
        id: 'b_q9_a', text: '"The patient is a 38-year-old male worker."',
        correct: false,
        feedback: 'WRONG — That is Background information, already communicated. Assessment means current clinical status — what is happening to the patient RIGHT NOW.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'b_q9_b', text: '"I think he might have a bad headache when he wakes up."',
        correct: false,
        feedback: 'WRONG — Speculation is not assessment. The flight medic needs objective clinical data to prepare their equipment and interventions in flight.',
        timePenalty: 20, healthDelta: -12,
      },
      {
        id: 'b_q9_c', text: '"BP 80/40, HR 120, GCS 7, apnoeic — airway currently maintained with BVM at 10 breaths per minute. One seizure lasting approximately 4 minutes."',
        correct: true,
        feedback: 'CORRECT — This is a complete clinical assessment: haemodynamics, consciousness level, airway status, and seizure history. The medic can prepare perfectly.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q9_d', text: '"The weather at the site is currently clear with light winds from the south-east."',
        correct: false,
        feedback: 'WRONG — The pilot has the weather. The medic needs clinical data. This response wastes radio time and gives the medic nothing.',
        timePenalty: 15, healthDelta: -8,
      },
    ],
  },

  q10: {
    id: 'q10', sceneNumber: 10,
    title: 'DECISION 10 — FINAL HANDOVER',
    subtitle: 'Your Last Responsibility at Scene',
    urgencyLabel: 'FLIGHT MEDIC ON SCENE — COMPLETE HANDOVER',
    narrative:
      'The helicopter has landed. The flight medic has taken clinical control of the patient. Before they lift off, you have one final responsibility as the on-site first responder.',
    nextScene: 'outcome',
    decisions: [
      {
        id: 'b_q10_a', text: 'Provide the flight medic with your written clinical notes and the chemical\'s Safety Data Sheet (SDS).',
        correct: true,
        feedback: 'CORRECT — Written notes ensure nothing is missed in verbal handover. The SDS gives the hospital toxicology team exact chemical data. Outstanding handover.',
        timePenalty: 0, healthDelta: 5,
      },
      {
        id: 'b_q10_b', text: 'Ask the flight medic if there is space for a ride back to the city on the helicopter.',
        correct: false,
        feedback: 'WRONG — Highly unprofessional. You must remain on site to manage the scene, complete the incident report, and support the investigation.',
        timePenalty: 15, healthDelta: -8,
      },
      {
        id: 'b_q10_c', text: 'Return to the chemical shed immediately to complete the inventory the patient was working on.',
        correct: false,
        feedback: 'WRONG — The shed is a crime scene and hazardous area. Re-entry without clearance and proper investigation is both unsafe and improper.',
        timePenalty: 20, healthDelta: -10,
      },
      {
        id: 'b_q10_d', text: 'Delete all digital records of the incident to protect the company from legal liability.',
        correct: false,
        feedback: 'WRONG — Destruction of incident records is a criminal offence and a severe breach of occupational health ethics. This decision ends careers — and lives.',
        timePenalty: 25, healthDelta: -20,
      },
    ],
  },

  outcome: {
    id: 'outcome', sceneNumber: 11,
    title: 'OUTCOME', subtitle: 'The Verdict', urgencyLabel: '', narrative: '', decisions: [],
  },
};

export function getScenesForSet(set: 'A' | 'B'): Record<string, Scene> {
  return set === 'B' ? SCENES_B : SCENES_A;
}
