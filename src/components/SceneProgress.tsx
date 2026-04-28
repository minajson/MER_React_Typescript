import { motion } from 'framer-motion';
import { SCENE_ORDER } from '../data/scenes';

interface SceneProgressProps {
  currentIndex: number;
}

export function SceneProgress({ currentIndex }: SceneProgressProps) {
  const total = SCENE_ORDER.length - 1; // exclude 'outcome' from dots
  const questionIndex = Math.min(currentIndex, total - 1);
  const pct = ((questionIndex) / (total - 1)) * 100;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <div className="flex justify-between items-center">
        <span className="font-body text-xs text-gray-500 tracking-widest uppercase">
          Decision {questionIndex + 1} of {total}
        </span>
        <span className="font-body text-xs text-gray-600 tracking-widest">
          {Math.round(pct)}% Complete
        </span>
      </div>
      {/* Bar */}
      <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-red-700 via-yellow-500 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {/* Milestone dots */}
      <div className="flex justify-between px-0.5">
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < questionIndex
                ? 'bg-green-500'
                : i === questionIndex
                ? 'bg-red-500 pulse-red'
                : 'bg-gray-700'
            }`}
            animate={i === questionIndex ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.8, repeat: i === questionIndex ? Infinity : 0 }}
          />
        ))}
      </div>
    </div>
  );
}
