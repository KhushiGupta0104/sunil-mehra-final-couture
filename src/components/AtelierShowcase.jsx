import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

import { WARDROBE_DATA } from "../data/wardrobeData";

const REELS = [
    { id: 1, title: "The Modern Achkan", video: WARDROBE_DATA["kurta-sets"].pieces[4].img, description: "A study of line and flow, blending traditional tailoring with lightweight silks." },
    { id: 2, title: "The Jawahar Edit", video: WARDROBE_DATA["jawahar-jackets"].pieces[0].img, description: "Bespoke styling featuring intricate floral motifs and custom brass buttons." },
    { id: 3, title: "The Festive Sherwani", video: WARDROBE_DATA["bandhagala-indo-western"].pieces[2].img, description: "Rich tone-on-tone embroidery crafted for grand celebrations." },
];

const PHOTOS = [
    { src: WARDROBE_DATA.suits.pieces[5].img, title: "Structured Collar", category: "Fabric & Fit" },
    { src: WARDROBE_DATA["kurta-sets"].pieces[5].img, title: "Handspun Weave", category: "Atelier details" },
    { src: WARDROBE_DATA["bandhagala-indo-western"].pieces[3].img, title: "Ivory Embroidery", category: "Zardozi craft" },
    { src: WARDROBE_DATA.suits.pieces[6].img, title: "Bespoke Cut", category: "Classic Tailoring" },
];

export default function AtelierShowcase() {
    const [activeReel, setActiveReel] = useState(REELS[0]);

    return (
        <section
            id="atelier-showcase"
            className="w-full bg-[var(--cream)] py-20 lg:py-32 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]"
        >
            <div className="max-w-[1500px] mx-auto w-full space-y-12">
                
                {/* Header */}
                <ScrollReveal variant="fade-up">
                    <div className="text-center md:text-left pb-4 border-b border-[var(--hairline)]">
                        <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-2">
                            Maison Features & Focus
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-[var(--ink)]">
                            The <span className="font-italic-serif italic">Atelier Showcase.</span>
                        </h2>
                        <p className="font-italic-serif text-sm text-[var(--muted)] mt-2">
                            Interactive display featuring fluid silks and detailed stitch-work.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Main Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left: Video Showcase Panel */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black border border-[var(--hairline)] shadow-md group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeReel.id}
                                    src={activeReel.video}
                                    alt={activeReel.title}
                                    loading="lazy"
                                    decoding="async"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover object-top"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                        </div>

                        {/* Video selector tabs */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                {REELS.map((reel) => (
                                    <button
                                        key={reel.id}
                                        onClick={() => setActiveReel(reel)}
                                        className={`py-3 px-4 text-left border transition-all duration-300 ${
                                            activeReel.id === reel.id
                                                ? "border-[var(--bronze)] bg-[var(--bone)] text-[var(--ink)]"
                                                : "border-[var(--hairline)] bg-transparent text-[var(--ink-soft)] hover:border-[var(--ink-soft)]"
                                        }`}
                                    >
                                        <span className="font-luxe text-[8px] uppercase tracking-widest block mb-1">
                                            Reel 0{reel.id}
                                        </span>
                                        <span className="font-display text-xs font-medium block truncate">
                                            {reel.title}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div className="bg-[var(--bone)] p-4 border border-[var(--hairline)]">
                                <p className="font-italic-serif text-sm text-[var(--ink)] italic">
                                    {activeReel.title}
                                </p>
                                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                                    {activeReel.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Fine Details Photo Grid */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                        {PHOTOS.map((photo, idx) => (
                            <div
                                key={idx}
                                className="group relative overflow-hidden aspect-[4/5] bg-[var(--bone)] border border-[var(--hairline)] shadow-sm"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
                                    <span className="font-luxe text-[8px] uppercase tracking-[0.2em] text-[var(--champagne)]">
                                        {photo.category}
                                    </span>
                                    <h4 className="font-display text-white text-xs uppercase tracking-wider mt-0.5">
                                        {photo.title}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
