import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

import faisalImg from "@/assets/images/faisal_sheikh.png";
import shaanImg from "@/assets/images/shaan_mukherji.png";
import shantanuImg from "@/assets/images/shantanu_maheshwari.png";
import ammyImg from "@/assets/images/ammy_virk.png";
import shreyasImg from "@/assets/images/shreyas_talpade.png";

const CELEBRITIES = [
    {
        id: 1,
        src: faisalImg,
        celebrity: "Faisal Sheikh",
        tag: "@mr_faisu_07",
        caption: "Cream pinstriped double-breasted suit with a fuchsia silk shirt.",
        occasion: "Influencer",
        instagramUrl: "https://www.instagram.com/mr_faisu_07/",
    },
    {
        id: 2,
        src: shaanImg,
        celebrity: "Shaan",
        tag: "@shaanmusic",
        caption: "Bespoke pastel pink embroidered suit paired with a crisp white tee.",
        occasion: "Singer & Composer",
        instagramUrl: "https://www.instagram.com/shaanmusic/",
    },
    {
        id: 3,
        src: shantanuImg,
        celebrity: "Shantanu Maheshwari",
        tag: "@shantanu.maheshwari",
        caption: "Custom lavender suit set paired with signature sneakers.",
        occasion: "Actor & Dancer",
        instagramUrl: "https://www.instagram.com/shantanu.maheshwari/",
    },
    {
        id: 4,
        src: ammyImg,
        celebrity: "Ammy Virk",
        tag: "@ammyvirk",
        caption: "Snakeskin textured blazer with contrast black lapels.",
        occasion: "Singer & Actor",
        instagramUrl: "https://www.instagram.com/ammyvirk/",
    },
    {
        id: 5,
        src: shreyasImg,
        celebrity: "Shreyas Talpade",
        tag: "@shreyastalpade27",
        caption: "Black bandhgala suit embellished with colorful floral motifs.",
        occasion: "Actor & Filmmaker",
        instagramUrl: "https://www.instagram.com/shreyastalpade27/",
    },
];

export default function Gallery() {
    const [hoveredCeleb, setHoveredCeleb] = useState(CELEBRITIES[0]);

    return (
        <section
            id="gallery"
            className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col py-24 lg:py-32 overflow-hidden border-t border-[var(--hairline)]"
            data-testid="gallery-section"
        >
            <div className="grain opacity-50" />

            <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10 flex flex-col">
                
                {/* Header */}
                <ScrollReveal variant="fade-up" className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
                    <div>
                        <span className="eyebrow block mb-4">Friends of the House</span>
                        <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-[var(--ink)]">
                            The <span className="font-italic-serif italic">Society.</span>
                        </h2>
                    </div>
                    <p className="font-italic-serif text-sm text-[var(--ink-soft)] max-w-xs md:text-right">
                        A curated archive of visionaries and artists spotted in bespoke Sunil Mehra creations.
                    </p>
                </ScrollReveal>

                {/* Main Interactive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative">
                    
                    {/* Left: The List (Desktop) & Accordion (Mobile) */}
                    <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-1 relative z-20">
                        {CELEBRITIES.map((celeb, idx) => (
                            <div 
                                key={celeb.id}
                                className="group relative border-b border-[var(--hairline)] pb-6 lg:pb-0 lg:border-none"
                                onMouseEnter={() => setHoveredCeleb(celeb)}
                            >
                                {/* Desktop List Item */}
                                <div className="hidden lg:flex items-center gap-6 py-6 cursor-pointer transition-all duration-500 hover:pl-6 border-b border-[var(--hairline)]">
                                    <span className={`font-luxe text-xs uppercase tracking-widest transition-colors duration-500 w-8 ${hoveredCeleb?.id === celeb.id ? 'text-[var(--bronze)]' : 'text-[var(--muted)]'}`}>
                                        0{idx + 1}
                                    </span>
                                    <h3 className={`font-display text-3xl xl:text-5xl tracking-tight uppercase transition-colors duration-500 ${hoveredCeleb?.id === celeb.id ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                                        {celeb.celebrity}
                                    </h3>
                                </div>

                                {/* Mobile Accordion/Card Item */}
                                <div className="lg:hidden flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-display text-3xl sm:text-4xl uppercase text-[var(--ink)]">
                                            {celeb.celebrity}
                                        </h3>
                                        <span className="font-luxe text-[9px] uppercase tracking-widest text-[var(--bronze)]">
                                            0{idx + 1}
                                        </span>
                                    </div>
                                    
                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--ink)]">
                                        <img 
                                            src={celeb.src} 
                                            alt={celeb.celebrity}
                                            loading="lazy"
                                            className="w-full h-full object-cover grayscale contrast-125 brightness-90 sepia-[0.1]"
                                        />
                                    </div>
                                    
                                    <div>
                                        <p className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
                                            {celeb.occasion}
                                        </p>
                                        <p className="font-italic-serif text-sm text-[var(--ink-soft)] leading-relaxed">
                                            {celeb.caption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: The Static Image Container (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-5 lg:col-start-8 relative lg:sticky lg:top-[20vh]">
                        <div className="relative w-full max-w-[450px] ml-auto aspect-[3/4] overflow-hidden bg-[var(--ink)] border border-[var(--hairline)] shadow-xl">
                            <AnimatePresence mode="wait">
                                {hoveredCeleb && (
                                    <motion.div
                                        key={hoveredCeleb.id}
                                        initial={{ opacity: 0, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <img
                                            src={hoveredCeleb.src}
                                            alt={hoveredCeleb.celebrity}
                                            className="w-full h-full object-cover grayscale contrast-125 brightness-90 sepia-[0.1]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                                        
                                        <div className="absolute bottom-8 left-8 right-8">
                                            <p className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--champagne)] mb-3">
                                                {hoveredCeleb.occasion}
                                            </p>
                                            <p className="font-italic-serif text-sm text-[var(--bone)] leading-relaxed opacity-90">
                                                {hoveredCeleb.caption}
                                            </p>
                                            <a 
                                                href={hoveredCeleb.instagramUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block mt-4 font-luxe text-[8px] uppercase tracking-[0.3em] text-[var(--bone)] border-b border-[var(--bone)] pb-1 hover:text-[var(--champagne)] hover:border-[var(--champagne)] transition-colors"
                                            >
                                                {hoveredCeleb.tag}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
