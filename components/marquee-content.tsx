"use client";

import { useEffect, useState } from "react";

interface MarqueeContentProps {
    content: string;
}

interface MarqueeLine {
    text: string;
    isHeader: boolean;
}

export default function MarqueeContent({ content }: MarqueeContentProps) {
    const [lines, setLines] = useState<MarqueeLine[]>([]);
    const [phase, setPhase] = useState<"static" | "exiting" | "looping">("static");

    useEffect(() => {
        const parsedLines = content
            .split("\n")
            .filter(line => line.trim())
            .map((line) => {
                const trimmed = line.trim();
                const isHeader = trimmed.startsWith("###") || trimmed.startsWith("##") || trimmed.startsWith("#");
                let text = trimmed;

                if (isHeader) {
                    text = trimmed.replace(/^#+\s*/, "");
                } else if (trimmed.startsWith("-")) {
                    text = trimmed.replace(/^-\s*/, "");
                }

                return { text, isHeader };
            });

        setLines(parsedLines);

        // Start exiting animation after 4 seconds
        const timer1 = setTimeout(() => {
            setPhase("exiting");
        }, 4000);

        // Switch to looping after the exit animation completes (~3 seconds)
        const timer2 = setTimeout(() => {
            setPhase("looping");
        }, 7000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [content]);

    const getAnimationStyle = () => {
        if (phase === "static") {
            return { animation: "none", transform: "translateX(0)" };
        } else if (phase === "exiting") {
            return { animation: "marquee-exit 3s linear forwards" };
        } else {
            return { animation: "marquee-loop 15s linear infinite" };
        }
    };

    return (
        <div className="py-2 px-2 w-full overflow-hidden">
            {lines.map((line, index) => (
                <div
                    key={index}
                    className={`w-full overflow-hidden whitespace-nowrap ${line.isHeader ? "mt-4 first:mt-0" : "my-1"}`}
                >
                    <div
                        className={`inline-block ${line.isHeader ? "font-semibold text-lg" : "pl-6"}`}
                        style={getAnimationStyle()}
                    >
                        {!line.isHeader && <span className="mr-2">•</span>}
                        {line.text}
                    </div>
                </div>
            ))}

            <style jsx global>{`
        @keyframes marquee-exit {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee-loop {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
        </div>
    );
}

