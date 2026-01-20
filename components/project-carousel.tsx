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
        <div
            className="mt-3 mb-2 w-full"
            style={{
                overflow: 'hidden',
                maxWidth: '100%',
            }}
        >
            {/* Horizontal scroll container - strictly contained */}
            <div
                className="flex gap-3 pb-2"
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                    maxWidth: '100%',
                }}
            >
                {images.map((image, index) => {
                    const isExpanded = expandedIndex === index;

                    return (
                        <div
                            key={index}
                            onClick={() => handleImageClick(index)}
                            className="flex-shrink-0 cursor-pointer"
                            style={{
                                width: isExpanded ? '260px' : '160px',
                                transition: 'width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            }}
                        >
                            <div
                                className="w-full overflow-hidden"
                                style={{ borderRadius: '14px' }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-auto block"
                                    style={{
                                        borderRadius: '14px',
                                        maxHeight: '200px',
                                        objectFit: 'cover',
                                    }}
                                    draggable={false}
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
