import React, { useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CinematicWideReel() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section
            id="cinematic-wide-reel"
            className="w-full bg-[var(--ink)] py-16 sm:py-24 overflow-hidden border-t border-white/10"
        >
            <div className="max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14 space-y-12">
                
                {/* Header */}
                <ScrollReveal variant="fade-up">
                    <div className="pb-4 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[var(--champagne)] block mb-2">
                                Cinematic Showcase
                            </span>
                            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.05em] text-white">
                                The <span className="font-italic-serif italic text-[var(--champagne)]">Landscape Film.</span>
                            </h2>
                        </div>
                        <p className="font-italic-serif text-sm text-[var(--section-dark-muted)] max-w-sm">
                            A high-definition look at the movement, drape, and light on the seasonal fabrics in motion.
                        </p>
                    </div>
                </ScrollReveal>

                {/* 21:9 Widescreen video display */}
                <ScrollReveal variant="fade-up" className="relative w-full aspect-[21/9] bg-black border border-white/10 shadow-2xl group overflow-hidden">
                    <video
                        ref={videoRef}
                        src="/Video 14.mov"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-85"
                    />

                    {/* Bottom Control bar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 sm:p-10 pointer-events-none">
                        <div className="flex items-center justify-between w-full pointer-events-auto">
                            <div>
                                <span className="font-luxe text-[8px] uppercase tracking-[0.3em] text-[var(--champagne)]">
                                    House Campaign
                                </span>
                                <h3 className="font-display text-white text-base sm:text-lg uppercase tracking-wider mt-1">
                                    Sunil Mehra Art & Couture
                                </h3>
                            </div>
                            <button
                                onClick={togglePlay}
                                className="px-6 py-3 border border-white/20 hover:border-[var(--champagne)] text-white hover:text-[var(--champagne)] font-luxe text-[9px] uppercase tracking-[0.2em] transition duration-300 bg-black/40 backdrop-blur-sm"
                            >
                                {isPlaying ? "Pause Campaign" : "Play Campaign"}
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
