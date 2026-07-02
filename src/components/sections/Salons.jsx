import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Link } from "react-router-dom";

export default function Salons() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus(null);
        setErrorMessage("");

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setSubmittedEmail(email);
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Failed to connect to the server. Please check your network connection.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            {/* FRAME 1: The Store (Delhi Flagship card) */}
            <section
                id="store"
                className="relative bg-[var(--bone)] min-h-screen lg:h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 py-8 lg:py-0"
                data-testid="store-section"
            >
                <div className="max-w-[1150px] mx-auto w-full flex-1 flex flex-col justify-center py-6 lg:py-0">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <p className="eyebrow mb-5">The Store</p>
                            <h2 className="h-display text-[8vw] sm:text-[6vw] lg:text-[4vw] leading-[1.15] mb-4">
                                By <span className="font-italic-serif italic">invitation.</span>
                            </h2>
                            <p className="text-[var(--ink-soft)] leading-relaxed max-w-md mb-6 text-sm">
                                Step inside our flagship store in GK 1 for a private consultation — espresso, fabric swatches, and the quiet of the studio.
                            </p>
                            <Link
                                to="/appointment"
                                className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] hover:text-white px-8 py-3.5 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                            >
                                Request Appointment
                            </Link>
                        </div>

                        {/* Single flagship store card */}
                        <div>
                            <div className="border border-[var(--hairline-strong)] p-8 sm:p-10 bg-[var(--bone)] flex flex-col justify-between group hover:shadow-xl transition-all duration-700 rounded-sm hover:-translate-y-1">
                                <div>
                                    <span className="eyebrow !text-[var(--bronze)] mb-4">Flagship Store</span>
                                    <p className="font-display text-3xl sm:text-4xl leading-none text-[var(--ink)] mt-2">
                                        New Delhi
                                    </p>
                                    <p className="font-italic-serif text-base sm:text-lg text-[var(--ink-soft)] mt-4 leading-relaxed">
                                        M-66 GK 1, M block market,<br />
                                        New Delhi, 110048, India
                                    </p>
                                    <a 
                                        href="https://maps.app.goo.gl/kubpUDgiKZ1HwBo77" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-block mt-4 text-xs sm:text-[13px] tracking-[0.25em] font-luxe uppercase text-[var(--bronze)] hover:text-[var(--ink)] transition-colors border-b border-[var(--bronze)] pb-0.5"
                                    >
                                        View on Map · Directions
                                    </a>
                                </div>
                                <div className="mt-6 pt-6 border-t border-[var(--hairline)]">
                                    <p className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                                        Hours & Access
                                    </p>
                                    <p className="text-xs text-[var(--ink-soft)] mt-2 font-body tracking-wide">
                                        Mon–Sun · 11:00 AM – 7:30 PM (Tuesdays Closed)
                                    </p>
                                    <p className="text-xs text-[var(--bronze)] mt-1 font-italic-serif">
                                        By invitation or appointment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}
