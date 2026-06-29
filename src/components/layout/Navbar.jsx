import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/images/logo.png";

export default function Navbar({ onMenuOpen, menuOpen, onSearchOpen }) {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastScrollYRef = useRef(0);
    const location = useLocation();

    // Check if current page should have a light background / dark text header at scroll 0
    const isLightHeaderPage = 
        location.pathname === "/atelier" ||
        location.pathname === "/gallery" ||
        location.pathname === "/faq" ||
        location.pathname === "/terms" ||
        location.pathname === "/privacy";

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const lastScrollY = lastScrollYRef.current;

            // Glassmorphism after scrolling past hero
            setScrolled(currentScrollY > 100);

            // Hide on scroll down, show on scroll up (only after 300px)
            if (currentScrollY > 300) {
                if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 5) {
                    setHidden(true);
                } else if (lastScrollY - currentScrollY > 5) {
                    setHidden(false);
                }
            } else {
                setHidden(false);
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Check if a link is active
    const isActive = (path) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex flex-col w-full transition-all duration-700 translate-y-0 ${
                (scrolled || isLightHeaderPage)
                    ? "glass text-[var(--ink)] border-b border-[var(--hairline)] py-0"
                    : "bg-transparent text-[var(--bone)] border-b border-transparent py-2"
            } ${hidden ? "-translate-y-full" : ""}`}
            data-testid="site-navbar"
        >
            {/* Top Tier: Brand Name + Search */}
            <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 pt-3 pb-1.5 sm:pt-4 sm:pb-2 flex items-center justify-between w-full">
                {/* Left — Empty spacer to maintain symmetry */}
                <div className="w-1/3" />

                {/* Center — Brand Signature Logo */}
                <Link to="/" className="flex flex-col items-center justify-center w-1/3 py-1" data-testid="navbar-brand">
                    <img
                        src={logoImg}
                        alt="Sunil Mehra"
                        className={`h-6 sm:h-8 lg:h-10 w-auto object-contain transition-all duration-700 ${(scrolled || isLightHeaderPage) ? "opacity-90" : "brightness-0 invert opacity-90"}`}
                    />
                </Link>

                {/* Right — Search Button */}
                <div className="flex items-center justify-end text-[10px] text-current w-1/3">
                    <button
                        onClick={onSearchOpen}
                        className="hover:opacity-60 transition flex items-center justify-center"
                        aria-label="Search"
                    >
                        <svg className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-current" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Bottom Tier: Navigation */}
            <div className="border-t border-inherit w-full transition-colors duration-700">
                <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 py-2.5 text-[10px] uppercase tracking-[0.3em] font-luxe text-current">
                    {/* Index trigger */}
                    <button
                        onClick={onMenuOpen}
                        className="flex items-center gap-2 group hover:opacity-60 transition"
                        data-testid="navbar-menu-btn"
                        aria-label="Open menu"
                    >
                        <span className={`burger ${menuOpen ? "open" : ""}`} style={{ gap: "4px", width: "18px" }}>
                            <span style={{ height: "1px" }}></span>
                            <span style={{ height: "1px" }}></span>
                        </span>
                        <span className="font-luxe text-[10px] uppercase tracking-[0.3em]">
                            Index
                        </span>
                    </button>

                    <Link
                        to="/wardrobe"
                        className={`hidden lg:inline-block hover:opacity-60 transition relative ${
                            isActive("/wardrobe") ? "text-[var(--bronze)]" : ""
                        }`}
                    >
                        Wardrobe
                        {isActive("/wardrobe") && (
                            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--bronze)]" />
                        )}
                    </Link>
                    <Link
                        to="/gallery"
                        className={`hidden lg:inline-block hover:opacity-60 transition relative ${
                            isActive("/gallery") ? "text-[var(--bronze)]" : ""
                        }`}
                    >
                        Gallery
                        {isActive("/gallery") && (
                            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--bronze)]" />
                        )}
                    </Link>
                    <Link to="/#designer" className="hidden lg:inline-block hover:opacity-60 transition">
                        About Us
                    </Link>
                    <Link to="/#salons" className="hidden lg:inline-block hover:opacity-60 transition">
                        Salons
                    </Link>
                    <Link to="/appointment" className="hover:opacity-60 transition font-medium text-[var(--bronze)]">
                        Book Appointment
                    </Link>
                </div>
            </div>
        </header>
    );
}
