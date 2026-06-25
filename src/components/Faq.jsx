import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const FAQ_DATA = [
    {
        question: "Are the outfits featured on the website ready to purchase?",
        answer: "Yes. Most creations featured on our website are available in standard sizes and are ready for purchase. Select styles may also be customized upon request."
    },
    {
        question: "Do you offer bespoke services?",
        answer: "Yes. Sunil Mehra offers bespoke consultations and personalized tailoring services for clients seeking a truly individual experience."
    },
    {
        question: "How long does delivery take?",
        answer: "Delivery timelines vary depending on the outfit and level of customization. Our team will provide an estimated timeline at the time of order confirmation."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes. We offer worldwide shipping."
    },
    {
        question: "Can I exchange or return my order?",
        answer: "As many of our creations involve handcrafted detailing and customization, exchanges and returns are generally not accepted. Please refer to our policy section for complete details."
    },
    {
        question: "How can I book an appointment?",
        answer: "Appointments can be scheduled through our website, Instagram, or by contacting our studio directly."
    },
    {
        question: "Where is your store located?",
        answer: "Sunil Mehra is located at: M-66, 1st Floor, Greater Kailash-1 Market, New Delhi – 110048, India. We also have a Flagship Salon at 14 Sundar Nagar Market, New Delhi, 110003, India."
    },
    {
        question: "Can outfits be customized?",
        answer: "Yes. Select creations may be customized in terms of fit, detailing, and design elements, subject to consultation."
    },
    {
        question: "How should I care for my outfit?",
        answer: "To preserve the craftsmanship and integrity of the outfit, we recommend professional dry cleaning only."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept Credit Cards, Debit Cards, UPI, Net Banking, and other secure payment methods available on our website."
    },
    {
        question: "Is Cash on Delivery available?",
        answer: "No. Cash on Delivery (COD) is currently not available. All orders must be prepaid through the available payment methods."
    },
    {
        question: "Do you host private consultations?",
        answer: "Yes. Private consultations may be arranged by appointment for bespoke creations, wardrobe planning, and special occasions."
    },
    {
        question: "Does Sunil Mehra only create menswear?",
        answer: "While Sunil Mehra is renowned for luxury menswear, the brand's creative vision extends beyond fashion into the world of art, storytelling, and immersive experiences. Through initiatives such as FRAMES OF MAGIC – FLUTE Art Gallery, Sunil Mehra explores a broader dialogue between craftsmanship, devotion, culture, and artistic expression, creating experiences that transcend the boundaries of clothing and celebrate creativity in its many forms."
    }
];

export default function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-[var(--bone)] text-[var(--ink)] min-h-screen pt-32 lg:pt-40 pb-20 px-6 sm:px-10 lg:px-14 border-t border-[var(--hairline)]">
            <div className="max-w-3xl mx-auto">
                <ScrollReveal variant="fade-up">
                    <p className="font-luxe text-[10px] uppercase tracking-[0.4em] text-[var(--bronze)] mb-4">
                        Client Care
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.05em] mb-12 lg:mb-16">
                        Frequently Asked <span className="font-italic-serif italic">Questions</span>
                    </h1>
                </ScrollReveal>

                <ScrollReveal variant="fade-up" delay={0.1}>
                    <div className="space-y-4">
                        {FAQ_DATA.map((faq, index) => (
                            <div 
                                key={index} 
                                className="border-b border-[var(--hairline)] pb-4"
                            >
                                <button
                                    className="w-full flex justify-between items-center text-left py-4 outline-none focus:outline-none"
                                    onClick={() => toggleOpen(index)}
                                >
                                    <h3 className="font-luxe text-xs sm:text-sm uppercase tracking-[0.1em] text-[var(--ink)] pr-8">
                                        {faq.question}
                                    </h3>
                                    <span className="text-[var(--bronze)] text-xl font-light">
                                        {openIndex === index ? "−" : "+"}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="font-body text-sm sm:text-base text-[var(--ink-soft)] pb-6 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
