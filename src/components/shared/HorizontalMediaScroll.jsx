import React from "react";
import ScrollReveal, { StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

import { WARDROBE_DATA } from "@/data/wardrobeData";

const galleryImages = [
    { 
        id: 1, 
        src: WARDROBE_DATA["suits"]?.looks?.[1]?.coverImg, 
        title: "The Sartorial Eye", 
        desc: "Precision tailoring in motion." 
    },
    { 
        id: 2, 
        src: WARDROBE_DATA["bandhagala-indo-western"]?.looks?.[2]?.coverImg, 
        title: "Modern Heritage", 
        desc: "Classic lines, contemporary fabric." 
    },
    { 
        id: 3, 
        src: WARDROBE_DATA["jawahar-jackets"]?.looks?.[1]?.coverImg, 
        title: "Bespoke Details", 
        desc: "Every stitch tells a story." 
    },
    { 
        id: 4, 
        src: WARDROBE_DATA["kurta-sets"]?.looks?.[4]?.coverImg, 
        title: "Evening Silhouette", 
        desc: "Elegance for the golden hour." 
    },
    { 
        id: 5, 
        src: WARDROBE_DATA["winter-collection"]?.looks?.[3]?.coverImg, 
        title: "The Artisan Touch", 
        desc: "Hand-finished perfection." 
    },
    { 
        id: 6, 
        src: WARDROBE_DATA["accessories"]?.looks?.[0]?.coverImg, 
        title: "Quiet Luxury", 
        desc: "Subtle mastery of form." 
    }
];

export default function HorizontalMediaScroll() {
    return (
        <section className="relative bg-[var(--section-dark-bg)] text-[var(--section-dark-text)] py-20 lg:py-32">
            <ScrollReveal variant="fade-up" className="px-6 sm:px-10 lg:px-14 mb-16 lg:mb-24">
                <span className="font-luxe text-[10px] uppercase tracking-[0.3em] opacity-70 mb-2 block">
                    The Visual Archive
                </span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl uppercase tracking-wider">
                    Editorial <span className="font-italic-serif italic opacity-80">Moments</span>
                </h2>
            </ScrollReveal>
            
            <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-8 lg:gap-12 px-6 sm:px-10 lg:px-14 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {galleryImages.map((item, index) => (
                    <ScrollReveal 
                        key={item.id} 
                        variant="fade-up" 
                        delay={index * 0.1}
                        className="relative group shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] snap-center"
                    >
                        <div className="w-full aspect-[4/5] overflow-hidden border border-white/10">
                            <img 
                                src={item.src} 
                                alt={item.title} 
                                className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                            />
                        </div>
                        <div className="mt-6 flex flex-col">
                            <h3 className="font-luxe text-xs uppercase tracking-[0.2em]">{item.title}</h3>
                            <p className="font-italic-serif text-[12px] text-white/50 mt-1">{item.desc}</p>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
