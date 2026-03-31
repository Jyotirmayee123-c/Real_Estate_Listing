import React, { useState, useEffect, useRef } from "react";
import {
  MapPin, BedDouble, Bath, Ruler, Home, X, ChevronLeft, ChevronRight,
  Heart, Share2, Phone, Mail, Star, CheckCircle2, ArrowUpRight,
  Wifi, Car, Wind, Dumbbell, Trees, Shield
} from "lucide-react";

/* ─── Demo fallback ─── */
const DEMO = {
  title: "Azure Sky Residences",
  city: "Bhubaneswar",
  address: "Patia, Bhubaneswar",
  price: 18500000,
  listingType: "sale",
  propertyType: "apartment",
  bedrooms: 4,
  bathrooms: 3,
  area: 2850,
  isFeatured: true,
  description:
    "A rare offering in the heart of Patia — this luminous 4-bedroom apartment offers uninterrupted city views. Every detail is a study in refined living: Italian marble floors, floor-to-ceiling glazing, and a chef's kitchen finished in brushed brass. The master suite opens onto a private terrace. Building amenities include a rooftop infinity pool, private cinema, and 24-hour concierge.",
  thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  ],
};

const AMENITIES = [
  { icon: <Wifi size={15} />, label: "High-Speed Wi-Fi" },
  { icon: <Car size={15} />, label: "2 Car Parking" },
  { icon: <Wind size={15} />, label: "Central A/C" },
  { icon: <Dumbbell size={15} />, label: "Fitness Center" },
  { icon: <Trees size={15} />, label: "Rooftop Garden" },
  { icon: <Shield size={15} />, label: "24/7 Security" },
];

const HIGHLIGHTS = [
  "Prime Location", "Vastu Compliant",
  "Ready to Move", "Bank Loan Available",
  "Clear Title", "Gated Community",
];

export default function ViewPropertyModal({ property: propData, closeModal }) {
  const property = propData || DEMO;
  const allImgs = [property.thumbnail, ...(property.images || [])].filter(Boolean);

  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState("overview");
  const [visible, setVisible] = useState(false);
  const thumbsRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(() => closeModal?.(), 300);
  };

  const prev = () => setActive(i => (i - 1 + allImgs.length) % allImgs.length);
  const next = () => setActive(i => (i + 1) % allImgs.length);
  const pick = (i) => {
    setActive(i);
    thumbsRef.current?.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  const fmt = (n) =>
    n >= 1e7 ? "₹ " + (n / 1e7).toFixed(2) + " Cr"
    : n >= 1e5 ? "₹ " + (n / 1e5).toFixed(1) + " L"
    : "₹ " + n?.toLocaleString();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        .vpm-wrap {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(8, 8, 18, 0.93);
          backdrop-filter: blur(20px) saturate(1.5);
          display: flex; align-items: stretch; justify-content: center;
          overflow-y: auto;
          opacity: 0; transition: opacity 0.3s ease;
        }
        .vpm-wrap.in { opacity: 1; }

        .vpm-page {
          width: 100%; max-width: 1200px;
          min-height: 100vh; display: flex; flex-direction: column;
          padding-bottom: 80px;
          transform: translateY(30px);
          transition: transform 0.45s cubic-bezier(.16,1,.3,1);
        }
        .vpm-wrap.in .vpm-page { transform: translateY(0); }

        /* Purple ambient glow behind hero */
        .vpm-glow {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 700px; height: 400px;
          background: rgba(139, 92, 246, 0.18);
          border-radius: 50%; filter: blur(120px);
          pointer-events: none; z-index: 0;
        }

        /* ── Topbar ── */
        .vpm-topbar {
          position: sticky; top: 0; z-index: 30;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 28px;
          background: rgba(13, 13, 26, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .vpm-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 700;
          color: #a78bfa; letter-spacing: 0.06em;
        }
        .vpm-topbar-r { display: flex; gap: 8px; align-items: center; }

        .vpm-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 16px; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          cursor: pointer; transition: all 0.22s; letter-spacing: 0.02em;
          white-space: nowrap;
        }
        .vpm-btn-ghost {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .vpm-btn-ghost:hover { border-color: rgba(167,139,250,0.5); color: #a78bfa; }
        .vpm-btn-purple { background: #7c3aed; color: #fff; border: none; }
        .vpm-btn-purple:hover { background: #6d28d9; transform: scale(1.03); }
        .vpm-btn-liked {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
        }
        .vpm-xbtn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .vpm-xbtn:hover { background: rgba(255,255,255,0.09); color: #fff; border-color: rgba(255,255,255,0.25); }

        /* ── Hero ── */
        .vpm-hero {
          position: relative; height: 500px; overflow: hidden; flex-shrink: 0;
        }
        @media(max-width:680px){ .vpm-hero{ height: 280px; } }
        .vpm-hero-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
        .vpm-hero-img:hover { transform: scale(1.04); }
        .vpm-hero-grad {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(13,13,26,0.3) 0%,
            transparent 35%,
            transparent 50%,
            rgba(13,13,26,0.75) 80%,
            rgba(13,13,26,0.97) 100%
          );
        }
        /* purple tint overlay */
        .vpm-hero-tint {
          position: absolute; inset: 0; pointer-events: none;
          background: rgba(109, 40, 217, 0.08);
        }

        .vpm-hero-nav {
          position: absolute; top: 50%; left: 0; right: 0; transform: translateY(-50%);
          display: flex; justify-content: space-between; padding: 0 18px; pointer-events: none;
        }
        .vpm-hnav {
          pointer-events: all; width: 44px; height: 44px; border-radius: 50%;
          background: rgba(13,13,26,0.6); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12); color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.22s;
        }
        .vpm-hnav:hover { background: #7c3aed; border-color: transparent; }

        .vpm-badge {
          position: absolute; top: 20px; left: 26px;
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(124,58,237,0.9); color: #fff;
          padding: 5px 14px; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 10.5px;
          font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid rgba(167,139,250,0.4);
        }
        .vpm-img-ct {
          position: absolute; top: 20px; right: 26px;
          background: rgba(13,13,26,0.65); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 5px 14px; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 11.5px; color: rgba(255,255,255,0.65);
        }
        .vpm-hero-foot { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 34px 28px; }
        .vpm-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 4vw, 3rem);
          font-weight: 700; color: #fff; line-height: 1.1; margin: 0 0 10px;
        }
        .vpm-hero-loc {
          display: flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif; font-size: 13px;
        }
        .vpm-hero-loc svg { color: #a78bfa; }

        /* ── Thumbs ── */
        .vpm-thumbs-bar {
          background: rgba(13,13,26,0.98);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 11px 26px; overflow-x: auto; scrollbar-width: none;
        }
        .vpm-thumbs-bar::-webkit-scrollbar { display: none; }
        .vpm-thumbs { display: flex; gap: 10px; width: max-content; }
        .vpm-thumb {
          width: 84px; height: 54px; border-radius: 10px; overflow: hidden;
          cursor: pointer; flex-shrink: 0; border: 2px solid transparent;
          opacity: 0.45; transition: all 0.2s;
        }
        .vpm-thumb.on { border-color: #7c3aed; opacity: 1; }
        .vpm-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* ── Body grid ── */
        .vpm-body { display: grid; grid-template-columns: 1fr 330px; flex: 1; }
        @media(max-width:860px){ .vpm-body{ grid-template-columns: 1fr; } }

        /* ── Left ── */
        .vpm-left {
          padding: 34px 34px 48px;
          border-right: 1px solid rgba(255,255,255,0.06);
          background: #0d0d1a;
        }

        /* eyebrow label */
        .vpm-eyebrow {
          font-family: 'Inter', sans-serif; font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #a78bfa; margin-bottom: 6px;
        }

        /* Price row */
        .vpm-price-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; margin-bottom: 28px;
        }
        .vpm-price {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem; font-weight: 700; color: #fff; line-height: 1;
        }
        .vpm-price-mo { font-size: 1rem; color: #a78bfa; font-weight: 400; margin-left: 6px; }
        .vpm-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
        .vpm-chip {
          padding: 4px 13px; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500;
          text-transform: capitalize; letter-spacing: 0.03em;
        }
        .vpm-chip-p { background: rgba(124,58,237,0.15); color: #a78bfa; border: 1px solid rgba(124,58,237,0.3); }
        .vpm-chip-g { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.1); }

        /* Stats */
        .vpm-stats {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 30px;
        }
        @media(max-width:540px){ .vpm-stats{ grid-template-columns: repeat(2,1fr); } }
        .vpm-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 18px 14px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s; cursor: default;
        }
        .vpm-stat:hover {
          border-color: rgba(124,58,237,0.4);
          background: rgba(124,58,237,0.07);
          transform: translateY(-3px);
        }
        .vpm-stat-ico {
          width: 38px; height: 38px; border-radius: 12px;
          background: rgba(124,58,237,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #a78bfa;
        }
        .vpm-stat-l {
          font-family: 'Inter', sans-serif; font-size: 10px;
          color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.07em;
        }
        .vpm-stat-v {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; color: #fff; font-weight: 600;
        }

        /* Tabs */
        .vpm-tabs { display: flex; border-bottom: 1px solid rgba(255,255,255,0.07); margin-bottom: 26px; }
        .vpm-tab {
          padding: 10px 20px;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.35); cursor: pointer; background: none; border: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.2s;
        }
        .vpm-tab.on { color: #a78bfa; border-bottom-color: #7c3aed; }
        .vpm-tab:hover:not(.on) { color: rgba(255,255,255,0.65); }

        /* Section heading */
        .vpm-sec {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 600; color: #fff;
          margin: 0 0 16px; display: flex; align-items: center; gap: 10px;
        }
        .vpm-sec::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }

        .vpm-desc {
          font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.82;
          color: rgba(255,255,255,0.45); margin-bottom: 28px;
        }

        /* Grid items */
        .vpm-g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 24px; }
        .vpm-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 24px; }
        @media(max-width:480px){ .vpm-g2,.vpm-g3{ grid-template-columns: repeat(2,1fr); } }

        .vpm-item {
          display: flex; align-items: center; gap: 9px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 12px 14px;
          font-family: 'Inter', sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.65);
          transition: border-color 0.22s, background 0.22s;
        }
        .vpm-item:hover { border-color: rgba(124,58,237,0.35); background: rgba(124,58,237,0.06); }
        .vpm-item svg { color: #a78bfa; flex-shrink: 0; }

        /* Gallery */
        .vpm-gallery { display: grid; grid-template-columns: repeat(3,1fr); grid-auto-rows: 128px; gap: 10px; }
        .vpm-gi { border-radius: 14px; overflow: hidden; cursor: pointer; position: relative; }
        .vpm-gi:first-child { grid-column: span 2; grid-row: span 2; }
        .vpm-gi img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .vpm-gi:hover img { transform: scale(1.07); }
        .vpm-gi::after {
          content: ''; position: absolute; inset: 0; border-radius: 14px;
          background: rgba(124,58,237,0); transition: background 0.3s;
        }
        .vpm-gi:hover::after { background: rgba(124,58,237,0.12); }

        /* ── Right ── */
        .vpm-right {
          padding: 34px 24px;
          background: rgba(13,13,26,0.98);
          display: flex; flex-direction: column; gap: 16px;
        }

        /* Glass card */
        .vpm-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 22px;
          transition: border-color 0.3s;
        }
        .vpm-card:hover { border-color: rgba(124,58,237,0.25); }

        /* Agent */
        .vpm-avatar {
          width: 68px; height: 68px; border-radius: 50%;
          margin: 0 auto 13px;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem; font-weight: 700; color: #fff;
          box-shadow: 0 0 0 4px rgba(124,58,237,0.2), 0 0 0 8px rgba(124,58,237,0.07);
        }
        .vpm-a-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; color: #fff; text-align: center; margin-bottom: 3px;
        }
        .vpm-a-role {
          font-family: 'Inter', sans-serif; font-size: 11.5px;
          color: rgba(255,255,255,0.35); text-align: center; margin-bottom: 12px;
        }
        .vpm-stars {
          display: flex; align-items: center; justify-content: center; gap: 3px;
          color: #a78bfa; margin-bottom: 16px;
          font-family: 'Inter', sans-serif; font-size: 11.5px;
        }
        .vpm-stars span { color: rgba(255,255,255,0.3); margin-left: 5px; }

        .vpm-ctas { display: flex; flex-direction: column; gap: 8px; }
        .vpm-cta {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 12px; border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.22s; border: none; letter-spacing: 0.02em;
        }
        .vpm-cta-p { background: #7c3aed; color: #fff; }
        .vpm-cta-p:hover { background: #6d28d9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,58,237,0.3); }
        .vpm-cta-o {
          background: transparent; color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.1);
        }
        .vpm-cta-o:hover { border-color: rgba(124,58,237,0.4); color: #a78bfa; }

        /* Detail rows */
        .vpm-ct { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 600; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }
        .vpm-drow {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'Inter', sans-serif; font-size: 13px;
        }
        .vpm-drow:last-child { border-bottom: none; }
        .vpm-dk { color: rgba(255,255,255,0.35); }
        .vpm-dv { color: #fff; font-weight: 500; text-transform: capitalize; }

        /* Map */
        .vpm-map {
          height: 148px; position: relative;
          background: #0a0a18; overflow: hidden; cursor: pointer;
          border-radius: 0 0 18px 18px;
        }
        .vpm-map-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .vpm-map-dot {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .vpm-pulse {
          width: 13px; height: 13px; border-radius: 50%; background: #7c3aed;
          box-shadow: 0 0 0 5px rgba(124,58,237,0.22), 0 0 0 10px rgba(124,58,237,0.09);
          animation: vpm-pulse 2s ease-in-out infinite;
        }
        @keyframes vpm-pulse {
          0%,100% { box-shadow: 0 0 0 5px rgba(124,58,237,0.22), 0 0 0 10px rgba(124,58,237,0.09); }
          50%      { box-shadow: 0 0 0 9px rgba(124,58,237,0.25), 0 0 0 18px rgba(124,58,237,0.05); }
        }
        .vpm-map-tag {
          background: rgba(13,13,26,0.9); color: rgba(255,255,255,0.65);
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: 100px; padding: 4px 12px;
          font-family: 'Inter', sans-serif; font-size: 11px;
          display: flex; align-items: center; gap: 5px; white-space: nowrap;
        }
        .vpm-map-tag svg { color: #a78bfa; }

        /* Animations */
        .vpm-fadein { animation: vpm-fi 0.45s ease both; }
        @keyframes vpm-fi { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      `}</style>

      <div className={`vpm-wrap ${visible ? "in" : ""}`} onClick={e => e.target.classList.contains("vpm-wrap") && close()}>
        <div className="vpm-page">

          {/* ── Topbar ── */}
          <div className="vpm-topbar">
            <div className="vpm-brand">Kalinga Homes</div>
            <div className="vpm-topbar-r">
              <button
                className={`vpm-btn ${liked ? "vpm-btn-liked" : "vpm-btn-ghost"}`}
                onClick={() => setLiked(l => !l)}
              >
                <Heart size={13} fill={liked ? "currentColor" : "none"} />
                {liked ? "Saved" : "Save"}
              </button>
              <button className="vpm-btn vpm-btn-ghost"><Share2 size={13} /> Share</button>
              <button className="vpm-btn vpm-btn-purple"><Phone size={13} /> Contact</button>
              <button className="vpm-xbtn" onClick={close}><X size={15} /></button>
            </div>
          </div>

          {/* ── Hero ── */}
          <div className="vpm-hero" style={{ position: "relative" }}>
            <div className="vpm-glow" />
            <img className="vpm-hero-img" src={allImgs[active]} alt={property.title} />
            <div className="vpm-hero-grad" />
            <div className="vpm-hero-tint" />

            {property.isFeatured && (
              <div className="vpm-badge"><Star size={10} fill="currentColor" /> Featured</div>
            )}
            <div className="vpm-img-ct">{active + 1} / {allImgs.length}</div>

            {allImgs.length > 1 && (
              <div className="vpm-hero-nav">
                <button className="vpm-hnav" onClick={prev}><ChevronLeft size={20} /></button>
                <button className="vpm-hnav" onClick={next}><ChevronRight size={20} /></button>
              </div>
            )}

            <div className="vpm-hero-foot">
              <h1 className="vpm-hero-title">{property.title}</h1>
              <div className="vpm-hero-loc">
                <MapPin size={13} /> {property.city}, {property.address}
              </div>
            </div>
          </div>

          {/* ── Thumbnail strip ── */}
          {allImgs.length > 1 && (
            <div className="vpm-thumbs-bar">
              <div className="vpm-thumbs" ref={thumbsRef}>
                {allImgs.map((img, i) => (
                  <div key={i} className={`vpm-thumb ${i === active ? "on" : ""}`} onClick={() => pick(i)}>
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Body ── */}
          <div className="vpm-body">

            {/* Left */}
            <div className="vpm-left vpm-fadein">

              {/* Price */}
              <div className="vpm-price-row">
                <div>
                  <div className="vpm-eyebrow">Asking Price</div>
                  <div className="vpm-price">
                    {fmt(property.price)}
                    {property.listingType === "rent" && <span className="vpm-price-mo">/ month</span>}
                  </div>
                </div>
                <div className="vpm-chips">
                  <span className="vpm-chip vpm-chip-p">{property.listingType}</span>
                  <span className="vpm-chip vpm-chip-g">{property.propertyType}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="vpm-stats">
                {[
                  { icon: <BedDouble size={17} />, l: "Bedrooms",  v: property.bedrooms },
                  { icon: <Bath size={17} />,      l: "Bathrooms", v: property.bathrooms },
                  { icon: <Ruler size={17} />,     l: "Area",      v: `${property.area?.toLocaleString()} ft²` },
                  { icon: <Home size={17} />,       l: "Type",      v: property.propertyType },
                ].map((s, i) => (
                  <div key={i} className="vpm-stat">
                    <div className="vpm-stat-ico">{s.icon}</div>
                    <div className="vpm-stat-l">{s.l}</div>
                    <div className="vpm-stat-v">{s.v}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="vpm-tabs">
                {["overview", "amenities", "gallery"].map(t => (
                  <button key={t} className={`vpm-tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab: Overview */}
              {tab === "overview" && (
                <div className="vpm-fadein">
                  <div className="vpm-sec">About the Property</div>
                  <p className="vpm-desc">{property.description}</p>
                  <div className="vpm-sec">Key Highlights</div>
                  <div className="vpm-g2">
                    {HIGHLIGHTS.map(h => (
                      <div key={h} className="vpm-item"><CheckCircle2 size={14} /> {h}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Amenities */}
              {tab === "amenities" && (
                <div className="vpm-fadein">
                  <div className="vpm-sec">Building Amenities</div>
                  <div className="vpm-g3">
                    {AMENITIES.map(a => (
                      <div key={a.label} className="vpm-item">{a.icon} {a.label}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Gallery */}
              {tab === "gallery" && (
                <div className="vpm-fadein">
                  <div className="vpm-sec">Photo Gallery</div>
                  <div className="vpm-gallery">
                    {allImgs.map((img, i) => (
                      <div key={i} className="vpm-gi" onClick={() => { pick(i); setTab("overview"); }}>
                        <img src={img} alt={`Photo ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right sidebar ── */}
            <div className="vpm-right">

              {/* Agent card */}
              <div className="vpm-card" style={{ textAlign: "center" }}>
                <div className="vpm-avatar">K</div>
                <div className="vpm-a-name">Kalinga Agent</div>
                <div className="vpm-a-role">Property Specialist · Bhubaneswar</div>
                <div className="vpm-stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  <span>4.9 (128 reviews)</span>
                </div>
                <div className="vpm-ctas">
                  <button className="vpm-cta vpm-cta-p"><Phone size={14} /> Schedule a Visit</button>
                  <button className="vpm-cta vpm-cta-o"><Mail size={14} /> Send Enquiry</button>
                  <button className="vpm-cta vpm-cta-o"><ArrowUpRight size={14} /> View Profile</button>
                </div>
              </div>

              {/* Property details */}
              <div className="vpm-card">
                <div className="vpm-ct">Property Details</div>
                {[
                  ["Listing Type",  property.listingType],
                  ["Property Type", property.propertyType],
                  ["Bedrooms",      property.bedrooms],
                  ["Bathrooms",     property.bathrooms],
                  ["Carpet Area",   `${property.area} sqft`],
                  ["City",          property.city],
                ].map(([k, v]) => (
                  <div key={k} className="vpm-drow">
                    <span className="vpm-dk">{k}</span>
                    <span className="vpm-dv">{v}</span>
                  </div>
                ))}
              </div>

              {/* Location */}
              <div className="vpm-card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="vpm-ct" style={{ marginBottom: 0 }}>Location</div>
                </div>
                <div className="vpm-map">
                  <div className="vpm-map-grid" />
                  <div className="vpm-map-dot">
                    <div className="vpm-pulse" />
                    <div className="vpm-map-tag"><MapPin size={11} /> {property.city}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}