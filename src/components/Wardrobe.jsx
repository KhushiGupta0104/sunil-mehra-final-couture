import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

// Import local images
import img3721 from "@/assets/images/Sunil Mehra_3721.jpg";
import img0493 from "@/assets/images/Sunil Mehra  0493.jpg";
import img0904 from "@/assets/images/Sunil Mehra_0904.jpg";
import img9371 from "@/assets/images/IMG9371 copy.jpg";
import img0246 from "@/assets/images/Sunil Mehra  0246.jpg";
import img8657 from "@/assets/images/IMG8657 copy.jpg";
import jacketCover from "@/assets/images/Sunil Mehra_6586 - Copy.jpg";
import winterCover from "@/assets/images/Sunil Mehra 0932.jpg";
import accessoryCover from "@/assets/images/Accessories/Bags/Sunil Mehra_7074.jpg";

// New covers from the uploaded zip files
import bandhaglaCover from "@/assets/images/Bandhagla/sunil_mehra_0738.jpg";
import kurtaCover from "@/assets/images/KurtaSets/sunil_mehra_0711.jpg";

const CATS_1 = [
    {
        no: "01",
        edit: "Tailored Royalty",
        name: "Bandhagla Sets & Indo-western",
        slug: "bandhagala-indo-western",
        img: bandhaglaCover,
    },
    {
        no: "02",
        edit: "Quiet Luxury",
        name: "Kurta Sets",
        slug: "kurta-sets",
        img: kurtaCover,
    },
    {
        no: "03",
        edit: "Modern Maharaja",
        name: "Jawahar Jacket Sets",
        slug: "jawahar-jackets",
        img: jacketCover,
    },
];

const CATS_2 = [
    {
        no: "04",
        edit: "Sharply Cut",
        name: "Suits",
        slug: "suits",
        img: img8657,
    },
    {
        no: "05",
        edit: "Princely Silhouettes",
        name: "Winter Collection",
        slug: "winter-collection",
        img: winterCover,
    },
    {
        no: "06",
        edit: "Finishing Details",
        name: "Accessories",
        slug: "accessories",
        img: accessoryCover,
    },
];

function CategoryCard({ c, className = "" }) {
    return (
        <Link
            to={`/wardrobe/${c.slug}`}
            className={`cat-card group block w-full h-72 sm:h-full relative overflow-hidden ${className}`}
            data-testid={`wardrobe-card-${c.slug}`}
        >
            <div className="relative w-full h-full overflow-hidden">
                <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,18,14,0.7)] via-black/20 to-transparent group-hover:from-[rgba(20,18,14,0.85)] transition-all duration-700" />
                <span className="absolute top-6 right-6 font-display text-2xl text-[var(--bone)] opacity-70 group-hover:opacity-100 transition-opacity">
                    {c.no}
                </span>
                <div className="absolute bottom-8 left-8 right-8 text-[var(--bone)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                    <p className="font-italic-serif text-lg opacity-90 mb-2">
                        {c.edit}
                    </p>
                    <p className="h-display text-3xl sm:text-4xl md:text-5xl mt-1 leading-tight">
                        {c.name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default function Wardrobe() {
    return (
        <>
            {/* FRAME 1: Heading + Categories 01-03 */}
            <section
                id="wardrobe"
                className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen lg:h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 py-8 lg:py-0"
                data-testid="wardrobe-section"
            >
                <div className="max-w-[1500px] mx-auto w-full flex-1 flex flex-col justify-between py-6 lg:py-0">
                    {/* Header Row */}
                    <ScrollReveal variant="fade-up" className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-4 sm:mb-5 shrink-0">
                        <div>
                            <p className="eyebrow mb-2">The Wardrobe</p>
                            <h2 className="h-display text-[8vw] sm:text-[6vw] lg:text-[3.8vw] leading-[1.15] max-w-[900px]">
                                Cut for the modern{" "}
                                <span className="font-italic-serif italic">maharaja.</span>
                            </h2>
                        </div>
                        <div className="lg:max-w-sm pb-1">
                            <Link to="/#featured" className="hairline-link" data-testid="wardrobe-browse">
                                Browse the Atelier <span aria-hidden>→</span>
                            </Link>
                        </div>
                    </ScrollReveal>

                    {/* Grid Row 1 */}
                    <StaggerReveal staggerDelay={0.12} className="flex-1 min-h-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-5">
                        {CATS_1.map((c, index) => (
                            <StaggerItem 
                                key={c.no} 
                                variant="fade-up" 
                                className={index === 0 ? "lg:col-span-2" : "lg:col-span-1"}
                            >
                                <CategoryCard c={c} />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>
                </div>
            </section>

            {/* FRAME 2: Chapter II */}
            <section
                id="wardrobe-part2"
                className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen lg:h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 py-8 lg:py-0"
                data-testid="wardrobe-section-2"
            >
                <div className="max-w-[1500px] mx-auto w-full flex-1 flex flex-col justify-between py-6 lg:py-0">
                    {/* Header Row */}
                    <ScrollReveal variant="fade-up" className="flex items-center justify-between mb-4 sm:mb-5 shrink-0">
                        <p className="eyebrow">The Wardrobe — Chapter II</p>
                        <span className="text-[10px] tracking-[0.2em] font-luxe opacity-60 uppercase">
                            silhouettes 04–06
                        </span>
                    </ScrollReveal>

                    {/* Grid Row 2 */}
                    <StaggerReveal staggerDelay={0.12} className="flex-1 min-h-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-5">
                        {CATS_2.map((c, index) => (
                            <StaggerItem 
                                key={c.no} 
                                variant="fade-up" 
                                className={index === 2 ? "lg:col-span-2" : "lg:col-span-1"}
                            >
                                <CategoryCard c={c} />
                            </StaggerItem>
                        ))}
                    </StaggerReveal>
                </div>
            </section>
        </>
    );
}
