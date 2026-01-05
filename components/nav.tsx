
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import NewNote from "./new-note";

interface NavProps {
  addNewPinnedNote: (slug: string) => void;
  clearSearch: () => void;
  setSelectedNoteSlug: (slug: string | null) => void;
  isMobile: boolean;
  isScrolled: boolean;
}

export function Nav({
  addNewPinnedNote,
  clearSearch,
  setSelectedNoteSlug,
  isMobile,
  isScrolled,
}: NavProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`px-4 py-2 flex items-center justify-between skeu-header ${isScrolled && "border-b shadow-[0_2px_4px_-1px_rgba(0,0,0,0.15)]"
        }`}
    >
      <div className="flex items-center gap-1.5 p-2">
        <button
          onClick={() => window.close()}
          className="cursor-pointer group w-3 h-3 rounded-full bg-red-500 hover:opacity-80 flex items-center justify-center"
          aria-label="Close tab"
        >
          <span className="opacity-0 group-hover:opacity-100 text-[10px] font-medium leading-none text-background -translate-y-[0.5px]">×</span>
        </button>
        <button className="group w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 flex items-center justify-center cursor-default">
          <span className="opacity-0 group-hover:opacity-100 text-[10px] font-medium leading-none text-background -translate-y-[0.5px]">−</span>
        </button>
        <button className="group w-3 h-3 rounded-full bg-green-500 hover:opacity-80 flex items-center justify-center cursor-default">
          <span className="opacity-0 group-hover:opacity-100 text-[10px] font-medium leading-none text-background -translate-y-[0.5px]">+</span>
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-3 hover:bg-muted-foreground/10 rounded-lg transition-colors"
          aria-label="Toggle dark mode"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )
          ) : (
            <div className="h-5 w-5" />
          )}
        </button>
        <NewNote
          addNewPinnedNote={addNewPinnedNote}
          clearSearch={clearSearch}
          setSelectedNoteSlug={setSelectedNoteSlug}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
