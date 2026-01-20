"use client";

import { useState } from "react";
import Image from "next/image";

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
            {/* Horizontal scroll container */}
            <div
                className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => handleImageClick(index)}
                        className={`flex-shrink-0 cursor-pointer transition-all duration-500 ease-in-out overflow-hidden rounded-lg ${expandedIndex === index
                            ? "w-full"
                            : "w-48 md:w-56"
                            }`}
                    >
                        <div
                            className={`relative transition-all duration-500 ease-in-out ${expandedIndex === index
                                ? "aspect-video w-full"
                                : "aspect-[16/10] w-full"
                                }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                unoptimized
                                className="object-cover rounded-lg"
                                sizes={expandedIndex === index ? "100vw" : "224px"}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Expanded view below carousel */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedIndex !== null ? "mt-3 max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {expandedIndex !== null && (
                    <div
                        className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setExpandedIndex(null)}
                    >
                        <Image
                            src={images[expandedIndex].src}
                            alt={images[expandedIndex].alt}
                            fill
                            unoptimized
                            className="object-contain rounded-lg bg-muted"
                            sizes="100vw"
                            priority
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
