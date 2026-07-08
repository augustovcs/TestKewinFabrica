// Variants framer compartilhadas — assinatura de motion do site.
import type { Variants, Transition } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;
export const spring: Transition = { type: "spring", stiffness: 320, damping: 22 };

export const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: spring },
};

// Hover springy reutilizável (cards/tiles)
export const springHover = {
  whileHover: { y: -8, scale: 1.02, transition: spring },
  whileTap: { scale: 0.98 },
};
