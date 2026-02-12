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

    // METADATA UPDATE EFFECT
    useEffect(() => {
        if (isAnniversary) {
            document.title = "Future Mrs. Patel";
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            (link as HTMLLinkElement).type = 'image/svg+xml';
            (link as HTMLLinkElement).rel = 'icon';
            (link as HTMLLinkElement).href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💍</text></svg>";
            document.head.appendChild(link);
        } else {
            // Revert/Ensure default (Valentine)
            document.title = "You’re Stuck ♡";
            const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            (link as HTMLLinkElement).type = 'image/svg+xml';
            (link as HTMLLinkElement).rel = 'icon';
            (link as HTMLLinkElement).href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧸</text></svg>";
            document.head.appendChild(link);
        }
    }, [isAnniversary]);

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