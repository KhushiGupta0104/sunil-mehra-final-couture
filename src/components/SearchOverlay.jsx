import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import local images for search result thumbnails
import img3721 from "@/assets/images/Sunil Mehra  0966.jpg";
import img0493 from "@/assets/images/Sunil Mehra  0493.jpg";
import img0904 from "@/assets/images/Sunil Mehra_0904.jpg";
import img9371 from "@/assets/images/Bandhagla/sunil_mehra_3591.jpg";
import img0246 from "@/assets/images/Sunil Mehra  0246.jpg";
import img8657 from "@/assets/images/IMG8657 copy.jpg";
import img0039 from "@/assets/images/Sunil Mehra_6620 - Copy.jpg";
import img2281 from "@/assets/images/Sunil Mehra 0278.jpg";
import img0553 from "@/assets/images/Sunil Mehra  0553.jpg";
import jacket1 from "@/assets/images/Sunil Mehra_6586 - Copy.jpg";
import winterCover from "@/assets/images/Sunil Mehra 0932.jpg";

// Accessories covers
import bagCover from "@/assets/images/Accessories/Bags/Sunil Mehra_7074.jpg";
import broachCover from "@/assets/images/Accessories/Broach/IMG_9595 copy 2 - Copy.jpg";
import laceCover from "@/assets/images/Accessories/Brooks Lace up/IMG_9312 copy 2 - Copy.jpg";
import loaferCover from "@/assets/images/Accessories/Loafers/IMG_9284 copy 2 - Copy.jpg";
import monkCover from "@/assets/images/Accessories/Monks/IMG_9521 copy 2 - Copy.jpg";
import walletCover from "@/assets/images/Accessories/Ostrich Leather Wallet/IMG_9738 copy 2.jpg";
import sneakerCover from "@/assets/images/Accessories/Sneakers/IMG_9420 copy 2 - Copy.jpg";

const SEARCHABLE_ITEMS = [
    // Wardrobe categories
    {
        type: "wardrobe",
        name: "Bandhagla Sets & Indo-western",
        desc: "Tailored Royalty — structured Bandhgalas and classic Sherwanis",
        img: img0493,
        to: "/wardrobe/bandhagala-indo-western"
    },
    {
        type: "wardrobe",
        name: "Kurta Sets",
        desc: "Quiet Luxury — hand-woven silk kurtas",
        img: img0904,
        to: "/wardrobe/kurta-sets"
    },
    {
        type: "wardrobe",
        name: "Jawahar Jacket Sets",
        desc: "Modern Maharaja — hand-crafted Nehru jackets and sadris",
        img: jacket1,
        to: "/wardrobe/jawahar-jackets"
    },
    {
        type: "wardrobe",
        name: "Winter Collection",
        desc: "Princely Silhouettes — structured coats and layers",
        img: winterCover,
        to: "/wardrobe/winter-collection"
    },
    {
        type: "wardrobe",
        name: "Suits",
        desc: "Sharply Cut — premium wool luxury suits",
        img: img8657,
        to: "/wardrobe/suits"
    },
    {
        type: "wardrobe",
        name: "Accessories",
        desc: "Finishing Details — bespoke luxury accessories hub",
        img: bagCover,
        to: "/wardrobe/accessories"
    },
    {
        type: "wardrobe",
        name: "Bags",
        desc: "Atelier Accessories — bespoke leather travel luggage, portfolios, and document cases",
        img: bagCover,
        to: "/wardrobe/accessories/bags"
    },
    {
        type: "wardrobe",
        name: "Brooches",
        desc: "Atelier Accessories — intricately detailed gold crests and pin emblems",
        img: broachCover,
        to: "/wardrobe/accessories/brooches"
    },
    {
        type: "wardrobe",
        name: "Lace-ups",
        desc: "Atelier Accessories — hand-crafted formal oxfords and derbies in premium skins",
        img: laceCover,
        to: "/wardrobe/accessories/lace-ups"
    },
    {
        type: "wardrobe",
        name: "Loafers",
        desc: "Atelier Accessories — suede slip-ons, tassel loafers, and heritage penny loafers",
        img: loaferCover,
        to: "/wardrobe/accessories/loafers"
    },
    {
        type: "wardrobe",
        name: "Monks",
        desc: "Atelier Accessories — classic single and double strap burnished leather monk shoes",
        img: monkCover,
        to: "/wardrobe/accessories/monks"
    },
    {
        type: "wardrobe",
        name: "Wallets",
        desc: "Atelier Accessories — bespoke ostrich leather billfolds and cardholders",
        img: walletCover,
        to: "/wardrobe/accessories/wallets"
    },
    {
        type: "wardrobe",
        name: "Sneakers",
        desc: "Atelier Accessories — minimalist calfskin, textured suede, and premium sport runners",
        img: sneakerCover,
        to: "/wardrobe/accessories/sneakers"
    },
    // Featured pieces
    {
        type: "featured",
        name: "Mirage Silk Kurta Set",
        desc: "Couture Collection — Ivory silk blend",
        img: img3721,
        to: "/#featured"
    },
    {
        type: "featured",
        name: "Bone Silk Kurta Set",
        desc: "Spring Edit — pure raw bone silk",
        img: img0039,
        to: "/#featured"
    },
    {
        type: "featured",
        name: "Classic Atelier Kurta",
        desc: "Daily Atelier — luxury linen comfort",
        img: img2281,
        to: "/#featured"
    },
    {
        type: "featured",
        name: "Dune Bandhgala",
        desc: "Chapter II — rich earth ochre wool",
        img: img0493,
        to: "/#featured"
    },
    {
        type: "featured",
        name: "Sand Linen Jodhpuri",
        desc: "Chapter II — princely light beige linen",
        img: img0246,
        to: "/#featured"
    },
    {
        type: "featured",
        name: "Indigo Couture Sherwani",
        desc: "Chapter II — deep indigo ceremonial fit",
        img: img9371,
        to: "/#featured"
    }
];

export default function SearchOverlay({ open, onClose }) {
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

    const filteredItems = query.trim() === "" 
        ? [] 
        : SEARCHABLE_ITEMS.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) || 
            item.desc.toLowerCase().includes(query.toLowerCase())
          );

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
                                    {["Sherwani", "Bandhgala", "Kurta Sets", "Suits", "Indigo", "Ivory"].map(term => (
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
                                {/* Wardrobe Results */}
                                <div>
                                    <h3 className="font-luxe text-xs uppercase tracking-[0.25em] text-[var(--champagne)] mb-4 pb-2 border-b border-white/10">
                                        Wardrobe Sections
                                    </h3>
                                    <div className="space-y-4">
                                        {filteredItems.filter(i => i.type === "wardrobe").map((item, index) => (
                                            <Link 
                                                key={index} 
                                                to={item.to} 
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 border border-white/5 hover:border-white/25 bg-white/5 hover:bg-white/10 transition group"
                                            >
                                                <div className="w-16 aspect-[3/4] bg-white/10 overflow-hidden border border-white/10 shrink-0">
                                                    <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-lg text-white group-hover:text-[var(--champagne)] transition">{item.name}</h4>
                                                    <p className="text-xs text-white/60 font-body mt-1">{item.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        {filteredItems.filter(i => i.type === "wardrobe").length === 0 && (
                                            <p className="text-xs text-white/40 italic">No matching wardrobe sections found.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Collection Results */}
                                <div>
                                    <h3 className="font-luxe text-xs uppercase tracking-[0.25em] text-[var(--champagne)] mb-4 pb-2 border-b border-white/10">
                                        Curated Pieces
                                    </h3>
                                    <div className="space-y-4">
                                        {filteredItems.filter(i => i.type === "featured").map((item, index) => (
                                            <Link 
                                                key={index} 
                                                to={item.to} 
                                                onClick={onClose}
                                                className="flex items-center gap-4 p-3 border border-white/5 hover:border-white/25 bg-white/5 hover:bg-white/10 transition group"
                                            >
                                                <div className="w-16 aspect-[3/4] bg-white/10 overflow-hidden border border-white/10 shrink-0">
                                                    <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-lg text-white group-hover:text-[var(--champagne)] transition">{item.name}</h4>
                                                    <p className="text-xs text-white/60 font-body mt-1">{item.desc}</p>
                                                </div>
                                            </Link>
                                        ))}
                                        {filteredItems.filter(i => i.type === "featured").length === 0 && (
                                            <p className="text-xs text-white/40 italic">No matching featured pieces found.</p>
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
