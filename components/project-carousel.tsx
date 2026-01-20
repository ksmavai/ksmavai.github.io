"use client";

import { useState } from "react";

interface CarouselImage {
    src: string;
    alt: string;
}

interface ProjectCarouselProps {
    images: CarouselImage[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    if (images.length === 0) return null;

    return (
        <div
            className="mt-6 mb-6 relative w-auto -ml-2 -mr-2 overflow-hidden"
        // Reverted to -ml-2 (-8px) as requested ("revert that change back to the -8px")
        // w-auto + negative margins = extends to edges without forcing 100vw parent expansion
        >
            <div
                className="
                    flex gap-4 items-center
                    overflow-x-auto 
                    pb-6 -mb-6
                    snap-x snap-mandatory 
                    px-2
                    /* px-2 (8px) aligns content start with the text (since container is pulled -8px) */
                "
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {images.map((image, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div
                            key={index}
                            onClick={() => handleImageClick(index)}
                            className="flex-none cursor-pointer transform-gpu snap-start"
                            style={{
                                width: isExpanded ? '280px' : '160px',
                                transition: 'width 0.6s cubic-bezier(0.34, 1.6, 0.64, 1)',
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto block select-none shadow-sm"
                                style={{
                                    borderRadius: '16px',
                                }}
                                draggable={false}
                            />
                        </div>
                    );
                })}
                {/* Spacer to ensure right edge scrolling */}
                <div className="flex-none w-2" />
            </div>
        </div>
    );
}
