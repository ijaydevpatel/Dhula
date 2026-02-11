"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isLight = resolvedTheme === "light";

    return (
        <button
            onClick={(e) => {
                e.stopPropagation(); // Prevents clicks from bleeding into background elements
                setTheme(isLight ? "dark" : "light");
            }}
            // Extreme z-index to ensure it is always the top-most clickable item
            className="
                fixed top-6 right-6 z-[99999]
                rounded-full px-4 py-2 text-sm font-medium
                backdrop-blur-md border transition-all duration-300
                bg-white/80 dark:bg-black/40 
                text-black dark:text-white 
                border-gray-300 dark:border-gray-700
                hover:scale-105 active:scale-95 shadow-2xl cursor-pointer
            "
        >
            {isLight ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}