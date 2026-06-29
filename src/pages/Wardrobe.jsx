import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

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
        name: "Bandhagla & Indo-Western",
        slug: "bandhagala-indo-western",
        img: bandhaglaCover,
        pieces: 87,
    },
    {
        no: "02",
        name: "Sartorial Suits",
        slug: "suits",
        img: img8657,
        pieces: 187,
    },
    {
        no: "03",
        name: "Kurta Sets",
        slug: "kurta-sets",
        img: kurtaCover,
        pieces: 23,
    },
    {
        no: "04",
        name: "Jawahar Jacket Sets",
        slug: "jawahar-jackets",
        img: jacketCover,
        pieces: 17,
    },
    {
        no: "05",
        name: "Winter Collection",
        slug: "winter-collection",
        img: winterCover,
        pieces: 21,
    },
    {
        no: "06",
        name: "Accessories",
        slug: "accessories",
        img: accessoryCover,
        pieces: 40,
    },
];

function CategoryCard({ c }) {
    return (
        <Link
            to={`/wardrobe/${c.slug}`}
            className="group block w-full relative"
            data-testid={`wardrobe-card-${c.slug}`}
        >
            <div className="relative w-full overflow-hidden aspect-[3/4] bg-[var(--bone)]">
                <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-all duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
                />
            </div>
            
            {/* Decoupled Text Below Image */}
            <div className="mt-5 flex justify-between items-start">
                <div>
                    <h3 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-1">
                        {c.name}
                    </h3>
                    <p className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                        {c.no}
                    </p>
                </div>
                <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    {c.pieces} Items
                </span>
            </div>
        </Link>
    );
}

export default function Wardrobe() {
    return (
        <div className="bg-[var(--bone)] text-[var(--ink)] min-h-screen">
            {/* ═══ CINEMATIC HERO HEADER ═══ */}
            <section
                className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] w-full flex items-center justify-center overflow-hidden"
                data-testid="wardrobe-hero"
            >
                <div className="absolute inset-0 w-full h-full">
                    <img 
                        src={bandhaglaCover} 
                        alt="The Wardrobe" 
                        className="w-full h-full object-cover object-center opacity-60"
                        style={{ filter: "brightness(0.6) contrast(1.1)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/50 via-[var(--ink)]/30 to-[var(--ink)]/80 mix-blend-multiply" />
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="relative z-10 flex flex-col items-center text-center px-6 mt-16"
                >
                    <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[var(--champagne)] mb-4 sm:mb-6">
                        Six Chapters of Couture
                    </span>
                    <h1 className="h-display text-6xl sm:text-8xl lg:text-9xl text-[var(--bone)] leading-[0.95] tracking-tight mb-6 sm:mb-8">
                        The Wardrobe
                    </h1>
                    <p className="font-italic-serif text-lg sm:text-xl text-[rgba(250,246,239,0.7)] max-w-lg mx-auto italic">
                        Cut for the modern maharaja — hand-finished garments across six defining silhouettes.
                    </p>
                </motion.div>
            </section>

            {/* ═══ MINIMALIST GRID ═══ */}
            <section
                id="wardrobe"
                className="pt-20 sm:pt-32 pb-24 sm:pb-32 lg:pb-40 px-6 sm:px-10 lg:px-14"
                data-testid="wardrobe-section"
            >
                <div className="max-w-[1500px] mx-auto w-full">
                    {/* Clean 2-column grid on desktop, 1 on mobile */}
                    <StaggerReveal staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-24 lg:gap-y-32">
                        {CATEGORIES.map((c, index) => (
                            <StaggerItem 
                                key={c.no} 
                                variant="fade-up" 
                                className={`lg:col-span-1 ${index % 2 !== 0 ? 'md:mt-32' : ''}`} // Staggered layout on desktop
                            >
                                <CategoryCard c={c} />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>

                    {/* Minimal Appointment CTA */}
                    <ScrollReveal variant="fade-up" delay={0.2}>
                        <div className="mt-32 sm:mt-48 text-center max-w-md mx-auto">
                            <span className="w-px h-12 bg-[var(--hairline-strong)] mx-auto block mb-12" />
                            <Link
                                to="/appointment"
                                className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--bronze)] transition-colors"
                            >
                                Request a Fitting
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
