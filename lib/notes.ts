import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Note } from "@/lib/types";

const notesDirectory = path.join(process.cwd(), "content/notes");

export function getAllNotes(): Note[] {
  if (!fs.existsSync(notesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(notesDirectory);
  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id || slug,
        slug: slug,
        title: data.title || "Untitled",
        content: content,
        created_at: data.created_at || new Date().toISOString(),
        session_id: "static", // Static notes don't have sessions
        emoji: data.emoji || "📝",
        public: true, // All file-based notes are public
        category: data.category || "older",
      } as Note;
    });

  // Sort notes by date
  return allNotes.sort((a, b) => {
    if (a.created_at < b.created_at) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getNoteBySlug(slug: string): Note | null {
  try {
    const fullPath = path.join(notesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const note: Note = {
      id: data.id || slug,
      slug: slug,
      title: data.title || "Untitled",
      content: content,
      created_at: data.created_at || new Date().toISOString(),
      session_id: "static",
      emoji: data.emoji || "📝",
      public: true,
      category: data.category || "older",
    };

    if (note.slug === 'photos-n-art') {
      const artDirectory = path.join(process.cwd(), 'public/art');
      if (fs.existsSync(artDirectory)) {
        const imageFiles = fs.readdirSync(artDirectory)
          .filter(file => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
          .map(file => `/art/${file}`);
        note.images = imageFiles;
      } else {
         note.images = [];
      }
    }

    // Load skill categories for full-stack page
    if (note.slug === 'full-stack') {
      note.skillCategories = [
        {
          name: "Languages",
          color: "#DC2626",
          darkColor: "#F87171",
          items: ["C/C++", "Java", "Swift", "Python", "HTML/CSS", "TypeScript", "JavaScript", "SQL", "Assembly", "Ruby"]
        },
        {
          name: "Libraries/Frameworks",
          color: "#0D9488",
          darkColor: "#2DD4BF",
          items: ["React.js", "Node.js", "SwiftUI", "React Native", "Expo", "TailwindCSS", "Matplotlib", "SQLite", "Django", "JUnit"]
        },
        {
          name: "Developer Tools",
          color: "#2563EB",
          darkColor: "#60A5FA",
          items: ["Git", "Xcode", "Selenium", "Docker", "MongoDB", "PostgreSQL", "Figma", "Firebase", "Supabase", "Jira"]
        }
      ];
    }

    return note;
  } catch (e) {
    return null;
  }
}
