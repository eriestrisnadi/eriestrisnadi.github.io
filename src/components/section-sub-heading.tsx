import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionSubHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const SectionSubHeading = forwardRef<
  HTMLHeadingElement,
  SectionSubHeadingProps
>(({ children, className, ...restProps }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn("text-base text-neutral-600 dark:text-neutral-400", className)}
      {...restProps}
    >
      {children}
    </h4>
  );
});

SectionSubHeading.displayName = "SectionSubHeading";

export default SectionSubHeading;
