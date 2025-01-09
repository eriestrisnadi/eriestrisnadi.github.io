"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { stagger } from "@/lib/animation";
import { cn } from "@/lib/utils";

interface StaggerProps extends HTMLMotionProps<"div"> {}

const Stagger = forwardRef<HTMLDivElement, StaggerProps>(
  ({ className, children, ...restProps }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        className={cn("relative", className)}
        {...restProps}
      >
        {children as ReactNode}
      </motion.div>
    );
  }
);

Stagger.displayName = "Stagger";

export default Stagger;
