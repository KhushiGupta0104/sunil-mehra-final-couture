import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

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
                className="relative bg-[var(--cream)] min-h-screen lg:h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 py-8 lg:py-0"
                data-testid="salons-section"
            >
                <div className="max-w-[1150px] mx-auto w-full flex-1 flex flex-col justify-center py-6 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <ScrollReveal variant="fade-right">
                            <p className="eyebrow mb-5">The Salons</p>
                            <h2 className="h-display text-[8vw] sm:text-[6vw] lg:text-[4vw] leading-[1.15] mb-4">
                                By <span className="font-italic-serif italic">invitation.</span>
                            </h2>
                            <p className="text-[var(--ink-soft)] leading-relaxed max-w-md mb-6 text-sm">
                                Step inside our flagship salon in Sundar Nagar for a private consultation — espresso, fabric swatches, and the quiet of the atelier.
                            </p>
                            <a
                                href="#request-form"
                                className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] hover:text-white px-8 py-3.5 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 inline-block"
                            >
                                Request Appointment
                            </a>
                        </ScrollReveal>

                        {/* Single flagship salon card */}
                        <ScrollReveal variant="fade-left" delay={0.2}>
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
                                        Mon–Sat · 11:00 AM – 7:30 PM
                                    </p>
                                    <p className="text-xs text-[var(--bronze)] mt-1 font-italic-serif">
                                        Strictly by invitation or private appointment
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FRAME 2: Request Form (Private Fitting) */}
            <section
                id="request-form"
                className="relative bg-[var(--bone)] min-h-screen lg:h-screen w-full flex flex-col pt-[76px] sm:pt-[84px] lg:pt-[92px] pb-12 px-6 sm:px-10 lg:pb-5 lg:px-14 border-t border-[var(--hairline)] py-8 lg:py-0"
                data-testid="request-form-section"
            >
                <div className="max-w-[1150px] mx-auto w-full flex-1 flex flex-col justify-center py-6 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <ScrollReveal variant="fade-right">
                            <p className="eyebrow mb-5">Private Fitting</p>
                            <h2 className="h-display text-[8vw] sm:text-[6vw] lg:text-[4vw] leading-[1.15] mb-4">
                                Request an <span className="font-italic-serif italic">appointment.</span>
                            </h2>
                            <p className="text-[var(--ink-soft)] leading-relaxed mb-4 max-w-md text-sm">
                                Submit your details below, and our salon concierge will contact you within 24 hours to schedule your private fitting.
                            </p>
                            <div className="mt-6 pt-6 border-t border-[var(--hairline)] max-w-md">
                                <p className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--muted)] mb-3">
                                    Correspondence
                                </p>
                                <p className="text-xs sm:text-sm font-body text-[var(--ink-soft)]">
                                    T: +91 11 4150 1484<br />
                                    E: atelier@sunilmehra.com
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal variant="fade-left" delay={0.2}>
                            <div className="relative min-h-[350px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                            className="border border-[var(--bronze)] bg-[var(--bone)] p-8 sm:p-10 flex flex-col items-start rounded-sm w-full"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                                className="w-14 h-14 rounded-full border-2 border-[var(--bronze)] flex items-center justify-center mb-6"
                                            >
                                                <motion.svg
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ delay: 0.5, duration: 0.6 }}
                                                    className="w-6 h-6 text-[var(--bronze)]"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <motion.path
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ delay: 0.5, duration: 0.6 }}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m4.5 12.75 6 6 9-13.5"
                                                    />
                                                </motion.svg>
                                            </motion.div>
                                            <span className="font-luxe text-[10px] uppercase tracking-[0.25em] text-[var(--bronze)] mb-2">
                                                Request Received
                                            </span>
                                            <p className="font-display text-2xl text-[var(--ink)] mb-4">
                                                Thank you.
                                            </p>
                                            <p className="text-xs sm:text-sm text-[var(--ink-soft)] font-body leading-relaxed mb-6">
                                                Our atelier concierge has received your request. We will contact you at <span className="underline">{submittedEmail}</span> within 24 hours to coordinate your fitting.
                                            </p>
                                            <button
                                                onClick={() => setStatus(null)}
                                                className="text-[10px] uppercase tracking-[0.3em] font-luxe text-[var(--muted)] hover:text-[var(--ink)] transition border-b border-[var(--hairline-strong)] pb-1"
                                            >
                                                Submit Another Request
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full"
                                        >
                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="flex flex-col group">
                                                        <label className="font-luxe text-[10px] uppercase tracking-wider mb-2 text-[var(--muted)] group-focus-within:text-[var(--bronze)] transition-colors">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="bg-transparent border-b border-[var(--hairline-strong)] py-3 focus:border-[var(--bronze)] outline-none font-body text-sm text-[var(--ink)] transition-colors duration-300"
                                                            placeholder="Your Name"
                                                            required
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col group">
                                                        <label className="font-luxe text-[10px] uppercase tracking-wider mb-2 text-[var(--muted)] group-focus-within:text-[var(--bronze)] transition-colors">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="bg-transparent border-b border-[var(--hairline-strong)] py-3 focus:border-[var(--bronze)] outline-none font-body text-sm text-[var(--ink)] transition-colors duration-300"
                                                            placeholder="Your Email"
                                                            required
                                                            disabled={isSubmitting}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col group">
                                                    <label className="font-luxe text-[10px] uppercase tracking-wider mb-2 text-[var(--muted)] group-focus-within:text-[var(--bronze)] transition-colors">
                                                        Message / Preferred Fitting Time
                                                    </label>
                                                    <textarea
                                                        rows="3"
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        className="bg-transparent border-b border-[var(--hairline-strong)] py-3 focus:border-[var(--bronze)] outline-none font-body text-sm resize-none text-[var(--ink)] transition-colors duration-300"
                                                        placeholder="Let us know your preferred date and time for the fitting..."
                                                        required
                                                        disabled={isSubmitting}
                                                    ></textarea>
                                                </div>

                                                {status === "error" && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        className="text-xs text-red-600 bg-red-50 border border-red-200 p-3 rounded-sm font-body"
                                                    >
                                                        {errorMessage}
                                                    </motion.div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-[var(--bronze)] text-[var(--bone)] hover:bg-[var(--ink)] hover:text-white disabled:bg-[var(--muted)] disabled:cursor-not-allowed px-8 py-4 text-[10px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-[var(--bone)]"></span>
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        "Submit Request"
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}
