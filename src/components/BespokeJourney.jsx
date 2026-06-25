import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const STEPS = [
    {
        no: "01",
        title: "Private Consultation",
        description: "Your journey begins with a virtual or in-person session at our Sundar Nagar flagship salon. We discuss your event requirements, aesthetic preferences, and style silhouette while browsing through premium fabric swatches.",
        details: "espresso & private fitting suite · 60 minutes"
    },
    {
        no: "02",
        title: "Design & Drapery",
        description: "We select exceptional fabrics sourced globally—raw silk, cashmeres, or fine linens—and draft custom sketches of your garment. A trial muslin (toile) is built to establish the initial contours and drape.",
        details: "hand-drawn illustrations & test fittings"
    },
    {
        no: "03",
        title: "Master Handcrafting",
        description: "The approved design is assigned to a single master karigar. Every thread, bead, and embroidery stitch is done strictly by hand, using centuries-old Indian methods like zardozi, aari, and dabka.",
        details: "40–80 hours of meticulous hand-embroidery"
    },
    {
        no: "04",
        title: "Fitting & Delivery",
        description: "A final fitting is scheduled to make micro-adjustments to the drape. Once perfected, your custom couture garment is steam-pressed and packaged in our signature garment casing, ready for your milestone day.",
        details: "final adjustment & luxury packaging"
    }
];

function StepCard({ step, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="group flex gap-6 sm:gap-10 pb-10 border-b border-[rgba(250,246,239,0.08)] last:border-b-0 last:pb-0 relative"
        >
            {/* Timeline connector line */}
            {index < STEPS.length - 1 && (
                <div
                    className="absolute left-[18px] sm:left-[22px] top-[50px] w-px bottom-0"
                    style={{
                        background: "linear-gradient(to bottom, var(--champagne), transparent)",
                        opacity: 0.15,
                    }}
                />
            )}

            {/* Step Number */}
            <div className="shrink-0 relative">
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-4xl sm:text-5xl text-[var(--champagne)] opacity-60 group-hover:opacity-100 transition-opacity duration-500 select-none"
                >
                    {step.no}
                </motion.div>
            </div>

            {/* Step Info */}
            <div className="space-y-3">
                <h3 className="font-luxe text-base sm:text-lg uppercase tracking-wider text-[var(--bone)] transition-colors duration-300 group-hover:text-[var(--champagne)]">
                    {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[rgba(250,246,239,0.6)] leading-relaxed font-light">
                    {step.description}
                </p>
                <p className="font-italic-serif text-xs text-[var(--champagne)] italic pt-1" style={{ opacity: 0.6 }}>
                    — {step.details}
                </p>
            </div>
        </motion.div>
    );
}

export default function BespokeJourney() {
    return (
        <section
            id="bespoke-journey"
            className="w-full bg-[var(--section-dark-bg)] text-[var(--bone)] pt-20 pb-24 lg:pt-28 lg:pb-36 relative overflow-hidden"
            data-testid="bespoke-journey-section"
        >
            {/* Background texture */}
            <div className="grain" />
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(201,180,139,0.2) 0%, transparent 60%)",
                }}
            />

            <div className="relative z-10 max-w-[1500px] mx-auto w-full px-6 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Sticky Column */}
                    <div className="lg:col-span-5 lg:sticky lg:top-[140px] lg:self-start space-y-6">
                        <ScrollReveal variant="fade-up">
                            <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[var(--champagne)] block">
                                THE BESPOKE EXPERIENCE
                            </span>
                        </ScrollReveal>
                        <ScrollReveal variant="fade-up" delay={0.15}>
                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] text-[var(--bone)] leading-[1.1]">
                                A Journey in <br />
                                <span className="font-italic-serif italic capitalize text-[var(--champagne)]">Craftsmanship.</span>
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal variant="fade-up" delay={0.25}>
                            <p className="text-xs sm:text-sm text-[rgba(250,246,239,0.55)] leading-relaxed max-w-md font-light">
                                At Sunil Mehra, couture is not merely about fashion; it is a process of devotion, legacy, and precision. We balance historical craftsmanship with modern cuts to create garments that belong solely to you.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-up" delay={0.35}>
                            <div className="pt-4">
                                <a
                                    href="#request-form"
                                    className="bg-[var(--champagne)] text-[var(--ink)] hover:bg-[var(--bone)] px-8 py-4 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                                >
                                    Book Consultation
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right Scrolling Column */}
                    <div className="lg:col-span-7 space-y-12 lg:space-y-16">
                        {STEPS.map((step, idx) => (
                            <StepCard key={step.no} step={step} index={idx} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
