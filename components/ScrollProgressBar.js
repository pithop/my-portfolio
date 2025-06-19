'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-[0%]"
      style={{ scaleX: scrollYProgress, zIndex: 50 }}
    />
  );
}