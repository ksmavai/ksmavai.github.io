"use client";

import { useState, useCallback } from "react";

interface Project {
    title: string;
    technical: string;
    simple: string;
}

const projects: Project[] = [
    {
        title: "Studysesh",
        technical: "An in-progress cross-platform mobile app built with React Native, Expo, TypeScript, and Reanimated, using Supabase for authentication, real-time chat, and course-based peer matching",
        simple: "After my university cut their tutoring programs due to budgeting issues, I'm building this app to create a much more direct, peer-to-peer tutoring and social discovery platform with a better financial model for both students and tutors"
    },
    {
        title: "Ottawa Transpo Widget",
        technical: "A WidgetKit-powered iOS app and widget integrating CoreLocation and GTFS-RT for real-time Ottawa transit departures, with intelligent inbound/outbound trip scheduling",
        simple: "Instead of always opening Transit or other apps to check the bus, I wanted to see Ottawa bus departures directly from my home screen, so I made this widget to track them with the design inspired by LED screens in train terminals"
    },
    {
        title: "Slouch",
        technical: "A privacy-first Chrome extension using TensorFlow.js and the MoveNet for real-time pose estimation tracking, applying CSS blur overlays when spinal alignment deviates from a user-calibrated baseline",
        simple: "A looot of CS and Software Engineering friends of mine are always hunched over their laptops, so I made a fun extension that basically forces one to fix their posture"
    },
    {
        title: "Academic Course Information System",
        technical: "An Python Discord bot hosted on Microsoft Azure serving 3,200+ users with PDF document watermarking, intelligent dual-LLM routing (DeepSeek/Perplexity) for conversational vs. real-time queries, and SQLite-backed note sharing with rate limiting and file integrity verification",
        simple: "I run a Discord server I started in first year which has now grown to 3,200+ engineering students. I wanted a better way for them to learn about courses and share notes with secure watermarking (so notes don't end up on sites like StudoCu...), so I built this bot with some AI features for fun"
    },
    {
        title: "Automated Room Booking System",
        technical: "A dockerized Spring Boot microservice using Selenium for headless browser automation with a CI/CD pipeline for nightly cron-scheduled execution, implementing intelligent multi-day lookahead scheduling and dynamic DOM traversal for automated room bookings.",
        simple: "Library rooms at my university get booked super fast, so I decided to automate the booking process on a nightly basis instead of doing it manually"
    },
    {
        title: "AI Assistant Web-App [Archived]",
        technical: "A locally-hosted RAG-based AI advice assistant with vector-embedded semantic search, enabling users to augment LLM responses with private document knowledge through a three-tier architecture: a React frontend, Python REST backend, and a ChromaDB-powered docstore. Deprecated and pivoted to Discord bot project with similar AI features.",
        simple: "I wanted to try building a locally-hosted AI chat interface with memory and document search — ended up deprecating it after finishing it and carried over the features to my Discord bot instead"
    }
];

interface ProjectItemProps {
    project: Project;
}

function ProjectItem({ project }: ProjectItemProps) {
    const [isSimple, setIsSimple] = useState(false);
    const [displayText, setDisplayText] = useState(project.technical);
    const [isAnimating, setIsAnimating] = useState(false);

    const animateText = useCallback((from: string, to: string) => {
        setIsAnimating(true);
        let currentText = from;

        // Phase 1: Delete (backspace effect)
        const deleteInterval = setInterval(() => {
            if (currentText.length > 0) {
                currentText = currentText.slice(0, -1);
                setDisplayText(currentText);
            } else {
                clearInterval(deleteInterval);

                // Phase 2: Type (typewriter effect)
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    if (charIndex <= to.length) {
                        setDisplayText(to.slice(0, charIndex));
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        setIsAnimating(false);
                    }
                }, 15); // Typing speed
            }
        }, 8); // Delete speed (faster than typing)
    }, []);

    const handleToggle = () => {
        if (isAnimating) return;

        const from = isSimple ? project.simple : project.technical;
        const to = isSimple ? project.technical : project.simple;

        setIsSimple(!isSimple);
        animateText(from, to);
    };

    return (
        <div className="mb-4">
            <h3 className="text-base font-semibold mb-1 flex items-center gap-2">
                {project.title}
                <button
                    onClick={handleToggle}
                    disabled={isAnimating}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-all duration-200 ${isAnimating
                        ? "opacity-50 cursor-not-allowed border-muted-foreground/30 text-muted-foreground"
                        : "border-muted-foreground/50 hover:border-foreground hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground"
                        }`}
                >
                    {isSimple ? "technical" : "translate"}
                </button>
            </h3>
            <div className="flex">
                <span className="mr-1.5 flex-shrink-0">-</span>
                <span className="text-sm">
                    {displayText}
                    {isAnimating && <span className="animate-pulse">|</span>}
                </span>
            </div>
        </div>
    );
}

export default function ProjectsContent() {
    return (
        <div className="px-2 text-base md:text-sm">
            <div className="markdown-body">
                {projects.map((project, index) => (
                    <ProjectItem key={index} project={project} />
                ))}
            </div>
        </div>
    );
}
