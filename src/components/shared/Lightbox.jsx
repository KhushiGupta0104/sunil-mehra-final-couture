import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ 
    isOpen, 
    onClose, 
    imageSrc, 
    imageAlt, 
    title, 
    subtitle, 
    onNext, 
    onPrev,
    indexInfo
}) {
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchEndX.current = e.targetTouches[0].clientX; // Reset end to start on new touch
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diffX = touchStartX.current - touchEndX.current;
        // swipe left -> next (drag right-to-left)
        if (diffX > 50 && onNext) {
            onNext();
        }
        // swipe right -> prev (drag left-to-right)
        if (diffX < -50 && onPrev) {
            onPrev();
        }
        // reset refs
        touchStartX.current = 0;
        touchEndX.current = 0;
    };
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && onNext) onNext();
            if (e.key === 'ArrowLeft' && onPrev) onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onNext, onPrev]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[var(--section-dark-bg)]/98 backdrop-blur-2xl"
                >
                    {/* Grain overlay */}
                    <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

                    {/* Top Bar */}
                    <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-20 pointer-events-none">
                        <div className="flex flex-col gap-2 pointer-events-auto">
                            {title && (
                                <motion.span 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="font-luxe text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--champagne)]"
                                >
                                    {title}
                                </motion.span>
                            )}
                            {indexInfo && (
                                <motion.span 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="font-luxe text-[9px] uppercase tracking-[0.2em] text-[var(--bone)]/50"
                                >
                                    {indexInfo}
                                </motion.span>
                            )}
                        </div>

                        <button
                            onClick={onClose}
                            className="pointer-events-auto group flex items-center justify-center w-12 h-12 rounded-full hover:bg-[rgba(250,246,239,0.05)] transition-colors duration-500"
                            aria-label="Close lightbox"
                        >
                            <X size={24} strokeWidth={1} className="text-[var(--bone)] group-hover:text-[var(--champagne)] transition-colors duration-500" />
                        </button>
                    </div>

                    {/* Navigation Click Areas (Left/Right 15% of screen) */}
                    {onPrev && (
                        <button 
                            onClick={onPrev}
                            className="absolute left-0 top-0 w-[15vw] h-full z-10 flex items-center justify-start pl-4 md:pl-10 group cursor-pointer"
                        >
                            <div className="flex items-center justify-center text-[var(--bone)]/30 group-hover:text-[var(--champagne)] transition-all duration-500 transform group-hover:-translate-x-2">
                                <ChevronLeft size={40} strokeWidth={1} />
                            </div>
                        </button>
                    )}
                    
                    {onNext && (
                        <button 
                            onClick={onNext}
                            className="absolute right-0 top-0 w-[15vw] h-full z-10 flex items-center justify-end pr-4 md:pr-10 group cursor-pointer"
                        >
                            <div className="flex items-center justify-center text-[var(--bone)]/30 group-hover:text-[var(--champagne)] transition-all duration-500 transform group-hover:translate-x-2">
                                <ChevronRight size={40} strokeWidth={1} />
                            </div>
                        </button>
                    )}

                    {/* Image Container */}
                    <div className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-24 pt-20 pb-10 z-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={imageSrc}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="relative max-w-full flex-shrink flex items-center justify-center"
                            >
                                <img
                                    src={imageSrc}
                                    alt={imageAlt || "View image"}
                                    className="max-w-full max-h-[75vh] object-contain drop-shadow-2xl select-none"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom Subtitle / Info */}
                        {subtitle && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 text-center px-6 pointer-events-none shrink-0"
                            >
                                <p className="font-display text-[var(--bone)] text-lg md:text-xl font-light tracking-wide drop-shadow-md">
                                    {subtitle}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
