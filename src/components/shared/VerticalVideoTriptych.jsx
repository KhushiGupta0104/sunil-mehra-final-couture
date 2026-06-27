import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const VIDEOS = [
    { id: 1, src: "/REEL 3 SM C2.mp4" },
    { id: 2, src: "/REEL 7 SM C2.mp4" },
    { id: 3, src: "/REEL 10 SM C2.mp4" },
];

export default function VerticalVideoTriptych() {
    return (
        <section className="w-full bg-black border-y border-[var(--hairline)]">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full h-[60vh] md:h-[80vh] lg:h-screen">
                {VIDEOS.map((video, index) => (
                    <div 
                        key={video.id} 
                        className={`relative w-full h-full overflow-hidden ${
                            index !== 2 ? 'border-b md:border-b-0 md:border-r border-white/20' : ''
                        }`}
                    >
                        <video
                            src={video.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                        />
                        {/* Subtle overlay gradient at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    );
}
