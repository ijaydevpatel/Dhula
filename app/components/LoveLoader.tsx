"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
    onComplete: () => void;
};

export default function LoveLoader({ onComplete }: Props) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 700);
                    return 100;
                }
                return prev + 1;
            });
        }, 22);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: progress === 100 ? 0 : 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div className="flex flex-col items-center text-center">
                {/* LOADING */}
                <div
                    style={{
                        fontFamily: "Transcity, system-ui, sans-serif",
                        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                        letterSpacing: "0.4em",
                        opacity: 0.6,
                        marginBottom: "1.2rem"
                    }}
                >
                    Loading
                </div>

                {/* LOVE */}
                <div
                    style={{
                        fontFamily: "Transcity, system-ui, sans-serif",
                        fontSize: "clamp(7rem, 18vw, 16rem)",
                        letterSpacing: "0.06em",
                        lineHeight: 1
                    }}
                >
                    Love
                </div>

                {/* PROGRESS */}
                <div className="mt-20 w-[75%] max-w-2xl h-2 rounded-full bg-black/10 dark:bg-white/15 overflow-hidden">
                    <motion.div
                        className="h-full bg-black dark:bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                <div
                    className="mt-6 text-sm opacity-60"
                    style={{
                        fontFamily: "Transcity, system-ui, sans-serif",
                        letterSpacing: "0.25em"
                    }}
                >
                    {progress}%
                </div>
            </div>
        </motion.div>
    );
}
