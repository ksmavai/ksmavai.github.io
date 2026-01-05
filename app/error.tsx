"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const emoji = '😬';
const title = "something went wrong";
const message = "try refreshing?";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4">{emoji}</div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{message}</p>
                <div className="flex gap-2 justify-center">
                    <Button onClick={() => reset()} variant="outline">
                        refresh
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/notes">go home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
