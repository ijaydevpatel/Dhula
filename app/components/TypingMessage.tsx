"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function TypingMessage({ onComplete }: { onComplete: () => void }) {
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [done, setDone] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const LINES = [
        "Some moments quietly stay with you.",
        "Some people slowly change you.",
        "You did both."
    ];

    useEffect(() => {
        setMounted(true);
        if (done) return;

        if (charIndex < LINES[lineIndex].length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + LINES[lineIndex][charIndex]);
                setCharIndex(charIndex + 1);
            }, 55);
            return () => clearTimeout(timeout);
        } else {
            const pause = setTimeout(() => {
                if (lineIndex < LINES.length - 1) {
                    setLineIndex(lineIndex + 1);
                    setCharIndex(0);
                    setCurrentText("");
                } else {
                    setDone(true);
                    setTimeout(onComplete, 1200);
                }
            }, 700);
            return () => clearTimeout(pause);
        }
    }, [charIndex, lineIndex, done, onComplete]);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";
    const bg = isDark ? "#070A14" : "#ffffff";
    const fg = isDark ? "#ffffff" : "#000000";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center text-center px-6 pointer-events-none"
            style={{

            }}
        >
            <div className="space-y-6 pointer-events-auto">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={lineIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            fontFamily: "Transcity, system-ui, sans-serif",
                            fontSize: "clamp(1.8rem, 4vw, 3rem)",
                            letterSpacing: "0.04em",
                            lineHeight: 1.4,
                            color: fg,
                            transition: "color 0.5s ease"
                        }}
                    >
                        {currentText}
                    </motion.p>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}