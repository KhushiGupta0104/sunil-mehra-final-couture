import React from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/images/logo.png";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="bg-[var(--ink)] text-[var(--bone)] relative overflow-hidden"
            data-testid="site-footer"
        >
            <div className="grain opacity-50" />

            {/* Large brand watermark - Increased opacity for visibility */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
                <span
                    className="font-display text-[18vw] lg:text-[16vw] uppercase leading-[0.8] tracking-[0.05em] select-none whitespace-nowrap text-[var(--bone)] opacity-[0.04]"
                >
                    SUNIL MEHRA
                </span>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 pt-24 pb-8">
                
                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start pb-16 border-b border-[var(--bone)] border-opacity-20">
                    
                    {/* Column 1: Brand (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col items-start pr-4">
                        <img
                            src={logoImg}
                            alt="Sunil Mehra"
                            className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-100"
                        />
                        <p className="font-italic-serif text-sm sm:text-base text-[var(--champagne)] mt-6 leading-relaxed opacity-90">
                            Couture menswear, hand-finished in Delhi since 1984. Every thread tells a story.
                        </p>
                    </div>

                    {/* Column 2: Newsletter (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col items-start lg:pl-8">
                        <p className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--bone)] opacity-50 mb-4">
                            The Society
                        </p>
                        <p className="font-body text-sm text-[var(--bone)] opacity-90 leading-relaxed mb-6 max-w-sm">
                            Subscribe for exclusive invitations to private collections and editorial features.
                        </p>
                        <form className="w-full max-w-sm flex items-center border-b border-[var(--bone)] border-opacity-30 pb-3 group focus-within:border-opacity-100 transition-colors">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="bg-transparent border-none outline-none text-sm w-full text-[var(--bone)] placeholder-[var(--bone)] placeholder-opacity-40"
                                required
                            />
                            <button type="submit" className="text-[10px] uppercase tracking-[0.2em] font-luxe text-[var(--champagne)] hover:text-white transition-colors ml-4 shrink-0">
                                Join
                            </button>
                        </form>
                    </div>

                    {/* Column 3: Flagship (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col items-start">
                        <p className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--bone)] opacity-50 mb-4">
                            Flagship Salon
                        </p>
                        <p className="font-body text-sm text-[var(--bone)] opacity-90 leading-relaxed">
                            14 Sundar Nagar Market,<br />
                            New Delhi, 110003,<br />
                            India
                        </p>
                    </div>

                    {/* Column 4: Correspondence (3 cols) */}
                    <div className="lg:col-span-3 flex flex-col items-start lg:items-end lg:text-right">
                        <p className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--bone)] opacity-50 mb-4">
                            Correspondence
                        </p>
                        <p className="font-body text-sm text-[var(--bone)] opacity-90 leading-relaxed">
                            T: +91 11 4150 1484<br />
                            E: <a href="mailto:atelier@sunilmehra.com" className="hover:text-[var(--champagne)] transition-colors underline underline-offset-4 decoration-[var(--bone)] decoration-opacity-30 hover:decoration-opacity-100">atelier@sunilmehra.com</a>
                        </p>
                        <div className="mt-6 flex gap-4 font-luxe uppercase tracking-[0.25em] text-[10px]">
                            <a href="https://www.instagram.com/sunilmehraart/" target="_blank" rel="noopener noreferrer" className="text-[var(--champagne)] hover:text-white transition-colors">
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--bone)] opacity-70">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <p className="font-body tracking-wide">© Sunil Mehra Couture House 1984</p>
                        <div className="flex gap-5 uppercase font-luxe tracking-[0.2em] text-[9px]">
                            <Link to="/terms" className="hover:text-[var(--champagne)] transition-colors">Terms</Link>
                            <Link to="/privacy" className="hover:text-[var(--champagne)] transition-colors">Privacy</Link>
                            <Link to="/faq" className="hover:text-[var(--champagne)] transition-colors">FAQ</Link>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <p className="font-italic-serif text-[13px] text-[var(--champagne)] opacity-90">
                            Hand-finished in Delhi · Photographed in the Thar
                        </p>
                        <button
                            onClick={scrollToTop}
                            className="w-10 h-10 rounded-full border border-[var(--bone)] border-opacity-30 hover:border-[var(--champagne)] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group bg-[var(--ink)]"
                            aria-label="Back to top"
                        >
                            <svg className="w-4 h-4 text-[var(--bone)] group-hover:text-[var(--champagne)] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
