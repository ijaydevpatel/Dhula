"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const photos = Array.from({ length: 5 }, (_, i) => `/anniversary_photos/${i + 1}.JPG`);

const captions = [
    "Where it all began...",
    "Our favorite adventures",
    "The quiet moments",
    "Always laughing together",
    "Forever and always",
];

const subtexts = [
    "In every shared smile, a universe was born.",
    "Side by side, heart to heart, through it all.",
    "The stillness between us speaks the loudest.",
    "Your laugh is my favorite sound in the world.",
    "Today, tomorrow, and every day after.",
];

export default function MemoriesGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const [signed, setSigned] = useState(false);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [noMoves, setNoMoves] = useState(0);

    const moveNoButton = useCallback(() => {
        const x = (Math.random() - 0.5) * 250;
        const y = (Math.random() - 0.5) * 150;
        setNoPos({ x, y });
        setNoMoves(prev => prev + 1);
    }, []);

    const fireConfetti = useCallback(() => {
        setSigned(true);
        const colors = ['#ff6b8a', '#ffd700', '#ff69b4', '#e1c699', '#ff1493', '#ffffff'];
        // Burst 1: center
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5, x: 0.5 }, colors, scalar: 1.1 });
        // Burst 2: left side
        setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.6 }, colors, scalar: 1.1 }), 250);
        // Burst 3: right side
        setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.6 }, colors, scalar: 1.1 }), 500);
        // Burst 4: top-left
        setTimeout(() => confetti({ particleCount: 100, angle: 45, spread: 80, origin: { x: 0.2, y: 0.3 }, colors, scalar: 1.1 }), 750);
        // Burst 5: top-right
        setTimeout(() => confetti({ particleCount: 100, angle: 135, spread: 80, origin: { x: 0.8, y: 0.3 }, colors, scalar: 1.1 }), 1000);
    }, []);

    const textColor = isDark ? "#E1C699" : "#991b1b";
    const accentColor = isDark ? "#dc2626" : "#991b1b";

    // Glass card colors
    const glassBg = isDark
        ? "rgba(20, 20, 20, 0.2)" // Much more transparent
        : "rgba(255, 255, 255, 0.2)";
    const glassBorder = isDark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(153, 27, 27, 0.15)";
    const shadowColor = isDark
        ? "rgba(0,0,0,0.5)"
        : "rgba(153, 27, 27, 0.2)";

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".project-slide");

            // 1. PIN THE WRAPPER — Master Timeline
            // We use a timeline to orchestrate the slides sequentially while the wrapper is pinned
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".cards-wrapper",
                    start: "top top", // Starts exactly when the wrapper hits the top
                    end: () => "+=" + (cards.length * window.innerHeight), // Pins for the duration of all cards
                    pin: true,
                    scrub: 1, // Smooth scrub
                    snap: {
                        snapTo: 1 / (cards.length - 1), // Snap to strictly integer steps (one slide at a time)
                        duration: { min: 0.2, max: 0.5 }, // Faster snap for "stay there" feel
                        delay: 0.1,
                        ease: "power2.out", // More assertive snap
                    },
                }
            });

            // 2. ANIMATE THE CARDS
            cards.forEach((card, index) => {
                // The first card is already visible (z-index 1), so we skip animating its entrance
                if (index === 0) return;

                // Slide the NEW card up from the bottom (over the previous one)
                tl.fromTo(card,
                    { y: window.innerHeight },
                    { y: 0, duration: 1, ease: "none" }
                );

                // Fade out the PREVIOUS card at the exact same time
                // This makes the previous card vanish as the new one covers it
                if (index > 0) {
                    tl.to(cards[index - 1], {
                        opacity: 0,
                        duration: 0.5,
                        ease: "none"
                    }, "<"); // The "<" symbol tells GSAP to run this at the same time as the slide up
                }
            });

            // 3. IMAGE REVEAL (Scale down effect inside the card)
            cards.forEach((slide) => {
                let img = slide.querySelector(".reveal-img");
                if (img) {
                    gsap.to(img, {
                        scale: 1, // Zoom out to normal (starts at 1.2 via CSS)
                        ease: "none",
                        scrollTrigger: {
                            trigger: slide,
                            start: "top bottom",
                            end: "center center",
                            scrub: true
                        }
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* CARDS WRAPPER — Pinned Container */}
            <div className="cards-wrapper relative w-full h-screen overflow-hidden">
                {photos.map((src, index) => (
                    <section
                        key={index}
                        className="project-slide absolute top-0 left-0 w-full h-screen flex items-center justify-center will-change-transform"
                        style={{
                            zIndex: index + 1,
                            backgroundColor: "transparent", // Transparent to see global bg
                        }}
                    >
                        {/* GLASS CARD */}
                        <div
                            className="glass-card"
                            style={{
                                width: "85vw",
                                maxWidth: "1200px",
                                height: "70vh",
                                marginTop: "18vh", // Leave more room for header & clear content overlap
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "40px",
                                gap: "40px",
                                background: glassBg,
                                backdropFilter: "blur(40px)", // Increased blur
                                WebkitBackdropFilter: "blur(40px)",
                                border: `1px solid ${glassBorder}`,
                                borderRadius: "30px",
                                boxShadow: `0 10px 40px ${shadowColor}`,
                                opacity: 1
                            }}
                        >
                            {/* TEXT CONTENT */}
                            <div
                                className="text-content flex flex-col justify-end h-full"
                                style={{ flex: "0 0 35%", paddingBottom: "20px" }}
                            >
                                <h3
                                    className="text-3xl md:text-5xl font-bold uppercase tracking-widest leading-tight mb-4"
                                    style={{
                                        fontFamily: "Transcity, system-ui",
                                        color: textColor,
                                    }}
                                >
                                    {captions[index]}
                                </h3>
                                <div
                                    className="w-12 h-[2px] mb-4"
                                    style={{ background: accentColor }}
                                />
                                <p
                                    className="text-sm md:text-base leading-relaxed"
                                    style={{
                                        fontFamily: "Transcity, system-ui",
                                        color: textColor,
                                        opacity: 0.7,
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {subtexts[index]}
                                </p>
                            </div>

                            {/* IMAGE CONTAINER */}
                            <div
                                className="image-container"
                                style={{
                                    flex: "1 1 60%",
                                    height: "100%",
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                <Image
                                    src={src}
                                    alt={`Memory ${index + 1}`}
                                    fill
                                    className="reveal-img object-cover"
                                    style={{ transform: "scale(1.2)" }} // Start zoomed in for reveal effect
                                    sizes="(max-width: 768px) 85vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </div>
                        </div>
                    </section>
                ))}

                {/* ═══ SLIDE 6: THE RENEWAL CONTRACT ═══ */}
                <section
                    className="project-slide absolute top-0 left-0 w-full h-screen flex items-center justify-center will-change-transform"
                    style={{
                        zIndex: photos.length + 1,
                        backgroundColor: "transparent",
                    }}
                >
                    <div
                        className="glass-card"
                        style={{
                            width: "85vw",
                            maxWidth: "1200px",
                            height: "70vh",
                            marginTop: "18vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "clamp(2rem, 4vw, 3rem) clamp(2.5rem, 5vw, 4rem)",
                            gap: "1.2rem",
                            background: glassBg,
                            backdropFilter: "blur(40px)",
                            WebkitBackdropFilter: "blur(40px)",
                            border: `1px solid ${glassBorder}`,
                            borderRadius: "30px",
                            boxShadow: `0 10px 40px ${shadowColor}`,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {!signed ? (
                            <>
                                {/* Header */}
                                <div style={{ textAlign: "center" }}>
                                    <h2
                                        style={{
                                            fontFamily: "GreatVibes, cursive",
                                            fontSize: "clamp(2rem, 4.5vw, 3rem)",
                                            color: textColor,
                                            margin: 0,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        The Renewal Contract 📜
                                    </h2>
                                    <p
                                        style={{
                                            fontFamily: "Transcity, system-ui",
                                            fontSize: "0.8rem",
                                            color: textColor,
                                            opacity: 0.5,
                                            letterSpacing: "0.2em",
                                            marginTop: "0.4rem",
                                        }}
                                    >
                                        DATE: FEBRUARY 21, 2026
                                    </p>
                                </div>

                                {/* Divider */}
                                <div style={{ width: "50px", height: "1px", background: `linear-gradient(to right, transparent, ${textColor}50, transparent)` }} />

                                {/* Terms */}
                                <div style={{ width: "100%", maxWidth: "800px" }}>
                                    <p style={{ fontFamily: "Transcity, system-ui", fontSize: "clamp(0.85rem, 1.8vw, 1rem)", color: textColor, textAlign: "center", marginBottom: "0.8rem", letterSpacing: "0.08em", opacity: 0.9 }}>
                                        Mutual Terms of Commitment:
                                    </p>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                                        {[
                                            { emoji: "🤝", text: "The Honesty Pact — We agree to always tell the truth and trust each other completely—no secrets, no shadows." },
                                            { emoji: "💍", text: "The Loyalty Vow — An absolute commitment to exclusivity. No cheating, never. It is us against the world." },
                                            { emoji: "🕊️", text: "The Peace Treaty — We promise to never let anger break us. If we fight, we resolve it together; it is always Us vs. The Problem." },
                                            { emoji: "❤️", text: "The Sanctuary Support — We vow to be each other\u0027s safe harbor and biggest fans, supporting every dream and celebrating every win." },
                                            { emoji: "✨", text: "The Forever Vow — You agree to be loved, cherished, and chosen by me and only me every single day for another 365 days (and beyond)." },
                                        ].map((t, i) => (
                                            <li key={i} style={{ fontFamily: "Transcity, system-ui", fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)", color: textColor, lineHeight: 1.6, letterSpacing: "0.04em", opacity: 0.85 }}>
                                                <span style={{ marginRight: "0.5rem" }}>{t.emoji}</span>{t.text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Buttons */}
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", position: "relative", minHeight: "70px", width: "100%" }}>
                                    <button
                                        onClick={fireConfetti}
                                        style={{
                                            padding: "12px 32px",
                                            borderRadius: "50px",
                                            border: "none",
                                            fontSize: "0.95rem",
                                            fontWeight: 700,
                                            fontFamily: "Transcity, system-ui",
                                            letterSpacing: "0.1em",
                                            cursor: "pointer",
                                            background: textColor,
                                            color: isDark ? "#000" : "#fff",
                                            boxShadow: `0 4px 20px ${textColor}40`,
                                            zIndex: 2,
                                            transition: "transform 0.2s",
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                                    >
                                        Yes, I Agree 💖
                                    </button>

                                    {/* Runaway No */}
                                    <button
                                        onMouseEnter={moveNoButton}
                                        onTouchStart={moveNoButton}
                                        style={{
                                            padding: "12px 32px",
                                            borderRadius: "50px",
                                            border: `1px solid ${glassBorder}`,
                                            fontSize: "0.95rem",
                                            fontWeight: 600,
                                            fontFamily: "Transcity, system-ui",
                                            letterSpacing: "0.1em",
                                            cursor: "pointer",
                                            background: "rgba(255, 255, 255, 0.08)",
                                            color: textColor,
                                            zIndex: 1,
                                            position: "relative",
                                            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                                            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                        }}
                                    >
                                        No
                                    </button>
                                </div>

                                {noMoves >= 3 && (
                                    <p style={{ fontFamily: "Transcity, system-ui", fontSize: "0.7rem", color: textColor, letterSpacing: "0.15em", textAlign: "center", opacity: 0.5 }}>
                                        {noMoves >= 6 ? "NICE TRY... THERE IS ONLY ONE OPTION 😏" : "THAT BUTTON SEEMS SHY..."}
                                    </p>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
                                <div style={{ fontSize: "3.5rem" }}>💖</div>
                                <h2 style={{ fontFamily: "GreatVibes, cursive", fontSize: "clamp(2rem, 4.5vw, 3rem)", color: textColor, margin: 0 }}>
                                    Contract Signed!
                                </h2>
                                <p style={{ fontFamily: "Transcity, system-ui", fontSize: "clamp(0.85rem, 1.8vw, 1rem)", color: textColor, opacity: 0.8, letterSpacing: "0.1em", lineHeight: 1.6 }}>
                                    You&apos;re officially stuck with me for another year ~ Forever.
                                    <br />No refunds. No exchanges. Only love. 💕
                                </p>
                                <div style={{ width: "40px", height: "1px", background: `linear-gradient(to right, transparent, ${textColor}50, transparent)`, margin: "0.3rem 0" }} />
                                <p style={{ fontFamily: "GreatVibes, cursive", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: textColor, opacity: 0.9 }}>
                                    I Love You Dhula to the moon and back 🌙
                                </p>
                                <p style={{ fontFamily: "GreatVibes, cursive", fontSize: "1.4rem", color: textColor, opacity: 0.7 }}>
                                    — Jaydev
                                </p>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
}
