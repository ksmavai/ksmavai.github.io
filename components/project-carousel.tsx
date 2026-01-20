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
            className="mt-6 mb-6 relative"
            style={{
                // Pull container to edges (sidebar line)
                marginLeft: '-8px',
                marginRight: '-8px',
                width: 'calc(100% + 16px)',
                // Clip content at the edges
                overflow: 'hidden',
            }}
        >
            <div
                className="flex gap-3 overflow-x-auto px-2 pb-6 -mb-6 items-center"
                style={{
                    // Restoration padding to align first item with text
                    paddingLeft: '8px',
                    paddingRight: '8px',
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
                            className="flex-none cursor-pointer transform-gpu"
                            style={{
                                width: isExpanded ? '280px' : '160px',
                                transition: 'width 0.6s cubic-bezier(0.34, 1.6, 0.64, 1)', // Bouncy
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto block select-none shadow-sm"
                                style={{
                                    borderRadius: '16px',
                                    backgroundColor: 'rgba(0,0,0,0.03)'
                                }}
                                draggable={false}
                            />
                        </div>
                    );
                })}
                {/* Spacer to ensure right edge padding effect */}
                <div className="flex-none w-px" />
            </div>
        </div>
    );
}
