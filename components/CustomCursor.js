'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Hide cursor on touch devices to prevent stuck interactive states
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const updateMousePosition = (e) => {
            if (!isVisible) setIsVisible(true);
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            // Check if hovering over clickable elements
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    const variants = {
        default: {
            x: mousePosition.x - 6,
            y: mousePosition.y - 6,
            width: 12,
            height: 12,
            backgroundColor: "rgba(255, 255, 255, 1)",
            mixBlendMode: "difference",
            transition: {
                type: "spring",
                mass: 0.1,
                stiffness: 700,
                damping: 30,
                restDelta: 0.001
            }
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            width: 48,
            height: 48,
            backgroundColor: "rgba(255, 255, 255, 0)",
            border: "1.5px solid rgba(255, 255, 255, 0.5)",
            mixBlendMode: "normal",
            transition: {
                type: "spring",
                mass: 0.1,
                stiffness: 800,
                damping: 25,
            }
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        /* Hide the default cursor only if fine pointer available */
        @media (pointer: fine) {
          body, a, button {
            cursor: none;
          }
        }
      `}} />
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[100]"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
            />
        </>
    );
}
