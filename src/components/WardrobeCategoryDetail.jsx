import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

import { WARDROBE_DATA } from "../data/wardrobeData";

const ITEMS_PER_PAGE = 12;

export default function WardrobeCategoryDetail() {
    const { categorySlug, subCategorySlug } = useParams();
    const category = WARDROBE_DATA[categorySlug];
    
    // selectedLook will hold the entire array of images for a shoot to display in lightbox
    const [selectedLook, setSelectedLook] = useState(null); 
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Reset visible count when navigating between categories
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        setSelectedLook(null);
    }, [categorySlug, subCategorySlug]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (selectedLook) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [selectedLook]);

    // 404 guards
    if (!category) {
        return (
            <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col items-center justify-center p-8">
                <h2 className="font-display text-3xl mb-4">Category Not Found</h2>
                <Link to="/wardrobe" className="font-luxe text-[10px] uppercase tracking-[0.3em] hover:text-[var(--bronze)] transition">
                    Back to Wardrobe
                </Link>
            </div>
        );
    }

    // Context flags
    const isAccessoriesHub = categorySlug === "accessories" && !subCategorySlug;
    const isSubcategoryDetail = categorySlug === "accessories" && subCategorySlug;
    const isClothing = categorySlug !== "accessories";

    const subcatInfo = isSubcategoryDetail
        ? category.subcategories.find(s => s.id === subCategorySlug)
        : null;

    if (isSubcategoryDetail && !subcatInfo) {
        return (
            <div className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col items-center justify-center p-8">
                <h2 className="font-display text-3xl mb-4">Subcategory Not Found</h2>
                <Link to="/wardrobe/accessories" className="font-luxe text-[10px] uppercase tracking-[0.3em] hover:text-[var(--bronze)] transition">
                    Back to Accessories
                </Link>
            </div>
        );
    }

    // --- DATA HANDLING ---
    // If clothing, we use category.looks. If accessories subcat, we use category.pieces filtered.
    let allItems = [];
    if (isClothing) {
        allItems = category.looks || [];
    } else if (isSubcategoryDetail) {
        // Accessories still use single pieces
        const pieces = category.pieces.filter(p => p.subcat === subCategorySlug);
        // Wrap pieces into single-image 'looks' to unify the rendering logic
        allItems = pieces.map(p => ({
            id: p.name,
            title: p.name,
            images: [p.img]
        }));
    }

    const displayedItems = allItems.slice(0, visibleCount);
    const hasMore = visibleCount < allItems.length;

    // --- LIGHTBOX NAVIGATION ---
    const closeLightbox = useCallback(() => setSelectedLook(null), []);

    const handleLightboxPrev = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedLook) return;
        setLightboxIndex((prev) => (prev - 1 + selectedLook.images.length) % selectedLook.images.length);
    }, [selectedLook]);

    const handleLightboxNext = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedLook) return;
        setLightboxIndex((prev) => (prev + 1) % selectedLook.images.length);
    }, [selectedLook]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (!selectedLook) return;
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") handleLightboxPrev(e);
            else if (e.key === "ArrowRight") handleLightboxNext(e);
            else if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedLook, handleLightboxPrev, handleLightboxNext, closeLightbox]);

    const pageTitle = isSubcategoryDetail ? subcatInfo.name : category.name;
    const pageEdit = isSubcategoryDetail ? "Atelier Accessories" : category.edit;
    const heroImage = isSubcategoryDetail ? subcatInfo.img : category.img; // use the cover image for hero

    // ─────────────── ACCESSORIES HUB ───────────────
    if (isAccessoriesHub) {
        return (
            <div className="bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col">
                <CinematicHeader title={category.name} subtitle={category.edit} count={category.pieces.length} bgImage={category.img} />

                <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 pb-20">
                    <Breadcrumb to="/wardrobe" label="Wardrobe" />

                    <StaggerReveal staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mt-16">
                        {category.subcategories.map((subcat) => (
                            <StaggerItem key={subcat.id} variant="fade-up">
                                <Link
                                    to={`/wardrobe/accessories/${subcat.id}`}
                                    className="group flex flex-col w-full"
                                >
                                    <div className="w-full aspect-[3/4] overflow-hidden bg-[var(--bone)]">
                                        <img
                                            src={subcat.img}
                                            alt={subcat.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-2">
                                            {subcat.name}
                                        </h3>
                                        <span className="font-luxe text-[9px] tracking-[0.2em] text-[var(--muted)] uppercase">
                                            {subcat.count} Items
                                        </span>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerReveal>

                    <BottomCTA />
                </div>
            </div>
        );
    }

    // ─────────────── STANDARD / SUBCATEGORY GRID ───────────────
    return (
        <div className="bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col">
            <CinematicHeader title={pageTitle} subtitle={pageEdit} count={allItems.length} bgImage={heroImage} label="Looks" />

            <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 pb-20">
                
                {isSubcategoryDetail ? (
                    <Breadcrumb to="/wardrobe/accessories" label="Accessories" />
                ) : (
                    <Breadcrumb to="/wardrobe" label="Wardrobe" />
                )}

                {/* ═══ CLEAN EDITORIAL GRID ═══ */}
                <StaggerReveal staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 mt-12 sm:mt-16">
                    {displayedItems.map((look) => (
                        <StaggerItem key={look.id} variant="fade-up">
                            <LookCarousel 
                                look={look} 
                                onExpand={() => {
                                    setSelectedLook(look);
                                    setLightboxIndex(0);
                                }} 
                            />
                        </StaggerItem>
                    ))}
                </StaggerReveal>

                {/* ═══ MINIMAL LOAD MORE ═══ */}
                {hasMore && (
                    <div className="mt-24 flex justify-center">
                        <button
                            onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                            className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--bronze)] transition-colors"
                        >
                            + Load More Looks
                        </button>
                    </div>
                )}

                {!hasMore && allItems.length > ITEMS_PER_PAGE && (
                    <div className="mt-24 flex justify-center">
                        <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                            End of Collection
                        </span>
                    </div>
                )}

                <BottomCTA />
            </div>

            {/* ═══ LIGHTBOX ═══ */}
            <AnimatePresence>
                {selectedLook && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 z-[100] flex flex-col bg-white p-4 sm:p-8"
                    >
                        {/* Top bar */}
                        <div className="flex justify-between items-center w-full shrink-0">
                            <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
                                {selectedLook.title} — {lightboxIndex + 1} / {selectedLook.images.length}
                            </span>
                            <button
                                onClick={closeLightbox}
                                className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--muted)] transition"
                            >
                                Close
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative flex items-center justify-center grow my-8 max-h-[85vh]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedLook.images[lightboxIndex]}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="max-w-full max-h-full overflow-hidden"
                                >
                                    <img
                                        src={selectedLook.images[lightboxIndex]}
                                        alt={`${selectedLook.title} angle ${lightboxIndex + 1}`}
                                        className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain mx-auto"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Left/Right click areas for lightbox */}
                            {selectedLook.images.length > 1 && (
                                <>
                                    <div 
                                        className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-10" 
                                        onClick={handleLightboxPrev}
                                    />
                                    <div 
                                        className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-10" 
                                        onClick={handleLightboxNext}
                                    />
                                </>
                            )}
                        </div>

                        {/* Bottom info */}
                        <div className="text-center shrink-0 flex items-center justify-between">
                            {selectedLook.images.length > 1 ? (
                                <button
                                    onClick={handleLightboxPrev}
                                    className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--muted)] transition p-2"
                                >
                                    Prev
                                </button>
                            ) : <div className="w-10" />}
                            <span className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--ink)]">
                                {pageTitle}
                            </span>
                            {selectedLook.images.length > 1 ? (
                                <button
                                    onClick={handleLightboxNext}
                                    className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--muted)] transition p-2"
                                >
                                    Next
                                </button>
                            ) : <div className="w-10" />}
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

function CinematicHeader({ title, subtitle, count, bgImage, label = "Pieces" }) {
    return (
        <section className="relative h-[60vh] sm:h-[70vh] w-full flex items-center justify-center overflow-hidden mb-12">
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src={bgImage} 
                    alt={title} 
                    className="w-full h-full object-cover object-top opacity-60"
                    style={{ filter: "brightness(0.65) contrast(1.1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)]/40 via-[var(--ink)]/30 to-[var(--ink)]/70 mix-blend-multiply" />
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="relative z-10 flex flex-col items-center gap-6 mt-16 px-6 text-center"
            >
                <span className="font-luxe text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[var(--champagne)]">
                    {subtitle}
                </span>
                <h1 className="h-display text-5xl sm:text-7xl lg:text-8xl text-[var(--bone)] leading-none drop-shadow-md">
                    {title}
                </h1>
                <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[rgba(250,246,239,0.7)] pt-2">
                    {count} {label}
                </span>
            </motion.div>
        </section>
    );
}

function Breadcrumb({ to, label }) {
    return (
        <div className="pt-4 pb-8">
            <Link to={to} className="font-luxe text-[9px] tracking-[0.3em] uppercase text-[var(--muted)] hover:text-[var(--ink)] transition">
                ← {label}
            </Link>
        </div>
    );
}

function BottomCTA() {
    return (
        <div className="mt-32 sm:mt-48 text-center max-w-md mx-auto">
            <span className="w-px h-12 bg-[var(--hairline-strong)] mx-auto block mb-12" />
            <Link
                to="/appointment"
                className="font-luxe text-[10px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--bronze)] transition-colors"
            >
                Request a Fitting
            </Link>
        </div>
    );
}

// ═══════════════════════════════════════════════
// SLIDESHOW CAROUSEL
// ═══════════════════════════════════════════════

function LookCarousel({ look, onExpand }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasMultiple = look.images.length > 1;

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + look.images.length) % look.images.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % look.images.length);
    };

    return (
        <div className="group flex flex-col w-full cursor-pointer" onClick={onExpand}>
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[var(--bone)]">
                <AnimatePresence initial={false}>
                    <motion.img
                        key={look.images[currentIndex]}
                        src={look.images[currentIndex]}
                        alt={look.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                </AnimatePresence>

                {/* Slideshow Arrows (visible on hover) */}
                {hasMultiple && (
                    <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                            onClick={handlePrev} 
                            className="w-8 h-8 rounded-full bg-white/80 text-[var(--ink)] flex items-center justify-center hover:bg-white transition shadow-sm backdrop-blur-sm"
                            aria-label="Previous image"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                        </button>
                        <button 
                            onClick={handleNext} 
                            className="w-8 h-8 rounded-full bg-white/80 text-[var(--ink)] flex items-center justify-center hover:bg-white transition shadow-sm backdrop-blur-sm"
                            aria-label="Next image"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                        </button>
                    </div>
                )}
                
                {/* Dots indicator */}
                {hasMultiple && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {look.images.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Decoupled look title */}
            <div className="mt-4 flex justify-between items-center">
                <span className="font-luxe text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]">
                    {look.title}
                </span>
                <span className="font-luxe text-[9px] tracking-[0.2em] uppercase text-[var(--muted)]">
                    {hasMultiple ? `${look.images.length} Angles` : '1 Angle'}
                </span>
            </div>
        </div>
    );
}
