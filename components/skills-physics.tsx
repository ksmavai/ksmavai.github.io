"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface SkillCategory {
    name: string;
    color: string;
    darkColor: string;
    items: string[];
}

interface SkillsPhysicsProps {
    categories: SkillCategory[];
    subtitle?: string;
}

interface TableCell {
    body: Matter.Body;
    label: string;
    isHeader: boolean;
    color: string;
    darkColor: string;
    width: number;
    height: number;
}

type AnimationPhase = "static" | "colorReveal" | "falling";

export default function SkillsPhysics({ categories, subtitle }: SkillsPhysicsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const runnerRef = useRef<Matter.Runner | null>(null);
    const [renderCells, setRenderCells] = useState<TableCell[]>([]);
    const [positions, setPositions] = useState<Record<number, { x: number; y: number; angle: number }>>({});
    const [phase, setPhase] = useState<AnimationPhase>("static");
    const hasTriggeredFall = useRef(false);

    useEffect(() => {
        if (!containerRef.current || categories.length === 0) return;

        // Small delay to ensure container has proper dimensions after mount/reload
        const initTimeout = setTimeout(() => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            // Force reflow to get accurate dimensions
            container.offsetHeight;
            const width = Math.max(container.clientWidth, 300); // Minimum width fallback
            const isMobile = width < 500;

            const cellHeight = isMobile ? 32 : 44;
            const fontSize = isMobile ? 11 : 14;
            const charWidth = fontSize * 0.65;
            const cellPadding = isMobile ? 6 : 16;

            const numColumns = categories.length;
            const maxTotalWidth = width - 8; // Use almost full width on mobile
            const maxColumnWidth = maxTotalWidth / numColumns;

            const columnWidths = categories.map(category => {
                const allItems = [category.name, ...category.items];
                const longest = allItems.reduce((a, b) => a.length > b.length ? a : b, "");
                const calculatedWidth = longest.length * charWidth + cellPadding * 2;
                return Math.min(Math.max(calculatedWidth, isMobile ? 90 : 120), maxColumnWidth);
            });

            const tableWidth = columnWidths.reduce((a: number, b: number) => a + b, 0);
            const maxRows = Math.max(...categories.map(c => c.items.length)) + 1;
            const containerHeight = maxRows * cellHeight + (isMobile ? 220 : 180); // Middle ground for mobile

            container.style.height = `${containerHeight}px`;

            // Create engine - NO GRAVITY to start
            const engine = Matter.Engine.create();
            engine.gravity.y = 0;
            engine.gravity.x = 0;
            engineRef.current = engine;

            const wallThickness = 50;
            const tableStartX = (width - tableWidth) / 2;

            const walls = [
                Matter.Bodies.rectangle(width / 2, containerHeight - 10, width * 2, wallThickness, {
                    isStatic: true,
                }),
                Matter.Bodies.rectangle(-wallThickness / 2 + 8, containerHeight / 2, wallThickness, containerHeight * 2, {
                    isStatic: true,
                }),
                Matter.Bodies.rectangle(width + wallThickness / 2 - 8, containerHeight / 2, wallThickness, containerHeight * 2, {
                    isStatic: true,
                }),
                Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width * 2, wallThickness, {
                    isStatic: true,
                }),
            ];
            Matter.Composite.add(engine.world, walls);

            const tableCells: TableCell[] = [];

            categories.forEach((category, colIndex) => {
                const colWidth = columnWidths[colIndex];
                const colX = tableStartX + columnWidths.slice(0, colIndex).reduce((a: number, b: number) => a + b, 0) + colWidth / 2;

                // Header
                const headerY = 20 + cellHeight / 2;
                const headerBody = Matter.Bodies.rectangle(colX, headerY, colWidth, cellHeight, {
                    restitution: 0.2,
                    friction: 0.8,
                    frictionAir: 0.02,
                });
                // Fix position initially by setting velocity to 0 and making it "sleep"
                Matter.Body.setVelocity(headerBody, { x: 0, y: 0 });

                tableCells.push({
                    body: headerBody,
                    label: category.name,
                    isHeader: true,
                    color: category.color,
                    darkColor: category.darkColor,
                    width: colWidth,
                    height: cellHeight,
                });
                Matter.Composite.add(engine.world, headerBody);

                // Data cells
                category.items.forEach((item, rowIndex) => {
                    const y = 20 + cellHeight / 2 + (rowIndex + 1) * cellHeight;
                    const body = Matter.Bodies.rectangle(colX, y, colWidth, cellHeight, {
                        restitution: 0.2,
                        friction: 0.8,
                        frictionAir: 0.02,
                    });
                    Matter.Body.setVelocity(body, { x: 0, y: 0 });

                    tableCells.push({
                        body,
                        label: item,
                        isHeader: false,
                        color: category.color,
                        darkColor: category.darkColor,
                        width: colWidth,
                        height: cellHeight,
                    });
                    Matter.Composite.add(engine.world, body);
                });
            });

            setRenderCells(tableCells);

            // Mouse interaction
            const mouse = Matter.Mouse.create(container);
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: { stiffness: 0.2, render: { visible: false } },
            });
            Matter.Composite.add(engine.world, mouseConstraint);

            mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
            mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

            // Start runner
            const runner = Matter.Runner.create();
            runnerRef.current = runner;
            Matter.Runner.run(runner, engine);

            // Phase timers
            const timer1 = setTimeout(() => setPhase("colorReveal"), 1500);
            const timer2 = setTimeout(() => {
                setPhase("falling");
                // ENABLE GRAVITY NOW
                if (engineRef.current) {
                    console.log("Enabling gravity!");
                    engineRef.current.gravity.y = 1;
                }
            }, 3000);

            // Position updates with boundary clamping
            let animationId: number;
            const updatePositions = () => {
                const newPositions: Record<number, { x: number; y: number; angle: number }> = {};
                tableCells.forEach(({ body, width: cellWidth, height: cellHeight }) => {
                    // Clamp position to keep boxes within bounds
                    const halfWidth = cellWidth / 2;
                    const halfHeight = cellHeight / 2;
                    const padding = 10; // Extra padding from edges

                    const minX = halfWidth + padding;
                    const maxX = width - halfWidth - padding;
                    const minY = halfHeight + padding;
                    const maxY = containerHeight - halfHeight - padding;

                    // If body is out of bounds, force it back in
                    if (body.position.x < minX || body.position.x > maxX ||
                        body.position.y < minY || body.position.y > maxY) {
                        Matter.Body.setPosition(body, {
                            x: Math.max(minX, Math.min(maxX, body.position.x)),
                            y: Math.max(minY, Math.min(maxY, body.position.y))
                        });
                        // Reduce velocity to prevent bouncing through walls
                        Matter.Body.setVelocity(body, {
                            x: body.velocity.x * 0.5,
                            y: body.velocity.y * 0.5
                        });
                    }

                    newPositions[body.id] = {
                        x: body.position.x,
                        y: body.position.y,
                        angle: body.angle,
                    };
                });
                setPositions(newPositions);
                animationId = requestAnimationFrame(updatePositions);
            };
            updatePositions();

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                cancelAnimationFrame(animationId);
                Matter.Runner.stop(runner);
                Matter.Engine.clear(engine);
            };
        }, 50); // 50ms delay to ensure DOM is ready

        return () => {
            clearTimeout(initTimeout);
        };
    }, [categories]);

    return (
        <div className="px-2 pb-4">
            {subtitle && (
                <p className="mb-3">{subtitle}</p>
            )}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden touch-none select-none"
                style={{ cursor: phase === "falling" ? "grab" : "default", minHeight: "300px" }}
            >
                {renderCells.map((cell) => {
                    const pos = positions[cell.body.id];
                    if (!pos) return null;

                    const isColored = phase !== "static";
                    const textColorLight = isColored ? (cell.isHeader ? '#1a1a1a' : cell.color) : '#1a1a1a';
                    const textColorDark = isColored ? (cell.isHeader ? '#ffffff' : cell.darkColor) : '#ffffff';

                    return (
                        <div
                            key={cell.body.id}
                            className={`absolute flex items-center justify-center pointer-events-none overflow-hidden
                       bg-white dark:bg-neutral-800 
                       border border-neutral-300 dark:border-neutral-600
                       ${cell.isHeader ? 'font-semibold' : 'font-normal'}
                       transition-colors duration-[1500ms]`}
                            style={{
                                left: pos.x - cell.width / 2,
                                top: pos.y - cell.height / 2,
                                width: cell.width,
                                height: cell.height,
                                transform: `rotate(${pos.angle}rad)`,
                                fontSize: cell.isHeader ? '13px' : '12px',
                                padding: '0 6px',
                            }}
                        >
                            <span className="dark:hidden truncate" style={{ color: textColorLight }}>
                                {cell.label}
                            </span>
                            <span className="hidden dark:inline truncate" style={{ color: textColorDark }}>
                                {cell.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
