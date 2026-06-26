import React from "react";
import designerImg from "@/assets/images/enhanced image Sunil mehra.png";
import ScrollReveal from "./ScrollReveal";

export default function Designer() {
    return (
        <section
            id="designer"
            className="relative bg-[var(--bone)] text-[var(--ink)] py-16 lg:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden"
            data-testid="designer-section"
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                style={{
                    backgroundImage: `radial-gradient(circle at 80% 20%, rgba(201,180,139,0.3) 0%, transparent 50%)`
                }} 
            />

            <div className="max-w-[1200px] mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Image Column */}
                    <div className="lg:col-span-5 relative">
                        <ScrollReveal variant="fade-up">
                            <div className="relative w-full max-w-[380px] mx-auto aspect-[3/4] overflow-hidden bg-[var(--ink)] border border-[var(--hairline)] shadow-xl group p-1.5">
                                {/* Inner framing for a vintage photo look */}
                                <div className="relative w-full h-full overflow-hidden border border-[rgba(250,246,239,0.1)]">
                                    <img
                                        src={designerImg}
                                        alt="Sunil Mehra — The Designer"
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] grayscale contrast-125 sepia-[0.15] brightness-90"
                                    />
                                    {/* Overlay gradient for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                                </div>
                            </div>
                        </ScrollReveal>
                        
                        {/* Decorative element behind image */}
                        <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 border-l border-b border-[var(--bronze)] opacity-30" />
                        <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 border-r border-t border-[var(--bronze)] opacity-30" />
                    </div>

                    {/* Text Column */}
                    <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center space-y-8">
                        <ScrollReveal variant="fade-up" delay={0.1}>
                            <div className="relative">
                                <span className="font-luxe text-[9px] uppercase tracking-[0.35em] text-[var(--bronze)] block mb-4">
                                    Maison — The Designer
                                </span>
                                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--ink)] leading-[0.9] mb-3">
                                    Sunil <br className="hidden sm:block" />
                                    <span className="font-italic-serif italic text-[var(--ink-soft)]">Mehra</span>
                                </h2>
                                <h3 className="font-luxe uppercase tracking-[0.2em] text-[9px] sm:text-[10px] text-[var(--muted)] mb-2 mt-6">
                                    Where Couture Meets Divinity
                                </h3>
                            </div>
                        </ScrollReveal>

                        <div className="space-y-4 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-[var(--bronze)] before:opacity-30 pl-6 sm:pl-8">
                            <ScrollReveal variant="fade-up" delay={0.2}>
                                <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed max-w-lg font-body">
                                    For over four decades, the Mehra family has been synonymous with timeless Indian couture. Building upon the celebrated legacy of Study by Janak, Sunil Mehra established his bespoke menswear atelier with a singular vision: to create garments that embody elegance, individuality, and meaning.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal variant="fade-up" delay={0.3}>
                                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-lg font-body">
                                    From meticulously tailored bandhgalas and regal sherwanis to elevated occasion wear, each piece is crafted using exceptional fabrics sourced globally. Every garment reflects an uncompromising commitment to precision and personal expression.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal variant="fade-up" delay={0.4}>
                                <p className="text-xs sm:text-sm text-[var(--ink-soft)] leading-relaxed max-w-lg font-body">
                                    Today, alongside Karan Mehra, the next generation of the brand, Sunil Mehra continues to evolve this legacy for the modern gentleman while preserving the values that have defined it for decades.
                                </p>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal variant="fade-up" delay={0.5}>
                            <div className="pt-6 border-t border-[var(--hairline)] max-w-lg">
                                <p className="font-italic-serif text-sm sm:text-base text-[var(--ink)] opacity-90 leading-relaxed">
                                    "More than a couture house, Sunil Mehra is a celebration of artistry, heritage, and individuality — where every thread tells a story."
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
