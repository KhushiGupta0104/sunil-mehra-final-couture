import React from "react";
import { motion } from "framer-motion";
import coverImg from "@/assets/images/cover.jpg";

export default function Hero() {
    const brandName = "SUNIL MEHRA";
    const letters = brandName.split("");

    return (
        <section
            className="relative bg-black text-[var(--bone)] h-screen w-full flex flex-col overflow-hidden"
            data-testid="hero-section"
        >
            {/* Full-bleed image with Ken Burns */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    src="/cover.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: "center top" }}
                    data-testid="hero-video"
                />
            </div>

            {/* Gradient overlay — heavier at bottom for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-[1]" />

            {/* Enhanced grain */}
            <div className="grain z-[2]" />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-4"
                >
                    <h1 className="h-display text-4xl sm:text-6xl lg:text-7xl xl:text-[8vw] leading-none tracking-[-0.02em] text-[var(--bone)]">
                        {letters.map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.8 + index * 0.05,
                                    ease: [0.2, 0.65, 0.3, 0.9],
                                }}
                                className="inline-block"
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 1.8 }}
                        className="font-italic-serif text-lg sm:text-xl lg:text-2xl text-[var(--champagne)] mt-2"
                    >
                        Master Tailors & Purveyors of Luxury
                    </motion.p>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
            >
                <span className="font-luxe text-[8px] uppercase tracking-[0.4em] text-[var(--bone)] opacity-50">
                    Scroll
                </span>
                <div className="scroll-indicator">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-[var(--bone)] opacity-40">
                        <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
