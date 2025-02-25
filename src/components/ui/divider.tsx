import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import { fadeLeft } from "@/lib/animation";
import type { HTMLMotionProps } from "motion/react";
import type { PropsWithoutRef } from "react";

interface DividerProps extends PropsWithoutRef<HTMLMotionProps<"hr">> { }

const Divider = ({ className, variants = fadeLeft, ...restProps }: DividerProps) => {
  return (
    <motion.hr
      variants={variants}
      className={cn("border-border my-6", className)}
      {...restProps}
    />
  );
};

Divider.displayName = "Divider";

export default Divider;
