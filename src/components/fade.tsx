import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";
import type { ReactNode, PropsWithoutRef } from "react";
import type { HTMLMotionProps } from "motion/react";

interface FadeProps extends PropsWithoutRef<HTMLMotionProps<"div">> { }

const Fade = ({ className, children, ...restProps }: FadeProps) => {
  return (
    <motion.div
      className={cn("relative", className)}
      {...restProps}
    >
      {children as ReactNode}
      <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-background via-transparent via-[percentage:20%_80%] to-background !m-0 pointer-events-none"></div>
    </motion.div>
  );
};

Fade.displayName = "Fade";

export default Fade;
