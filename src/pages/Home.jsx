import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/ui/Marquee";
import Featured from "@/components/sections/Featured";
import SectionDivider from "@/components/ui/SectionDivider";
import LookbookGrid from "@/components/wardrobe/LookbookGrid";
import HorizontalMediaScroll from "@/components/shared/HorizontalMediaScroll";
import AtelierShowcase from "@/components/wardrobe/AtelierShowcase";
import Designer from "@/components/sections/Designer";
import Manifesto from "@/components/sections/Manifesto";
import VerticalVideoTriptych from "@/components/shared/VerticalVideoTriptych";
import Salons from "@/components/sections/Salons";

const Home = () => {
    return (
        <PageLayout>
            <Hero />
            <Marquee />
            <Featured />
            <SectionDivider variant="diamond" className="py-4" />
            <LookbookGrid />
            <SectionDivider variant="dot" className="py-4" />
            <HorizontalMediaScroll />
            <SectionDivider variant="monogram" className="py-4" />
            <AtelierShowcase />
            <Designer />
            <SectionDivider variant="dot" className="py-4" />
            <Manifesto />
            <VerticalVideoTriptych />
            <Salons />
        </PageLayout>
    );
};

export default Home;
