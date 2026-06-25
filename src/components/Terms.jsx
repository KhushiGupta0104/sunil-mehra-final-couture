import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function Terms() {
    return (
        <section className="bg-[var(--bone)] text-[var(--ink)] min-h-screen pt-32 lg:pt-40 pb-20 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]">
            <div className="max-w-3xl mx-auto">
                <ScrollReveal variant="fade-up">
                    <p className="font-luxe text-[10px] uppercase tracking-[0.4em] text-[var(--bronze)] mb-4">
                        Legal Information
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] mb-12 lg:mb-16">
                        Terms of <span className="font-italic-serif italic">Service</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={0.1}>
                    <div className="space-y-10 font-body text-sm sm:text-base leading-relaxed opacity-90 text-[var(--ink-soft)]">
                        <div>
                            <p>Welcome to Sunil Mehra.</p>
                            <p className="mt-4">
                                By accessing our website, placing an order, booking an appointment, or engaging with our services, you agree to be bound by the following Terms of Service.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">1. USE OF WEBSITE</h2>
                            <p>
                                The content presented on this website is intended for informational, inspirational, and purchasing purposes. Any unauthorized use, reproduction, distribution, or commercial exploitation of content, imagery, designs, or intellectual property is strictly prohibited.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">2. PRODUCTS & SERVICES</h2>
                            <p>
                                All creations featured on the website are subject to availability. Sunil Mehra reserves the right to modify, discontinue, or update products, collections, services, and pricing without prior notice.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">3. BESPOKE & CUSTOM ORDERS</h2>
                            <p>
                                Bespoke outfits and customized creations are crafted according to the specifications provided by the client. Once production has commenced, such orders cannot be cancelled, exchanged, or refunded.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">4. PRICING</h2>
                            <p>
                                Prices are subject to revision without prior notice. Applicable taxes, shipping charges, customs duties, and additional fees may be applied where relevant.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">5. INTELLECTUAL PROPERTY</h2>
                            <p>
                                All designs, artworks, sketches, photographs, graphics, branding elements, written content, and creative materials displayed on this website are the exclusive property of Sunil Mehra and may not be reproduced or used without prior written consent.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">6. LIMITATION OF LIABILITY</h2>
                            <p>
                                Sunil Mehra shall not be held liable for any indirect, incidental, consequential, or special damages arising from the use of this website, products, or services.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">7. GOVERNING LAW</h2>
                            <p>
                                These Terms shall be governed and interpreted in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
