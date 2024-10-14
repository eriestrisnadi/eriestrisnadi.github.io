"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeLeft } from "@/lib/animation";

interface DividerProps extends HTMLMotionProps<"hr"> {}

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variants = fadeLeft, ...restProps }, ref) => {
    return (
      <motion.hr
        ref={ref}
        variants={variants}
        className={cn("border-border my-6", className)}
        {...restProps}
      />
    );
  }
);

Divider.displayName = "Divider";

export default Divider;
