"use client";

import { useEffect, useRef } from "react";

type Heart = {
    x: number;
    y: number;
    speed: number;
    size: number;
    drift: number;
};

export default function FloatingHearts() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heartsRef = useRef<Heart[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    /* ---------- INIT HEARTS ---------- */
    useEffect(() => {
        const HEART_COUNT = 28;

        heartsRef.current = Array.from({ length: HEART_COUNT }).map(() =>
            createHeart()
        );

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", onMouseMove);
        rafRef.current = requestAnimationFrame(update);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    /* ---------- CREATE SINGLE HEART ---------- */
    function createHeart(): Heart {
        return {
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + Math.random() * 600,
            speed: (0.3 + Math.random() * 0.4) * 1.1,
            size: 22 + Math.random() * 16,
            drift: (Math.random() - 0.5) * 0.6
        };
    }

    /* ---------- UPDATE LOOP ---------- */
    function update() {
        const hearts = heartsRef.current;
        const mouse = mouseRef.current;

        hearts.forEach((heart) => {
            // Float upward
            heart.y -= heart.speed;

            // Gentle horizontal drift
            heart.x += heart.drift;

            // Balanced magnetism (middle ground)
            const dx = mouse.x - heart.x;
            const dy = mouse.y - heart.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 230) {
                heart.x += dx * 0.007;
                heart.y += dy * 0.007;
            }

            // Individual continuous respawn
            if (heart.y < -120) {
                Object.assign(heart, createHeart());
            }
        });

        // Apply to DOM
        if (containerRef.current) {
            const children = containerRef.current.children;
            hearts.forEach((heart, i) => {
                const el = children[i] as HTMLElement;
                el.style.transform = `translate(${heart.x}px, ${heart.y}px)`;
                el.style.fontSize = `${heart.size}px`;
            });
        }

        rafRef.current = requestAnimationFrame(update);
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        >
            {Array.from({ length: heartsRef.current.length || 28 }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        opacity: 0.5,
                        willChange: "transform"
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
}
