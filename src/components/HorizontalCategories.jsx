import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

import weddingImg from "@/assets/images/Bandhagla/img9702_copy.jpg";
import bandhaglaImg from "@/assets/images/Bandhagla/sunil_mehra_0738.jpg";
import indoWesternImg from "@/assets/images/Bandhagla/sunil_mehra_1043.jpg";
import nehruImg from "@/assets/images/Sunil Mehra_6586 - Copy.jpg";
import suitImg from "@/assets/images/IMG8657 copy.jpg";
import kurtaImg from "@/assets/images/KurtaSets/sunil_mehra_0711.jpg";

const CATEGORIES = [
    { id: "wedding", name: "Wedding & Ceremonial", slug: "bandhagala-indo-western", img: weddingImg, count: "01", tagline: "For the grand celebration" },
    { id: "bandhagla", name: "Bandhgala", slug: "bandhagala-indo-western", img: bandhaglaImg, count: "02", tagline: "The royal silhouette" },
    { id: "indo-western", name: "Indo-Western", slug: "bandhagala-indo-western", img: indoWesternImg, count: "03", tagline: "Blending heritage and modernity" },
    { id: "nehru-jackets", name: "Nehru Jackets", slug: "jawahar-jackets", img: nehruImg, count: "04", tagline: "Atelier tailored accents" },
    { id: "suits", name: "Suits", slug: "suits", img: suitImg, count: "05", tagline: "Sharp, bespoke cuts" },
    { id: "kurtas", name: "Kurtas & Ethnic", slug: "kurta-sets", img: kurtaImg, count: "06", tagline: "Quiet luxury in pure silk" },
];

export default function HorizontalCategories() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section
            id="horizontal-categories"
            className="w-full bg-[var(--ink)] text-[var(--bone)] py-16 sm:py-24"
        >
            <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 space-y-12">
                
                {/* Header */}
                <ScrollReveal variant="fade-up">
                    <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--champagne)] block mb-2">
                                Couture Classifications
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-white">
                                The <span className="font-italic-serif italic text-[var(--champagne)]">Horizontal Panels.</span>
                            </h2>
                        </div>
                        <p className="font-italic-serif text-sm text-[var(--section-dark-muted)] max-w-sm">
                            Hover over each heritage classification to reveal lookbook canvases and tailored details.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Vertical stack of horizontal hover panels */}
                <div className="w-full border-t border-white/10">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/wardrobe/${cat.slug}`}
                            className="block relative w-full overflow-hidden border-b border-white/10 group transition-all duration-700"
                            onMouseEnter={() => setHoveredId(cat.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{ height: hoveredId === cat.id ? "240px" : "90px" }}
                        >
                            {/* Background Image layer with transition */}
                            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-[2s] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
                            </div>

                            {/* Normal panel contents */}
                            <div className="relative z-10 w-full h-full flex items-center justify-between px-4 sm:px-8 py-4 transition-all duration-500">
                                <div className="flex items-center gap-6 sm:gap-12">
                                    <span className="font-display text-lg text-[var(--champagne)] opacity-60 group-hover:opacity-100 transition-opacity">
                                        {cat.count}
                                    </span>
                                    <div>
                                        <h3 className="font-display text-lg sm:text-2xl uppercase tracking-wider text-white">
                                            {cat.name}
                                        </h3>
                                        <p className="font-italic-serif text-xs sm:text-sm text-[var(--section-dark-muted)] mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            {cat.tagline}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="font-luxe text-[9px] uppercase tracking-[0.25em] text-[var(--champagne)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Explore Collection
                                    </span>
                                    <span className="font-display text-lg text-[var(--champagne)] transform group-hover:translate-x-2 transition-transform duration-500">
                                        →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
