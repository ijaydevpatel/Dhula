"use client";

import { motion } from "framer-motion";

export default function AnniversaryPage() {
    return (
        <motion.main
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center px-6"
        >
            <div className="max-w-3xl text-center">
                <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
                    One Year of Us 💖
                </h1>

                <p className="text-lg md:text-xl leading-relaxed opacity-80">
                    One year ago, we chose each other.
                    <br />
                    And I’d make that choice again —
                    <br />
                    every single day.
                </p>
            </div>
        </motion.main>
    );
}
