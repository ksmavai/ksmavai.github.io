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
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    if (images.length === 0) return null;

    return (
        <div className="mt-3 mb-2 overflow-hidden">
            {/* Horizontal scroll container - contained within parent width */}
            <div
                className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                {images.map((image, index) => {
                    const isExpanded = expandedIndex === index;

                    return (
                        <div
                            key={index}
                            onClick={() => handleImageClick(index)}
                            className="flex-shrink-0 cursor-pointer overflow-hidden"
                            style={{
                                width: isExpanded ? '280px' : '180px',
                                transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                        >
                            <div
                                className="w-full overflow-hidden"
                                style={{
                                    borderRadius: '16px',
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto object-cover"
                                    style={{
                                        borderRadius: '16px',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
