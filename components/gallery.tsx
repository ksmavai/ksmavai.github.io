"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface GalleryProps {
    images: string[];
}

export default function Gallery({ images }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [lightboxLoading, setLightboxLoading] = useState(false);

    // Preload adjacent images when lightbox is open
    useEffect(() => {
        if (selectedIndex === null) return;

        const preloadIndices = [
            selectedIndex - 1,
            selectedIndex,
            selectedIndex + 1,
        ].filter(i => i >= 0 && i < images.length);

        preloadIndices.forEach(index => {
            if (!loadedImages.has(index)) {
                const img = new window.Image();
                img.src = images[index];
                img.onload = () => {
                    setLoadedImages(prev => new Set(Array.from(prev).concat(index)));
                };
            }
        });
    }, [selectedIndex, images, loadedImages]);

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

    // Preload first 6 images on mount
    useEffect(() => {
        images.slice(0, 6).forEach((src, index) => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                setLoadedImages(prev => new Set(Array.from(prev).concat(index)));
            };
        });
    }, [images]);

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
                        onClick={() => {
                            setSelectedIndex(index);
                            setLightboxLoading(!loadedImages.has(index));
                        }}
                    >
                        <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
                            <Image
                                src={src}
                                alt={`Art piece ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                                className="object-cover transition-transform duration-300 md:hover:scale-105"
                                priority={index < 6}
                                quality={75}
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
                                setLightboxLoading(!loadedImages.has(selectedIndex - 1));
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
                            {lightboxLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                                </div>
                            )}
                            <Image
                                src={images[selectedIndex]}
                                alt={`Art piece ${selectedIndex + 1}`}
                                width={1200}
                                height={1500}
                                className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain"
                                priority
                                quality={90}
                                onLoad={() => setLightboxLoading(false)}
                            />
                        </div>
                    </div>

                    {/* Navigation - Right */}
                    {selectedIndex < images.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxLoading(!loadedImages.has(selectedIndex + 1));
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

