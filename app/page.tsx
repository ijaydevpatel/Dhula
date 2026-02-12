"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ValentineContent from "./components/ValentineContent";
import AnniversaryContent from "./components/AnniversaryContent";

function PageContent() {
    const searchParams = useSearchParams();
    const [isAnniversary, setIsAnniversary] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const checkDate = () => {
            const mode = searchParams.get("mode");

            if (mode === "valentine") {
                setIsAnniversary(false);
                return;
            }

            if (mode === "anniversary") {
                setIsAnniversary(true);
                return;
            }

            const now = new Date();
            // Target: Feb 21, 2026 00:00:00 (Midnight IST)
            const target = new Date("2026-02-21T00:00:00");

            // Check if current date is past target
            const isPastTarget = now >= target;

            setIsAnniversary(isPastTarget);
        };

        checkDate();
    }, [searchParams]);

    if (!mounted) return null;

    if (isAnniversary) {
        return <AnniversaryContent />;
    }

    return <ValentineContent />;
}

export default function Page() {
    return (
        <Suspense fallback={null}>
            <PageContent />
        </Suspense>
    );
}