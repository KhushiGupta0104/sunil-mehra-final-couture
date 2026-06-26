import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

import { WARDROBE_DATA } from "../data/wardrobeData";;

export default function WardrobeCategoryDetail() {
    const { categorySlug, subCategorySlug } = useParams();
    const category = WARDROBE_DATA[categorySlug];
    const [selectedPiece, setSelectedPiece] = useState(null);

    if (!category) {
        return (
            <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-[80vh] w-full flex flex-col items-center justify-center p-8">
                <h2 className="font-display text-3xl mb-4">Category Not Found</h2>
                <p className="text-sm text-[var(--muted)] mb-6">The wardrobe selection you are looking for does not exist.</p>
                <Link to="/wardrobe" className="hairline-link">
                    ← Back to Wardrobe
                </Link>
            </div>
        );
    }

    // Determine context
    const isAccessoriesHub = categorySlug === "accessories" && !subCategorySlug;
    const isSubcategoryDetail = categorySlug === "accessories" && subCategorySlug;

    // Filter subcategory metadata if on a subcategory page
    const subcatInfo = isSubcategoryDetail 
        ? category.subcategories.find(s => s.id === subCategorySlug)
        : null;

    if (isSubcategoryDetail && !subcatInfo) {
        return (
            <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-[80vh] w-full flex flex-col items-center justify-center p-8">
                <h2 className="font-display text-3xl mb-4">Subcategory Not Found</h2>
                <p className="text-sm text-[var(--muted)] mb-6">The accessories group you are looking for does not exist.</p>
                <Link to="/wardrobe/accessories" className="hairline-link">
                    ← Back to Accessories
                </Link>
            </div>
        );
    }

    // Determine displayed items
    const displayedPieces = isSubcategoryDetail
        ? category.pieces.filter(p => p.subcat === subCategorySlug)
        : category.pieces;

    const handlePrev = (e) => {
        e.stopPropagation();
        const list = displayedPieces;
        const currentIndex = list.findIndex(p => p.img === selectedPiece.img);
        const prevIndex = (currentIndex - 1 + list.length) % list.length;
        setSelectedPiece(list[prevIndex]);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        const list = displayedPieces;
        const currentIndex = list.findIndex(p => p.img === selectedPiece.img);
        const nextIndex = (currentIndex + 1) % list.length;
        setSelectedPiece(list[nextIndex]);
    };

    // Render Accessories Subcategories Landing Hub
    if (isAccessoriesHub) {
        return (
            <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col" data-testid="wardrobe-accessories-hub">
                <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 py-20 lg:py-32">
                    
                    {/* Navigation Breadcrumb */}
                    <div className="mb-10 lg:mb-16">
                        <Link to="/wardrobe" className="font-luxe text-[10px] tracking-[0.25em] uppercase text-[var(--ink-soft)] hover:text-[var(--ink)] transition flex items-center gap-2">
                            <span>←</span> Wardrobe
                        </Link>
                    </div>

                    {/* Sartorial Header Block */}
                    <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24 space-y-4">
                        <span className="eyebrow justify-center !text-[var(--bronze)]">{category.edit}</span>
                        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-[0.05em] uppercase text-[var(--ink)]">
                            {category.name}
                        </h1>
                        <p className="font-italic-serif text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-md mx-auto pt-2">
                            {category.description}
                        </p>
                    </div>

                    {/* Subcategories Hub Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {category.subcategories.map((subcat) => (
                            <Link 
                                key={subcat.id}
                                to={`/wardrobe/accessories/${subcat.id}`}
                                className="group cursor-pointer flex flex-col w-full"
                            >
                                {/* Card Image Container */}
                                <div className="relative overflow-hidden border border-[var(--hairline)] aspect-[3/4] bg-[var(--cream)] shadow-sm">
                                    <img 
                                        src={subcat.img} 
                                        alt={subcat.name} 
                                        loading="lazy"
                                        className="w-full h-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="bg-[var(--bone)] text-[var(--ink)] text-[9px] uppercase tracking-[0.25em] font-luxe px-5 py-2.5 border border-[var(--hairline)]">
                                            Explore
                                        </span>
                                    </div>
                                </div>

                                {/* Card Text Details */}
                                <div className="mt-5 flex flex-col w-full">
                                    <div className="flex justify-between items-baseline w-full">
                                        <h3 className="font-luxe text-sm uppercase tracking-[0.15em] text-[var(--ink)] group-hover:text-[var(--bronze)] transition duration-300">
                                            {subcat.name}
                                        </h3>
                                        <span className="font-display text-[10px] tracking-[0.1em] text-[var(--bronze)] font-semibold uppercase">
                                            {subcat.count} {subcat.count === 1 ? 'Item' : 'Items'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-[var(--ink-soft)] leading-relaxed font-light font-body mt-2">
                                        {subcat.desc}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Centered CTA booking block at the bottom */}
                    <div className="mt-24 lg:mt-36 border-t border-[var(--hairline)] pt-16 text-center max-w-xl mx-auto space-y-6">
                        <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                            Tailored for your presence.
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light font-body max-w-md mx-auto">
                            Experience our signature fits and consult fabric swatches directly with our tailoring concierges at our Sundar Nagar Salon.
                        </p>
                        <div className="pt-4">
                            <Link 
                                to="/appointment"
                                className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] hover:text-white px-10 py-4 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                            >
                                Request Fitting Appointment
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    // Render Subcategory Detail Grid OR Standard Category Grid
    return (
        <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col" data-testid="wardrobe-category-page">
            <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 py-20 lg:py-32">
                
                {/* Navigation Breadcrumb */}
                <div className="mb-10 lg:mb-16">
                    {isSubcategoryDetail ? (
                        <Link to="/wardrobe/accessories" className="font-luxe text-[10px] tracking-[0.25em] uppercase text-[var(--ink-soft)] hover:text-[var(--ink)] transition flex items-center gap-2">
                            <span>←</span> Accessories
                        </Link>
                    ) : (
                        <Link to="/wardrobe" className="font-luxe text-[10px] tracking-[0.25em] uppercase text-[var(--ink-soft)] hover:text-[var(--ink)] transition flex items-center gap-2">
                            <span>←</span> Wardrobe
                        </Link>
                    )}
                </div>

                {/* Sartorial Header Block */}
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24 space-y-4">
                    <span className="eyebrow justify-center !text-[var(--bronze)]">
                        {isSubcategoryDetail ? "Atelier Accessories" : category.edit}
                    </span>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-[0.05em] uppercase text-[var(--ink)]">
                        {isSubcategoryDetail ? subcatInfo.name : category.name}
                    </h1>
                    <p className="font-italic-serif text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-md mx-auto pt-2">
                        {isSubcategoryDetail ? subcatInfo.desc : category.description}
                    </p>
                </div>

                {/* Editorial Masonry-style Grid Layout */}
                <StaggerReveal staggerDelay={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {displayedPieces.map((piece, index) => {
                        // Create asymmetrical layout pattern
                        const i = index % 8;
                        let spanClass = "lg:col-span-1 aspect-[3/4]";
                        
                        if (i === 0) spanClass = "lg:col-span-2 lg:row-span-2 aspect-[3/4] sm:aspect-[4/5]"; // Large hero portrait
                        else if (i === 4) spanClass = "lg:col-span-2 lg:row-span-2 aspect-[3/4] sm:aspect-[4/5]"; // Another large portrait
                        else if (i === 7) spanClass = "lg:col-span-1 aspect-[3/4]"; // Regular portrait

                        return (
                            <StaggerItem 
                                key={index}
                                variant="fade-up"
                                className={`group cursor-pointer flex flex-col w-full h-full ${spanClass}`}
                            >
                                <div 
                                    className="relative w-full h-full overflow-hidden bg-[var(--cream)]"
                                    onClick={() => setSelectedPiece(piece)}
                                >
                                    <img 
                                        src={piece.img} 
                                        alt={piece.name} 
                                        loading="lazy"
                                        className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                    />
                                    {/* Cinematic overlay */}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    
                                    {/* Minimalist text overlay on hover instead of below image */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 ease-out">
                                        <h3 className="font-luxe text-xs sm:text-sm uppercase tracking-[0.15em] text-[var(--bone)]">
                                            {piece.name}
                                        </h3>
                                        <span className="font-display text-[10px] tracking-[0.2em] text-[var(--champagne)] uppercase mt-2">
                                            View Details
                                        </span>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerReveal>

                {/* Centered CTA booking block at the bottom */}
                <div className="mt-24 lg:mt-36 border-t border-[var(--hairline)] pt-16 text-center max-w-xl mx-auto space-y-6">
                    <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                        Tailored for your presence.
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light font-body max-w-md mx-auto">
                        Experience our signature fits and consult fabric swatches directly with our tailoring concierges at our Sundar Nagar Salon.
                    </p>
                    <div className="pt-4">
                        <Link 
                            to="/appointment"
                            className="bg-[var(--bronze)] text-[var(--bone)] px-10 py-4 text-[11px] tracking-[0.3em] font-luxe uppercase hover:bg-[var(--ink)] transition-colors duration-300 inline-block"
                        >
                            Request Fitting Appointment
                        </Link>
                    </div>
                </div>

            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPiece && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPiece(null)}
                        className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md p-6 sm:p-10"
                    >
                        {/* Lightbox Top */}
                        <div className="flex justify-between items-center w-full shrink-0">
                            <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--champagne)]">
                                {isSubcategoryDetail ? `ACCESSORIES / ${subcatInfo.name.toUpperCase()}` : category.name.toUpperCase()} — {selectedPiece.name.toUpperCase()}
                            </span>
                            <button
                                onClick={() => setSelectedPiece(null)}
                                className="font-luxe text-[10px] uppercase tracking-[0.3em] text-white hover:text-[var(--champagne)] border border-white/20 hover:border-[var(--champagne)] px-6 py-3 transition duration-300"
                            >
                                Close <span aria-hidden>×</span>
                            </button>
                        </div>

                        {/* Lightbox Middle */}
                        <div className="relative flex items-center justify-center grow my-6 max-h-[75vh]">
                            <button
                                onClick={handlePrev}
                                className="absolute left-0 sm:left-4 z-10 w-12 h-12 flex items-center justify-center text-white hover:text-[var(--champagne)] bg-black/50 hover:bg-black/80 rounded-full border border-white/10 transition duration-300"
                                aria-label="Previous image"
                            >
                                ❮
                            </button>

                            <motion.div
                                key={selectedPiece.img}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="max-w-full max-h-full aspect-[3/4] overflow-hidden"
                            >
                                <img
                                    src={selectedPiece.img}
                                    alt={selectedPiece.name}
                                    className="max-w-full max-h-[65vh] sm:max-h-[70vh] object-contain mx-auto shadow-2xl border border-white/10"
                                />
                            </motion.div>

                            <button
                                onClick={handleNext}
                                className="absolute right-0 sm:right-4 z-10 w-12 h-12 flex items-center justify-center text-white hover:text-[var(--champagne)] bg-black/50 hover:bg-black/80 rounded-full border border-white/10 transition duration-300"
                                aria-label="Next image"
                            >
                                ❯
                            </button>
                        </div>

                        {/* Lightbox Bottom */}
                        <div className="text-center shrink-0 max-w-xl mx-auto flex flex-col items-center">
                            <span className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--champagne)]">
                                {selectedPiece.name}
                            </span>
                            <p className="font-display text-white text-sm mt-2">
                                Hand-finished tailoring from the House of Sunil Mehra.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
