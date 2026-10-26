"use client";
import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useAnimate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
export const easeOut = [0.22, 1, 0.36, 1] as const;
const subscribeToMount = () => () => {};
const subscribeToPointer = (callback: () => void) => {
  const query = window.matchMedia("(hover: hover) and (pointer: fine)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
/** Server HTML stays readable. Each editorial block animates once on entry. */
export function PageMotion({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const root = scope.current as HTMLElement;
    const selector =
      "h1,h2,.hero-copy>.lede,.hero-copy>.actions,.page-intro>.lede,.section-heading,.programme-row,.story-card,.journal-row,.value,.report-row,.form-panel,.status-list>div,.faq-section details,.mission-bottom,.participate-link";
    const candidates = Array.from(root.querySelectorAll<HTMLElement>(selector));
    const targets = candidates.filter(
      (el) => !el.parentElement?.closest(selector),
    );
    // The route transition already animates the first viewport. Replaying an
    // entrance underneath its snapshot creates a jump when that snapshot ends.
    const belowFold = targets.filter(el => {
      if (el.getBoundingClientRect().top >= window.innerHeight) return true;
      el.dataset.motionRevealed = "true";
      return false;
    });
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const controls: Array<ReturnType<typeof animate>> = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((entry, index) => {
            const el = entry.target as HTMLElement;
            observer.unobserve(el);
            el.dataset.motionRevealed = "true";
            controls.push(
              animate(
                el,
                { y: [touch ? 10 : 24, 0] },
                {
                  duration: touch ? 0.55 : 0.85,
                  delay: Math.min(index * 0.075, 0.3),
                  ease: easeOut,
                },
              ),
            );
          });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    belowFold.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      controls.forEach((c) => c.stop());
      targets.forEach((el) => {
        el.style.transform = "";
        el.style.clipPath = "";
      });
    };
  }, [animate, reduced, scope]);
  return (
    <div ref={scope} className="page-motion">
      {children}
    </div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
export function ImageMotion({
  children,
  className = "",
  priority = false,
}: {
  children: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false,
  );
  const finePointer = useSyncExternalStore(subscribeToPointer,
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false);
  const enabled = mounted && finePointer && !reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const y = useTransform(progress, [0, 1], ["-3%", "3%"]);
  const scale = useTransform(progress, [0, 1], [1.07, 1.01]);
  return (
    <div ref={ref} className={"photo " + className} data-parallax={enabled}>
      <motion.div
        className="photo-plane"
        style={enabled ? { y, scale } : undefined}
        initial={false}
        data-priority={priority || undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
export function FormTransition({
  children,
  state,
}: {
  children: ReactNode;
  state: string | number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      key={state}
      data-form-transition
      initial={false}
      animate={reduced ? {} : { x: [16, 0] }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
