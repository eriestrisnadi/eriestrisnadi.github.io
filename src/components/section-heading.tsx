import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends HTMLAttributes<HTMLHeadingElement> {}

const SectionHeading = forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <h2 ref={ref} className={cn("text-xl capitalize", className)} {...restProps}>
        {children}
      </h2>
    );
  }
);

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
