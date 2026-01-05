export function groupNotesByCategory(notes: any[], pinnedNotes: Set<string>) {
  const groupedNotes: any = {
    pinned: [],
  };

  notes.forEach((note) => {
    if (pinnedNotes.has(note.slug)) {
      groupedNotes.pinned.push(note);
      return;
    }

    // Use the category from frontmatter directly
    // Valid categories: "today", "yesterday", "7", "30", "older"
    const category = note.category || "older";

    if (!groupedNotes[category]) {
      groupedNotes[category] = [];
    }
    groupedNotes[category].push(note);
  });

  return groupedNotes;
}

export function sortGroupedNotes(groupedNotes: any) {
  Object.keys(groupedNotes).forEach((category) => {
    groupedNotes[category].sort((a: any, b: any) => {
      // Sort by the dynamically computed display date (descending - newer first)
      const dateA = getDisplayDateByCategory(a.category, a.id, a.created_at);
      const dateB = getDisplayDateByCategory(b.category, b.id, b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
  });
}

// Simple hash function to convert string to number
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Seeded random function
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getDisplayDateByCategory(category: string | undefined, noteId: string, createdAt?: string): Date {
  const today = new Date();
  
  // For pinned notes, use the exact created_at date/time
  if (category === "pinned" && createdAt) {
    const rawDate = createdAt.replace('Z', '');
    return new Date(rawDate);
  }
  
  // Extract time from created_at if provided, otherwise use noon as default
  let hours = 12;
  let minutes = 0;
  
  if (createdAt) {
    // Parse time from created_at (format: "2026-01-03T15:00:00Z")
    const rawDate = createdAt.replace('Z', '');
    const parsedDate = new Date(rawDate);
    hours = parsedDate.getHours();
    minutes = parsedDate.getMinutes();
  }

  let resultDate: Date;

  switch (category) {
    case "today":
      resultDate = new Date(today);
      break;

    case "yesterday":
      resultDate = new Date(today);
      resultDate.setDate(resultDate.getDate() - 1);
      break;

    case "7":
      // Deterministic "random" date 2-7 days ago based on note ID
      const seed7 = simpleHash(noteId + "7days");
      const daysAgo7 = Math.floor(seededRandom(seed7) * 6) + 2; // Between 2-7
      resultDate = new Date(today);
      resultDate.setDate(resultDate.getDate() - daysAgo7);
      break;

    case "30":
      // Deterministic "random" date 8-30 days ago based on note ID
      const seed30 = simpleHash(noteId + "30days");
      const daysAgo30 = Math.floor(seededRandom(seed30) * 23) + 8; // Between 8-30
      resultDate = new Date(today);
      resultDate.setDate(resultDate.getDate() - daysAgo30);
      break;

    case "older":
      // Deterministic "random" date 31-365 days ago based on note ID
      const seedOlder = simpleHash(noteId + "older");
      const daysAgoOlder = Math.floor(seededRandom(seedOlder) * 335) + 31; // Between 31-365
      resultDate = new Date(today);
      resultDate.setDate(resultDate.getDate() - daysAgoOlder);
      break;

    default:
      // Fallback to today if category is undefined or unknown
      resultDate = new Date(today);
      break;
  }

  // Apply the time from created_at
  resultDate.setHours(hours, minutes, 0, 0);
  return resultDate;
}
