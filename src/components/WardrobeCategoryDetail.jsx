import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

import { WARDROBE_DATA } from "../data/wardrobeData";

export default function WardrobeCategoryDetail() {
    const { categorySlug, subCategorySlug } = useParams();
    const category = WARDROBE_DATA[categorySlug];
    const [selectedPiece, setSelectedPiece] = useState(null);

    const ITEMS_PER_PAGE = 21; // Multiple of 7 for grid layout
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Reset visible count when navigating between categories
    useEffect(() => {
        setSelectedPiece(null);
        setVisibleCount(ITEMS_PER_PAGE);
    }, [categorySlug, subCategorySlug]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedPiece) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [selectedPiece]);

    // 404 guards
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

    // Context flags
    const isAccessoriesHub = categorySlug === "accessories" && !subCategorySlug;
    const isSubcategoryDetail = categorySlug === "accessories" && subCategorySlug;

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

    // Displayed items
    const allPieces = isSubcategoryDetail
        ? category.pieces.filter(p => p.subcat === subCategorySlug)
        : category.pieces;

    const displayedPieces = allPieces.slice(0, visibleCount);
    const hasMore = visibleCount < allPieces.length;
    const remaining = allPieces.length - visibleCount;

    // Lightbox navigation
    const handlePrev = useCallback((e) => {
        e.stopPropagation();
        const currentIndex = allPieces.findIndex(p => p.img === selectedPiece.img);
        const prevIndex = (currentIndex - 1 + allPieces.length) % allPieces.length;
        setSelectedPiece(allPieces[prevIndex]);
    }, [selectedPiece, allPieces]);

    const handleNext = useCallback((e) => {
        e.stopPropagation();
        const currentIndex = allPieces.findIndex(p => p.img === selectedPiece.img);
        const nextIndex = (currentIndex + 1) % allPieces.length;
        setSelectedPiece(allPieces[nextIndex]);
    }, [selectedPiece, allPieces]);

    const closeLightbox = useCallback(() => setSelectedPiece(null), []);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!selectedPiece) return;

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") handlePrev(e);
            else if (e.key === "ArrowRight") handleNext(e);
            else if (e.key === "Escape") closeLightbox();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedPiece, handlePrev, handleNext, closeLightbox]);

    // Current image index for counter
    const currentIndex = selectedPiece
        ? allPieces.findIndex(p => p.img === selectedPiece.img) + 1
        : 0;

    // Title & breadcrumb
    const pageTitle = isSubcategoryDetail ? subcatInfo.name : category.name;
    const pageEdit = isSubcategoryDetail ? "Atelier Accessories" : category.edit;
    const pageDesc = isSubcategoryDetail ? subcatInfo.desc : category.description;
    const coverImage = isSubcategoryDetail
        ? subcatInfo.img
        : (allPieces[0]?.img || null);

    // ─────────────── ACCESSORIES HUB ───────────────
    if (isAccessoriesHub) {
        return (
            <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col" data-testid="wardrobe-accessories-hub">
                {/* Hero */}
                <HeroHeader title={category.name} edit={category.edit} description={category.description} image={allPieces[0]?.img} />

                <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 py-16 lg:py-24">

                    {/* Breadcrumb */}
                    <Breadcrumb to="/wardrobe" label="Wardrobe" />

                    {/* Subcategories Grid */}
                    <StaggerReveal staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 sm:gap-x-8">
                        {category.subcategories.map((subcat) => (
                            <StaggerItem key={subcat.id} variant="fade-up">
                                <Link
                                    to={`/wardrobe/accessories/${subcat.id}`}
                                    className="group cursor-pointer flex flex-col w-full"
                                >
                                    <div className="relative overflow-hidden border border-[var(--hairline)] aspect-[3/4] bg-[var(--bone)] shadow-sm">
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
                            </StaggerItem>
                        ))}
                    </StaggerReveal>

                    {/* Bottom CTA */}
                    <BottomCTA />
                </div>
            </div>
        );
    }

    // ─────────────── STANDARD / SUBCATEGORY GRID ───────────────
    return (
        <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col" data-testid="wardrobe-category-page">
            {/* Hero */}
            <HeroHeader
                title={pageTitle}
                edit={pageEdit}
                description={pageDesc}
                image={coverImage}
                count={allPieces.length}
            />

            <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 py-16 lg:py-24">

                {/* Breadcrumb */}
                {isSubcategoryDetail ? (
                    <Breadcrumb to="/wardrobe/accessories" label="Accessories" />
                ) : (
                    <Breadcrumb to="/wardrobe" label="Wardrobe" />
                )}

                {/* Piece count indicator */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--hairline)]">
                    <span className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                        Showing all {allPieces.length} pieces
                    </span>
                    {hasMore && (
                        <span className="font-italic-serif text-sm text-[var(--bronze)] opacity-70">
                            {remaining} more below
                        </span>
                    )}
                </div>

                {/* ═══ IMAGE GRID — 3 columns on desktop ═══ */}
                <StaggerReveal staggerDelay={0.08} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                    {displayedPieces.map((piece, index) => {
                        // Asymmetric layout: every 7th image spans 2 columns
                        const isWide = index % 7 === 0 && index > 0;
                        const spanClass = isWide ? "col-span-2 lg:col-span-2" : "col-span-1";

                        return (
                            <StaggerItem
                                key={index}
                                variant="fade-up"
                                className={`group cursor-pointer ${spanClass}`}
                            >
                                <div
                                    className={`relative w-full overflow-hidden bg-[var(--bone)] border border-[var(--hairline)] ${isWide ? "aspect-[16/9]" : "aspect-[3/4]"}`}
                                    onClick={() => setSelectedPiece(piece)}
                                >
                                    <img
                                        src={piece.img}
                                        alt={piece.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />

                                    {/* Expand icon on hover */}
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-8 h-8 rounded-full bg-[var(--bone)]/90 backdrop-blur-sm flex items-center justify-center border border-[var(--hairline)]">
                                            <svg className="w-3.5 h-3.5 text-[var(--ink)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerReveal>

                {/* ═══ LOAD MORE BUTTON ═══ */}
                {hasMore && (
                    <div className="mt-14 sm:mt-20 flex flex-col items-center gap-4">
                        <button
                            onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                            className="bg-transparent border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bone)] px-12 py-4 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300"
                        >
                            Show More Pieces
                        </button>
                        <span className="font-italic-serif text-xs text-[var(--muted)]">
                            {remaining} more {remaining === 1 ? "piece" : "pieces"} remaining
                        </span>
                    </div>
                )}

                {/* ═══ ALL LOADED INDICATOR ═══ */}
                {!hasMore && allPieces.length > ITEMS_PER_PAGE && (
                    <div className="mt-14 flex items-center justify-center gap-4">
                        <span className="w-10 h-px bg-[var(--hairline)]" />
                        <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                            All {allPieces.length} pieces shown
                        </span>
                        <span className="w-10 h-px bg-[var(--hairline)]" />
                    </div>
                )}

                {/* Bottom CTA */}
                <BottomCTA />
            </div>

            {/* ═══ LIGHTBOX ═══ */}
            <AnimatePresence>
                {selectedPiece && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-lg p-4 sm:p-8"
                    >
                        {/* Top bar */}
                        <div className="flex justify-between items-center w-full shrink-0">
                            <div className="flex items-center gap-3">
                                <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--champagne)]">
                                    {pageTitle}
                                </span>
                                <span className="w-px h-3 bg-white/20" />
                                <span className="font-luxe text-[9px] uppercase tracking-[0.2em] text-white/50">
                                    {currentIndex} / {allPieces.length}
                                </span>
                            </div>
                            <button
                                onClick={closeLightbox}
                                className="font-luxe text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white border border-white/15 hover:border-white/40 px-5 py-2.5 transition duration-300"
                            >
                                Close <span aria-hidden>×</span>
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative flex items-center justify-center grow my-4 max-h-[80vh]">
                            {/* Prev */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-0 sm:left-2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition duration-300"
                                aria-label="Previous image"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedPiece.img}
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="max-w-full max-h-full overflow-hidden"
                                >
                                    <img
                                        src={selectedPiece.img}
                                        alt={selectedPiece.name}
                                        className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain mx-auto"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Next */}
                            <button
                                onClick={handleNext}
                                className="absolute right-0 sm:right-2 z-10 w-11 h-11 flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/15 rounded-full border border-white/10 hover:border-white/30 transition duration-300"
                                aria-label="Next image"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>

                        {/* Bottom info */}
                        <div className="text-center shrink-0 flex flex-col items-center gap-1">
                            <span className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--champagne)]">
                                {selectedPiece.name}
                            </span>
                            <span className="font-luxe text-[8px] uppercase tracking-[0.15em] text-white/30">
                                ← → to navigate · Esc to close
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


// ═══════════════════════════════════════════════
// SUBCOMPONENTS
// ═══════════════════════════════════════════════

function HeroHeader({ title, edit, description, image, count }) {
    return (
        <section className="relative bg-black text-[var(--bone)] h-[50vh] sm:h-[55vh] w-full flex flex-col overflow-hidden">
            {image && (
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-top ken-burns-slow"
                    />
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 z-[1]" />
            <div className="grain z-[2]" />

            <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-12 sm:pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="font-luxe text-[10px] uppercase tracking-[0.4em] text-[var(--champagne)] opacity-80">
                        {edit}
                    </span>
                    <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-none">
                        {title}
                    </h1>
                    {description && (
                        <p className="font-italic-serif text-sm sm:text-base text-[var(--bone)] opacity-50 max-w-md mt-1">
                            {description}
                        </p>
                    )}
                    {count && (
                        <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--bone)] opacity-30 mt-2">
                            {count} pieces
                        </span>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

function Breadcrumb({ to, label }) {
    return (
        <div className="mb-10 lg:mb-14">
            <Link to={to} className="font-luxe text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] hover:text-[var(--ink)] transition flex items-center gap-2 group">
                <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                {label}
            </Link>
        </div>
    );
}

function BottomCTA() {
    return (
        <div className="mt-20 sm:mt-28 lg:mt-36 border-t border-[var(--hairline)] pt-14 text-center max-w-xl mx-auto space-y-5">
            <h3 className="font-display text-xl sm:text-2xl text-[var(--ink)]">
                Tailored for your presence.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed font-light font-body max-w-md mx-auto">
                Experience our signature fits and consult fabric swatches directly with our tailoring concierges at our Sundar Nagar Salon.
            </p>
            <div className="pt-3">
                <Link
                    to="/appointment"
                    className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] px-10 py-4 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                >
                    Request Fitting Appointment
                </Link>
            </div>
        </div>
    );
}
