import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import designerImg from "@/assets/images/enhanced image Sunil mehra.png";

export default function Designer() {
    const quoteRef = useRef(null);
    const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 });

    return (
        <section
            id="designer"
            className="relative bg-[var(--bone)] text-[var(--ink)] min-h-screen lg:h-auto w-full py-20 lg:py-32 px-6 sm:px-10 lg:px-14"
            data-testid="designer-section"
        >
            <div className="max-w-[1500px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">

                    {/* Visual Column */}
                    <ScrollReveal variant="fade-right" className="lg:col-span-5 flex justify-center lg:sticky lg:top-[120px]">
                        <div className="relative w-full max-w-[450px] aspect-[1.1/1] lg:aspect-auto lg:h-[65vh] overflow-hidden bg-[var(--cream)] border border-[var(--hairline)] shadow-sm">
                            <img
                                src={designerImg}
                                alt="Sunil Mehra — The Designer"
                                loading="lazy"
                                className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                            <div className="grain" />
                        </div>
                    </ScrollReveal>

                    {/* Text Column */}
                    <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                        <ScrollReveal variant="fade-up">
                            <span className="eyebrow block mb-2">Maison — The Designer</span>
                            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl font-light mb-1">
                                Sunil Mehra
                            </h2>
                            <h3 className="font-italic-serif text-lg sm:text-xl text-[var(--bronze)] mb-2">
                                Where Couture Meets Divinity
                            </h3>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-up" delay={0.1}>
                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl font-light">
                                For over four decades, the Mehra family has been synonymous with timeless Indian couture. Building upon the celebrated legacy of Study by Janak, Sunil Mehra established his bespoke menswear atelier in New Delhi with a singular vision: to create garments that embody elegance, individuality, and meaning.
                            </p>
                        </ScrollReveal>

                        {/* Pull-quote — the cinematic moment */}
                        <div ref={quoteRef}>
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={quoteInView ? { opacity: 1, scaleX: 1 } : {}}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="border-l-2 border-[var(--bronze)] pl-6 py-4 my-2 origin-left"
                            >
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={quoteInView ? { opacity: 1 } : {}}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="font-italic-serif text-xl sm:text-2xl text-[var(--ink)] leading-relaxed"
                                >
                                    Inspired by the eternal love and harmony of Lord Krishna and Goddess Radha, every creation is designed with intention.
                                </motion.p>
                            </motion.div>
                        </div>

                        <ScrollReveal variant="fade-up" delay={0.15}>
                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl font-light">
                                From meticulously tailored bandhgalas and regal sherwanis to elevated occasion wear and refined accessories, each piece is crafted using exceptional fabrics sourced from around the world. Every garment reflects a commitment to quality, precision, and personal expression.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-up" delay={0.2}>
                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-2xl font-light">
                                Today, alongside Karan Mehra, the next generation of the brand, Sunil Mehra continues to evolve this legacy for the modern gentleman while preserving the values that have defined it for decades.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-up" delay={0.25}>
                            <div className="pt-3 border-t border-[var(--hairline)]">
                                <p className="font-italic-serif text-sm text-[var(--ink)]">
                                    More than a couture house, Sunil Mehra is a celebration of artistry, heritage, and individuality — where every thread tells a story.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
