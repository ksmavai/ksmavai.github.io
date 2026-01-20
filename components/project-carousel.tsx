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
        // Mobile Breakout & Desktop Layout
        <div className="mt-8 mb-8 relative z-0">
            <div
                className={`
                    relative
                    /* Mobile: Break out of parent padding to full viewport width using the 'center-breakout' technique */
                    left-[50%] -translate-x-[50%] w-[100vw]
                    /* Desktop: Reset breakout and use negative margins for aesthetic clipping */
                    md:left-auto md:translate-x-0 md:w-auto md:-ml-6 md:-mr-6
                    overflow-hidden
                `}
            >
                <div
                    className="
                        flex gap-4 items-center
                        overflow-x-auto 
                        pb-8 -mb-8
                        snap-x snap-mandatory 
                    "
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                        // Padding logic to align content start
                        paddingLeft: '16px', // Mobile gutter
                        paddingRight: '16px',
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
                    {/* Spacer to ensure right edge scrolling allows full view of last item */}
                    <div className="flex-none w-1" />
                </div>
            </div>
        </div>
    );
}
