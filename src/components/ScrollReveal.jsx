import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const VARIANTS = {
    "fade-up": {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-scale": {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
    },
    "fade": {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

/**
 * ScrollReveal — wraps any content with a scroll-triggered entrance animation.
 *
 * @param {string}  variant    - "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-scale" | "fade"
 * @param {number}  delay      - seconds to wait before animating (default 0)
 * @param {number}  duration   - animation duration in seconds (default 0.8)
 * @param {number}  threshold  - how much of the element must be visible (0-1, default 0.15)
 * @param {boolean} once       - only animate once (default true)
 * @param {string}  className  - additional CSS classes
 * @param {string}  as         - HTML element type (default "div")
 */
export default function ScrollReveal({
    children,
    variant = "fade-up",
    delay = 0,
    duration = 0.8,
    threshold = 0.15,
    once = true,
    className = "",
    as = "div",
    style,
    ...rest
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
    });

    const v = VARIANTS[variant] || VARIANTS["fade-up"];

    const Component = motion[as] || motion.div;

    return (
        <Component
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={v}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
            style={style}
            {...rest}
        >
            {children}
        </Component>
    );
}

/**
 * StaggerReveal — container that staggers its children's entrance.
 * Each direct child should be wrapped in a motion element or ScrollReveal.
 */
export function StaggerReveal({
    children,
    staggerDelay = 0.1,
    threshold = 0.1,
    once = true,
    className = "",
    ...rest
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount: threshold,
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerItem — child element for use inside StaggerReveal.
 */
export function StaggerItem({
    children,
    variant = "fade-up",
    duration = 0.7,
    className = "",
    ...rest
}) {
    const v = VARIANTS[variant] || VARIANTS["fade-up"];
    return (
        <motion.div
            variants={v}
            transition={{
                duration,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={className}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
