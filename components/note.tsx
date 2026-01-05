"use client";

import { useRouter } from "next/navigation";
import NoteHeader from "./note-header";
import NoteContent from "./note-content";
import Gallery from "./gallery";
import SkillsPhysics from "./skills-physics";
import MarqueeContent from "./marquee-content";
import { useState } from "react";
import { toast } from "./ui/use-toast";

export default function Note({ note: initialNote }: { note: any }) {
  const router = useRouter();
  const [note, setNote] = useState(initialNote);

  const saveNote = async (updates: Partial<typeof note>) => {
    // Static site: read-only
    setNote((prevNote: typeof note) => ({ ...prevNote, ...updates }));
    toast({
      description: "Changes are not saved in static mode. Edit the file directly in the repository.",
      variant: "destructive"
    });
  };

  const canEdit = true;

  // Render content based on note type
  const renderContent = () => {
    if (note.slug === 'photos-n-art') {
      return <Gallery images={note.images || []} />;
    }
    if (note.slug === 'full-stack') {
      return <SkillsPhysics categories={note.skillCategories || []} subtitle={note.content} />;
    }
    if (note.slug === 'on-repeat') {
      return <MarqueeContent content={note.content} />;
    }
    return <NoteContent note={note} saveNote={saveNote} canEdit={canEdit} />;
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      <NoteHeader note={note} saveNote={saveNote} canEdit={canEdit} />
      {renderContent()}
    </div>
  );
}