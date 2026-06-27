import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

import { WARDROBE_DATA } from "@/data/wardrobeData";

const REELS = [
    { 
        id: 1, 
        title: "The Luxury Kurta", 
        video: WARDROBE_DATA["kurta-sets"].looks[1]?.coverImg, 
        description: "A study of line and flow, blending traditional tailoring with lightweight silks.",
        photos: [
            { src: WARDROBE_DATA["kurta-sets"].looks[1]?.gallery[0] || WARDROBE_DATA["kurta-sets"].looks[1]?.coverImg, title: "Structured Collar", category: "Fabric & Fit" },
            { src: WARDROBE_DATA["kurta-sets"].looks[1]?.gallery[1] || WARDROBE_DATA["kurta-sets"].looks[1]?.coverImg, title: "Handspun Weave", category: "Atelier details" }
        ]
    },
    { 
        id: 2, 
        title: "The Jawahar Edit", 
        video: WARDROBE_DATA["jawahar-jackets"].looks[0]?.coverImg, 
        description: "Bespoke styling featuring intricate floral motifs and custom brass buttons.",
        photos: [
            { src: WARDROBE_DATA["jawahar-jackets"].looks[0]?.gallery[0] || WARDROBE_DATA["jawahar-jackets"].looks[0]?.coverImg, title: "Custom Brass Buttons", category: "Hardware" },
            { src: WARDROBE_DATA["jawahar-jackets"].looks[0]?.gallery[1] || WARDROBE_DATA["jawahar-jackets"].looks[0]?.coverImg, title: "Floral Motifs", category: "Embroidery" }
        ]
    },
    { 
        id: 3, 
        title: "The Bandhgala & Sherwani", 
        video: WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.coverImg, 
        description: "Rich tone-on-tone embroidery crafted for grand celebrations.",
        photos: [
            { src: WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.gallery[0] || WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.coverImg, title: "Tone-on-tone", category: "Stitch-work" },
            { src: WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.gallery[1] || WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.coverImg, title: "Regal Drape", category: "Silhouette" }
        ]
    },
];

export default function AtelierShowcase() {
    const [activeReel, setActiveReel] = useState(REELS[0]);

    return (
        <section
            id="atelier-showcase"
            className="w-full bg-[var(--bone)] py-20 lg:py-32 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]"
        >
            <div className="max-w-[1500px] mx-auto w-full">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left: Text & Interactive Controls */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-10 order-2 lg:order-1 mt-10 lg:mt-0">
                        <ScrollReveal variant="fade-up">
                            <div>
                                <span className="font-luxe text-[10px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-3">
                                    Maison Features
                                </span>
                                <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl uppercase tracking-[0.05em] text-[var(--ink)] leading-tight">
                                    The <span className="font-italic-serif italic">Atelier</span><br /> Showcase.
                                </h2>
                                <p className="font-italic-serif text-sm text-[var(--muted)] mt-4 leading-relaxed max-w-xs">
                                    An interactive display featuring fluid silks, master tailoring, and detailed stitch-work.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Video selector tabs */}
                        <div className="flex flex-col gap-3">
                            {REELS.map((reel) => (
                                <button
                                    key={reel.id}
                                    onClick={() => setActiveReel(reel)}
                                    className={`py-4 px-5 text-left border transition-all duration-500 group relative overflow-hidden ${
                                        activeReel.id === reel.id
                                            ? "border-[var(--bronze)] bg-[var(--bone)] shadow-sm"
                                            : "border-[var(--hairline)] bg-transparent hover:border-[var(--ink-soft)]"
                                    }`}
                                >
                                    <div className="relative z-10 flex justify-between items-center">
                                        <div>
                                            <span className={`font-luxe text-[9px] uppercase tracking-widest block mb-1.5 transition-colors ${activeReel.id === reel.id ? "text-[var(--bronze)]" : "text-[var(--muted)]"}`}>
                                                Focus 0{reel.id}
                                            </span>
                                            <span className={`font-display text-sm tracking-wide transition-colors ${activeReel.id === reel.id ? "text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}>
                                                {reel.title}
                                            </span>
                                        </div>
                                        
                                        {/* Active Indicator Arrow */}
                                        <div className={`transition-all duration-500 transform ${activeReel.id === reel.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}>
                                            <svg className="w-4 h-4 text-[var(--bronze)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    {/* Description expands if active */}
                                    <div className={`relative z-10 overflow-hidden transition-all duration-500 ${activeReel.id === reel.id ? "max-h-20 mt-3 opacity-100" : "max-h-0 mt-0 opacity-0"}`}>
                                        <p className="text-[11px] text-[var(--muted)] font-body leading-relaxed max-w-[90%]">
                                            {reel.description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center: Main Feature Panel */}
                    <div className="lg:col-span-4 order-1 lg:order-2">
                        <div className="relative aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden bg-[var(--bone)] border border-[var(--hairline)] shadow-md group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeReel.id}
                                    src={activeReel.video}
                                    alt={activeReel.title}
                                    loading="lazy"
                                    decoding="async"
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full h-full object-cover object-center"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Fine Details Stack */}
                    <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-5 order-3 lg:order-3 mt-10 lg:mt-0 justify-center">
                        <AnimatePresence mode="wait">
                            {activeReel.photos.map((photo, idx) => (
                                <motion.div
                                    key={activeReel.id + "-" + idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`group relative w-full overflow-hidden bg-[var(--bone)] border border-[var(--hairline)] shadow-sm aspect-square md:aspect-[4/5]`}
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 pointer-events-none">
                                        <span className="font-luxe text-[9px] uppercase tracking-[0.25em] text-[var(--champagne)] mb-1">
                                            {photo.category}
                                        </span>
                                        <h4 className="font-display text-white text-sm uppercase tracking-wider">
                                            {photo.title}
                                        </h4>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
