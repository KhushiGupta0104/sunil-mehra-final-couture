import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WARDROBE_DATA } from "@/data/wardrobeData";

export default function SearchOverlay({ open, onClose }) {
    // Dynamically build the search index from WARDROBE_DATA
    const SEARCHABLE_ITEMS = useMemo(() => {
        const items = [];
        
        Object.entries(WARDROBE_DATA).forEach(([categorySlug, categoryData]) => {
            // 1. Add Category itself
            items.push({
                type: "category",
                name: categoryData.name,
                desc: categoryData.description || categoryData.edit,
                img: categoryData.looks?.[0]?.coverImg || null,
                to: `/wardrobe/${categorySlug}`
            });
            
            // 2. Add Subcategories (if any)
            if (categoryData.subcategories) {
                categoryData.subcategories.forEach(subcat => {
                    const subcatImg = categoryData.looks?.find(l => l.subcat === subcat.id)?.coverImg || subcat.img || categoryData.looks?.[0]?.coverImg;
                    items.push({
                        type: "subcategory",
                        name: subcat.name,
                        desc: `${categoryData.name} — ${subcat.desc || subcat.name}`,
                        img: subcatImg,
                        to: `/wardrobe/${categorySlug}/${subcat.id}`
                    });
                });
            }
            
            // 3. Add individual Garments/Pieces
            if (categoryData.looks) {
                categoryData.looks.forEach((look, index) => {
                    const garmentId = look.id || `${categoryData.id || categorySlug}-${index}`;
                    items.push({
                        type: "garment",
                        name: look.name || `${categoryData.name} — Look ${index + 1}`,
                        desc: look.subcat 
                            ? `${categoryData.name} — ${look.subcat}`
                            : `${categoryData.name} — Look ${index + 1}`,
                        img: look.coverImg,
                        to: `/wardrobe/${categorySlug}#${garmentId}`
                    });
                });
            }
        });
        
        return items;
    }, []);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) {
            document.body.classList.add("no-scroll");
            // Auto-focus input on open
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } else {
            document.body.classList.remove("no-scroll");
            setQuery("");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [open]);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && open) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    // Only show up to 12 items at a time to prevent UI lag on massive searches
    const MAX_RESULTS = 12;
    const filteredItems = query.trim() === "" 
        ? [] 
        : SEARCHABLE_ITEMS.filter(item => {
            const name = item.name ? String(item.name).toLowerCase() : "";
            const desc = item.desc ? String(item.desc).toLowerCase() : "";
            const q = query.toLowerCase();
            return name.includes(q) || desc.includes(q);
          }).slice(0, MAX_RESULTS);

    const categories = filteredItems.filter(i => i.type === "category" || i.type === "subcategory");
    const garments = filteredItems.filter(i => i.type === "garment");

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md text-[var(--bone)] flex flex-col p-6 sm:p-10 lg:p-16 overflow-y-auto"
                >
                    {/* Header Controls */}
                    <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto mb-10 sm:mb-16">
                        <span className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[var(--champagne)]">
                            Search — Sunil Mehra Atelier
                        </span>
                        <button
                            onClick={onClose}
                            className="font-luxe text-[10px] uppercase tracking-[0.3em] hover:text-[var(--champagne)] border border-white/20 hover:border-[var(--champagne)] px-6 py-3 transition duration-300"
                        >
                            Close <span aria-hidden>×</span>
                        </button>
                    </div>

                    {/* Search Input Box */}
                    <div className="w-full max-w-[1200px] mx-auto">
                        <div className="border-b border-white/20 pb-4 flex items-center gap-4">
                            <svg className="w-6 h-6 text-white/50 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type to search wardrobe, collections, garments..."
                                className="bg-transparent border-none outline-none w-full text-xl sm:text-3xl lg:text-4xl font-light font-display text-white placeholder-white/30"
                            />
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="w-full max-w-[1200px] mx-auto mt-8 sm:mt-12 flex-1">
                        {query.trim() === "" ? (
                            <div className="text-white/40 text-xs sm:text-sm font-light space-y-4">
                                <p className="font-luxe uppercase tracking-[0.2em] text-[var(--champagne)]">Suggested Searches</p>
                                <div className="flex flex-wrap gap-3">
                                    {["Sherwani", "Bandhgala", "Kurta", "Suits", "Accessories", "Loafer"].map(term => (
                                        <button
                                            key={term}
                                            onClick={() => setQuery(term)}
                                            className="px-4 py-2 border border-white/10 hover:border-white/40 text-[10px] uppercase tracking-[0.2em] font-luxe transition"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Categories / Collections */}
                                <div>
                                    <h3 className="font-luxe text-xs uppercase tracking-[0.25em] text-[var(--champagne)] mb-4 pb-2 border-b border-white/10">
                                        Collections
                                    </h3>
                                    <div className="space-y-4">
                                        {categories.map((item, index) => (
                                            <Link 
                                                key={index} 
                                                to={item.to} 
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 border border-white/5 hover:border-white/25 bg-white/5 hover:bg-white/10 transition group"
                                            >
                                                <div className="w-16 aspect-[3/4] bg-white/10 overflow-hidden border border-white/10 shrink-0">
                                                    {item.img && <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />}
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-lg text-white group-hover:text-[var(--champagne)] transition">{item.name}</h4>
                                                    <p className="text-xs text-white/60 font-body mt-1">{item.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        {categories.length === 0 && (
                                            <p className="text-xs text-white/40 italic">No matching collections found.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Garments / Pieces */}
                                <div>
                                    <h3 className="font-luxe text-xs uppercase tracking-[0.25em] text-[var(--champagne)] mb-4 pb-2 border-b border-white/10">
                                        Individual Garments
                                    </h3>
                                    <div className="space-y-4">
                                        {garments.map((item, index) => (
                                            <Link 
                                                key={index} 
                                                to={item.to} 
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 border border-white/5 hover:border-white/25 bg-white/5 hover:bg-white/10 transition group"
                                            >
                                                <div className="w-16 aspect-[3/4] bg-white/10 overflow-hidden border border-white/10 shrink-0">
                                                    {item.img && <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />}
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-lg text-white group-hover:text-[var(--champagne)] transition">{item.name}</h4>
                                                    <p className="text-xs text-white/60 font-body mt-1">{item.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        {garments.length === 0 && (
                                            <p className="text-xs text-white/40 italic">No matching garments found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-white/40">
                                <p className="font-display text-xl font-light">No results found for "{query}"</p>
                                <p className="text-xs mt-2 font-body">Try searching for other keywords like "Sherwani", "Suits" or "Silk".</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
