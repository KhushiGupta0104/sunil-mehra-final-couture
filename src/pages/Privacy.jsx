import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Privacy() {
    return (
        <section className="bg-[var(--bone)] text-[var(--ink)] min-h-screen pt-32 lg:pt-40 pb-20 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]">
            <div className="max-w-3xl mx-auto">
                <ScrollReveal variant="fade-up">
                    <p className="font-luxe text-[10px] uppercase tracking-[0.4em] text-[var(--bronze)] mb-4">
                        Legal Information
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] mb-12 lg:mb-16">
                        Privacy <span className="font-italic-serif italic">Policy</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={0.1}>
                    <div className="space-y-10 font-body text-sm sm:text-base leading-relaxed opacity-90 text-[var(--ink-soft)]">
                        <div>
                            <p>
                                At Sunil Mehra, we value discretion, trust, and the privacy of our clients. We are committed to safeguarding the information you share with us and ensuring it is handled responsibly and securely.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">INFORMATION WE COLLECT</h2>
                            <p className="mb-2">We may collect:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Name</li>
                                <li>Email Address</li>
                                <li>Phone Number</li>
                                <li>Billing & Shipping Address</li>
                                <li>Appointment Details</li>
                                <li>Payment Information</li>
                                <li>Website Usage Data</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">HOW WE USE YOUR INFORMATION</h2>
                            <p className="mb-2">Your information may be used to:</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Process and fulfil orders</li>
                                <li>Schedule consultations and appointments</li>
                                <li>Provide customer support and assistance</li>
                                <li>Share order confirmations and delivery updates</li>
                                <li>Improve our website and client experience</li>
                                <li>Inform you about new collections, exhibitions, launches, and exclusive events</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">DATA SECURITY</h2>
                            <p>
                                We employ appropriate security measures to protect personal information from unauthorized access, disclosure, misuse, or alteration.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">THIRD-PARTY SERVICES</h2>
                            <p>
                                We may engage trusted third-party providers for payment processing, logistics, analytics, and website operations. These providers are required to maintain strict confidentiality and security standards.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">COOKIES</h2>
                            <p>
                                Our website may use cookies to enhance functionality, improve performance, and deliver a seamless browsing experience.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">YOUR RIGHTS</h2>
                            <p>
                                You may request access, correction, or deletion of your personal information by contacting us directly.
                            </p>
                        </div>

                        <div>
                            <h2 className="font-luxe text-xs uppercase tracking-[0.2em] text-[var(--ink)] mb-4">POLICY UPDATES</h2>
                            <p>
                                Sunil Mehra reserves the right to revise this Privacy Policy at any time. Any updates will be published on this page.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
