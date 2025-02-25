import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import type { PropsWithoutRef } from "react";
import type { HTMLMotionProps } from "motion/react";

interface StaggerProps extends PropsWithoutRef<HTMLMotionProps<"div">> {}

const Stagger = ({
  className,
  children,
  transition = {
    when: "beforeChildren",
    staggerChildren: 0.3,
  },
  whileInView = "visible",
  initial = "hidden",
  ...restProps
}: StaggerProps) => {
  return (
    <motion.div
      transition={transition}
      whileInView={whileInView}
      initial={initial}
      className={cn("relative", className)}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};

Stagger.displayName = "Stagger";

export default Stagger;
