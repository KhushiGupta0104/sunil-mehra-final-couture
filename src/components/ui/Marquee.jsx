import React from "react";

const ITEMS = Array(2).fill([
    "Sunil Mehra",
    "Couture 2025",
    "Made by hand",
    "Est. 1984",
    "The Mirage Edit",
    "Hand-finished in Delhi",
]).flat();

export default function Marquee() {
    return (
        <div
            className="border-y border-[var(--hairline)] py-3.5 overflow-hidden bg-[var(--bone)]"
            data-testid="marquee-strip"
        >
            <div className="marquee-track">
                {[...ITEMS, ...ITEMS].map((t, i) => (
                    <span
                        key={i}
                        className="font-luxe text-xs tracking-[0.3em] mx-12 flex items-center gap-12 text-[var(--ink)] uppercase"
                    >
                        {t}
                        <span className="text-[var(--champagne)]">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
