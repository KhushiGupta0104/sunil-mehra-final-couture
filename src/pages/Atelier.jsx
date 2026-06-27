import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import BespokeJourney from "@/components/sections/BespokeJourney";

// Import local image
import img6602 from "@/assets/images/Suits/suit_7.jpg";

function AnimatedCounter({ target, label }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref}>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl text-[var(--ink)]"
            >
                {isInView ? target : "00"}
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-luxe text-[11px] tracking-[0.3em] uppercase text-[var(--muted)] mt-2"
            >
                {label}
            </motion.p>
        </div>
    );
}

export default function Atelier() {
    return (
        <div className="bg-[var(--bone)]">
            <section
                id="atelier"
                className="relative min-h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 py-8 lg:py-0"
                data-testid="atelier-section"
            >
            <div className="max-w-[1500px] mx-auto w-full flex-1 flex flex-col justify-center py-6 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <ScrollReveal variant="fade-right">
                        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[65vh] overflow-hidden border border-[var(--hairline-strong)]">
                            <img
                                src={img6602}
                                alt="The Atelier"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[var(--bone)]">
                                <p className="eyebrow !text-[var(--champagne)]">The Atelier</p>
                                <p className="font-luxe text-[11px] tracking-[0.32em] uppercase">
                                    Delhi Flagship
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div>
                        <ScrollReveal variant="fade-up">
                            <p className="eyebrow mb-6">A single hand</p>
                            <h2 className="h-display text-[8vw] sm:text-[6vw] lg:text-[4vw] leading-[1.15] mb-5">
                                A single hand, <br />
                                <span className="font-italic-serif italic">from start to finish.</span>
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-up" delay={0.15}>
                            <div className="grid grid-cols-3 gap-6 border-y border-[var(--hairline-strong)] py-7 mb-5">
                                <AnimatedCounter target="08" label="weeks" />
                                <AnimatedCounter target="03" label="fittings" />
                                <AnimatedCounter target="28" label="measurements" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-up" delay={0.25}>
                            <p className="text-[var(--ink-soft)] leading-relaxed mb-5 max-w-lg">
                                Begin your private appointment with our Master Tailor in
                                Delhi — by invitation, always. We sketch
                                in your story; the karigar gives it form.
                            </p>

                            <div className="flex flex-wrap items-center gap-8">
                                <Link
                                    to="/appointment"
                                    className="hairline-link"
                                    data-testid="atelier-book"
                                >
                                    Book Appointment <span aria-hidden>→</span>
                                </Link>
                                <Link
                                    to="/#manifesto"
                                    className="text-[11px] uppercase tracking-[0.32em] font-luxe text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
                                    data-testid="atelier-house"
                                >
                                    The House
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
            
            {/* The Timeline */}
            <BespokeJourney />
        </div>
    );
}
