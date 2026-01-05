"use client";

import React from "react";
import { Pin } from "lucide-react";

interface SwipeActionsProps {
    isOpen: boolean;
    onPin: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    isPinned: boolean;
    canEditOrDelete?: boolean;
}

export function SwipeActions({
    isOpen,
    onPin,
    isPinned,
}: SwipeActionsProps) {
    return (
        <div
            className={`absolute right-0 top-0 h-full flex items-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <button
                onClick={onPin}
                className="h-full w-12 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                aria-label={isPinned ? "Unpin note" : "Pin note"}
            >
                <Pin className={`w-4 h-4 ${isPinned ? "fill-current" : ""}`} />
            </button>
        </div>
    );
}
