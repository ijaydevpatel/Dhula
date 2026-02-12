import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import FloatingHearts from "./components/FloatingHearts";
import { ThemeProvider } from "next-themes";

export const metadata = {
    title: "You’re Stuck ♡",
    description: "Valentine & Anniversary",
    icons: {
        icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧸</text></svg>"
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen overflow-x-hidden relative bg-white dark:bg-[#070b1a] transition-colors duration-500">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* 1. PAGE CONTENT (Higher Layer) */}
                    <div className="relative z-10">
                        {children}
                    </div>

                    {/* 2. GLOBAL FLOATING HEARTS (Lower Layer) */}
                    <div className="fixed inset-0 z-0 pointer-events-none">
                        <FloatingHearts />
                    </div>

                    {/* 3. THEME TOGGLE (Absolute Top Layer) */}
                    <ThemeToggle />
                </ThemeProvider>
            </body>
        </html>
    );
}