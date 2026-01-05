"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedIndex === null) return;

        if (e.key === "Escape") {
            setSelectedIndex(null);
        } else if (e.key === "ArrowLeft") {
            setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
        } else if (e.key === "ArrowRight") {
            setSelectedIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
        }
    }, [selectedIndex, images.length]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedIndex]);

    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                <p>No art found.</p>
                <p className="text-sm mt-2">Add images to /public/art</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 p-4 md:p-8 w-full max-w-[1400px] mx-auto">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center group cursor-pointer"
                        onClick={() => setSelectedIndex(index)}
                    >
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <img
                                src={src}
                                alt={`Art piece ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 md:hover:scale-105"
                                loading={index < 4 ? "eager" : "lazy"}
                                decoding="async"
                                fetchPriority={index < 4 ? "high" : "auto"}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Overlay */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedIndex(null)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-background/10 backdrop-blur-md border border-border/20 text-foreground hover:bg-background/20 transition-all z-50"
                        aria-label="Close gallery"
                    >
                        <X className="h-6 w-6 shadow-sm" />
                    </button>

                    {/* Navigation - Left */}
                    {selectedIndex > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(selectedIndex - 1);
                            }}
                            className="absolute left-2 md:left-8 p-3 rounded-full bg-background/10 backdrop-blur-md border border-border/20 text-foreground hover:bg-background/20 transition-all z-50"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 shadow-sm" />
                        </button>
                    )}

                    {/* Main Image Container */}
                    <div
                        className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <div
                            className="relative max-w-full max-h-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[selectedIndex]}
                                alt={`Art piece ${selectedIndex + 1}`}
                                className="max-w-[90vw] max-h-[85vh] object-contain"
                            />
                        </div>
                    </div>

                    {/* Navigation - Right */}
                    {selectedIndex < images.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(selectedIndex + 1);
                            }}
                            className="absolute right-2 md:right-8 p-3 rounded-full bg-background/10 backdrop-blur-md border border-border/20 text-foreground hover:bg-background/20 transition-all z-50"
                            aria-label="Next image"
                        >
                            <ChevronRight className="h-6 w-6 md:h-8 md:w-8 shadow-sm" />
                        </button>
                    )}
                </div>
            )}
        </>
    );
}
