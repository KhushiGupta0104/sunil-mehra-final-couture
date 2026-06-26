import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        interest: "Bridal Couture",
        message: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: `[Phone: ${formData.phone} | Interest: ${formData.interest}] ${formData.message}`
                }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setIsSubmitted(true);
            } else {
                setErrorMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Failed to connect to the server. Please check your network connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="request-form" className="w-full bg-[var(--section-dark-bg)] text-[var(--bone)] min-h-screen pt-32 lg:pt-48 pb-20 lg:pb-32 relative overflow-hidden flex items-center">
            <div className="grain" />
            
            <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left: Copy */}
                    <div className="space-y-6 lg:space-y-8">
                        <div>
                            <span className="font-luxe text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[var(--champagne)] block">
                                Private Appointments
                            </span>
                        </div>
                        <div>
                            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--bone)] leading-[1.1]">
                                Step into the <br />
                                <span className="font-italic-serif italic text-[var(--champagne)]">Atelier.</span>
                            </h2>
                        </div>
                        <div>
                            <p className="text-sm sm:text-base text-[rgba(250,246,239,0.6)] leading-relaxed max-w-md font-light">
                                Reserve an exclusive session with our Master Tailors. From the first sketch to the final fitting, experience the pinnacle of bespoke Indian menswear.
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-8 pt-4">
                                <div className="space-y-1">
                                    <p className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[rgba(250,246,239,0.4)]">Flagship Salon</p>
                                    <p className="text-xs text-[var(--bone)]">14 Sundar Nagar Market,<br/>New Delhi 110003</p>
                                </div>
                                <div className="w-px h-10 bg-[rgba(250,246,239,0.1)]"></div>
                                <div className="space-y-1">
                                    <p className="font-luxe text-[9px] uppercase tracking-[0.3em] text-[rgba(250,246,239,0.4)]">Contact</p>
                                    <p className="text-xs text-[var(--bone)]">+91 11 4150 1484<br/>atelier@sunilmehra.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div>
                        <div className="bg-[rgba(250,246,239,0.03)] border border-[rgba(250,246,239,0.08)] p-8 sm:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--champagne)] opacity-[0.05] blur-3xl rounded-full" />
                            
                            {isSubmitted ? (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full border border-[var(--champagne)] flex items-center justify-center mb-4 text-[var(--champagne)]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <h3 className="font-display text-3xl text-[var(--bone)]">Request Received</h3>
                                    <p className="text-sm text-[rgba(250,246,239,0.6)] font-light max-w-xs">Our atelier concierges will contact you shortly to confirm your private appointment.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, staggerChildren: 0.1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                                    >
                                        <div className="relative group">
                                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] text-[var(--bone)] text-sm py-2 px-0 focus:ring-0 focus:border-[var(--champagne)] peer placeholder-transparent transition-colors" placeholder="Name" />
                                            <label htmlFor="name" className="absolute text-[11px] font-luxe tracking-[0.2em] uppercase text-[rgba(250,246,239,0.4)] duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--champagne)] peer-focus:scale-90 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Full Name *</label>
                                        </div>
                                        <div className="relative group">
                                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] text-[var(--bone)] text-sm py-2 px-0 focus:ring-0 focus:border-[var(--champagne)] peer placeholder-transparent transition-colors" placeholder="Email" />
                                            <label htmlFor="email" className="absolute text-[11px] font-luxe tracking-[0.2em] uppercase text-[rgba(250,246,239,0.4)] duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--champagne)] peer-focus:scale-90 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Email Address *</label>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                                    >
                                        <div className="relative group">
                                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] text-[var(--bone)] text-sm py-2 px-0 focus:ring-0 focus:border-[var(--champagne)] peer placeholder-transparent transition-colors" placeholder="Phone" />
                                            <label htmlFor="phone" className="absolute text-[11px] font-luxe tracking-[0.2em] uppercase text-[rgba(250,246,239,0.4)] duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[var(--champagne)] peer-focus:scale-90 peer-focus:-translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">Phone Number</label>
                                        </div>
                                        <div className="relative group">
                                            <select name="interest" id="interest" value={formData.interest} onChange={handleChange} className="block w-full bg-transparent border-0 border-b border-[rgba(250,246,239,0.2)] text-[var(--bone)] text-sm py-2 px-0 focus:ring-0 focus:border-[var(--champagne)] peer transition-colors appearance-none cursor-pointer">
                                                <option value="Bridal Couture" className="bg-[var(--ink)]">Bridal Couture</option>
                                                <option value="Bespoke Suit" className="bg-[var(--ink)]">Bespoke Suit</option>
                                                <option value="Bandhgala Set" className="bg-[var(--ink)]">Bandhgala Set</option>
                                                <option value="General Inquiry" className="bg-[var(--ink)]">General Inquiry</option>
                                            </select>
                                            <label htmlFor="interest" className="absolute text-[11px] font-luxe tracking-[0.2em] uppercase text-[rgba(250,246,239,0.4)] duration-300 transform -translate-y-6 scale-90 top-3 -z-10 origin-[0]">Area of Interest</label>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--bone)] opacity-50">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {errorMessage && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-xs text-red-500 font-body mb-4"
                                        >
                                            {errorMessage}
                                        </motion.div>
                                    )}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className="relative group pt-4"
                                    >
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full bg-[var(--champagne)] text-[var(--ink)] hover:bg-[var(--bone)] py-4 text-[11px] tracking-[0.3em] font-luxe uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? "Requesting..." : "Request Appointment"}
                                        </button>
                                    </motion.div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
