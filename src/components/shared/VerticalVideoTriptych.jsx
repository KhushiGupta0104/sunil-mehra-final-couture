import React, { useRef, useEffect } from "react";

const VIDEOS = [
    { id: 1, src: "/SM 3.mp4" },
    { id: 2, src: "/Video 9 .mp4" },
    { id: 3, src: "/cover.mp4" },
];

function TriptychVideo({ src }) {
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
            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
        />
    );
}

export default function VerticalVideoTriptych() {
    return (
        <section className="w-full bg-black border-y border-[var(--hairline)]">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[80vh] lg:h-screen">
                {VIDEOS.map((video, index) => (
                    <div 
                        key={video.id} 
                        className={`relative w-full h-[60vh] md:h-full overflow-hidden ${
                            index !== 2 ? 'border-b md:border-b-0 md:border-r border-white/20' : ''
                        }`}
                    >
                        <TriptychVideo src={video.src} />
                        {/* Subtle overlay gradient at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    );
}
