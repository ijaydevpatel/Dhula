"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Floating Hearts Celebration ─── */
function FloatingHearts() {
    const hearts = useRef(
        [...Array(20)].map(() => ({
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 2,
            size: Math.random() * 20 + 14,
            emoji: ["💖", "❤️", "✨", "💕", "🥰"][Math.floor(Math.random() * 5)],
        }))
    ).current;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {hearts.map((h, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${h.left}%`,
                        bottom: "-10%",
                        fontSize: h.size,
                        animation: `rise-heart ${h.duration}s ease-out ${h.delay}s forwards`,
                        opacity: 0,
                    }}
                >
                    {h.emoji}
                </div>
            ))}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes rise-heart {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(-110vh) rotate(45deg); opacity: 0; }
                }
            `}} />
        </div>
    );
}

/* ─── Main Component ─── */
export default function RenewalAgreement() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [signed, setSigned] = useState(false);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [noMoves, setNoMoves] = useState(0);

    useEffect(() => setMounted(true), []);

    const isDark = resolvedTheme === "dark";
    const goldColor = isDark ? "#E1C699" : "#991b1b";
    const textColor = isDark ? "#fffbeb" : "#450a0a";

    const glassBg = isDark
        ? "rgba(20, 20, 20, 0.35)"
        : "rgba(255, 255, 255, 0.35)";
    const glassBorder = isDark
        ? "rgba(225, 198, 153, 0.2)"
        : "rgba(153, 27, 27, 0.2)";
    const bgGradient = isDark
        ? "radial-gradient(ellipse at center, #1a0505 0%, #000000 100%)"
        : "radial-gradient(ellipse at center, #fff5f5 0%, #ffffff 100%)";

    const moveNoButton = useCallback(() => {
        const x = (Math.random() - 0.5) * 280;
        const y = (Math.random() - 0.5) * 200;
        setNoPos({ x, y });
        setNoMoves(prev => prev + 1);
    }, []);

    const celebrate = useCallback(() => {
        setSigned(true);
    }, []);

    if (!mounted) return null;

    const terms = [
        { emoji: "🤝", text: "The Honesty Pact — We agree to always tell the truth and trust each other completely—no secrets, no shadows." },
        { emoji: "💍", text: "The Loyalty Vow — An absolute commitment to exclusivity. No cheating, never. It is us against the world." },
        { emoji: "🕊️", text: "The Peace Treaty — We promise to never let anger break us. If we fight, we resolve it together; it is always Us vs. The Problem." },
        { emoji: "❤️", text: "The Sanctuary Support — We vow to be each other\u0027s safe harbor and biggest fans, supporting every dream and celebrating every win—knowing that as we grow individually, we grow stronger together." },
        { emoji: "✨", text: "The Forever Vow — You agree to be loved, cherished, and chosen by me and only me every single day for another 365 days (and beyond)." },
    ];

    return (
        <section
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                background: bgGradient,
            }}
        >
            {/* Celebration Hearts */}
            <AnimatePresence>
                {signed && <FloatingHearts />}
            </AnimatePresence>

            {/* Glass Card */}
            <div
                style={{
                    background: glassBg,
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: `1px solid ${glassBorder}`,
                    borderRadius: "30px",
                    padding: "clamp(2rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem)",
                    width: "85vw",
                    maxWidth: "1200px",
                    height: "70vh",
                    marginTop: "18vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                    boxShadow: isDark
                        ? "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)"
                        : "0 8px 40px rgba(153,27,27,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {!signed ? (
                    <>
                        {/* Header */}
                        <div style={{ textAlign: "center" }}>
                            <h2
                                style={{
                                    fontFamily: "GreatVibes, cursive",
                                    fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                                    color: goldColor,
                                    margin: 0,
                                    lineHeight: 1.2,
                                }}
                            >
                                The Renewal Contract 📜
                            </h2>
                            <p
                                style={{
                                    fontFamily: "Transcity, system-ui",
                                    fontSize: "0.85rem",
                                    color: goldColor,
                                    opacity: 0.6,
                                    letterSpacing: "0.2em",
                                    marginTop: "0.5rem",
                                }}
                            >
                                DATE: FEBRUARY 21, 2026
                            </p>
                        </div>

                        {/* Decorative Line */}
                        <div
                            style={{
                                width: "60px",
                                height: "1px",
                                background: `linear-gradient(to right, transparent, ${goldColor}60, transparent)`,
                            }}
                        />

                        {/* Terms */}
                        <div style={{ width: "100%" }}>
                            <p
                                style={{
                                    fontFamily: "Transcity, system-ui",
                                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                                    color: textColor,
                                    textAlign: "center",
                                    marginBottom: "1.2rem",
                                    letterSpacing: "0.08em",
                                    opacity: 0.9,
                                }}
                            >
                                Mutual Terms of Commitment:
                            </p>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.9rem",
                                }}
                            >
                                {terms.map((t, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        style={{
                                            fontFamily: "Transcity, system-ui",
                                            fontSize: "clamp(0.88rem, 1.8vw, 1.05rem)",
                                            color: textColor,
                                            lineHeight: 1.7,
                                            letterSpacing: "0.05em",
                                            opacity: 0.85,
                                        }}
                                    >
                                        <span style={{ marginRight: "0.6rem" }}>{t.emoji}</span>
                                        {t.text}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* Buttons */}
                        <div
                            style={{
                                display: "flex",
                                gap: "1.2rem",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                minHeight: "80px",
                                width: "100%",
                                marginTop: "0.5rem",
                            }}
                        >
                            {/* Yes Button */}
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={celebrate}
                                style={{
                                    padding: "14px 36px",
                                    borderRadius: "50px",
                                    border: "none",
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    fontFamily: "Transcity, system-ui",
                                    letterSpacing: "0.1em",
                                    cursor: "pointer",
                                    background: goldColor,
                                    color: isDark ? "#000" : "#fff",
                                    boxShadow: `0 4px 20px ${goldColor}40`,
                                    zIndex: 2,
                                }}
                            >
                                Yes, I Agree 💖
                            </motion.button>

                            {/* Runaway No Button */}
                            <motion.button
                                animate={{
                                    x: noPos.x,
                                    y: noPos.y,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                onMouseEnter={moveNoButton}
                                onTouchStart={moveNoButton}
                                style={{
                                    padding: "14px 36px",
                                    borderRadius: "50px",
                                    border: `1px solid ${glassBorder}`,
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                    fontFamily: "Transcity, system-ui",
                                    letterSpacing: "0.1em",
                                    cursor: "pointer",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    color: goldColor,
                                    zIndex: 1,
                                    position: "relative",
                                }}
                            >
                                No
                            </motion.button>
                        </div>

                        {/* Sneaky hint after multiple moves */}
                        <AnimatePresence>
                            {noMoves >= 3 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    style={{
                                        fontFamily: "Transcity, system-ui",
                                        fontSize: "0.75rem",
                                        color: goldColor,
                                        letterSpacing: "0.15em",
                                        textAlign: "center",
                                    }}
                                >
                                    {noMoves >= 6
                                        ? "NICE TRY... THERE IS ONLY ONE OPTION 😏"
                                        : "THAT BUTTON SEEMS SHY..."}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    /* ─── Celebration State ─── */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1.5rem",
                            padding: "1rem 0",
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: 2 }}
                            style={{ fontSize: "4rem" }}
                        >
                            💖
                        </motion.div>
                        <h2
                            style={{
                                fontFamily: "GreatVibes, cursive",
                                fontSize: "clamp(2rem, 5vw, 3rem)",
                                color: goldColor,
                                margin: 0,
                            }}
                        >
                            Contract Signed!
                        </h2>
                        <p
                            style={{
                                fontFamily: "Transcity, system-ui",
                                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                                color: textColor,
                                opacity: 0.8,
                                letterSpacing: "0.1em",
                                lineHeight: 1.6,
                            }}
                        >
                            You&apos;re officially stuck with me for another year ~ Forever.
                            <br />
                            No refunds. No exchanges. Only love. 💕
                        </p>
                        <div
                            style={{
                                width: "40px",
                                height: "1px",
                                background: `linear-gradient(to right, transparent, ${goldColor}60, transparent)`,
                                margin: "0.5rem 0",
                            }}
                        />
                        <p
                            style={{
                                fontFamily: "GreatVibes, cursive",
                                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                                color: goldColor,
                                opacity: 0.9,
                                lineHeight: 1.5,
                            }}
                        >
                            I Love You Dhula to the moon and back 🌙
                        </p>
                        <p
                            style={{
                                fontFamily: "GreatVibes, cursive",
                                fontSize: "1.6rem",
                                color: goldColor,
                                opacity: 0.7,
                            }}
                        >
                            — Jaydev
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
