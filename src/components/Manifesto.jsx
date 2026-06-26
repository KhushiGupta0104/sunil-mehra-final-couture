import React from "react";

export default function Manifesto() {
    return (
        <section
            id="manifesto"
            className="relative bg-[var(--section-dark-bg)] text-[var(--bone)] py-16 sm:py-20 lg:py-24 w-full flex flex-col overflow-hidden"
            data-testid="manifesto-section"
        >
            <div className="grain" />

            {/* Subtle background texture — dark fabric feel */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(201,180,139,0.15) 0%, transparent 70%),
                                      radial-gradient(ellipse at 70% 50%, rgba(201,180,139,0.08) 0%, transparent 60%)`,
                }}
            />

            <div className="relative z-10 max-w-[1400px] mx-auto w-full flex flex-col justify-center text-center px-6 sm:px-10">
                {/* Eyebrow */}
                <p className="eyebrow !text-[var(--champagne)] justify-center mb-8 sm:mb-10">
                    The House Manifesto
                </p>

                {/* Opening quotation mark */}
                <span
                    className="text-[var(--champagne)] font-display text-5xl sm:text-6xl lg:text-7xl leading-none mb-4 select-none opacity-70"
                >
                    "
                </span>

                {/* Quote in 2 lines */}
                <div className="font-italic-serif text-[6vw] sm:text-[4.5vw] lg:text-[3vw] leading-[1.3] tracking-tight max-w-[95%] lg:max-w-5xl mx-auto flex flex-col items-center">
                    <p>We do not chase seasons. We chase silhouette, drape, and</p>
                    <p>the small architectures inside a coat that you can only feel when it is on.</p>
                </div>

                {/* Closing quotation mark */}
                <span
                    className="text-[var(--champagne)] font-display text-5xl sm:text-6xl lg:text-7xl leading-none mt-4 select-none opacity-70"
                >
                    "
                </span>

                {/* Attribution */}
                <div className="mt-10 flex items-center justify-center gap-4">
                    <span className="w-10 h-px bg-[var(--champagne)] opacity-50" />
                    <p className="font-luxe uppercase text-[10px] sm:text-[11px] tracking-[0.4em] text-[var(--bone)] opacity-70">
                        Sunil Mehra · Founder
                    </p>
                    <span className="w-10 h-px bg-[var(--champagne)] opacity-50" />
                </div>
            </div>
        </section>
    );
}
