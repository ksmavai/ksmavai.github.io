"use client";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobileDetect } from "./mobile-detector";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
  notes: any;
}

export default function SidebarLayout({ children, notes }: SidebarLayoutProps) {
  const isMobileValue = useMobileDetect();
  const isMobile = isMobileValue === null ? false : isMobileValue; // Default to desktop for SSR
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if we are sure it is not mobile
    if (isMobileValue !== null && !isMobileValue && (pathname === "/notes" || pathname === "/notes/")) {
      router.push("/notes/about-me/");
    }
  }, [isMobileValue, router, pathname]);

  const handleNoteSelect = (note: any) => {
    router.push(`/notes/${note.slug}/`);
  };

  const showSidebar = !isMobile || pathname === "/notes" || pathname === "/notes/";

  return (
    <div className="dark:text-white h-dvh flex">
      {showSidebar && (
        <Sidebar
          notes={notes}
          onNoteSelect={isMobile ? handleNoteSelect : () => { }}
          isMobile={isMobile}
        />
      )}
      {(!isMobile || !showSidebar) && (
        <div className="flex-grow h-dvh">
          <ScrollArea className="h-full" isMobile={isMobile}>
            {children}
          </ScrollArea>
        </div>
      )}
      <Toaster />
    </div>
  );
}
