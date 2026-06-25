import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

import img1512 from "@/assets/images/Sunil Mehra  1512.jpg";
import img1701 from "@/assets/images/Sunil Mehra  1701.jpg";
import img1737 from "@/assets/images/Sunil Mehra  1737.jpg";
import img1867 from "@/assets/images/Sunil Mehra  1867.jpg";

const REELS = [
    { id: 1, title: "The Modern Achkan", video: "/REEL 3 SM C2.mp4", description: "A study of line and flow, blending traditional tailoring with lightweight silks." },
    { id: 2, title: "The Jawahar Edit", video: "/REEL 7 SM C2.mp4", description: "Bespoke styling featuring intricate floral motifs and custom brass buttons." },
    { id: 3, title: "The Festive Sherwani", video: "/REEL 10 SM C2.mp4", description: "Rich tone-on-tone embroidery crafted for grand celebrations." },
];

const PHOTOS = [
    { src: img1512, title: "Structured Collar", category: "Fabric & Fit" },
    { src: img1701, title: "Handspun Weave", category: "Atelier details" },
    { src: img1737, title: "Ivory Embroidery", category: "Zardozi craft" },
    { src: img1867, title: "Bespoke Cut", category: "Classic Tailoring" },
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
                            Maison Reels & Focus
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-[var(--ink)]">
                            The <span className="font-italic-serif italic">Atelier Showcase.</span>
                        </h2>
                        <p className="font-italic-serif text-sm text-[var(--muted)] mt-2">
                            Interactive display featuring fluid silks, detailed stitch-work, and runway presentations.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Main Split Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left: Video Showcase Panel */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black border border-[var(--hairline)] shadow-md group">
                            <AnimatePresence mode="wait">
                                <motion.video
                                    key={activeReel.id}
                                    src={activeReel.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-cover"
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
