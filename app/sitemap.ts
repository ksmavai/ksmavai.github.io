import { getAllNotes } from '@/lib/notes'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const notes = getAllNotes();

    const notesUrls = notes.map((note) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes/${note.slug}`,
        lastModified: new Date(note.created_at),
    }));

    return [
        {
            url: process.env.NEXT_PUBLIC_SITE_URL!,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes`,
            lastModified: new Date(),
        },
        ...notesUrls
    ]
}