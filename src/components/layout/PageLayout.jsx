import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import OverlayMenu from "@/components/layout/OverlayMenu";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Footer from "@/components/layout/Footer";

const PageLayout = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="bg-[var(--bone)] min-h-screen flex flex-col justify-between" data-testid="page-layout">
            <Navbar
                menuOpen={menuOpen}
                onMenuOpen={() => setMenuOpen(true)}
                onSearchOpen={() => setSearchOpen(true)}
            />
            <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default PageLayout;
