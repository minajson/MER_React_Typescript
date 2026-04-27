import { motion } from 'framer-motion';

const SCENES = ['Collapse', 'Assessment', 'MER Call', 'Comms', 'Scene 5', 'Scene 6', 'Outcome'];

interface SceneProgressProps {
  currentIndex: number;
}

export function SceneProgress({ currentIndex }: SceneProgressProps) {
  return (
    <div className="flex items-center gap-1 w-full max-w-2xl mx-auto">
      {SCENES.map((label, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-3 h-3 rounded-full border-2 ${
                  done
                    ? 'bg-green-500 border-green-500'
                    : active
                    ? 'bg-red-500 border-red-400 pulse-red'
                    : 'bg-transparent border-gray-700'
                }`}
                animate={active ? { scale: [1, 1.4, 1] } : {}}
                transition={{ duration: 0.9, repeat: active ? Infinity : 0 }}
              />
              <span
                className={`font-body text-[10px] mt-0.5 tracking-tight text-center leading-tight ${
                  done ? 'text-green-500' : active ? 'text-red-400' : 'text-gray-700'
                }`}
              >
                {label}
              </span>
            </div>
            {i < SCENES.length - 1 && (
              <div className={`h-px flex-1 mb-4 ${done ? 'bg-green-700' : 'bg-gray-800'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
