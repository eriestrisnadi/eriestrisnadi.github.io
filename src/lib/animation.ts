import type { TargetAndTransition, Variants } from "framer-motion";

export const stagger: Variants = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    position: "relative",
  },
};

export const wave: TargetAndTransition = {
  rotate: [0, 14, -8, 14, -4, 10, 0, 0],
  transition: {
    repeat: Infinity,
    duration: 2,
    repeatDelay: 2,
    ease: "linear",
  },
};
