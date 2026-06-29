import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";
import Lightbox from "@/components/shared/Lightbox";

import { WARDROBE_DATA } from "@/data/wardrobeData";

const IVORY_PRODUCTS = [
    {
        id: "p1",
        name: "Mirage Silk Kurta Set",
        tag: "Couture",
        front: WARDROBE_DATA["kurta-sets"].looks[2]?.coverImg,
        back: WARDROBE_DATA["kurta-sets"].looks[2]?.gallery?.[1] || WARDROBE_DATA["kurta-sets"].looks[2]?.coverImg,
    },
    {
        id: "p2",
        name: "Bone Silk Kurta Set",
        tag: "New",
        front: WARDROBE_DATA["bandhagala-indo-western"].looks[3]?.coverImg,
        back: WARDROBE_DATA["bandhagala-indo-western"].looks[3]?.gallery?.[1] || WARDROBE_DATA["bandhagala-indo-western"].looks[3]?.coverImg,
    },
    {
        id: "p3",
        name: "Classic Atelier Kurta",
        tag: null,
        front: WARDROBE_DATA["bandhagala-indo-western"].looks[4]?.coverImg,
        back: WARDROBE_DATA["bandhagala-indo-western"].looks[4]?.gallery?.[1] || WARDROBE_DATA["bandhagala-indo-western"].looks[4]?.coverImg,
    },
];

const COLORED_PRODUCTS = [
    {
        id: "p4",
        name: "Slate Blue Tailored Suit",
        tag: "New",
        front: WARDROBE_DATA.suits.looks[0]?.coverImg,
        back: WARDROBE_DATA.suits.looks[0]?.gallery?.[1] || WARDROBE_DATA.suits.looks[0]?.coverImg,
    },
    {
        id: "p5",
        name: "Charcoal Velvet Bandhgala",
        tag: null,
        front: WARDROBE_DATA["bandhagala-indo-western"].looks[0]?.coverImg,
        back: WARDROBE_DATA["bandhagala-indo-western"].looks[0]?.gallery?.[1] || WARDROBE_DATA["bandhagala-indo-western"].looks[0]?.coverImg,
    },
    {
        id: "p6",
        name: "Indigo Couture Sherwani",
        tag: "Couture",
        front: WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.coverImg,
        back: WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.gallery?.[1] || WARDROBE_DATA["bandhagala-indo-western"].looks[1]?.coverImg,
    },
];

const ALL_PRODUCTS = [...IVORY_PRODUCTS, ...COLORED_PRODUCTS];

export default function Featured() {
    const [selectedProd, setSelectedProd] = useState(null);

    useEffect(() => {
        if (selectedProd) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [selectedProd]);

    const handlePrev = (e) => {
        e.stopPropagation();
        const currentIndex = ALL_PRODUCTS.findIndex((p) => p.id === selectedProd.id);
        const prevIndex = (currentIndex - 1 + ALL_PRODUCTS.length) % ALL_PRODUCTS.length;
        setSelectedProd(ALL_PRODUCTS[prevIndex]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        const currentIndex = ALL_PRODUCTS.findIndex((p) => p.id === selectedProd.id);
        const nextIndex = (currentIndex + 1) % ALL_PRODUCTS.length;
        setSelectedProd(ALL_PRODUCTS[nextIndex]);
    };

    return (
        <section
            id="featured"
            className="relative bg-[var(--bone)] text-[var(--ink)] py-20 lg:py-32 w-full flex flex-col px-6 sm:px-10 lg:px-14 scroll-mt-28"
            data-testid="featured-section"
        >
            <div className="max-w-[1500px] mx-auto w-full space-y-12 sm:space-y-16">

                {/* Header Row */}
                <ScrollReveal variant="fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-4 border-b border-[var(--hairline)]">
                        <div>
                            <span className="font-luxe text-[10px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-3">
                                The Collection
                            </span>
                            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] text-[var(--ink)]">
                                Featured <span className="font-italic-serif italic">pieces.</span>
                            </h2>
                        </div>
                        <p className="font-italic-serif text-base sm:text-lg text-[var(--muted)] max-w-sm">
                            Hand-finished garments from the House of Sunil Mehra — each piece a conversation between tradition and modernity.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Subchapter 1: The Ivory Chapter */}
                <div className="space-y-6">
                    <ScrollReveal variant="fade-up" delay={0.1}>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-8 h-px bg-[var(--bronze)] opacity-40" />
                            <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                                The Ivory Chapter
                            </h3>
                        </div>
                        <p className="font-italic-serif text-sm text-[var(--muted)] ml-12">
                            Whispers of silk and bone — garments that hold the light.
                        </p>
                    </ScrollReveal>

                    {/* Asymmetric Editorial Grid */}
                    <StaggerReveal staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16">
                        {IVORY_PRODUCTS.map((prod, idx) => (
                            <StaggerItem key={prod.id} variant="fade-up">
                                <ProductCard prod={prod} onSelect={setSelectedProd} featured={idx === 0} />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>
                </div>

                {/* Ornamental divider between chapters */}
                <div className="flex items-center justify-center gap-0 py-2 max-w-[400px] mx-auto">
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--hairline))" }} />
                    <div className="w-2 h-2 rotate-45 mx-5 shrink-0 border border-[var(--bronze)]" style={{ opacity: 0.5 }} />
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--hairline))" }} />
                </div>

                {/* Subchapter 2: The Slate & Indigo Chapters */}
                <div className="space-y-6">
                    <ScrollReveal variant="fade-up" delay={0.1}>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-8 h-px bg-[var(--bronze)] opacity-40" />
                            <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                                The Slate & Indigo Chapters
                            </h3>
                        </div>
                        <p className="font-italic-serif text-sm text-[var(--muted)] ml-12">
                            Depths of midnight and stone — presence without pronouncement.
                        </p>
                    </ScrollReveal>

                    <StaggerReveal staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 sm:gap-x-8 sm:gap-y-16">
                        {COLORED_PRODUCTS.map((prod) => (
                            <StaggerItem key={prod.id} variant="fade-up">
                                <ProductCard prod={prod} onSelect={setSelectedProd} />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>
                </div>

            </div>

            {/* Premium Lightbox Modal */}
            <Lightbox 
                isOpen={!!selectedProd}
                onClose={() => setSelectedProd(null)}
                imageSrc={selectedProd?.front}
                imageAlt={selectedProd?.name}
                title={selectedProd ? `FEATURED / PIECES — ${selectedProd.name.toUpperCase()}` : ""}
                subtitle="Hand-finished tailoring from the House of Sunil Mehra."
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </section>
    );
}

/** Individual product card with hover effects */
function ProductCard({ prod, onSelect, featured = false }) {
    return (
        <a
            href="#"
            onClick={(e) => { e.preventDefault(); onSelect(prod); }}
            className="block w-full flex flex-col group"
            data-testid={`product-${prod.id}`}
        >
            <div className="relative overflow-hidden border border-[var(--hairline)] aspect-[3/4] bg-[var(--bone)] shadow-sm">
                <img
                    src={prod.front}
                    alt={prod.name}
                    loading="lazy"
                    className="img-front absolute inset-0 w-full h-full object-cover object-top transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <img
                    src={prod.back}
                    alt={prod.name}
                    loading="lazy"
                    className="img-back absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                {prod.tag && (
                    <span className="absolute top-5 left-5 z-10 px-3 py-1 bg-[var(--bone)] text-[9px] uppercase tracking-[0.3em] font-luxe text-[var(--ink)]">
                        {prod.tag}
                    </span>
                )}
                {/* Subtle overlay with expand icon on hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--bone)]/80 backdrop-blur-sm flex items-center justify-center border border-[var(--hairline)]">
                        <svg className="w-4 h-4 text-[var(--ink)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 w-full">
                <h4 className="font-luxe text-xs uppercase tracking-[0.1em] text-[var(--ink)] group-hover:text-[var(--bronze)] transition duration-300">
                    {prod.name}
                </h4>

            </div>
        </a>
    );
}
