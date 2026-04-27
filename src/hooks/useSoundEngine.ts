import { useRef, useCallback, useEffect } from 'react';

// All sounds synthesized via Web Audio API — no external assets needed

export function useSoundEngine() {
  const ctxRef = useRef<AudioContext | null>(null);
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioContext();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.3, delay = 0) => {
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration + 0.05);
      } catch {
        // Audio not available
      }
    },
    [getCtx]
  );

  const playHeartbeat = useCallback(() => {
    // Lub-dub pattern
    playTone(60, 0.08, 'sine', 0.4);
    playTone(50, 0.1, 'sine', 0.35, 0.12);
  }, [playTone]);

  const playAlarm = useCallback(() => {
    playTone(880, 0.15, 'square', 0.15);
    playTone(660, 0.15, 'square', 0.15, 0.18);
  }, [playTone]);

  const playCorrect = useCallback(() => {
    playTone(523, 0.15, 'sine', 0.3);
    playTone(659, 0.15, 'sine', 0.3, 0.15);
    playTone(784, 0.25, 'sine', 0.3, 0.3);
  }, [playTone]);

  const playWrong = useCallback(() => {
    playTone(200, 0.3, 'sawtooth', 0.35);
    playTone(150, 0.3, 'sawtooth', 0.35, 0.35);
  }, [playTone]);

  const playUrgent = useCallback(() => {
    // Fast beeping for last 60 seconds
    playTone(1200, 0.05, 'square', 0.2);
  }, [playTone]);

  const playFlatline = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3.05);
    } catch {
      // ignore
    }
  }, [getCtx]);

  const playSuccess = useCallback(() => {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => playTone(n, 0.3, 'sine', 0.3, i * 0.18));
  }, [playTone]);

  const startHeartbeat = useCallback(
    (bpm = 72) => {
      stopHeartbeat();
      playHeartbeat();
      const interval = (60 / bpm) * 1000;
      heartbeatIntervalRef.current = setInterval(playHeartbeat, interval);
    },
    [playHeartbeat]
  );

  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  }, []);

  const startAlarm = useCallback(() => {
    stopAlarm();
    alarmIntervalRef.current = setInterval(playAlarm, 600);
  }, [playAlarm]);

  const stopAlarm = useCallback(() => {
    if (alarmIntervalRef.current) {
      clearInterval(alarmIntervalRef.current);
      alarmIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopHeartbeat();
      stopAlarm();
      ctxRef.current?.close();
    };
  }, [stopHeartbeat, stopAlarm]);

  return {
    playCorrect,
    playWrong,
    playUrgent,
    playFlatline,
    playSuccess,
    startHeartbeat,
    stopHeartbeat,
    startAlarm,
    stopAlarm,
  };
}
