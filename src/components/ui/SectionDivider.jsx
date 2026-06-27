import React from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * SectionDivider — elegant ornamental divider between page sections.
 * @param {"diamond" | "dot" | "line" | "monogram"} variant
 * @param {boolean} dark — true when divider is on a dark background
 */
export default function SectionDivider({ variant = "diamond", dark = false, className = "" }) {
    const lineColor = dark ? "rgba(201, 180, 139, 0.3)" : "var(--hairline)";
    const accentColor = dark ? "var(--champagne)" : "var(--bronze)";

    return (
        <ScrollReveal variant="fade" duration={1.2} className={`w-full ${className}`}>
            <div className="flex items-center justify-center gap-0 py-2 max-w-[600px] mx-auto">
                {/* Left line */}
                <div
                    className="flex-1 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${lineColor})` }}
                />

                {/* Center element */}
                {variant === "diamond" && (
                    <div
                        className="w-2.5 h-2.5 rotate-45 mx-5 shrink-0"
                        style={{
                            border: `1px solid ${accentColor}`,
                            opacity: 0.7,
                        }}
                    />
                )}
                {variant === "dot" && (
                    <div
                        className="w-1.5 h-1.5 rounded-full mx-5 shrink-0"
                        style={{ background: accentColor, opacity: 0.6 }}
                    />
                )}
                {variant === "line" && (
                    <div className="mx-5 shrink-0 w-6 h-px" style={{ background: accentColor, opacity: 0.5 }} />
                )}
                {variant === "monogram" && (
                    <span
                        className="font-display text-sm mx-5 shrink-0 select-none"
                        style={{ color: accentColor, opacity: 0.5 }}
                    >
                        SM
                    </span>
                )}

                {/* Right line */}
                <div
                    className="flex-1 h-px"
                    style={{ background: `linear-gradient(to left, transparent, ${lineColor})` }}
                />
            </div>
        </ScrollReveal>
    );
}
