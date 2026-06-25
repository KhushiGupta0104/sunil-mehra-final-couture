import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const REELS = [
    { id: "reel3", src: "/REEL 3 SM C2.mp4", title: "Carnival Collection", desc: "Vibrant hues and flowing fabrics." },
    { id: "reel7", src: "/REEL 7 SM C2.mp4", title: "Atelier Process", desc: "Behind the seams of couture." },
    { id: "reel10", src: "/REEL 10 SM C2.mp4", title: "Evening Silhouettes", desc: "Tailoring for the twilight hours." },
];

export default function CampaignReel() {
    const scrollRef = useRef(null);

    return (
        <section className="relative w-full bg-[var(--bone)] text-[var(--ink)] py-20 lg:py-32 overflow-hidden">
            <div className="px-6 sm:px-10 lg:px-14 mb-12">
                <span className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--bronze)] mb-2 block">
                    Moving Image
                </span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] text-[var(--ink)]">
                    Campaign <span className="font-italic-serif italic">Reels</span>
                </h2>
            </div>

            <div 
                ref={scrollRef} 
                className="flex gap-6 lg:gap-10 overflow-x-auto px-6 sm:px-10 lg:px-14 pb-10 scrollbar-none snap-x snap-mandatory"
                style={{ scrollBehavior: 'smooth' }}
            >
                {REELS.map((reel) => (
                    <div key={reel.id} className="relative w-[85vw] sm:w-[60vw] lg:w-[45vw] shrink-0 snap-center group flex flex-col">
                        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden border border-[var(--hairline)] bg-black">
                            <video 
                                src={reel.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className="mt-6 flex justify-between items-start">
                            <div>
                                <h3 className="font-luxe text-sm sm:text-base uppercase tracking-[0.1em] text-[var(--ink)]">
                                    {reel.title}
                                </h3>
                                <p className="font-italic-serif text-sm text-[var(--muted)] mt-1">
                                    {reel.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
