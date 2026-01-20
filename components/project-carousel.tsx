"use client";

import { useState, useRef } from "react";

interface CarouselImage {
    src: string;
    alt: string;
}

interface ProjectCarouselProps {
    images: CarouselImage[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleImageClick = (index: number) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    if (images.length === 0) return null;

    return (
        <div className="mt-3 mb-2 w-full overflow-hidden">
            <div
                ref={scrollRef}
                className="carousel-scroll flex gap-3 pb-2 overflow-x-scroll"
                style={{
                    WebkitOverflowScrolling: 'touch',
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
                                width: isExpanded ? '240px' : '150px',
                                transition: 'width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto block"
                                style={{ borderRadius: '12px' }}
                                draggable={false}
                            />
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                .carousel-scroll {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .carousel-scroll::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
