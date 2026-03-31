import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "1000+", label: "Happy Families" },
  { value: "15+", label: "Years of Trust" },
  { value: "500+", label: "Properties Sold" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function AboutHero() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleExploreProperties = () => {
    navigate("/properties");
  };

  const handleOurStory = () => {
    const storySection = document.getElementById("our-story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }
    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168,85,247,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-16 sm:py-20 md:py-24 lg:py-24 px-4 sm:px-6 md:px-8 min-h-[92vh] overflow-hidden flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,85,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-900/30 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-400 text-sm font-medium tracking-widest uppercase">
                Est. 2024 · Bhubaneswar
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              We Don&apos;t Just
              <br />
              <span className="text-purple-500">Sell Homes.</span>
              <br />
              We Build
              <br />
              <span className="text-white">Futures.</span>
            </motion.h1>

            <motion.p
              className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Kalinga Homes was built on a single belief — that every family deserves a place
              they can truly call home. With deep roots in Odisha and a relentless focus on
              trust, we&apos;ve turned that belief into over a thousand success stories.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <button
                onClick={handleExploreProperties}
                className="bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white px-8 py-3.5 rounded-full font-semibold text-sm xs:text-base transition-all hover:scale-105 shadow-lg min-h-[44px]"
              >
                Explore Properties
              </button>
              <button
                onClick={handleOurStory}
                className="border border-purple-900/30 hover:border-purple-500/50 text-gray-400 hover:text-white px-8 py-3.5 rounded-full font-semibold text-sm xs:text-base transition-all min-h-[44px]"
              >
                Our Story ↓
              </button>
            </motion.div>
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-5"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="bg-[#252544] border border-purple-900/30 hover:border-purple-500/50 rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col gap-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <span className="text-3xl sm:text-4xl font-bold text-purple-500">{s.value}</span>
                <span className="text-gray-400 text-sm font-medium">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}