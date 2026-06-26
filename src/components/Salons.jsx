import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
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
            {/* FRAME 1: The Salons (Delhi Flagship card) */}
            <section
                id="salons"
                className="relative bg-[var(--bone)] min-h-screen lg:h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 py-8 lg:py-0"
                data-testid="salons-section"
            >
                <div className="max-w-[1150px] mx-auto w-full flex-1 flex flex-col justify-center py-6 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div>
                            <p className="eyebrow mb-5">The Salons</p>
                            <h2 className="h-display text-[8vw] sm:text-[6vw] lg:text-[4vw] leading-[1.15] mb-4">
                                By <span className="font-italic-serif italic">invitation.</span>
                            </h2>
                            <p className="text-[var(--ink-soft)] leading-relaxed max-w-md mb-6 text-sm">
                                Step inside our flagship salon in Sundar Nagar for a private consultation — espresso, fabric swatches, and the quiet of the atelier.
                            </p>
                            <Link
                                to="/appointment"
                                className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] hover:text-white px-8 py-3.5 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                            >
                                Request Appointment
                            </Link>
                        </div>

                        {/* Single flagship salon card */}
                        <div>
                            <div className="border border-[var(--hairline-strong)] p-8 sm:p-10 bg-[var(--bone)] flex flex-col justify-between group hover:shadow-xl transition-all duration-700 rounded-sm hover:-translate-y-1">
                                <div>
                                    <span className="eyebrow !text-[var(--bronze)] mb-4">Flagship Salon</span>
                                    <p className="font-display text-3xl sm:text-4xl leading-none text-[var(--ink)] mt-2">
                                        New Delhi
                                    </p>
                                    <p className="font-italic-serif text-base sm:text-lg text-[var(--ink-soft)] mt-4 leading-relaxed">
                                        14 Sundar Nagar Market,<br />
                                        New Delhi, 110003, India
                                    </p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-[var(--hairline)]">
                                    <p className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
                                        Hours & Access
                                    </p>
                                    <p className="text-xs text-[var(--ink-soft)] mt-2 font-body tracking-wide">
                                        Mon–Sat · 11:30 AM – 5:00 PM
                                    </p>
                                    <p className="text-xs text-[var(--bronze)] mt-1 font-italic-serif">
                                        Strictly by invitation or private appointment
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
