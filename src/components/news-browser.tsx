"use client";
import { Text, LocalizedElement } from "@/i18n/client";

import { useState } from "react";
import { stories } from "@/content/site";
import { StoryCard } from "./editorial";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "./motion";
export function NewsBrowser() {
  const [category, setCategory] = useState("All stories");
  const reduced = useReducedMotion();
  return (
    <>
      <LocalizedElement as={"div"} className="filter-bar" aria-label="Filter news">
        <Text>{["All stories", "Community", "Announcements", "Advocacy"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            <Text>{c}</Text>
          </button>
        ))}</Text>
      </LocalizedElement>
      <motion.div
        key={category}
        className="news-grid"
        aria-live="polite"
        initial={false}
        animate={reduced ? {} : { y: [18, 0] }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <Text>{stories
          .filter((s) => category === "All stories" || s.category === category)
          .map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}</Text>
      </motion.div>
    </>
  );
}
