"use client";

import { useEffect, useState } from "react";

const target = new Date("2026-02-20T18:30:00Z").getTime();

export default function Countdown() {
    const [time, setTime] = useState(target - Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(target - Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (time <= 0) {
        return <p className="mt-8 text-xl">💖 It’s Our Anniversary 💖</p>;
    }

    const d = Math.floor(time / (1000 * 60 * 60 * 24));
    const h = Math.floor((time / (1000 * 60 * 60)) % 24);
    const m = Math.floor((time / (1000 * 60)) % 60);
    const s = Math.floor((time / 1000) % 60);

    return (
        <div className="mt-8 text-2xl font-mono">
            {d}d {h}h {m}m {s}s 💓
        </div>
    );
}
