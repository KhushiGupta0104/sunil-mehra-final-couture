import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Manifesto() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

    const quote =
        "We do not chase seasons. We chase silhouette, drape, and the small architectures inside a coat that you can only feel when it is on.";
    const words = quote.split(" ");

    return (
        <section
            id="manifesto"
            ref={sectionRef}
            className="relative bg-[var(--section-dark-bg)] text-[var(--bone)] h-screen w-full flex flex-col overflow-hidden"
            data-testid="manifesto-section"
        >
            <div className="grain" />

            {/* Subtle background texture — dark fabric feel */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(201,180,139,0.15) 0%, transparent 70%),
                                      radial-gradient(ellipse at 70% 50%, rgba(201,180,139,0.08) 0%, transparent 60%)`,
                }}
            />

            <div className="relative z-10 max-w-[1200px] mx-auto w-full h-full flex flex-col justify-center text-center px-6 sm:px-10">
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="eyebrow !text-[var(--champagne)] justify-center mb-8 sm:mb-10"
                >
                    The House Manifesto
                </motion.p>

                {/* Opening quotation mark */}
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[var(--champagne)] font-display text-5xl sm:text-6xl lg:text-7xl leading-none mb-4 select-none"
                    style={{ opacity: 0.7 }}
                >
                    "
                </motion.span>

                {/* Word-by-word reveal */}
                <p className="font-italic-serif text-[6vw] sm:text-[4.5vw] lg:text-[3.2vw] leading-[1.3] tracking-tight max-w-4xl mx-auto">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.5,
                                delay: 0.5 + i * 0.06,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="inline-block mr-[0.3em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </p>

                {/* Closing quotation mark */}
                <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                        duration: 1,
                        delay: 0.5 + words.length * 0.06 + 0.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-[var(--champagne)] font-display text-5xl sm:text-6xl lg:text-7xl leading-none mt-4 select-none"
                    style={{ opacity: 0.7 }}
                >
                    "
                </motion.span>

                {/* Attribution — slides in after quote completes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.8,
                        delay: 0.5 + words.length * 0.06 + 0.5,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="mt-10 flex items-center justify-center gap-4"
                >
                    <span className="w-10 h-px bg-[var(--champagne)] opacity-50" />
                    <p className="font-luxe uppercase text-[10px] sm:text-[11px] tracking-[0.4em] text-[var(--bone)] opacity-70">
                        Sunil Mehra · Founder
                    </p>
                    <span className="w-10 h-px bg-[var(--champagne)] opacity-50" />
                </motion.div>
            </div>
        </section>
    );
}
