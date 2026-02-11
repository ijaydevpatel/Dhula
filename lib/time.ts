export function isAnniversaryTime() {
    // 21 Feb 2026, 12:00 AM IST = 20 Feb 2026, 18:30 UTC
    const anniversaryUTC = new Date("2026-02-20T18:30:00Z");
    const now = new Date();
    return now >= anniversaryUTC;
}
