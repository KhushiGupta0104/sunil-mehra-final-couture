import React from "react";
import ScrollReveal from "./ScrollReveal";

import { WARDROBE_DATA } from "../data/wardrobeData";

const LOOKS = [
    { id: 1, src: WARDROBE_DATA["winter-collection"].looks[0]?.coverImg, title: "The Royal Charcoal Suit", category: "Look 01 / Heritage" },
    { id: 2, src: WARDROBE_DATA.suits.looks[6]?.coverImg, title: "Classic Double Breasted", category: "Look 02 / Bespoke" },
    { id: 3, src: WARDROBE_DATA.suits.looks[12]?.coverImg, title: "Imperial Navy Suit", category: "Look 03 / Tailored" },
    { id: 4, src: WARDROBE_DATA.suits.looks[18]?.coverImg, title: "Embroidery Border Tuxedo", category: "Look 04 / Occasion" },
    { id: 5, src: WARDROBE_DATA["bandhagala-indo-western"].looks[10]?.coverImg, title: "Muted Bronze Two-Piece", category: "Look 05 / Signature" },
    { id: 6, src: WARDROBE_DATA.suits.looks[24]?.coverImg, title: "Pinstripe Silk Suit", category: "Look 06 / Modernist" },
];

export default function HorizontalRunway() {
    return (
        <section
            id="horizontal-runway"
            className="w-full bg-[var(--bone)] py-16 sm:py-24 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]"
        >
            <div className="max-w-[1500px] mx-auto w-full space-y-12">
                
                {/* Header */}
                <ScrollReveal variant="fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-b border-[var(--hairline)]">
                        <div>
                            <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-2">
                                Seasonal Presentation
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-[var(--ink)]">
                                The <span className="font-italic-serif italic">Runway.</span>
                            </h2>
                        </div>
                        <p className="font-italic-serif text-sm text-[var(--muted)] max-w-sm">
                            Scroll to explore the key silhouettes from this season's atelier presentation.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-6">
                    {LOOKS.map((look) => (
                        <div
                            key={look.id}
                            className="w-full aspect-[3/4] relative overflow-hidden bg-[var(--bone)] border border-[var(--hairline)] shadow-md group"
                        >
                            <img
                                src={look.src}
                                alt={look.title}
                                className="w-full h-full object-cover object-top transition-transform duration-[1.8s] group-hover:scale-105"
                            />
                            {/* Static overlay styling */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white">
                                <span className="font-luxe text-[8px] uppercase tracking-[0.25em] text-[var(--champagne)]">
                                    {look.category}
                                </span>
                                <h3 className="font-display text-sm sm:text-base uppercase tracking-wider mt-1">
                                    {look.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
