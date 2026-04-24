/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import LockScreen from './components/LockScreen';
import Navbar from './components/Navbar';
import { Home, About, Services, Contact } from './components/Sections';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 35,
    restDelta: 0.001
  });

  // Smooth scroll behavior
  useEffect(() => {
    if (!isLocked) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, [isLocked]);

  return (
    <main className="relative min-h-screen selection:bg-[#8C4E39] selection:text-white">
      <AnimatePresence mode="wait">
        {isLocked ? (
          <LockScreen key="lock" onUnlock={() => setIsLocked(false)} />
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Navbar />
            <Home />
            <About />
            <Services />
            <Contact />
            
            {/* Minimalist Scroll Progress Indicator */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 h-[3px] bg-[#8C4E39] origin-left z-50 pointer-events-none opacity-80"
              style={{ scaleX }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


