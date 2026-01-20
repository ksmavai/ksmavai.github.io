"use client";

import { useState, useRef, useEffect } from "react";
import { useMobileDetect } from "./mobile-detector";

// Media item can be an image or a video
interface CarouselMedia {
    src: string;
    alt: string;
    type?: 'image' | 'video'; // defaults to 'image' if not specified
    aspectRatio?: 'portrait' | 'landscape'; // Override auto-detection
}

interface ProjectCarouselProps {
    images: CarouselMedia[];
}

// Helper to detect if a file is a video based on extension
function isVideoFile(src: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.mov', '.gif'];
    return videoExtensions.some(ext => src.toLowerCase().endsWith(ext));
}

// Size configurations based on aspect ratio
const PORTRAIT_SIZES = { collapsed: 180, expanded: 320 };   // Vertical videos
const LANDSCAPE_SIZES = { collapsed: 400, expanded: 640 };  // Horizontal videos - MUCH bigger

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [aspectRatios, setAspectRatios] = useState<Record<number, 'portrait' | 'landscape'>>({});
    const isMobile = useMobileDetect();

    const handleMediaClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Callback when video/image dimensions are known
    const handleMediaLoad = (index: number, width: number, height: number) => {
        const ratio = width > height ? 'landscape' : 'portrait';
        setAspectRatios(prev => ({ ...prev, [index]: ratio }));
    };

    if (images.length === 0) return null;

    return (
        <div className="mt-8 mb-8 relative z-0">
            <div
                className="relative left-[50%] -translate-x-[50%] w-[100vw] md:left-auto md:translate-x-0 md:w-auto md:-ml-2 md:-mr-2 overflow-hidden"
            >
                <div
                    className="flex gap-4 items-center overflow-x-auto pb-8 -mb-8 snap-x snap-mandatory hide-scrollbar"
                    style={{
                        paddingLeft: isMobile ? '40px' : '8px',
                        paddingRight: isMobile ? '16px' : '8px',
                    }}
                >
                    {images.map((media, index) => {
                        const isExpanded = expandedIndex === index;
                        const isVideo = media.type === 'video' || isVideoFile(media.src);

                        // Determine size based on aspect ratio
                        // Use override if provided, otherwise use auto-detected, default to portrait
                        const isLandscape = media.aspectRatio
                            ? media.aspectRatio === 'landscape'
                            : aspectRatios[index] === 'landscape';
                        const sizes = isLandscape ? LANDSCAPE_SIZES : PORTRAIT_SIZES;
                        const width = isExpanded ? sizes.expanded : sizes.collapsed;

                        return (
                            <div
                                key={index}
                                onClick={() => handleMediaClick(index)}
                                className="flex-none cursor-pointer transform-gpu snap-center"
                                style={{
                                    width: `${width}px`,
                                    transition: 'width 0.6s cubic-bezier(0.34, 1.6, 0.64, 1)',
                                }}
                            >
                                {isVideo ? (
                                    // Video: autoplay, loop, muted (like a GIF)
                                    <video
                                        src={media.src}
                                        className="w-full h-auto block select-none shadow-sm"
                                        style={{
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(0,0,0,0.1)'
                                        }}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        draggable={false}
                                        onLoadedMetadata={(e) => {
                                            const video = e.currentTarget;
                                            handleMediaLoad(index, video.videoWidth, video.videoHeight);
                                        }}
                                    />
                                ) : (
                                    // Image
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={media.src}
                                        alt={media.alt}
                                        className="w-full h-auto block select-none shadow-sm"
                                        style={{
                                            borderRadius: '16px',
                                            backgroundColor: 'rgba(0,0,0,0.02)'
                                        }}
                                        draggable={false}
                                        onLoad={(e) => {
                                            const img = e.currentTarget;
                                            handleMediaLoad(index, img.naturalWidth, img.naturalHeight);
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                    <div className="flex-none w-2" />
                </div>
            </div>

            {/* Force hide scrollbars */}
            <style jsx global>{`
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
