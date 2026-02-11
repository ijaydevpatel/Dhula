"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function LoveLetter() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();

    // Auto-close letter when section scrolls out of view
    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    setIsOpen(false);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Scroll to center of letter when opened
    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => {
                containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex flex-col items-center justify-center relative pb-32 px-4"
        >
            <div className="relative w-full max-w-lg flex flex-col items-center">

                {/* ENVELOPE CONTAINER */}
                <motion.div
                    className="relative cursor-pointer z-50 transition-transform duration-500"
                    onClick={handleOpen}
                    animate={{
                        x: isOpen ? 500 : 0,
                        y: isOpen ? 250 : 0,
                        scale: isOpen ? 0.7 : 1,
                        rotate: isOpen ? 5 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    whileHover={{ scale: isOpen ? 0.75 : 1.05 }}
                >
                    {/* ENVELOPE BODY */}
                    <motion.div
                        layout
                        className="w-72 h-48 rounded-lg shadow-2xl relative flex items-center justify-center border-b-4 border-rose-700"
                        style={{
                            backgroundColor: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                        }}
                    >
                        {/* FLAP */}
                        <motion.div
                            className="absolute top-0 left-0 w-0 h-0 border-l-[144px] border-r-[144px] border-t-[100px] border-l-transparent border-r-transparent border-t-rose-600 origin-top z-30 drop-shadow-md"
                            animate={{ rotateX: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* HEART SEAL */}
                        <motion.div
                            className="absolute z-40 top-[40%] text-4xl drop-shadow-lg filter cursor-pointer"
                            animate={{
                                opacity: isOpen ? 0 : 1,
                                scale: isOpen ? 0 : [1, 1.25, 1, 1.15, 1],
                            }}
                            transition={{
                                opacity: { duration: 0.2 },
                                scale: {
                                    duration: 1.2,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 0.5
                                }
                            }}
                        >
                            {resolvedTheme === "dark" ? "🖤" : "🤍"}
                        </motion.div>

                        {/* TEXT ON ENVELOPE */}
                        <motion.span
                            className="absolute bottom-4 text-center w-full text-red-600 font-bold text-sm tracking-widest opacity-100 placeholder-opacity-100"
                            key={isOpen ? "archive" : "open"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {isOpen ? "TAP TO ARCHIVE" : "TAP TO OPEN"}
                        </motion.span>
                    </motion.div>
                </motion.div>

                {/* THE LETTER (FIXED CENTERED OVERLAY) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="
                                w-[95vw] md:w-[700px]
                                max-h-[85vh]
                                p-8 md:p-12
                                rounded-[34px]
                                bg-white/60 dark:bg-white/10
                                backdrop-blur-[40px]
                                ring-1 ring-white/80 dark:ring-white/20
                                shadow-[0_30px_80px_rgba(0,0,0,0.2)]
                                overflow-hidden
                                pointer-events-auto
                            ">
                                <div
                                    className="overflow-y-auto max-h-[75vh] custom-scrollbar pr-2"
                                    onWheel={(e) => {
                                        if (e.deltaY < -20 && e.currentTarget.scrollTop === 0) {
                                            setIsOpen(false);
                                        }
                                    }}
                                >
                                    <p
                                        className="text-lg md:text-2xl leading-relaxed"
                                        style={{
                                            fontFamily: "'Transcity', system-ui",
                                            fontWeight: 500,
                                            color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                                        }}
                                    >
                                        <span className="block text-3xl mb-6 font-bold text-rose-600 dark:text-rose-400">Dhula, my love,</span>

                                        Our first Valentine’s Day together feels like the beginning of the life I want to grow old in. Before you, the future felt distant and uncertain—but now, when I think of tomorrow, all I see is you.
                                        <br /><br />
                                        I see a thousand ordinary days made extraordinary just because you’re there. Loving you has changed the way I believe in forever; it no longer feels like a promise people make, it feels like something my heart already knows.
                                        <br /><br />
                                        Even when we’ve stumbled, when words have hurt or distance has tested us, we always found our way back to each other—and that’s how I know this love is real.
                                        <br /><br />
                                        One day, when I stand in front of you and speak my marriage vows, I won’t just be promising love in happiness, but love in growth, forgiveness, and choosing you again and again.
                                        <br /><br />
                                        I don’t just want Valentine’s Days with you—I want seasons, years, quiet reunions after hard moments, and a lifetime where your hand is still the one I reach for.
                                        <br /><br />
                                        <span className="block mt-8 text-center text-3xl text-rose-600 dark:text-rose-400 font-bold">
                                            Dhula, you are where I want to begin, and where I want to end. ❤️💍
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
