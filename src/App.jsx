import { useEffect, lazy, Suspense } from "react";
import "@/index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import PageLoader from "@/components/ui/PageLoader";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home"));
const Wardrobe = lazy(() => import("@/pages/Wardrobe"));
const Atelier = lazy(() => import("@/pages/Atelier"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Editorial = lazy(() => import("@/pages/Editorial"));
const WardrobeCategoryDetail = lazy(() => import("@/pages/WardrobeCategoryDetail"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Faq = lazy(() => import("@/pages/Faq"));
const BookingWizard = lazy(() => import("@/pages/BookingWizard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                const timer = setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
                return () => clearTimeout(timer);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToHash />
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/appointment" element={<PageLayout><BookingWizard /></PageLayout>} />
                    <Route path="/wardrobe" element={<PageLayout><Wardrobe /></PageLayout>} />
                    <Route path="/wardrobe/:categorySlug" element={<PageLayout><WardrobeCategoryDetail /></PageLayout>} />
                    <Route path="/wardrobe/:categorySlug/:subCategorySlug" element={<PageLayout><WardrobeCategoryDetail /></PageLayout>} />
                    <Route path="/atelier" element={<PageLayout><Atelier /></PageLayout>} />
                    <Route path="/gallery" element={<PageLayout><Gallery /></PageLayout>} />
                    <Route path="/editorial" element={<PageLayout><Editorial /></PageLayout>} />
                    <Route path="/terms" element={<PageLayout><Terms /></PageLayout>} />
                    <Route path="/privacy" element={<PageLayout><Privacy /></PageLayout>} />
                    <Route path="/faq" element={<PageLayout><Faq /></PageLayout>} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
