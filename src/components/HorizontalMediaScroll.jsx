import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Translate x based on scroll progress
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[var(--section-dark-bg)] text-[var(--section-dark-text)]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="absolute top-10 lg:top-20 left-6 sm:left-10 lg:left-14 z-10 mix-blend-difference text-white">
                    <span className="font-luxe text-[10px] uppercase tracking-[0.3em] opacity-70 mb-2 block">
                        The Visual Archive
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl uppercase tracking-wider">
                        Editorial <span className="font-italic-serif italic opacity-80">Moments</span>
                    </h2>
                </div>
                
                <motion.div style={{ x }} className="flex gap-8 px-6 sm:px-10 lg:px-14 pt-20 pb-10 mt-16">
                    {galleryImages.map((item) => (
                        <div key={item.id} className="relative w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] h-[60vh] shrink-0 group">
                            <div className="w-full h-full overflow-hidden border border-white/10">
                                <img 
                                    src={item.src} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                                />
                            </div>
                            <div className="absolute -bottom-10 left-0 w-full flex flex-col pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                <h3 className="font-luxe text-xs uppercase tracking-[0.2em]">{item.title}</h3>
                                <p className="font-italic-serif text-[11px] text-white/50 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
