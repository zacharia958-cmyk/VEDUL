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

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;

      // High-end dual chime (Crystal Chime)
      [880, 1320].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.1 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.6);
      });
    } catch (e) {
      console.error("Audio synthesis failed:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (latest >= unlockThreshold && !isUnlocked) {
        setIsUnlocked(true);
        playSound();
        setTimeout(onUnlock, 500);
      }
    });
    return () => unsubscribe();
  }, [x, isUnlocked, onUnlock, unlockThreshold]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
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
          className="object-cover w-full h-full opacity-40 brightness-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-architectural-lines-in-black-and-white-42562-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      {/* Time & Date Header */}
      <div className="relative z-10 text-white text-center mt-12">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2, duration: 1 }}
           className="text-[100px] md:text-[160px] font-serif leading-none tracking-tighter opacity-90 select-none"
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-sm md:text-base font-sans font-light tracking-[0.6em] uppercase text-white/40 mt-4 select-none"
        >
          {new Date().toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
        </motion.div>
      </div>

      {/* Slide to Unlock */}
      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center gap-16">
        <motion.div
           initial={{ y: 40, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.6, duration: 0.8 }}
           className="relative flex items-center h-16 p-1.5 bg-white/[0.03] backdrop-blur-2xl rounded-full border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
           style={{ width: slideWidth + 80 }}
           ref={constraintsRef}
        >
          {/* Subtle Progress Track */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-white/10 to-white/0 rounded-full"
            style={{ width: x, opacity }}
          />

          {/* Shimmer Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.span 
              style={{ opacity, x: textX }}
              className="text-[11px] font-light tracking-[0.4em] uppercase text-white/30"
            >
              Slide to Unlock
            </motion.span>
          </div>

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: slideWidth + handleSize - 40 }}
            dragElastic={0.05}
            dragMomentum={false}
            className="h-full aspect-square bg-gradient-to-br from-white via-white/90 to-white/60 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_4px_24px_rgba(0,0,0,0.3)] z-30"
            id="unlock-handle"
            style={{ x }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronRight className="text-black w-6 h-6 stroke-[1.5]" />
          </motion.div>
        </motion.div>

        {/* Bottom Details */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="text-[9px] uppercase tracking-[0.8em] text-white/20 select-none pb-4"
        >
          <span>From one to everyone</span>
        </motion.div>
      </div>
    </motion.div>

  );
}
