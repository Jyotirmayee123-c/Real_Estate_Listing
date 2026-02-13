"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef, useMemo, useEffect, useState } from "react"

export default function ScrollHorizontal() {
    const containerRef = useRef(null)
    const [dimensions, setDimensions] = useState({
        itemWidth: 400,
        gap: 30
    })

    // Update dimensions based on screen size
    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 640) {
                // Mobile
                setDimensions({ itemWidth: 280, gap: 15 })
            } else if (window.innerWidth < 1024) {
                // Tablet
                setDimensions({ itemWidth: 340, gap: 20 })
            } else {
                // Desktop
                setDimensions({ itemWidth: 400, gap: 30 })
            }
        }

        updateDimensions()
        window.addEventListener('resize', updateDimensions)
        return () => window.removeEventListener('resize', updateDimensions)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    // Calculate the correct horizontal scroll distance
    const totalDistance = useMemo(() => {
        return (items.length - 1) * (dimensions.itemWidth + dimensions.gap)
    }, [dimensions])

    const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance])

    return (
        <div id="example">
            <section className="intro-section">
                <div className="intro-content">
                    <h1 className="impact">Our Services</h1>
                    <p className="subtitle">
                        Your complete real estate solution partner
                    </p>
                    <div className="services-tagline">
                        <span className="tagline-text">Buy • Sell • Rent • Renovate • Design</span>
                    </div>
                </div>
            </section>

            <div ref={containerRef} className="scroll-container">
                <div className="sticky-wrapper">
                    <div className="gallery-start-position"></div>
                    <motion.div className="gallery" style={{ x }}>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="gallery-item"
                                style={
                                    {
                                        "--item-color": item.color,
                                        "--item-image": `url(${item.image})`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="item-content">
                                    <span className="item-number">0{item.id}</span>
                                    <h2>{item.label}</h2>
                                    <p className="item-description">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <section className="outro-section bg-[#1a1a2e]">
                <div className="outro-content">
                    <h2 className="outro-title">Ready to Begin Your Journey?</h2>
                    <p className="outro-description">
                        Contact us today for personalized assistance with all your real estate needs.
                    </p>
                    <button className="outro-button">
                        Get Free Consultation
                    </button>
                </div>
            </section>

            <StyleSheet dimensions={dimensions} />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet({ dimensions }: { dimensions: { itemWidth: number; gap: number } }) {
    return (
        <style>{`
            * {
                box-sizing: border-box;
            }

            body {
                overflow-x: hidden;
                background: #1a1a2e;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 0;
            }

            #example {
                height: auto;
                overflow: visible;
                width: 100%;
            }

            /* Intro Section Styles */
            .intro-section {
                height: 60vh;
                min-height: 400px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                padding: 40px 20px;
                background: linear-gradient(135deg, #1a1a2e 0%, #2a1b69 100%);
                position: relative;
                overflow: hidden;
            }

            .intro-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent);
            }

            .intro-content {
                max-width: 90%;
                margin: 0 auto;
                position: relative;
                z-index: 2;
                padding: 0 15px;
            }

            .impact {
                font-size: clamp(32px, 8vw, 82px);
                color: #ffffff;
                margin: 0 0 15px 0;
                text-transform: uppercase;
                font-weight: 800;
                letter-spacing: -1px;
                line-height: 1.1;
                text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .subtitle {
                font-size: clamp(14px, 3vw, 24px);
                color: rgba(255, 255, 255, 0.85);
                margin-bottom: 20px;
                line-height: 1.6;
                font-weight: 300;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
                padding: 0 10px;
            }

            .services-tagline {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
                font-size: clamp(14px, 2.5vw, 18px);
                color: rgba(255, 255, 255, 0.7);
                font-weight: 500;
                padding: 0 10px;
            }

            .tagline-text {
                display: inline-block;
            }

            .services-tagline::before,
            .services-tagline::after {
                content: '✦';
                color: #7c3aed;
                font-size: clamp(16px, 3vw, 20px);
            }

            .scroll-container {
                height: 300vh;
                position: relative;
                background: #1a1a2e;
                width: 100%;
            }

            .sticky-wrapper {
                position: sticky;
                top: 0;
                height: 100vh;
                width: 100%;
                margin: 0 auto;
                display: flex;
                align-items: center;
                overflow: hidden;
            }

            .gallery-start-position {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                width: ${dimensions.itemWidth}px;
                height: 1px;
                visibility: hidden;
            }

            .gallery {
                display: flex;
                gap: ${dimensions.gap}px;
                will-change: transform;
                position: absolute;
                left: 50%;
                transform: translateX(-${dimensions.itemWidth/2}px);
            }

            .gallery-item {
                flex-shrink: 0;
                width: ${dimensions.itemWidth}px;
                height: clamp(350px, 60vh, 500px);
                border-radius: 20px;
                position: relative;
                overflow: hidden;
                background-image: var(--item-image);
                background-size: cover;
                background-position: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                transition: transform 0.3s ease;
            }

            .gallery-item:hover {
                transform: scale(1.02);
            }

            .gallery-item::before {
                content: "";
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom,
                    transparent 40%,
                    rgba(0, 0, 0, 0.8)
                );
            }

            .item-content {
                position: absolute;
                bottom: clamp(25px, 5vw, 40px);
                left: clamp(25px, 5vw, 40px);
                right: clamp(25px, 5vw, 40px);
                z-index: 1;
            }

            .item-number {
                font-size: clamp(12px, 2vw, 14px);
                color: var(--item-color);
                font-family: "Azeret Mono", monospace;
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                letter-spacing: 1px;
            }

            .gallery-item h2 {
                font-size: clamp(24px, 5vw, 32px);
                font-weight: 700;
                color: #ffffff;
                margin: 0 0 10px 0;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
            }

            .item-description {
                font-size: clamp(13px, 2.5vw, 16px);
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.5;
                margin: 0;
            }

            .outro-section {
                height: 70vh;
                min-height: 400px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%);
                padding: 60px 20px;
            }

            .outro-content {
                text-align: center;
                max-width: 90%;
                margin: 0 auto;
                padding: 0 15px;
            }

            .outro-title {
                font-size: clamp(28px, 6vw, 56px);
                color: #ffffff;
                margin-bottom: 20px;
                font-weight: 700;
                line-height: 1.2;
            }

            .outro-description {
                font-size: clamp(14px, 2.5vw, 20px);
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.6;
                margin-bottom: 30px;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .outro-button {
                background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
                color: white;
                border: none;
                padding: clamp(14px, 3vw, 18px) clamp(32px, 8vw, 48px);
                font-size: clamp(15px, 2.5vw, 18px);
                font-weight: 600;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .outro-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(124, 58, 237, 0.4);
            }

            .outro-button:active {
                transform: translateY(-1px);
            }

            /* Mobile Specific (< 640px) */
            @media (max-width: 639px) {
                .intro-section {
                    height: 50vh;
                    min-height: 350px;
                    padding: 30px 15px;
                }

                .scroll-container {
                    height: 250vh;
                }

                .gallery-item {
                    border-radius: 16px;
                }

                .outro-section {
                    height: 60vh;
                    min-height: 350px;
                    padding: 40px 15px;
                }
            }

            /* Tablet Specific (640px - 1023px) */
            @media (min-width: 640px) and (max-width: 1023px) {
                .intro-section {
                    height: 55vh;
                    min-height: 400px;
                }

                .scroll-container {
                    height: 280vh;
                }

                .gallery-item {
                    border-radius: 18px;
                }
            }

            /* Desktop (>= 1024px) */
            @media (min-width: 1024px) {
                .intro-content {
                    max-width: 800px;
                }

                .outro-content {
                    max-width: 600px;
                }
            }

            /* Large Desktop (>= 1440px) */
            @media (min-width: 1440px) {
                .gallery-item {
                    height: 500px;
                }
            }

            /* Extra Small Devices (< 375px) */
            @media (max-width: 374px) {
                .intro-section {
                    padding: 25px 10px;
                    min-height: 320px;
                }

                .impact {
                    font-size: 28px;
                    margin-bottom: 12px;
                }

                .subtitle {
                    font-size: 13px;
                    margin-bottom: 15px;
                }

                .services-tagline {
                    font-size: 12px;
                    gap: 10px;
                }

                .outro-section {
                    padding: 30px 10px;
                    min-height: 320px;
                }
            }

            /* Landscape Mobile */
            @media (max-height: 500px) and (orientation: landscape) {
                .intro-section {
                    height: 100vh;
                    min-height: auto;
                }

                .outro-section {
                    height: 100vh;
                    min-height: auto;
                }

                .scroll-container {
                    height: 200vh;
                }
            }

            /* Reduced Motion */
            @media (prefers-reduced-motion: reduce) {
                .gallery {
                    transform: none !important;
                }
                
                .gallery-item:hover {
                    transform: none;
                }
                
                .outro-button:hover {
                    transform: none;
                }
                
                .scroll-container {
                    height: auto;
                }
                
                .sticky-wrapper {
                    position: relative;
                    height: auto;
                    width: 100%;
                    overflow-x: auto;
                    padding: 50px 0;
                    display: block;
                }

                .gallery {
                    position: relative;
                    left: auto;
                    transform: none !important;
                    padding: 0 20px;
                }
            }

            /* Touch Device Optimizations */
            @media (hover: none) and (pointer: coarse) {
                .gallery-item:hover {
                    transform: none;
                }
                
                .outro-button:hover {
                    transform: none;
                    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.3);
                }
            }
        `}</style>
    )
}

/**
 * ==============   Data   ================
 */

const items = [
    { 
        id: 1, 
        color: "#ff0088", 
        label: "Buy", 
        image: "/Images/buying-house.webp",
        description: "Find your dream home with our expert guidance"
    },
    { 
        id: 2, 
        color: "#dd00ee", 
        label: "Rent", 
        image: "/Images/home-rent.avif",
        description: "Premium rental properties with flexible terms"
    },
    { 
        id: 3, 
        color: "#9911ff", 
        label: "Sell", 
        image: "/Images/Home-sale.jpg",
        description: "Get the best price for your property"
    },
    { 
        id: 4, 
        color: "#0d63f8", 
        label: "Renovation", 
        image: "/Images/home-renovation.jpg",
        description: "Transform your space with our renovation experts"
    },
    { 
        id: 5, 
        color: "#0cdcf7", 
        label: "Interior", 
        image: "/Images/Home-intereir.webp",
        description: "Custom interior designs for every style"
    },
]