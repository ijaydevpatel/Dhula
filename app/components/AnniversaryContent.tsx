"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import MemoriesGallery from "./MemoriesGallery";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnniversaryContent() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Refs for GSAP
    const headerRef = useRef<HTMLElement>(null);
    const leftTimelineRef = useRef<HTMLDivElement>(null);
    const rightTimelineRef = useRef<HTMLDivElement>(null);
    const scrollMarkerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // HEADER + SIDEBAR TRIGGER LOGIC
    useEffect(() => {
        if (!mounted) return;

        // Wait for DOM layout
        const timer = setTimeout(() => {
            const elements = [
                headerRef.current,
                leftTimelineRef.current,
                rightTimelineRef.current
            ].filter(Boolean) as Element[];

            // Force hidden on init
            elements.forEach(el => gsap.set(el, { autoAlpha: 0 }));

            if (headerRef.current && scrollMarkerRef.current) {
                ScrollTrigger.create({
                    trigger: scrollMarkerRef.current,
                    start: "top top", // Fires when scroll marker hits viewport top
                    onEnter: () => {
                        elements.forEach(el => gsap.to(el, { autoAlpha: 1, duration: 0.3 }));
                    },
                    onLeaveBack: () => {
                        elements.forEach(el => gsap.to(el, { autoAlpha: 0, duration: 0.3 }));
                    },
                });
            }
        }, 150);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(t => t.kill());
            // Cleanup styles
            [headerRef.current, leftTimelineRef.current, rightTimelineRef.current]
                .filter(Boolean)
                .forEach(el => gsap.set(el!, { autoAlpha: 0 }));
        };
    }, [mounted]);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    const fontColor = isDark ? "#E1C699" : "#991b1b";
    const accentColor = isDark ? "#dc2626" : "#991b1b";
    const textColor = isDark ? "#fffbeb" : "#450a0a";

    const bgGradient = isDark
        ? "radial-gradient(circle at center, #2e0202 0%, #000000 100%)"
        : "radial-gradient(circle at center, #fff1f2 0%, #ffffff 100%)";

    return (
        <ReactLenis root options={{ lerp: 0.07, duration: 1.2 }}>
            {/* FIXED GLOBAL BACKGROUND */}
            <div className="fixed inset-0 z-0" style={{ background: bgGradient }} />

            {/* FIXED PARTICLES */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            background: accentColor,
                            width: Math.random() * 4 + 2 + "px",
                            height: Math.random() * 4 + 2 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                            opacity: isDark ? [0.1, 0.5, 0.1] : [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* FIXED HEADER — top bar */}
            <nav
                ref={headerRef}
                className="fixed-header"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    padding: "1cm 40px 20px 40px",
                    zIndex: 9999,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: fontColor,
                    pointerEvents: "none",
                    opacity: 0,
                    visibility: "hidden",
                }}
            >
                {/* Dhula — Centered */}
                <h2
                    style={{
                        fontFamily: "GreatVibes, cursive",
                        fontSize: "clamp(2.7rem, 4.5vw, 4.05rem)",
                        margin: 0,
                    }}
                >
                    Dhula
                </h2>
            </nav>

            {/* LEFT SIDEBAR TIMELINE — all elements centered on the same vertical axis */}
            <div
                id="timeline-left"
                ref={leftTimelineRef}
                className="fixed left-10 top-0 h-screen z-[9998]"
                style={{
                    color: fontColor,
                    pointerEvents: "none",
                    opacity: 0,
                    visibility: "hidden",
                    width: "8rem",
                }}
            >
                {/* ANNIVERSARY + Date — Top, centered on axis */}
                <div
                    className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs md:text-sm tracking-[0.2em] font-medium whitespace-nowrap"
                    style={{ fontFamily: "Transcity, sans-serif", opacity: 0.7 }}
                >
                    <span className="mb-1">ANNIVERSARY</span>
                    <span>21-02-2025</span>
                </div>

                {/* Line 1 — from Anniversary down to 2026 */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bg-current"
                    style={{
                        width: "1px",
                        top: "6.5rem",
                        bottom: "calc(50% + 3.5rem)",
                        opacity: 0.4,
                    }}
                />

                {/* 2026 — Center, vertical text, centered on axis */}
                <div
                    className="absolute text-xs md:text-sm tracking-[0.3em] font-medium"
                    style={{
                        fontFamily: "Transcity, sans-serif",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%) rotate(180deg)",
                    }}
                >
                    2026
                </div>

                {/* Line 2 — from 2026 down to FOREVER */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bg-current"
                    style={{
                        width: "1px",
                        top: "calc(50% + 3.5rem)",
                        bottom: "5rem",
                        opacity: 0.4,
                    }}
                />

                {/* FOREVER — Bottom, horizontal, centered on axis */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm tracking-[0.3em] font-medium whitespace-nowrap"
                    style={{
                        fontFamily: "Transcity, sans-serif",
                    }}
                >
                    FOREVER
                </div>
            </div>

            {/* RIGHT SIDEBAR — Balance elements */}
            <div
                id="timeline-right"
                ref={rightTimelineRef}
                className="fixed right-10 top-0 h-screen z-[9998]"
                style={{
                    color: fontColor,
                    pointerEvents: "none",
                    opacity: 0,
                    visibility: "hidden",
                    width: "8rem",
                }}
            >
                {/* Top decorative line */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bg-current"
                    style={{
                        width: "1px",
                        top: "6.5rem",
                        bottom: "calc(50% + 6.5rem)", // Leave room for long text
                        opacity: 0.4,
                    }}
                />

                {/* JAYDEV & DHULA — Center, vertical text */}
                <div
                    className="absolute text-xs md:text-sm tracking-[0.3em] font-medium whitespace-nowrap"
                    style={{
                        fontFamily: "Transcity, sans-serif",
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%) rotate(180deg)",
                    }}
                >
                    JAYDEV & DHULO
                </div>

                {/* Bottom decorative line */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bg-current"
                    style={{
                        width: "1px",
                        top: "calc(50% + 6.5rem)",
                        bottom: "5rem",
                        opacity: 0.4,
                    }}
                />

                {/* Infinity Symbol — Bottom */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xl opacity-80"
                    style={{ fontFamily: "serif" }}
                >
                    ∞
                </div>
            </div>

            {/* SCROLL CONTENT */}
            <div className="w-full min-h-screen overflow-x-hidden relative" style={{ color: textColor }}>

                {/* HERO SECTION */}
                <motion.div
                    className="hero sticky top-0 h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none z-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    style={{ position: 'relative' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mb-4"
                        style={{
                            fontFamily: "Transcity, system-ui",
                            letterSpacing: "0.3em",
                            fontSize: "1rem",
                            color: fontColor,
                            textTransform: "uppercase"
                        }}
                    >
                        February 21, 2026
                    </motion.div>

                    <div className="relative z-10 mb-6">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight"
                            style={{
                                fontFamily: "GreatVibes, cursive",
                                color: fontColor,
                                textShadow: isDark ? `0 0 25px ${accentColor}80` : "none"
                            }}
                        >
                            Happy<br />Forever day
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            style={{
                                fontFamily: "Transcity, system-ui",
                                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                                color: fontColor,
                                letterSpacing: "0.3em",
                                textTransform: "uppercase",
                                marginTop: "0.5rem",
                            }}
                        >
                            us day
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="max-w-2xl mx-auto space-y-4 leading-relaxed opacity-90 relative z-10"
                        style={{
                            fontFamily: "Transcity, system-ui",
                            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                            letterSpacing: "0.1em"
                        }}
                    >
                        <p>Every moment with you has been a beautiful journey.</p>
                        <p>Here&apos;s to us, to love, and to forever.</p>
                        <p className="pt-4 text-4xl" style={{ fontFamily: "PrimorStylish, system-ui", color: fontColor }}>
                            I Love You, Dhula
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 2, duration: 1 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center select-none"
                        style={{ color: fontColor }}
                    >
                        <div className="translate-y-2" style={{ fontSize: "1.05rem", fontWeight: 500, letterSpacing: "0.24em" }}>
                            Scroll
                        </div>
                        <div className="flex justify-center mt-0 space-x-1">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                    style={{ fontSize: "1rem" }}
                                >
                                    &gt;
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Invisible scroll marker — triggers header/sidebar fade-in */}
                <div ref={scrollMarkerRef} style={{ height: 0, pointerEvents: 'none' }} />

                {/* MEMORIES GALLERY — Pinned Wrapper logic inside */}
                <div className="relative z-10">
                    <MemoriesGallery />
                </div>


            </div>
        </ReactLenis>
    );
}
