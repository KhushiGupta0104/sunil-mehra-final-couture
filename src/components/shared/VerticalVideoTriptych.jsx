import React, { useRef, useEffect } from "react";

const VIDEOS = [
    { id: 1, src: "/SM 3.mp4", startTime: 0, endTime: 14 },
    { id: 2, src: "/REEL 3 SM C2.mp4", startTime: 0, endTime: 26 },
    { id: 3, src: "/Video 14.mp4", startTime: 0, endTime: 26 }, // We can adjust these start times as needed
];

function TriptychVideo({ src, startTime = 0, endTime }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let isInitialized = false;

        const setInitialTime = () => {
            if (!isInitialized && startTime > 0) {
                video.currentTime = startTime;
                isInitialized = true;
            }
        };

        if (video.readyState >= 1) {
            setInitialTime();
        } else {
            video.addEventListener("loadedmetadata", setInitialTime);
        }

        const handleTimeUpdate = () => {
            // Loop back to startTime instead of 0 or when it exceeds endTime
            const limit = endTime !== undefined ? endTime : video.duration - 0.2;
            if (video.currentTime >= limit) {
                video.currentTime = startTime;
                video.play().catch(err => console.log("Video loop play interrupted", err));
            }
        };

        video.addEventListener("timeupdate", handleTimeUpdate);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (video.currentTime < startTime) {
                        video.currentTime = startTime;
                    }
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
            video.removeEventListener("loadedmetadata", setInitialTime);
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [src, startTime, endTime]);

    return (
        <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-700"
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
                        <TriptychVideo src={video.src} startTime={video.startTime} endTime={video.endTime} />
                        {/* Subtle overlay gradient at bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    );
}
