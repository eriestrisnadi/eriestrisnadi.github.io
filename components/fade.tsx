"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeProps extends HTMLMotionProps<"div"> {}

const Fade = forwardRef<HTMLDivElement, FadeProps>(
  ({ className, children, ...restProps }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("relative", className)}
        {...restProps}
      >
        {children as ReactNode}
        <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-background via-transparent via-[percentage:20%_80%] to-background !m-0 pointer-events-none"></div>
      </motion.div>
    );
  }
);

Fade.displayName = 'Fade';

export default Fade;
