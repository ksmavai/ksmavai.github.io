"use client";

import React from "react";
import { NoteItem } from "./note-item";
import { Note } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

interface SidebarContentProps {
    groupedNotes: Record<string, Note[]>;
    selectedNoteSlug: string | null;
    onNoteSelect: (note: Note) => void;
    sessionId: string;
    handlePinToggle: (slug: string) => void;
    pinnedNotes: Set<string>;
    localSearchResults: Note[] | null;
    highlightedIndex: number;
    categoryOrder: string[];
    labels: Record<string, React.ReactNode>;
    handleNoteDelete: (note: Note) => Promise<void>;
    openSwipeItemSlug: string | null;
    setOpenSwipeItemSlug: Dispatch<SetStateAction<string | null>>;
    clearSearch: () => void;
    setSelectedNoteSlug: Dispatch<SetStateAction<string | null>>;
}

export function SidebarContent({
    groupedNotes,
    selectedNoteSlug,
    onNoteSelect,
    sessionId,
    handlePinToggle,
    pinnedNotes,
    localSearchResults,
    highlightedIndex,
    categoryOrder,
    labels,
    handleNoteDelete,
    openSwipeItemSlug,
    setOpenSwipeItemSlug,
}: SidebarContentProps) {
    const isSearching = localSearchResults !== null;

    // If searching, show search results
    if (isSearching && localSearchResults) {
        return (
            <ul className="w-full">
                {localSearchResults.map((note, index) => (
                    <NoteItem
                        key={note.slug}
                        item={note}
                        selectedNoteSlug={selectedNoteSlug}
                        sessionId={sessionId}
                        onNoteSelect={onNoteSelect}
                        onNoteEdit={() => { }}
                        handlePinToggle={handlePinToggle}
                        isPinned={pinnedNotes.has(note.slug)}
                        isHighlighted={index === highlightedIndex}
                        isSearching={true}
                        handleNoteDelete={handleNoteDelete}
                        openSwipeItemSlug={openSwipeItemSlug}
                        setOpenSwipeItemSlug={setOpenSwipeItemSlug}
                        showDivider={index < localSearchResults.length - 1}
                    />
                ))}
            </ul>
        );
    }

    // NORMAL MODE: Show grouped notes by category with headers
    return (
        <div className="w-full">
            {categoryOrder.map((category) => {
                const notes = groupedNotes[category];
                if (!notes || notes.length === 0) return null;

                return (
                    <div key={category} className="mb-0">
                        <h3 className="text-xs font-semibold text-muted-foreground px-4 pb-1 pt-1 flex items-center">
                            {labels[category]}
                        </h3>
                        <ul>
                            {notes.map((note: Note, index: number) => (
                                <NoteItem
                                    key={note.slug}
                                    item={note}
                                    selectedNoteSlug={selectedNoteSlug}
                                    sessionId={sessionId}
                                    onNoteSelect={onNoteSelect}
                                    onNoteEdit={() => { }}
                                    handlePinToggle={handlePinToggle}
                                    isPinned={pinnedNotes.has(note.slug)}
                                    isHighlighted={false}
                                    isSearching={false}
                                    handleNoteDelete={handleNoteDelete}
                                    openSwipeItemSlug={openSwipeItemSlug}
                                    setOpenSwipeItemSlug={setOpenSwipeItemSlug}
                                    showDivider={index < notes.length - 1}
                                />
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}
