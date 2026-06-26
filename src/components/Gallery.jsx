import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
    const [hoveredCeleb, setHoveredCeleb] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse Tracking for Floating Image
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        // Center the image on the cursor (assuming image is 320px x 426px)
        mouseX.set(e.clientX - 160);
        mouseY.set(e.clientY - 213);
    };

    return (
        <section
            id="gallery"
            className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col py-24 lg:py-32 overflow-hidden border-t border-[var(--hairline)]"
            data-testid="gallery-section"
            onMouseMove={handleMouseMove}
        >
            <div className="grain opacity-50" />

            {/* FLOATING CURSOR IMAGE (Desktop Only) */}
            <div className="hidden lg:block fixed top-0 left-0 w-full h-full pointer-events-none z-50">
                <AnimatePresence>
                    {isHovering && hoveredCeleb && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            style={{ x: springX, y: springY }}
                            className="absolute w-[320px] aspect-[3/4] overflow-hidden bg-[var(--ink)] shadow-2xl border border-[var(--hairline)]"
                        >
                            <img
                                src={hoveredCeleb.src}
                                alt={hoveredCeleb.celebrity}
                                className="w-full h-full object-cover grayscale contrast-125 brightness-90 sepia-[0.1]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                            
                            <div className="absolute bottom-6 left-6 right-6 text-left">
                                <p className="font-luxe text-[8px] uppercase tracking-[0.2em] text-[var(--champagne)] mb-2">
                                    {hoveredCeleb.occasion}
                                </p>
                                <p className="font-italic-serif text-xs text-[var(--bone)] leading-relaxed opacity-90">
                                    {hoveredCeleb.caption}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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
                <div className="w-full flex flex-col gap-8 lg:gap-2 relative z-20">
                    {CELEBRITIES.map((celeb, idx) => (
                        <div 
                            key={celeb.id}
                            className="group relative border-b border-[var(--hairline)] pb-8 lg:pb-0 lg:border-none"
                            onMouseEnter={() => {
                                setHoveredCeleb(celeb);
                                setIsHovering(true);
                            }}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {/* Desktop List Item */}
                            <div className="hidden lg:flex items-center justify-between py-6 cursor-pointer transition-all duration-500 hover:px-8 hover:bg-[rgba(201,180,139,0.05)] border-b border-[var(--hairline)]">
                                <div className="flex items-center gap-8">
                                    <span className={`font-luxe text-xs uppercase tracking-widest transition-colors duration-500 w-8 ${hoveredCeleb?.id === celeb.id && isHovering ? 'text-[var(--bronze)]' : 'text-[var(--muted)]'}`}>
                                        0{idx + 1}
                                    </span>
                                    <h3 className={`font-display text-5xl xl:text-7xl tracking-tight uppercase transition-colors duration-500 ${hoveredCeleb?.id === celeb.id && isHovering ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}>
                                        {celeb.celebrity}
                                    </h3>
                                </div>
                                <span className={`font-italic-serif text-lg transition-opacity duration-500 ${hoveredCeleb?.id === celeb.id && isHovering ? 'opacity-100 text-[var(--bronze)]' : 'opacity-0'}`}>
                                    View
                                </span>
                            </div>

                            {/* Mobile Accordion/Card Item */}
                            <div className="lg:hidden flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-display text-4xl sm:text-5xl uppercase text-[var(--ink)] tracking-tight">
                                        {celeb.celebrity}
                                    </h3>
                                    <span className="font-luxe text-[10px] uppercase tracking-widest text-[var(--bronze)]">
                                        0{idx + 1}
                                    </span>
                                </div>
                                
                                <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[var(--ink)] shadow-md">
                                    <img 
                                        src={celeb.src} 
                                        alt={celeb.celebrity}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale contrast-125 brightness-90 sepia-[0.1]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                                </div>
                                
                                <div>
                                    <p className="font-luxe text-[10px] uppercase tracking-[0.2em] text-[var(--bronze)] mb-2">
                                        {celeb.occasion}
                                    </p>
                                    <p className="font-italic-serif text-base text-[var(--ink-soft)] leading-relaxed">
                                        {celeb.caption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
