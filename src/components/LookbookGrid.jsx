import React from "react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

import img1 from "@/assets/images/IMG9488 copy.jpg"; // Deep navy
import img2 from "@/assets/images/KurtaSets/sunil_mehra_9283.jpg"; // Ivory Kurta
import img3 from "@/assets/images/Suits/suit_5.jpg"; // Charcoal Suit
import img4 from "@/assets/images/IMG8912 copy.jpg"; // Red Velvet
import img5 from "@/assets/images/KurtaSets/img9176_copy.jpg"; // Sage Set
import img6 from "@/assets/images/Suits/suit_7.jpg"; // Modernist
import img7 from "@/assets/images/Bandhagla/img9367_copy.jpg"; // Sherwani
import img8 from "@/assets/images/Bandhagla/066a0317.jpg"; // Crimson
import img9 from "@/assets/images/Sunil Mehra_6620 - Copy.jpg"; // Signature Weave
import img10 from "@/assets/images/IMG9115 copy.jpg"; // Midnight

const LOOKBOOK_ITEMS = [
    { id: 1, src: img1, title: "The Royal Bandhgala", caption: "Deep navy silk with handcrafted embroidery", span: "row-span-2 col-span-1" },
    { id: 2, src: img2, title: "Classic Ivory Kurta", caption: "Perfect finish, structured drape", span: "row-span-1 col-span-1" },
    { id: 3, src: img3, title: "Imperial Charcoal Suit", caption: "Bespoke tailoring, sharp silhouette", span: "row-span-1 col-span-1" },
    { id: 4, src: img4, title: "Velvet Heritage Achkan", caption: "Regal styling with custom motifs", span: "row-span-2 col-span-1" },
    { id: 5, src: img5, title: "Pastel Sage Set", caption: "Lightweight premium handspun cotton", span: "row-span-1 col-span-1" },
    { id: 6, src: img6, title: "The Pinstripe Modernist", caption: "Sophisticated formal wear", span: "row-span-1 col-span-1" },
    { id: 7, src: img7, title: "Silk Ceremonial Sherwani", caption: "Intricate tone-on-tone embroidery", span: "row-span-1 col-span-1" },
    { id: 8, src: img8, title: "Crimson Festive Silk Kurta", caption: "Rich color and unmatched texture", span: "row-span-1 col-span-1" },
    { id: 9, src: img9, title: "The Signature Weave", caption: "Heritage craftsmanship", span: "row-span-1 col-span-1" },
    { id: 10, src: img10, title: "Midnight Velvet", caption: "Luxurious texture and form", span: "row-span-1 col-span-1" },
];

export default function LookbookGrid() {
    return (
        <section
            id="lookbook-gallery"
            className="w-full bg-[var(--bone)] py-20 lg:py-32 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]"
        >
            <div className="max-w-[1500px] mx-auto w-full space-y-12">
                {/* Section Header */}
                <ScrollReveal variant="fade-up">
                    <div className="text-center md:text-left pb-4 border-b border-[var(--hairline)]">
                        <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-2">
                            Maison Lookbook
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-[var(--ink)]">
                            The <span className="font-italic-serif italic">Display Gallery.</span>
                        </h2>
                        <p className="font-italic-serif text-sm text-[var(--muted)] mt-2">
                            A curated look at our signature silhouettes, fabric details, and seasonal inspirations.
                        </p>
                    </div>
                </ScrollReveal>

                {/* High Density Masonry Grid */}
                <StaggerReveal staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px] sm:auto-rows-[350px]" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
                    {LOOKBOOK_ITEMS.map((item) => (
                        <StaggerItem key={item.id} variant="fade-up" className={`${item.span} group relative overflow-hidden bg-[var(--cream)] border border-[var(--hairline)] shadow-sm`}>
                            <img
                                src={item.src}
                                alt={item.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                            />
                            {/* Hover info overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                                <span className="font-luxe text-[8px] uppercase tracking-[0.3em] text-[var(--champagne)] mb-1">
                                    Couture Lookbook
                                </span>
                                <h4 className="font-display text-white text-base tracking-wide leading-tight">
                                    {item.title}
                                </h4>
                                <p className="font-italic-serif text-xs text-white/70 mt-1">
                                    {item.caption}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerReveal>
            </div>
        </section>
    );
}
