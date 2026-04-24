import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { ChevronRight, Lock } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  key?: string;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  
  // Slide settings
  const slideWidth = 280;
  const handleSize = 56;
  const unlockThreshold = slideWidth - handleSize - 10;

  const opacity = useTransform(x, [0, unlockThreshold], [1, 0]);
  const textX = useTransform(x, [0, unlockThreshold], [0, 20]);

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (latest >= unlockThreshold && !isUnlocked) {
        setIsUnlocked(true);
        setTimeout(onUnlock, 500);
      }
    });
    return () => unsubscribe();
  }, [x, isUnlocked, onUnlock, unlockThreshold]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-24 overflow-hidden bg-black"
      id="lock-screen"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-60 brightness-75"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-architectural-lines-in-black-and-white-42562-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Time & Date Header */}
      <div className="relative z-10 text-white text-center mt-12">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-[100px] md:text-[140px] font-serif leading-none tracking-tighter opacity-90"
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl font-sans font-light tracking-[0.4em] uppercase text-white/60"
        >
          {new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
        </motion.div>
      </div>

      {/* Slide to Unlock */}
      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center gap-12">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="relative flex items-center h-20 p-2 bg-[#E9E7E2]/10 backdrop-blur-xl rounded-full border border-white/20 overflow-hidden"
           style={{ width: slideWidth + 100 }}
           ref={constraintsRef}
        >
          {/* Shimmer Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-light tracking-[0.2em] uppercase text-[#E9E7E2]/40 animate-pulse">
              Slide to Unlock
            </span>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: slideWidth + handleSize - 18 }}
            dragElastic={0}
            dragMomentum={false}
            className="h-full aspect-square bg-[#E9E7E2] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xl z-30"
            id="unlock-handle"
            style={{ x }}
          >
            <ChevronRight className="text-black w-8 h-8" />
          </motion.div>
        </motion.div>

        {/* Bottom Details */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="flex gap-8 text-[10px] items-center uppercase tracking-[0.5em] text-[#E9E7E2]/30"
        >
          <span>Architecture</span>
          <div className="w-1 h-1 rounded-full bg-[#E9E7E2]/30" />
          <span>Growth</span>
          <div className="w-1 h-1 rounded-full bg-[#E9E7E2]/30" />
          <span>Vision</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
