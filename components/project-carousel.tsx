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
            className="mt-3 mb-2 relative"
            style={{
                marginLeft: '-8px',
                marginRight: '-8px',
                width: 'calc(100% + 16px)',
            }}
        >
            {/* Clip container - clips at the edges */}
            <div style={{ overflow: 'hidden', paddingLeft: '8px' }}>
                {/* Horizontal scroll container */}
                <div
                    className="flex gap-3 pb-2"
                    style={{
                        overflowX: 'auto',
                        overflowY: 'visible',
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
                                className="flex-shrink-0 cursor-pointer"
                                style={{
                                    width: isExpanded ? '280px' : '180px',
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
                                        style={{ borderRadius: '14px' }}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        );
                    })}
                    {/* Right padding spacer */}
                    <div className="flex-shrink-0 w-2" />
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
