"use client";
import { useState } from "react";
import { stories } from "@/content/site";
import { StoryCard } from "./editorial";
export function NewsBrowser() {
  const [category, setCategory] = useState("All stories");
  return (
    <>
      <div className="filter-bar" aria-label="Filter news">
        {["All stories", "Community", "Announcements", "Advocacy"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="news-grid" aria-live="polite">
        {stories
          .filter((s) => category === "All stories" || s.category === category)
          .map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
      </div>
    </>
  );
}
