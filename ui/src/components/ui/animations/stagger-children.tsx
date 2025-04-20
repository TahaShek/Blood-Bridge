import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  delayIncrement?: number;
  initialDelay?: number;
  staggerDirection?: "forward" | "reverse";
}

export function StaggerChildren({
  children,
  className,
  delayIncrement = 0.1,
  initialDelay = 0,
  staggerDirection = "forward",
}: StaggerChildrenProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delayIncrement,
        staggerDirection: staggerDirection === "reverse" ? -1 : 1,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={item} className={cn(className)}>
      {children}
    </motion.div>
  );
}
