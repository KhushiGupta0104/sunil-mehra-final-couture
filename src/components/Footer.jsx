import React from "react";
import ScrollReveal from "./ScrollReveal";
import logoImg from "@/assets/images/logo.jpg";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="bg-[var(--ink)] text-[var(--bone)] relative overflow-hidden"
            data-testid="site-footer"
        >
            <div className="grain" />

            {/* Large brand watermark */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
                <span
                    className="font-display text-[18vw] lg:text-[14vw] uppercase leading-none tracking-[0.1em] select-none whitespace-nowrap"
                    style={{ color: "rgba(250, 246, 239, 0.025)" }}
                >
                    SUNIL MEHRA
                </span>
            </div>

            <div className="relative z-10 max-w-[1300px] mx-auto px-6 sm:px-12 lg:px-20 pt-20 pb-10">
                {/* Main content */}
                <ScrollReveal variant="fade-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pb-16 border-b border-[rgba(250,246,239,0.08)]">
                        {/* Brand column */}
                        <div className="flex flex-col items-start py-1">
                            <img
                                src={logoImg}
                                alt="Sunil Mehra"
                                className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                                style={{ filter: "invert(1) contrast(120%) brightness(100%)", mixBlendMode: "screen" }}
                            />
                            <p className="font-italic-serif text-sm sm:text-base text-[var(--champagne)] mt-4 leading-relaxed max-w-sm" style={{ opacity: 0.7 }}>
                                Couture menswear, hand-finished in Delhi since 1984. Every thread tells a story.
                            </p>
                        </div>

                        {/* Contact details column */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                            <div>
                                <p className="font-luxe text-[10px] uppercase tracking-[0.25em] opacity-40 mb-3">
                                    Flagship Salon
                                </p>
                                <p className="font-body opacity-80 leading-relaxed">
                                    14 Sundar Nagar Market,<br />
                                    New Delhi, 110003, India
                                </p>
                            </div>
                            <div>
                                <p className="font-luxe text-[10px] uppercase tracking-[0.25em] opacity-40 mb-3">
                                    Correspondence
                                </p>
                                <p className="font-body opacity-80 leading-relaxed">
                                    T: +91 11 4150 1484<br />
                                    E: <a href="mailto:atelier@sunilmehra.com" className="hover:text-[var(--champagne)] transition">atelier@sunilmehra.com</a>
                                </p>
                                <div className="flex gap-4 font-luxe uppercase tracking-[0.25em] text-[10px] mt-4">
                                    <a href="https://www.instagram.com/sunilmehraart/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--champagne)] transition opacity-70 hover:opacity-100">
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs opacity-50">
                    <p>© Sunil Mehra Couture House 1984</p>
                    <div className="flex items-center gap-6">
                        <p className="font-italic-serif text-sm text-[var(--champagne)]">
                            Hand-finished in Delhi · Photographed in the Thar
                        </p>
                        {/* Back to top */}
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 rounded-full border border-[rgba(250,246,239,0.15)] hover:border-[var(--champagne)] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            aria-label="Back to top"
                        >
                            <svg className="w-4 h-4 text-[var(--bone)] opacity-60 group-hover:opacity-100 group-hover:text-[var(--champagne)] transition" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
