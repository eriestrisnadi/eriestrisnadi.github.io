"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useSpring,
  type DragHandlers,
  type MotionValue,
} from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useWindowSize } from "usehooks-ts";
import { useRafLoop } from "@/hooks/use-raf-loop";

interface MarqueeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<MarqueeItemProps, "speed"> {
  speed?: number;
  threshold?: number;
  wheelFactor?: number;
  dragFactor?: number;
}

export default function Marquee({
  children,
  speed = 0.5,
  threshold = 0.014,
  wheelFactor = 1.8,
  dragFactor = 1.2,
  direction = "right",
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const slowDown = useRef(false);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);

  const x = useRef(0);
  const speedSpring = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });

  const handleOnWheel: React.WheelEventHandler = (e) => {
    const normalized = normalizeWheel(e);

    // This will use the wheel to speed up the timeline
    x.current = normalized.pixelY * wheelFactor;

    // reset speed on scroll end
    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current);
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(speed);
    }, 30);
  };

  const handleDragStart: DragHandlers["onDragStart"] = () => {
    slowDown.current = true;
    marqueeRef.current?.classList.add("drag");
    speedSpring.set(0);
  };

  const handleOnDrag: DragHandlers["onDrag"] = (_, info) => {
    speedSpring.set(
      dragFactor * (direction === "right" ? info.delta.x : -info.delta.x)
    );
  };

  const handleDragEnd: DragHandlers["onDragEnd"] = () => {
    slowDown.current = false;
    marqueeRef.current?.classList.remove("drag");
    //rest to the original speed
    x.current = speed;
  };

  const loop = () => {
    /**
     * Do nothing if we're slowing down
     * or
     * Our x is less than the threshold
     *
     * The threshold basically tells how much to speed up
     *
     * Without this stop - x.current will multiple exponentially
     */
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return;
    }

    /**
     * This portion speeds up the spring until it reaches the `threshold`
     */
    x.current *= 0.66;

    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }

    //speedSpring sets the speed for the marquee items that gets passed to the item components
    speedSpring.set(speed + x.current);
  };

  useRafLoop(loop);

  return (
    <>
      <motion.div
        ref={marqueeRef}
        onWheel={handleOnWheel}
        className="flex flex-row"
        drag="x"
        dragPropagation={true}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleDragEnd}
        dragElastic={0.000001} // needs to be > 0
      >
        <MarqueeItem direction={direction} speed={speedSpring}>
          {children}
        </MarqueeItem>
        <MarqueeItem direction={direction} speed={speedSpring}>
          {children}
        </MarqueeItem>
      </motion.div>
    </>
  );
}

interface MarqueeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  speed: MotionValue<any>;
  direction?: "left" | "right";
}

function MarqueeItem({
  children,
  speed,
  direction = "right",
}: MarqueeItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useRef(0);
  const { width, height } = useWindowSize();

  const setX = () => {
    if (!itemRef.current || !rectRef.current) {
      return;
    }

    const xPercentage = (x.current / rectRef.current.width) * 100;

    if (xPercentage < -100) {
      x.current = 0;
    }

    if (xPercentage > 0) {
      x.current = -rectRef.current.width;
    }

    itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect();
    }
  }, [width, height]);

  const loop = () => {
    // Adjust speed based on direction
    if (direction === "right") {
      x.current += speed.get(); // Left to right movement
    } else {
      x.current -= speed.get(); // Right to left movement
    }
    setX();
  };

  const [_, loopStart] = useRafLoop(loop, false);

  useEffect(() => {
    loopStart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div ref={itemRef} className="inline-flex flex-row">
      {children}
    </motion.div>
  );
}
