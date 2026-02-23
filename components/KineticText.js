'use client';

import { motion } from 'framer-motion';

export default function KineticText({ text, className = "", delay = 0 }) {
    const splitText = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: () => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay * 0.1 },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 50,
            rotate: 5,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", zIndex: 10 }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={className}
        >
            {splitText.map((word, index) => (
                <span key={index} style={{ display: "inline-block", marginRight: "0.25em" }}>
                    {Array.from(word).map((letter, i) => (
                        <motion.span
                            variants={child}
                            key={i}
                            style={{ display: "inline-block" }}
                            className="hover:text-primary transition-colors duration-300"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.div>
    );
}
