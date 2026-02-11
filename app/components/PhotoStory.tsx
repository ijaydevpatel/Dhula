"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const photos = [
    { src: "/photos/1.JPG", caption: "It started quietly." },
    { src: "/photos/2.JPG", caption: "Somewhere between laughs and late talks." },
    { src: "/photos/3.JPG", caption: "Moments that didn’t need words." },
    { src: "/photos/4.jpg", caption: "Just us, being us." },
    { src: "/photos/5.JPG", caption: "Comfort felt natural." },
    { src: "/photos/6.JPG", caption: "Every day felt lighter." },
    { src: "/photos/7.JPG", caption: "Smiles became effortless." },
    { src: "/photos/8.JPG", caption: "Time slowed down." },
    { src: "/photos/9.JPG", caption: "Love looked like this." },
    { src: "/photos/10.JPG", caption: "Us, always." },
    { src: "/photos/11.JPG", caption: "And still choosing you." }
];

function PhotoCard({ photo, index, total, scrollYProgress }: { photo: typeof photos[0], index: number, total: number, scrollYProgress: MotionValue<number> }) {
    const { resolvedTheme } = useTheme();
    const start = index / total;
    const end = (index + 1) / total;

    // Calculate a safe fade duration (30% of the segment)
    const fadeDuration = (1 / total) * 0.3;

    const opacity = useTransform(
        scrollYProgress,
        [start, start + fadeDuration, end - fadeDuration, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, end],
        [60, -60]
    );

    const scale = useTransform(
        scrollYProgress,
        [start, end],
        [1.05, 1]
    );

    return (
        <motion.div
            style={{ opacity }}
            className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4"
        >
            {/* FRAME */}
            <motion.div style={{ y, scale }} className="relative">
                {/* GLOW */}
                <div
                    className="absolute inset-[-34px] rounded-[48px] blur-[90px]"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,182,193,0.45), rgba(255,141,161,0.2) 55%, transparent 70%)"
                    }}
                />

                {/* GLASS FRAME */}
                <div
                    className="
                        relative
                        h-[76vh] w-[49vh]
                        rounded-[34px] p-[16px]
                        bg-white/45 dark:bg-white/12
                        backdrop-blur-[30px]
                        ring-1 ring-white/70 dark:ring-white/20
                        shadow-[0_28px_80px_rgba(0,0,0,0.22)]
                    "
                >
                    <div className="h-full w-full rounded-[24px] overflow-hidden">
                        <img
                            src={photo.src}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.p
                style={{
                    opacity,
                    fontFamily: "'PrimorStylish', system-ui",
                    color: resolvedTheme === "dark" ? "#ffffff" : "#000000"
                }}
                className="mt-4 text-xl md:text-2xl font-normal"
            >
                {photo.caption}
            </motion.p>
        </motion.div>
    );
}

export default function PhotoStory() {
    const ref = useRef<HTMLDivElement>(null);
    const total = photos.length + 3; // Add buffer frame at start + 2 at end
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    return (
        <section
            ref={ref}
            style={{ height: `${total * 100}vh` }}
            className="relative w-full bg-transparent"
        >
            <div className="sticky top-0 h-screen flex items-center justify-center">
                {photos.map((photo, index) => (
                    <PhotoCard
                        key={index}
                        photo={photo}
                        index={index + 1} // Shift index by 1 to skip start buffer
                        total={total}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </section>
    );
}
