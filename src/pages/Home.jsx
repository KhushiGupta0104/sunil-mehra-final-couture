import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/sections/Hero";
import Featured from "@/components/sections/Featured";
import SectionDivider from "@/components/ui/SectionDivider";
import LookbookGrid from "@/components/wardrobe/LookbookGrid";
import HorizontalMediaScroll from "@/components/shared/HorizontalMediaScroll";
import AtelierShowcase from "@/components/wardrobe/AtelierShowcase";
import Designer from "@/components/sections/Designer";
import Manifesto from "@/components/sections/Manifesto";
import VerticalVideoTriptych from "@/components/shared/VerticalVideoTriptych";
import StoreSection from "@/components/sections/Salons";

const Home = () => {
    return (
        <PageLayout>
            <Hero />
            <Featured />
            <SectionDivider variant="diamond" className="py-4" />
            <LookbookGrid />
            <SectionDivider variant="dot" className="py-4" />
            <HorizontalMediaScroll />
            <SectionDivider variant="monogram" className="py-4" />
            <AtelierShowcase />
            <VerticalVideoTriptych />
            <Designer />
            <SectionDivider variant="dot" className="py-4" />
            <Manifesto />
            <StoreSection />
        </PageLayout>
    );
};

export default Home;
