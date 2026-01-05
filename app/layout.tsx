import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"; // Using Inter as referenced
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { getAllNotes } from "@/lib/notes"; // Replaced Supabase with local notes
import SidebarLayout from "@/components/sidebar-layout";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description: siteConfig.title,
};

export const revalidate = 3600; // 1 hour revalidation (or standard for static)

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Static Fetch: Get all notes from markdown files
    const notes = getAllNotes();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>{siteConfig.title}</title>
                <meta property="og:type" content="website"></meta>
                <meta property="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:title" content={siteConfig.title}></meta>
                <meta
                    property="twitter:description"
                    content={siteConfig.title}
                ></meta>
                <meta property="twitter:image" content={`${siteConfig.url}/og-image.png`}></meta>
                <meta property="og:site_name" content={siteConfig.title}></meta>
                <meta property="og:description" content={siteConfig.title}></meta>
                <meta property="og:title" content={siteConfig.title}></meta>
                <meta property="og:url" content={siteConfig.url}></meta>
                <meta property="og:image" content={`${siteConfig.url}/og-image.png`}></meta>
                <meta property="og:image:width" content="1200"></meta>
                <meta property="og:image:height" content="630"></meta>
                <meta property="og:image:type" content="image/png"></meta>
            </head>
            <body
                className={cn("min-h-dvh font-sans antialiased", fontSans.variable)}
            >
                <ThemeProvider
                    attribute="class" // Verified ThemeProvider usage in reference (Step 585)
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SidebarLayout notes={notes}>
                        <Analytics />
                        {children}
                    </SidebarLayout>
                </ThemeProvider>
            </body>
        </html>
    );
}
