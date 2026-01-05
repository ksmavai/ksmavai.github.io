"use client";

import { Icons } from "./icons";
import { toast } from "./ui/use-toast";

export default function NewNote({
  addNewPinnedNote,
  clearSearch,
  setSelectedNoteSlug,
  isMobile,
}: {
  addNewPinnedNote: (slug: string) => void;
  clearSearch: () => void;
  setSelectedNoteSlug: (slug: string | null) => void;
  isMobile: boolean;
}) {
  const handleCreateNote = () => {
    toast({
      description: "only i get to create notes around here, sorry",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleCreateNote}
        aria-label="Create new note"
        className={`p-3 hover:bg-muted-foreground/10 rounded-lg opacity-50 cursor-not-allowed ${isMobile ? "p-3" : ""}`}
      >
        <Icons.new className="h-5 w-5" />
      </button>
    </div>
  );
}