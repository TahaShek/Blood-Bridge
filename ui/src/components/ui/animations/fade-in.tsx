import React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
  distance = 20,
}: FadeInProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directionMap[direction],
  };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
