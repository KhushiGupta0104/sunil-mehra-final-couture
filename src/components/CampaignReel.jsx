import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import img1 from "@/assets/images/Sunil Mehra  1512.jpg";
import img2 from "@/assets/images/Sunil Mehra  1701.jpg";
import img3 from "@/assets/images/Sunil Mehra  1737.jpg";

const REELS = [
    { id: "reel3", src: img1, title: "Carnival Collection", desc: "Vibrant hues and flowing fabrics." },
    { id: "reel7", src: img2, title: "Atelier Process", desc: "Behind the seams of couture." },
    { id: "reel10", src: img3, title: "Evening Silhouettes", desc: "Tailoring for the twilight hours." },
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
                    Campaign <span className="font-italic-serif italic">Stills</span>
                </h2>
            </div>

            <div 
                ref={scrollRef} 
                className="flex flex-col gap-16 lg:gap-24 px-6 sm:px-10 lg:px-14 pb-10"
            >
                {REELS.map((reel) => (
                    <div key={reel.id} className="relative w-full group flex flex-col items-center">
                        <div className="relative w-full max-w-2xl mx-auto aspect-[4/5] overflow-hidden border border-[var(--hairline)] bg-black">
                            <img 
                                src={reel.src}
                                alt={reel.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className="mt-6 flex justify-between items-start w-full max-w-2xl mx-auto">
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
