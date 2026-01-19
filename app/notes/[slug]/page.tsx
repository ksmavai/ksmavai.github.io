import { cache } from "react";
import Note from "@/components/note";
import { getNoteBySlug, getAllNotes } from "@/lib/notes";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Note as NoteType } from "@/lib/types";

// Enable ISR with a reasonable revalidation period for public notes
export const revalidate = 86400; // 24 hours

// Cached function to fetch a note by slug - eliminates duplicate fetches
const getNote = cache(async (slug: string) => {
  const note = getNoteBySlug(slug);
  return note;
});

// Dynamically determine if this is a user note
export async function generateStaticParams() {
  const notes = getAllNotes();

  return notes.map(({ slug }) => ({
    slug,
  }));
}

// Use dynamic rendering for non-public notes
export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/^notes\//, '');
  const note = await getNote(slug);

  if (!note) {
    return { title: "Note not found" };
  }

  const title = note.title || "new note";
  const emoji = note.emoji || "👋🏼";

  return {
    title: `kshitij savi mavai | ${title}`,
  };
}

export default async function NotePage({
  params,
}: Props) {
  const { slug: rawSlug } = await params;
  const slug = rawSlug.replace(/^notes\//, '');
  const note = await getNote(slug);

  if (!note) {
    return redirect("/notes/error");
  }

  return (
    <div className="w-full min-h-dvh p-3">
      <Note note={note} />
    </div>
  );
}