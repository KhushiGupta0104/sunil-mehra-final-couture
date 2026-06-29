import React from "react";
import { motion } from "framer-motion";
import coverImg from "@/assets/images/hero_pic_123_compressed.jpg";

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
                <img
                    src={coverImg}
                    alt="Sunil Mehra"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ objectPosition: "center 30%" }}
                    data-testid="hero-image"
                />
            </div>

            {/* Subtle gradient overlay for navbar and scroll indicator contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-[1] pointer-events-none" />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pointer-events-none">
                {/* Text removed per user request */}
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
