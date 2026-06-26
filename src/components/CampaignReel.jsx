import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import img1 from "@/assets/images/new_content/Untitled folder/Winter Collection/Sunil Mehra 0156.jpg";
import img2 from "@/assets/images/new_content/Untitled folder/Bandhagla Sets & Indo-western/Sunil Mehra_3610.jpg";
import img3 from "@/assets/images/new_content/Untitled folder/Accessories/Bags/Sunil Mehra_6602 - Copy.jpg";
import img4 from "@/assets/images/new_content/Untitled folder/Bandhagla Sets & Indo-western/Sunil Mehra  1962.jpg";
import img5 from "@/assets/images/new_content/Untitled folder/Bandhagla Sets & Indo-western/Sunil Mehra  0738.jpg";

const REELS = [
    { id: "c1", src: img1, title: "Winter Collection", desc: "Warmth woven into every thread." },
    { id: "c2", src: img2, title: "Indo-Western", desc: "A masterful blend of cultures." },
    { id: "c3", src: img3, title: "Leather Goods", desc: "Hand-finished perfection." },
    { id: "c4", src: img4, title: "The Bandhgala", desc: "A timeless royal silhouette." },
    { id: "c5", src: img5, title: "Evening Wear", desc: "Command the room effortlessly." },
];

export default function CampaignReel() {
    const scrollRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: scrollRef });
    
    return (
        <section className="relative w-full bg-[var(--bone)] text-[var(--ink)] py-20 lg:py-32 overflow-hidden border-t border-[var(--hairline)]">
            <div className="px-6 sm:px-10 lg:px-14 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                    <span className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--bronze)] mb-3 block">
                        The Vision
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] text-[var(--ink)]">
                        Campaign <span className="font-italic-serif italic">Stills</span>
                    </h2>
                </div>
                
                {/* Scroll Progress Bar */}
                <div className="hidden sm:block w-48 h-px bg-[var(--hairline)] relative overflow-hidden mb-2">
                    <motion.div 
                        className="absolute inset-y-0 left-0 bg-[var(--bronze)]"
                        style={{ width: "100%", scaleX: scrollXProgress, transformOrigin: "left" }}
                    />
                </div>
            </div>

            {/* Horizontal Snap Scroll Container */}
            <div 
                ref={scrollRef} 
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 sm:px-10 lg:px-14 pb-12 hide-scrollbar cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {REELS.map((reel) => (
                    <div 
                        key={reel.id} 
                        className="relative flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-[35vw] snap-center sm:snap-start group"
                    >
                        {/* Image wrapper */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--bone)] border border-[var(--hairline)] shadow-sm">
                            <img 
                                src={reel.src}
                                alt={reel.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                            />
                            {/* Hover overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        
                        {/* Text Below */}
                        <div className="mt-5 flex justify-between items-baseline w-full">
                            <div>
                                <h3 className="font-luxe text-sm uppercase tracking-[0.15em] text-[var(--ink)]">
                                    {reel.title}
                                </h3>
                                <p className="font-italic-serif text-sm text-[var(--muted)] mt-1">
                                    {reel.desc}
                                </p>
                            </div>
                            <span className="font-luxe text-[9px] uppercase tracking-widest text-[var(--bronze)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                Explore
                            </span>
                        </div>
                    </div>
                ))}
                
                {/* End spacer to allow last item to align left on desktop */}
                <div className="flex-shrink-0 w-[5vw] sm:w-[10vw] lg:w-[20vw]" aria-hidden="true" />
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}} />
        </section>
    );
}
