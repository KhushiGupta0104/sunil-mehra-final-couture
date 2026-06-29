import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ui/ScrollReveal";

function OccasionVideo({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(err => console.log("Video play interrupted", err));
                } else {
                    video.pause();
                }
            },
            { threshold: 0.05 }
        );

        observer.observe(video);
        return () => {
            observer.unobserve(video);
        };
    }, []);

    return (
        <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
    );
}

export default function OccasionEdit() {
    const OCCASIONS = [
        {
            id: "carnival",
            title: "Carnival",
            subtitle: "Where joy wears its finest",
            video: "/REEL 3 SM C2.mp4",
            link: "/wardrobe/kurta-sets",
        },
        {
            id: "sangeet",
            title: "Sangeet",
            subtitle: "Dance floor royalty",
            video: "/REEL 7 SM C2.mp4",
            link: "/wardrobe/jawahar-jackets",
        },
        {
            id: "wedding",
            title: "Wedding",
            subtitle: "Where tradition meets splendor",
            video: "/REEL 10 SM C2.mp4",
            link: "/wardrobe/bandhagala-indo-western",
        },
    ];

    return (
        <section
            id="occasion-edit"
            className="w-full flex flex-col bg-[var(--bone)]"
            data-testid="occasion-edit-section"
        >
            {/* Header section */}
            <ScrollReveal variant="fade-up" className="text-center py-16 sm:py-20 md:py-24 px-6">
                <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[var(--bronze)] block mb-3">
                    THE OCCASION EDIT
                </span>
                <h2 className="font-italic-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)] italic font-light mb-3">
                    Where Every Occasion Finds Its Outfit
                </h2>
                <div className="w-12 h-px bg-[var(--bronze)] mx-auto mt-4" style={{ opacity: 0.4 }} />
            </ScrollReveal>

            {/* Parallel columns layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full bg-black overflow-hidden">
                {OCCASIONS.map((occ, idx) => (
                    <Link
                        key={occ.id}
                        to={occ.link}
                        className="group relative flex flex-col justify-end overflow-hidden h-[65vh] md:h-[85vh] lg:h-[90vh] border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0 border-white/10"
                        data-testid={`occasion-${occ.id}`}
                    >
                        {/* Video Layer */}
                        <div className="absolute inset-0 w-full h-full bg-[var(--bone)] overflow-hidden">
                            <OccasionVideo src={occ.video} />
                        </div>

                        {/* Vignette + Gradient for drama */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20 opacity-90 transition-opacity duration-700 group-hover:from-black/70 group-hover:via-black/25" />
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                            }}
                        />

                        {/* Title text overlay at bottom */}
                        <div className="relative z-10 w-full text-center pb-14 sm:pb-18 flex flex-col items-center justify-center pointer-events-none">
                            {/* Subtitle — appears on hover on desktop, always visible on mobile */}
                            <span className="font-italic-serif text-sm text-white/70 md:text-white/0 group-hover:text-white/80 transition-all duration-700 mb-3 tracking-wide">
                                {occ.subtitle}
                            </span>
                            <span className="font-luxe text-xs sm:text-sm uppercase tracking-[0.35em] text-white relative pb-2 border-b border-white/40 group-hover:border-[var(--champagne)] group-hover:text-[var(--champagne)] transition-all duration-500">
                                {occ.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
