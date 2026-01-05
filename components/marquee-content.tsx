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
    }, [content]);

    return (
        <div className="py-2 w-full overflow-hidden">
            {lines.map((line, index) => (
                <div
                    key={index}
                    className={`w-full overflow-hidden whitespace-nowrap ${line.isHeader ? "mt-4 first:mt-0" : "my-1"}`}
                >
                    <div
                        className={`inline-block ${line.isHeader ? "font-semibold text-lg" : ""}`}
                        style={{
                            animation: "marquee-scroll 15s linear infinite",
                        }}
                    >
                        {line.text}
                    </div>
                </div>
            ))}

            <style jsx global>{`
        @keyframes marquee-scroll {
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
