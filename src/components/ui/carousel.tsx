"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface CarouselProps extends HTMLMotionProps<"div"> {
  containerProps?: Omit<HTMLMotionProps<"div">, "children" | "ref">;
  containerActionProps?: Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "ref"
  >;
}

function Carousel({
  className,
  children,
  containerProps: { className: containerClassName, ...restContainerProps } = {},
  containerActionProps: {
    className: containerActionClassName,
    ...restContainerActionProps
  } = {},
  ...restProps
}: CarouselProps) {
  const ref = useRef<HTMLDivElement>();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkScrollAbility = () => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.round(scrollLeft) < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -(ref.current.scrollWidth / ref.current.children.length),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({
        left: ref.current.scrollWidth / ref.current.children.length,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollAbility();
  }, [checkScrollAbility]);

  return (
    <motion.div
      className={cn("relative space-y-2", containerClassName)}
      {...restContainerProps}
    >
      <motion.div
        // @ts-ignore
        ref={ref}
        className={cn(
          "flex overflow-scroll space-x-4 [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-scrollbar:none]",
          className
        )}
        {...restProps}
        onScroll={checkScrollAbility}
      >
        {children as ReactNode}
      </motion.div>

      <div
        className={cn("flex justify-end", containerActionClassName)}
        {...restContainerActionProps}
      >
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </motion.div>
  );
}

Carousel.displayName = "Carousel";

export default Carousel;
