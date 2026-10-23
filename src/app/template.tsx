"use client";
import { motion, useReducedMotion } from "motion/react";
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={reduced ? {} : { y: [4, 0] }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
