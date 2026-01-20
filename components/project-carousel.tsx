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
        <div className="mt-3 mb-2">
            {/* Outer clip container - extends to edges for proper clipping */}
            <div
                style={{
                    marginLeft: '-8px',
                    marginRight: '-8px',
                    overflow: 'hidden',
                }}
            >
                {/* Inner scroll container with padding restored */}
                <div
                    className="flex gap-3 pb-2"
                    style={{
                        overflowX: 'auto',
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
                                className="flex-none cursor-pointer"
                                style={{
                                    width: isExpanded ? '260px' : '160px',
                                    minWidth: isExpanded ? '260px' : '160px',
                                    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto block select-none"
                                    style={{ borderRadius: '12px' }}
                                    draggable={false}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
