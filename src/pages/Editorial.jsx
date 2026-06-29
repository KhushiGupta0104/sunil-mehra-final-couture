import React, { useRef } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

import { WARDROBE_DATA } from "@/data/wardrobeData";

const STORIES = [
    {
        no: "01",
        season: "The Thar Collection",
        title: "Mirage & Majesty",
        excerpt: "Shot against the stark, dramatic landscapes of the Thar desert, the Mirage Suit emerges as a mirage of pristine tailoring. The stark white fabric contrasts sharply with the rugged, ancient stone, embodying the duality of the modern maharaja: rooted in history, yet decidedly contemporary.",
        quote: "There is an unspoken power in wearing white against the wild.",
        img: WARDROBE_DATA["kurta-sets"].looks[6]?.coverImg,
        align: "left"
    },
    {
        no: "02",
        season: "Atelier Accessories",
        title: "The Woven Journey",
        excerpt: "Our signature leather duffle is not merely constructed; it is woven by hand. The intricate bottega-style weave requires over forty hours of continuous craftsmanship, resulting in a travel companion that ages beautifully, acquiring a patina unique to your journeys.",
        quote: "Details are not the details. They make the design.",
        img: WARDROBE_DATA["accessories"].looks[2]?.coverImg,
        align: "right"
    },
    {
        no: "03",
        season: "Couture 25/26",
        title: "The White Sands",
        excerpt: "An ode to ethereal lightness. The new menswear line embraces fluid silhouettes and breathable cashmeres. Hand-embroidered with subtle metallic threading, this suit catches the golden hour light, making it the perfect statement for a destination occasion.",
        quote: "Elegance is the only beauty that never fades.",
        img: WARDROBE_DATA["bandhagala-indo-western"].looks[9]?.coverImg,
        align: "left"
    },
];

function EditorialBlock({ story, index }) {
    const isEven = index % 2 === 0;

    return (
        <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20 py-20 lg:py-32 border-b border-[rgba(250,246,239,0.08)] last:border-0`}>
            
            {/* Image Column */}
            <div className={`w-full md:w-1/2 ${story.align === 'center' ? 'md:w-full' : ''}`}>
                <ScrollReveal variant="fade-up">
                    <div className="relative group overflow-hidden border border-[rgba(250,246,239,0.15)]">
                        <motion.img
                            src={story.img}
                            alt={story.title}
                            loading="lazy"
                            decoding="async"
                            className={`w-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 ${story.align === 'center' ? 'h-[70vh] md:h-[80vh]' : 'h-[60vh] md:h-[80vh]'}`}
                            style={{ objectPosition: 'top', willChange: "transform" }}
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500" />
                        <span className="absolute top-6 left-6 font-display text-4xl text-[var(--bone)] mix-blend-overlay">
                            {story.no}
                        </span>
                    </div>
                </ScrollReveal>
            </div>

            {/* Text Column */}
            <div className={`w-full ${story.align === 'center' ? 'md:w-full md:-mt-32 md:bg-[var(--section-dark-bg)] md:p-12 md:border md:border-[rgba(250,246,239,0.1)] md:mx-auto md:max-w-4xl relative z-10' : 'md:w-1/2'} flex flex-col justify-center`}>
                <ScrollReveal variant="fade-up" delay={0.1}>
                    <p className="font-luxe text-[10px] tracking-[0.4em] uppercase text-[var(--champagne)] mb-4">
                        {story.season}
                    </p>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={0.2}>
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--bone)] leading-[1.1] mb-6">
                        {story.title}
                    </h3>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={0.3}>
                    <p className="font-light text-sm md:text-base text-[rgba(250,246,239,0.6)] leading-relaxed mb-8">
                        {story.excerpt}
                    </p>
                </ScrollReveal>
                <ScrollReveal variant="fade-up" delay={0.4}>
                    <blockquote className="border-l border-[var(--champagne)] pl-6 font-italic-serif text-lg md:text-xl text-[var(--champagne)] italic leading-relaxed">
                        "{story.quote}"
                    </blockquote>
                </ScrollReveal>
            </div>
        </div>
    );
}

export default function Editorial() {
    return (
        <section
            id="editorial"
            className="w-full bg-[var(--section-dark-bg)] text-[var(--bone)] py-20 lg:py-32"
            data-testid="editorial-section"
        >
            <div className="grain" />
            
            <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
                
                {/* Header */}
                <ScrollReveal variant="fade-up" className="text-center mb-20 lg:mb-32">
                    <p className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[var(--champagne)] mb-4">
                        The Journal
                    </p>
                    <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-[var(--bone)] leading-[1.1]">
                        Stories <br />
                        <span className="font-italic-serif italic text-[rgba(250,246,239,0.5)]">in cloth.</span>
                    </h2>
                </ScrollReveal>

                {/* Editorial Blocks */}
                <div className="space-y-12">
                    {STORIES.map((story, index) => (
                        <EditorialBlock key={story.no} story={story} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
