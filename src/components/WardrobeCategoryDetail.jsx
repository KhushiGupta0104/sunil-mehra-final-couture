import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

import { WARDROBE_DATA } from "../data/wardrobeData";

const ITEMS_PER_PAGE = 12;

export default function WardrobeCategoryDetail() {
    const { categorySlug, subCategorySlug } = useParams();
    const category = WARDROBE_DATA[categorySlug];
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    // Reset visible count when navigating between categories
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
        setSelectedPiece(null);
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

    // Displayed items
    const allPieces = isSubcategoryDetail
        ? category.pieces.filter(p => p.subcat === subCategorySlug)
        : category.pieces;

    const displayedPieces = allPieces.slice(0, visibleCount);
    const hasMore = visibleCount < allPieces.length;

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

    const currentIndex = selectedPiece
        ? allPieces.findIndex(p => p.img === selectedPiece.img) + 1
        : 0;

    const pageTitle = isSubcategoryDetail ? subcatInfo.name : category.name;
    const pageEdit = isSubcategoryDetail ? "Atelier Accessories" : category.edit;

    // ─────────────── ACCESSORIES HUB ───────────────
    if (isAccessoriesHub) {
        return (
            <div className="bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col pt-32 sm:pt-40 pb-20">
                <AiryHeader title={category.name} subtitle={category.edit} count={category.pieces.length} />

                <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14">
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
        <div className="bg-[var(--bone)] text-[var(--ink)] min-h-screen w-full flex flex-col pt-32 sm:pt-40 pb-20">
            <AiryHeader title={pageTitle} subtitle={pageEdit} count={allPieces.length} />

            <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14">
                
                {isSubcategoryDetail ? (
                    <Breadcrumb to="/wardrobe/accessories" label="Accessories" />
                ) : (
                    <Breadcrumb to="/wardrobe" label="Wardrobe" />
                )}

                {/* ═══ CLEAN EDITORIAL GRID ═══ */}
                <StaggerReveal staggerDelay={0.08} className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 mt-12 sm:mt-16">
                    {displayedPieces.map((piece, index) => (
                        <StaggerItem
                            key={index}
                            variant="fade-up"
                            className="group cursor-pointer"
                        >
                            <div
                                className="w-full aspect-[3/4] overflow-hidden bg-[var(--bone)]"
                                onClick={() => setSelectedPiece(piece)}
                            >
                                <img
                                    src={piece.img}
                                    alt={piece.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                                />
                            </div>
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
                            + Load More
                        </button>
                    </div>
                )}

                {!hasMore && allPieces.length > ITEMS_PER_PAGE && (
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
                {selectedPiece && (
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
                                {currentIndex} / {allPieces.length}
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
                                    key={selectedPiece.img}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="max-w-full max-h-full overflow-hidden"
                                >
                                    <img
                                        src={selectedPiece.img}
                                        alt={selectedPiece.name}
                                        className="max-w-full max-h-[75vh] sm:max-h-[85vh] object-contain mx-auto"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Bottom info */}
                        <div className="text-center shrink-0 flex items-center justify-between">
                             <button
                                onClick={handlePrev}
                                className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--muted)] transition p-2"
                            >
                                Prev
                            </button>
                            <span className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--ink)]">
                                {pageTitle}
                            </span>
                            <button
                                onClick={handleNext}
                                className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--ink)] hover:text-[var(--muted)] transition p-2"
                            >
                                Next
                            </button>
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

function AiryHeader({ title, subtitle, count }) {
    return (
        <section className="px-6 sm:px-10 lg:px-14 flex flex-col items-center justify-center text-center pb-12 sm:pb-20 border-b border-[var(--hairline)] max-w-[1500px] mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6"
            >
                <span className="font-luxe text-[9px] uppercase tracking-[0.4em] text-[var(--muted)]">
                    {subtitle}
                </span>
                <h1 className="h-display text-4xl sm:text-5xl lg:text-7xl leading-none">
                    {title}
                </h1>
                <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--muted)] pt-2">
                    {count} Pieces
                </span>
            </motion.div>
        </section>
    );
}

function Breadcrumb({ to, label }) {
    return (
        <div className="pt-8">
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
