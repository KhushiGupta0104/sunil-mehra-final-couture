import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

// Import cover images
import bandhaglaCover from "@/assets/images/Bandhagla/sunil_mehra_0738.jpg";
import kurtaCover from "@/assets/images/KurtaSets/sunil_mehra_0711.jpg";
import jacketCover from "@/assets/images/Sunil Mehra_6586 - Copy.jpg";
import img8657 from "@/assets/images/IMG8657 copy.jpg";
import winterCover from "@/assets/images/Sunil Mehra 0932.jpg";
import accessoryCover from "@/assets/images/Accessories/Bags/Sunil Mehra_7074.jpg";

const CATEGORIES = [
    {
        no: "01",
        edit: "Tailored Royalty",
        name: "Bandhagla & Indo-Western",
        slug: "bandhagala-indo-western",
        img: bandhaglaCover,
        pieces: 87,
    },
    {
        no: "02",
        edit: "Sharply Cut",
        name: "Sartorial Suits",
        slug: "suits",
        img: img8657,
        pieces: 187,
    },
    {
        no: "03",
        edit: "Quiet Luxury",
        name: "Kurta Sets",
        slug: "kurta-sets",
        img: kurtaCover,
        pieces: 23,
    },
    {
        no: "04",
        edit: "Modern Maharaja",
        name: "Jawahar Jacket Sets",
        slug: "jawahar-jackets",
        img: jacketCover,
        pieces: 17,
    },
    {
        no: "05",
        edit: "Princely Silhouettes",
        name: "Winter Collection",
        slug: "winter-collection",
        img: winterCover,
        pieces: 21,
    },
    {
        no: "06",
        edit: "Finishing Details",
        name: "Accessories",
        slug: "accessories",
        img: accessoryCover,
        pieces: 40,
    },
];

function CategoryCard({ c, size = "regular" }) {
    const isLarge = size === "large";

    return (
        <Link
            to={`/wardrobe/${c.slug}`}
            className="cat-card group block w-full relative overflow-hidden"
            data-testid={`wardrobe-card-${c.slug}`}
        >
            <div className={`relative w-full overflow-hidden ${isLarge ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[3/4]"}`}>
                <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-700" />

                {/* Chapter number */}
                <span className="absolute top-6 right-6 font-display text-xl lg:text-2xl text-[var(--bone)] opacity-40 group-hover:opacity-80 transition-opacity duration-500">
                    {c.no}
                </span>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-[var(--bone)] transform translate-y-1 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="font-italic-serif text-sm sm:text-base opacity-80 mb-1">
                        {c.edit}
                    </p>
                    <h3 className={`h-display leading-tight ${isLarge ? "text-2xl sm:text-3xl lg:text-4xl" : "text-xl sm:text-2xl lg:text-3xl"}`}>
                        {c.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="w-6 h-px bg-[var(--champagne)]" />
                        <span className="font-luxe text-[9px] uppercase tracking-[0.25em] text-[var(--champagne)]">
                            {c.pieces} Pieces
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Wardrobe() {
    return (
        <>
            {/* ═══ CINEMATIC HERO ═══ */}
            <section
                className="relative bg-black text-[var(--bone)] h-[70vh] sm:h-[80vh] w-full flex flex-col overflow-hidden"
                data-testid="wardrobe-hero"
            >
                {/* Background image */}
                <div className="absolute inset-0">
                    <img
                        src={bandhaglaCover}
                        alt="The Wardrobe — Sunil Mehra"
                        className="w-full h-full object-cover object-top ken-burns-slow"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-[1]" />
                <div className="grain z-[2]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="font-luxe text-[10px] uppercase tracking-[0.5em] text-[var(--champagne)] opacity-80">
                            Six Chapters of Couture
                        </span>
                        <h1 className="h-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none">
                            The <span className="font-italic-serif italic">Wardrobe</span>
                        </h1>
                        <p className="font-italic-serif text-base sm:text-lg text-[var(--bone)] opacity-60 max-w-md mt-2">
                            Cut for the modern maharaja — hand-finished garments across six defining silhouettes.
                        </p>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
                >
                    <span className="font-luxe text-[8px] uppercase tracking-[0.4em] text-[var(--bone)] opacity-40">
                        Explore
                    </span>
                    <div className="scroll-indicator">
                        <svg width="14" height="20" viewBox="0 0 16 24" fill="none" className="text-[var(--bone)] opacity-30">
                            <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </motion.div>
            </section>

            {/* ═══ UNIFIED CATEGORY GRID ═══ */}
            <section
                id="wardrobe"
                className="relative bg-[var(--bone)] text-[var(--ink)] py-16 sm:py-20 lg:py-28 px-6 sm:px-10 lg:px-14"
                data-testid="wardrobe-section"
            >
                <div className="max-w-[1500px] mx-auto w-full">
                    {/* Section header */}
                    <ScrollReveal variant="fade-up" className="mb-12 sm:mb-16">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-[var(--hairline)]">
                            <div>
                                <span className="eyebrow block mb-3">The Collection</span>
                                <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl">
                                    Six Chapters
                                </h2>
                            </div>
                            <p className="font-italic-serif text-sm sm:text-base text-[var(--muted)] max-w-sm">
                                From tailored bandhgalas to refined accessories — each chapter is a world unto itself.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Grid — 2 large heroes + 4 regular */}
                    <StaggerReveal staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                        {/* First 2 categories: large, spanning 2 columns each */}
                        {CATEGORIES.slice(0, 2).map((c) => (
                            <StaggerItem key={c.no} variant="fade-up" className="lg:col-span-2">
                                <CategoryCard c={c} size="large" />
                            </StaggerItem>
                        ))}

                        {/* Remaining 4 categories: regular single column */}
                        {CATEGORIES.slice(2).map((c) => (
                            <StaggerItem key={c.no} variant="fade-up" className="lg:col-span-1">
                                <CategoryCard c={c} size="regular" />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>

                    {/* Bottom appointment CTA */}
                    <ScrollReveal variant="fade-up" delay={0.2}>
                        <div className="mt-20 sm:mt-28 lg:mt-36 border-t border-[var(--hairline)] pt-14 text-center max-w-xl mx-auto space-y-5">
                            <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                                Tailored for your presence.
                            </h3>
                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light font-body max-w-md mx-auto">
                                Experience our signature fits and consult fabric swatches directly with our tailoring concierges at our Sundar Nagar Salon.
                            </p>
                            <div className="pt-3">
                                <Link
                                    to="/appointment"
                                    className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] px-10 py-4 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                                >
                                    Request Fitting Appointment
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
