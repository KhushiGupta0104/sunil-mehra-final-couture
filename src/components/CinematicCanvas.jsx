import React from "react";
import ScrollReveal from "./ScrollReveal";

import walletImg from "@/assets/images/Accessories/ostrich_wallet.jpg";
import bagImg from "@/assets/images/Accessories/Bags/IMG_9408_copy_2_-_Copy.jpg";
import winterImg from "@/assets/images/Winter/new_winter_suit.jpg";
import kurtaImg from "@/assets/images/KurtaSets/new_kurta_yellow.jpg";

export default function CinematicCanvas() {
    return (
        <section
            id="cinematic-canvas"
            className="w-full bg-[var(--bone)] py-16 sm:py-24 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]"
        >
            <div className="max-w-[1500px] mx-auto w-full space-y-12">
                
                {/* Header */}
                <ScrollReveal variant="fade-up">
                    <div className="text-center md:text-left pb-4 border-b border-[var(--hairline)]">
                        <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-2">
                            Maison Narrative
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-[var(--ink)]">
                            The <span className="font-italic-serif italic">Cinematic Canvas.</span>
                        </h2>
                        <p className="font-italic-serif text-sm text-[var(--muted)] mt-2">
                            A celebration of detail — where fine embroidery, hand-finished metal, and Italian leather converge.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Cinematic Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left: Large Loop Film Column */}
                    <ScrollReveal variant="fade-right" className="lg:col-span-5 h-[50vh] lg:h-auto min-h-[400px] relative overflow-hidden bg-black border border-[var(--hairline)] shadow-lg">
                        <video
                            src="/REEL 7 SM C2.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                            <span className="font-luxe text-[8px] uppercase tracking-[0.4em] text-[var(--champagne)] mb-2">
                                Volume I
                            </span>
                            <h3 className="font-display text-xl uppercase tracking-wider">
                                Movement in Cloth
                            </h3>
                            <p className="font-italic-serif text-xs text-white/70 mt-1">
                                Capturing the drape of silk under sunlight.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Right: Editorial Mosaic Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Box 1 */}
                        <ScrollReveal variant="fade-up" className="group relative overflow-hidden aspect-[4/5] bg-[var(--bone)] border border-[var(--hairline)] shadow-sm">
                            <img
                                src={walletImg}
                                alt="Leather Wallet"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-[var(--hairline)] transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <span className="font-luxe text-[8px] uppercase tracking-wider text-[var(--bronze)] block">
                                    Leather Craft
                                </span>
                                <h4 className="font-display text-xs font-semibold text-[var(--ink)] mt-0.5">
                                    Ostrich Leather Wallet
                                </h4>
                            </div>
                        </ScrollReveal>

                        {/* Box 2 */}
                        <ScrollReveal variant="fade-up" delay={0.1} className="group relative overflow-hidden aspect-[4/5] bg-[var(--bone)] border border-[var(--hairline)] shadow-sm">
                            <img
                                src={bagImg}
                                alt="Travel Duffle"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-[var(--hairline)] transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <span className="font-luxe text-[8px] uppercase tracking-wider text-[var(--bronze)] block">
                                    Travel
                                </span>
                                <h4 className="font-display text-xs font-semibold text-[var(--ink)] mt-0.5">
                                    Hand-crafted Duffle Bag
                                </h4>
                            </div>
                        </ScrollReveal>

                        {/* Box 3 */}
                        <ScrollReveal variant="fade-up" className="group relative overflow-hidden aspect-[4/5] bg-[var(--bone)] border border-[var(--hairline)] shadow-sm">
                            <img
                                src={winterImg}
                                alt="Winter Suit"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-[var(--hairline)] transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <span className="font-luxe text-[8px] uppercase tracking-wider text-[var(--bronze)] block">
                                    Winter
                                </span>
                                <h4 className="font-display text-xs font-semibold text-[var(--ink)] mt-0.5">
                                    Textured Woolen Overcoat
                                </h4>
                            </div>
                        </ScrollReveal>

                        {/* Box 4 */}
                        <ScrollReveal variant="fade-up" delay={0.1} className="group relative overflow-hidden aspect-[4/5] bg-[var(--bone)] border border-[var(--hairline)] shadow-sm">
                            <img
                                src={kurtaImg}
                                alt="Silk Kurta"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-[1.8s] group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-[var(--hairline)] transition-all duration-500 opacity-0 group-hover:opacity-100">
                                <span className="font-luxe text-[8px] uppercase tracking-wider text-[var(--bronze)] block">
                                    Silk Sets
                                </span>
                                <h4 className="font-display text-xs font-semibold text-[var(--ink)] mt-0.5">
                                    Mustard Festive Kurta Set
                                </h4>
                            </div>
                        </ScrollReveal>

                    </div>

                </div>

            </div>
        </section>
    );
}
