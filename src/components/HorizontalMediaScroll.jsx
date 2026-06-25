import React from "react";
import ScrollReveal, { StaggerReveal, StaggerItem } from "./ScrollReveal";

// Import uploaded images
import img1 from "@/assets/images/Sunil Mehra 0156.jpg";
import img2 from "@/assets/images/Sunil Mehra  0553.jpg";
import img3 from "@/assets/images/Sunil Mehra_0904.jpg";
import img4 from "@/assets/images/IMG9371 copy.jpg";
import img5 from "@/assets/images/Sunil Mehra_3721.jpg";
import img6 from "@/assets/images/Sunil Mehra_6602.jpg";
import img7 from "@/assets/images/Sunil Mehra 0239.jpg";

const galleryImages = [
    { id: 1, src: img1, title: "The Sartorial Eye", desc: "Precision tailoring in motion." },
    { id: 2, src: img2, title: "Modern Heritage", desc: "Classic lines, contemporary fabric." },
    { id: 3, src: img3, title: "Bespoke Details", desc: "Every stitch tells a story." },
    { id: 4, src: img4, title: "Evening Silhouette", desc: "Elegance for the golden hour." },
    { id: 5, src: img5, title: "The Artisan Touch", desc: "Hand-finished perfection." },
    { id: 6, src: img6, title: "Quiet Luxury", desc: "Subtle mastery of form." },
    { id: 7, src: img7, title: "Signature Presence", desc: "The mark of a gentleman." },
];

export default function HorizontalMediaScroll() {
    return (
        <section className="relative bg-[var(--section-dark-bg)] text-[var(--section-dark-text)] py-20 lg:py-32">
            <ScrollReveal variant="fade-up" className="px-6 sm:px-10 lg:px-14 mb-16 lg:mb-24">
                <span className="font-luxe text-[10px] uppercase tracking-[0.3em] opacity-70 mb-2 block">
                    The Visual Archive
                </span>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl uppercase tracking-wider">
                    Editorial <span className="font-italic-serif italic opacity-80">Moments</span>
                </h2>
            </ScrollReveal>
            
            <StaggerReveal staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 px-6 sm:px-10 lg:px-14">
                {galleryImages.map((item) => (
                    <StaggerItem key={item.id} variant="fade-up" className="relative group">
                        <div className="w-full aspect-[4/5] overflow-hidden border border-white/10">
                            <img 
                                src={item.src} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                            />
                        </div>
                        <div className="mt-6 flex flex-col">
                            <h3 className="font-luxe text-xs uppercase tracking-[0.2em]">{item.title}</h3>
                            <p className="font-italic-serif text-[12px] text-white/50 mt-1">{item.desc}</p>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerReveal>
        </section>
    );
}
