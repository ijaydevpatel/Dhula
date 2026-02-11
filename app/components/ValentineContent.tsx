"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import PhotoStory from "./PhotoStory";
import TypingMessage from "./TypingMessage";
import LoveLetter from "./LoveLetter";


/* ---------------------------------------
    LOVE LOADER (UNCHANGED LOGIC)
---------------------------------------- */
function LoveLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const TOTAL_BARS = 18;

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 900);
                    return 100;
                }
                return p + 1;
            });
        }, 24);
        return () => clearInterval(interval);
    }, [onComplete]);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";
    const bg = isDark ? "#070A14" : "#ffffff";
    const fg = isDark ? "#ffffff" : "#000000";

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            style={{
                backgroundColor: bg,
                transition: "background-color 0.5s ease-in-out"
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(15px)" }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex flex-col items-center gap-12 pointer-events-auto">
                <div
                    className="text-center select-none"
                    style={{
                        fontFamily: "PrimorStylish, system-ui",
                        color: fg,
                        transition: "color 0.5s ease-in-out"
                    }}
                >
                    <div style={{ fontSize: "2.6rem", letterSpacing: "0.08em" }}>Loading</div>
                    <div style={{ fontSize: "7.2rem", lineHeight: "1", marginTop: "0.2rem" }}>Love</div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-end gap-[6px] h-12">
                        {Array.from({ length: TOTAL_BARS }).map((_, i) => {
                            const active = i < (progress / 100) * TOTAL_BARS;
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: active ? [14, 28, 18] : 10,
                                        opacity: active ? 1 : 0.25,
                                        backgroundColor: fg
                                    }}
                                    transition={{
                                        height: { duration: 0.8, repeat: active ? Infinity : 0, ease: "easeInOut", delay: i * 0.04 },
                                        backgroundColor: { duration: 0.5 }
                                    }}
                                    style={{ width: 6, borderRadius: 999 }}
                                />
                            );
                        })}
                    </div>
                    <div style={{ fontFamily: "Transcity, system-ui", fontSize: "0.85rem", letterSpacing: "0.35em", color: fg, opacity: 0.7, transition: "color 0.5s ease" }}>
                        {progress}%
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const HERO_LINES = [
    "I never knew love could feel this gentle.",
    "I just wanted you to feel",
    "how much you mean to me."
];

/* ---------------------------------------
    VALENTINE CONTENT COMPONENT
---------------------------------------- */
export default function ValentineContent() {
    const { resolvedTheme } = useTheme();
    const [stage, setStage] = useState<"loading" | "typing" | "home">("loading");

    // HERO SECTION STATE
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
    const [showScrollHint, setShowScrollHint] = useState(true);

    /* ---------- HERO TYPING EFFECT ---------- */
    useEffect(() => {
        if (stage !== "home") return;
        if (lineIndex >= HERO_LINES.length) return;

        const currentLine = HERO_LINES[lineIndex];

        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const updated = [...prev];
                    updated[lineIndex] = updated[lineIndex] + currentLine[charIndex];
                    return updated;
                });
                setCharIndex(charIndex + 1);
            }, 55);

            return () => clearTimeout(timeout);
        } else {
            const pause = setTimeout(() => {
                setLineIndex(lineIndex + 1);
                setCharIndex(0);
            }, 400);

            return () => clearTimeout(pause);
        }
    }, [stage, charIndex, lineIndex]);

    /* ---------- SCROLL INDICATOR LOOP LOGIC ---------- */
    useEffect(() => {
        if (stage !== "home") return;

        const onScroll = () => {
            setShowScrollHint(window.scrollY < 80);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, [stage]);

    return (
        <div className="min-h-screen">
            <AnimatePresence mode="wait">
                {stage === "loading" && (
                    <LoveLoader key="loader" onComplete={() => setStage("typing")} />
                )}

                {stage === "typing" && (
                    <TypingMessage key="typing" onComplete={() => setStage("home")} />
                )}
            </AnimatePresence>

            {/* Render the home stage OUTSIDE AnimatePresence to ensure it doesn't inherit transition blocking */}
            {stage === "home" && (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full relative z-0"
                >
                    {/* HERO SECTION */}
                    <section className="min-h-screen flex items-center justify-center px-6 relative">
                        <div className="max-w-4xl text-center">
                            {/* TITLE */}
                            <div
                                className="flex items-center justify-center mb-5"
                                style={{
                                    fontFamily: "Rockybilly, system-ui, sans-serif",
                                    fontSize: "clamp(3.75rem, 7.5vw, 6.5rem)",
                                    lineHeight: 1.4
                                }}
                            >
                                <span>Hiiii Dhula</span>
                            </div>

                            {/* HEART — BEATING */}
                            <div className="flex justify-center mb-6">
                                <motion.span
                                    style={{
                                        fontSize: "clamp(3.2rem, 4.5vw, 3.6rem)",
                                        display: "inline-block"
                                    }}
                                    animate={{ scale: [1, 1.25, 1, 1.15, 1] }}
                                    transition={{
                                        duration: 1.2,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatDelay: 0.5
                                    }}
                                >
                                    ❤️
                                </motion.span>
                            </div>

                            {/* MESSAGE — GREAT VIBES */}
                            <div
                                className="leading-relaxed space-y-2 opacity-80"
                                style={{
                                    fontFamily: "GreatVibes, cursive",
                                    fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)"
                                }}
                            >
                                {displayedLines.map((line, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: line ? 1 : 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        {line}
                                    </motion.p>
                                ))}
                            </div>
                        </div>

                        {/* SCROLL INDICATOR */}
                        <AnimatePresence>
                            {showScrollHint && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.6 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center select-none"
                                >
                                    <div
                                        style={{
                                            fontSize: "1.05rem",
                                            fontWeight: 500,
                                            letterSpacing: "0.24em"
                                        }}
                                    >
                                        Scroll
                                    </div>

                                    <div className="flex justify-center mt-1 space-x-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{ opacity: [0.2, 1, 0.2] }}
                                                transition={{
                                                    duration: 1.2,
                                                    repeat: Infinity,
                                                    delay: i * 0.2
                                                }}
                                                style={{ fontSize: "1rem" }}
                                            >
                                                &gt;
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>

                    <PhotoStory />

                    {/* SECTION BREAK */}
                    <div className="h-48 w-full" />

                    <LoveLetter />

                    {/* FINAL LOVE NOTE */}
                    <div className="h-24 w-full" />

                    <section className="flex flex-col items-center justify-center pb-4 space-y-2">
                        <span
                            className="text-[3.3rem] md:text-[4.2rem] font-bold"
                            style={{
                                fontFamily: "'PrimorStylish', system-ui",
                                color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                            }}
                        >
                            I
                        </span>
                        <span
                            className="text-[13.2rem] md:text-[17.6rem] leading-[0.8] font-bold py-4"
                            style={{
                                fontFamily: "'PrimorStylish', system-ui",
                                color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                            }}
                        >
                            Love
                        </span>
                        <span
                            className="text-[3.3rem] md:text-[4.2rem] font-bold"
                            style={{
                                fontFamily: "'PrimorStylish', system-ui",
                                color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                            }}
                        >
                            You
                        </span>
                        <span
                            className="text-[3.3rem] md:text-[4.2rem] font-bold"
                            style={{
                                fontFamily: "'PrimorStylish', system-ui",
                                color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                            }}
                        >
                            So
                        </span>
                        <span
                            className="text-[3.3rem] md:text-[4.2rem] font-bold"
                            style={{
                                fontFamily: "'PrimorStylish', system-ui",
                                color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                            }}
                        >
                            Much
                        </span>
                        <span
                            className="text-[3.3rem] md:text-[4.2rem] font-bold"
                            style={{
                                fontFamily: "'PrimorStylish', system-ui",
                                color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                            }}
                        >
                            Dhula
                        </span>
                    </section>
                </motion.main>
            )}
        </div>
    );
}
