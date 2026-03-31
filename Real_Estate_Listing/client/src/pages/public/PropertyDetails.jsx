import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, BedDouble, Bath, Ruler, Home, ArrowLeft,
  Star, CheckCircle2, Wifi, Car, Wind, Dumbbell, Trees, Shield,
  Phone, Send, ChevronLeft, ChevronRight, Share2, Heart
} from "lucide-react";
import api from "../../services/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AMENITIES = [
  { icon: <Wifi size={14} />, label: "High-Speed Wi-Fi" },
  { icon: <Car size={14} />, label: "Car Parking" },
  { icon: <Wind size={14} />, label: "Central A/C" },
  { icon: <Dumbbell size={14} />, label: "Fitness Center" },
  { icon: <Trees size={14} />, label: "Rooftop Garden" },
  { icon: <Shield size={14} />, label: "24/7 Security" },
];

const HIGHLIGHTS = [
  "Prime Location", "Vastu Compliant",
  "Ready to Move", "Bank Loan Available",
  "Clear Title", "Gated Community",
];

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState("overview");

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${BASE_URL}/${path}`;
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/property/${id}`);
        const data = res.data.property || res.data?.data;
        setProperty(data);
        if (data?.thumbnail) {
          setSelectedImage(getImageUrl(data.thumbnail));
        }
      } catch (err) {
        console.error("Error fetching property", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const imageGallery = property
    ? [property.thumbnail, ...(property.images || [])].filter(Boolean).map(getImageUrl)
    : [];

  const pick = (i) => {
    setActiveIdx(i);
    setSelectedImage(imageGallery[i]);
  };
  const prev = () => pick((activeIdx - 1 + imageGallery.length) % imageGallery.length);
  const next = () => pick((activeIdx + 1) % imageGallery.length);

  const fmt = (n) =>
    n >= 1e7 ? "₹ " + (n / 1e7).toFixed(2) + " Cr"
    : n >= 1e5 ? "₹ " + (n / 1e5).toFixed(1) + " L"
    : "₹ " + n?.toLocaleString();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg("");
    try {
      await api.post("/enquiry", { ...formData, property: id });
      setSuccessMsg("Enquiry sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Enquiry error:", err);
      alert("Failed to send enquiry");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0d0d1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="pd-spinner" />
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", marginTop: 16, fontSize: 14 }}>
            Loading property...
          </p>
        </div>
        <style>{`
          .pd-spinner {
            width: 40px; height: 40px; border-radius: 50%; margin: 0 auto;
            border: 3px solid rgba(124,58,237,0.15);
            border-top-color: #7c3aed;
            animation: pd-spin 0.8s linear infinite;
          }
          @keyframes pd-spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ minHeight: "100vh", background: "#0d0d1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#f87171", fontFamily: "'Inter',sans-serif" }}>Property not found.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pd-root {
          min-height: 100vh;
          background: #0d0d1a;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Ambient purple glow */
        .pd-glow {
          position: fixed; top: 0; left: 50%; transform: translateX(-50%);
          width: 800px; height: 500px;
          background: rgba(139,92,246,0.13);
          border-radius: 50%; filter: blur(130px);
          pointer-events: none; z-index: 0;
        }
        .pd-glow2 {
          position: fixed; bottom: -100px; right: -100px;
          width: 500px; height: 500px;
          background: rgba(109,40,217,0.08);
          border-radius: 50%; filter: blur(100px);
          pointer-events: none; z-index: 0;
        }

        .pd-content {
          position: relative; z-index: 1;
          max-width: 1280px; margin: 0 auto;
          padding: 32px 20px 80px;
        }

        /* ── Navbar ── */
        .pd-navbar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(13,13,26,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .pd-navbar-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
        }
        .pd-nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem; font-weight: 700;
          color: #fff; letter-spacing: 0.01em; text-decoration: none;
          display: flex; align-items: center; gap: 8px;
        }
        .pd-nav-brand em {
          font-style: normal; color: #a78bfa;
        }
        .pd-nav-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #7c3aed; display: inline-block;
          box-shadow: 0 0 8px rgba(124,58,237,0.6);
        }
        .pd-nav-links {
          display: flex; align-items: center; gap: 6px;
        }
        @media(max-width: 640px) { .pd-nav-links .pd-nav-link-txt { display: none; } }
        .pd-nav-link {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 16px; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; transition: all 0.22s; letter-spacing: 0.02em;
          text-decoration: none; border: none;
        }
        .pd-nav-ghost {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.65);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .pd-nav-ghost:hover {
          border-color: rgba(167,139,250,0.45);
          color: #a78bfa;
          background: rgba(124,58,237,0.06);
        }
        .pd-nav-purple {
          background: #7c3aed; color: #fff; border: none;
        }
        .pd-nav-purple:hover {
          background: #6d28d9;
          transform: scale(1.03);
          box-shadow: 0 4px 16px rgba(124,58,237,0.35);
        }
        .pd-nav-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.25);
          color: #a78bfa; padding: 5px 12px; border-radius: 100px;
          font-family: 'Inter', sans-serif; font-size: 10.5px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase; margin-right: 4px;
        }
        .pd-nav-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #a78bfa; display: inline-block;
        }

        /* ── Back button ── */
        .pd-back {
          display: inline-flex; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 500;
          cursor: pointer; background: none; border: none; padding: 0;
          margin-bottom: 28px; transition: color 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .pd-back:hover { color: #a78bfa; }
        .pd-back svg { transition: transform 0.2s; }
        .pd-back:hover svg { transform: translateX(-3px); }

        /* ── Page title block ── */
        .pd-hero-text { margin-bottom: 32px; }
        .pd-eyebrow {
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #a78bfa; margin-bottom: 8px;
        }
        .pd-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700; color: #fff; line-height: 1.15; margin-bottom: 10px;
        }
        .pd-loc {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.45); font-size: 13px;
        }
        .pd-loc svg { color: #a78bfa; }

        /* ── Chips ── */
        .pd-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .pd-chip {
          padding: 4px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 500;
          text-transform: capitalize; letter-spacing: 0.03em;
        }
        .pd-chip-p { background: rgba(124,58,237,0.15); color: #a78bfa; border: 1px solid rgba(124,58,237,0.3); }
        .pd-chip-g { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.1); }
        .pd-chip-feat { background: rgba(124,58,237,0.9); color: #fff; border: 1px solid rgba(167,139,250,0.4); display: inline-flex; align-items: center; gap: 4px; }

        /* ── Main grid ── */
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
          align-items: start;
        }
        @media(max-width: 1024px) { .pd-grid { grid-template-columns: 1fr; } }

        /* ── Glass card ── */
        .pd-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          transition: border-color 0.3s;
        }
        .pd-card:hover { border-color: rgba(124,58,237,0.2); }

        /* ── Image viewer ── */
        .pd-img-viewer {
          border-radius: 24px 24px 0 0;
          overflow: hidden; position: relative;
          height: 420px;
        }
        @media(max-width: 640px) { .pd-img-viewer { height: 260px; } }
        .pd-main-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s ease;
        }
        .pd-main-img:hover { transform: scale(1.04); }
        .pd-img-grad {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom, rgba(13,13,26,0.2) 0%, transparent 40%, rgba(13,13,26,0.5) 100%);
        }
        .pd-img-tint {
          position: absolute; inset: 0; pointer-events: none;
          background: rgba(109,40,217,0.07);
        }
        .pd-img-nav {
          position: absolute; top: 50%; left: 0; right: 0;
          transform: translateY(-50%);
          display: flex; justify-content: space-between; padding: 0 16px;
          pointer-events: none;
        }
        .pd-hnav {
          pointer-events: all; width: 40px; height: 40px; border-radius: 50%;
          background: rgba(13,13,26,0.65); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12); color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.22s;
        }
        .pd-hnav:hover { background: #7c3aed; border-color: transparent; }
        .pd-img-count {
          position: absolute; top: 14px; right: 16px;
          background: rgba(13,13,26,0.7); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 4px 12px; border-radius: 100px;
          font-size: 11.5px; color: rgba(255,255,255,0.65);
        }
        .pd-feat-badge {
          position: absolute; top: 14px; left: 16px;
          display: inline-flex; align-items: center; gap: 4px;
          background: rgba(124,58,237,0.88); color: #fff;
          padding: 4px 12px; border-radius: 100px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
          border: 1px solid rgba(167,139,250,0.35);
        }
        .pd-like-share {
          position: absolute; bottom: 14px; right: 16px;
          display: flex; gap: 8px;
        }
        .pd-icon-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(13,13,26,0.65); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s;
        }
        .pd-icon-btn:hover { border-color: rgba(124,58,237,0.4); color: #a78bfa; }
        .pd-icon-btn.liked { background: rgba(239,68,68,0.15); border-color: rgba(239,68,68,0.3); color: #f87171; }

        /* Thumbnails strip */
        .pd-thumbs-wrap {
          padding: 14px 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
          overflow-x: auto; scrollbar-width: none;
        }
        .pd-thumbs-wrap::-webkit-scrollbar { display: none; }
        .pd-thumbs { display: flex; gap: 10px; width: max-content; }
        .pd-thumb {
          width: 80px; height: 52px; border-radius: 10px; overflow: hidden;
          cursor: pointer; flex-shrink: 0; border: 2px solid transparent;
          opacity: 0.45; transition: all 0.2s;
        }
        .pd-thumb.on { border-color: #7c3aed; opacity: 1; }
        .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* ── Stats ── */
        .pd-stats {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 12px;
          padding: 20px 20px 0;
        }
        @media(max-width:600px){ .pd-stats { grid-template-columns: repeat(2,1fr); } }
        .pd-stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 16px 12px;
          display: flex; flex-direction: column; align-items: center; gap: 7px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s; cursor: default;
        }
        .pd-stat:hover {
          border-color: rgba(124,58,237,0.4);
          background: rgba(124,58,237,0.07);
          transform: translateY(-2px);
        }
        .pd-stat-ico {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(124,58,237,0.12);
          display: flex; align-items: center; justify-content: center; color: #a78bfa;
        }
        .pd-stat-l { font-size: 10px; color: rgba(255,255,255,0.32); text-transform: uppercase; letter-spacing: 0.07em; }
        .pd-stat-v { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #fff; font-weight: 600; }

        /* Price row */
        .pd-price-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 10px;
          padding: 20px 20px 0;
        }
        .pd-price {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 700; color: #fff; line-height: 1;
        }
        .pd-price-mo { font-size: 1rem; color: #a78bfa; font-weight: 400; margin-left: 5px; }

        /* ── Tabs ── */
        .pd-tabs {
          display: flex; border-bottom: 1px solid rgba(255,255,255,0.07);
          margin: 20px 20px 0; overflow-x: auto; scrollbar-width: none;
        }
        .pd-tabs::-webkit-scrollbar { display: none; }
        .pd-tab {
          padding: 10px 20px; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.35); cursor: pointer; background: none; border: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          transition: all 0.2s; white-space: nowrap; font-family: 'Inter', sans-serif;
        }
        .pd-tab.on { color: #a78bfa; border-bottom-color: #7c3aed; }
        .pd-tab:hover:not(.on) { color: rgba(255,255,255,0.65); }

        /* Tab content */
        .pd-tab-body { padding: 24px 20px 28px; }

        .pd-sec {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 600; color: #fff;
          margin: 0 0 14px; display: flex; align-items: center; gap: 10px;
        }
        .pd-sec::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }

        .pd-desc {
          font-size: 14px; line-height: 1.82;
          color: rgba(255,255,255,0.45); margin-bottom: 28px;
        }

        .pd-g2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 9px; margin-bottom: 24px; }
        .pd-g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; }
        @media(max-width:480px){ .pd-g2,.pd-g3{ grid-template-columns: repeat(2,1fr); } }

        .pd-item {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 11px 13px;
          font-size: 12px; color: rgba(255,255,255,0.65);
          transition: border-color 0.22s, background 0.22s;
        }
        .pd-item:hover { border-color: rgba(124,58,237,0.35); background: rgba(124,58,237,0.06); }
        .pd-item svg { color: #a78bfa; flex-shrink: 0; }

        /* Gallery */
        .pd-gallery { display: grid; grid-template-columns: repeat(3,1fr); grid-auto-rows: 120px; gap: 9px; }
        .pd-gi { border-radius: 12px; overflow: hidden; cursor: pointer; position: relative; }
        .pd-gi:first-child { grid-column: span 2; grid-row: span 2; }
        .pd-gi img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
        .pd-gi:hover img { transform: scale(1.07); }
        .pd-gi::after { content: ''; position: absolute; inset: 0; border-radius: 12px; background: rgba(124,58,237,0); transition: background 0.3s; }
        .pd-gi:hover::after { background: rgba(124,58,237,0.12); }

        /* ── Right sidebar ── */
        .pd-sidebar { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 24px; }

        /* Enquiry card */
        .pd-enquiry-head {
          padding: 22px 22px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding-bottom: 16px; margin-bottom: 0;
        }
        .pd-enquiry-eyebrow {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #a78bfa; margin-bottom: 5px;
        }
        .pd-enquiry-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 600; color: #fff;
        }

        .pd-form { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 12px; }

        .pd-input, .pd-textarea {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 12px 14px;
          color: #fff; font-family: 'Inter', sans-serif; font-size: 13.5px;
          outline: none; transition: border-color 0.22s, background 0.22s;
        }
        .pd-input::placeholder, .pd-textarea::placeholder { color: rgba(255,255,255,0.28); }
        .pd-input:focus, .pd-textarea:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.05);
        }
        .pd-textarea { resize: vertical; min-height: 100px; }

        .pd-submit {
          width: 100%; padding: 13px;
          background: #7c3aed; color: #fff;
          border: none; border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.22s;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          letter-spacing: 0.02em;
        }
        .pd-submit:hover:not(:disabled) {
          background: #6d28d9;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(124,58,237,0.3);
        }
        .pd-submit:disabled { opacity: 0.6; cursor: not-allowed; }

        .pd-success {
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          color: #6ee7b7; border-radius: 10px;
          padding: 10px 14px; font-size: 13px; text-align: center;
          animation: pd-fadein 0.3s ease;
        }

        /* Quick info card */
        .pd-qcard-title {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #a78bfa; margin-bottom: 14px;
          padding: 20px 22px 0;
        }
        .pd-drow {
          display: flex; justify-content: space-between; align-items: center;
          padding: 9px 22px; border-bottom: 1px solid rgba(255,255,255,0.06);
          font-size: 13px;
        }
        .pd-drow:last-child { border-bottom: none; padding-bottom: 20px; }
        .pd-dk { color: rgba(255,255,255,0.35); }
        .pd-dv { color: #fff; font-weight: 500; text-transform: capitalize; }

        /* Map */
        .pd-map-head {
          padding: 18px 22px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pd-map-tit {
          font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase; color: #a78bfa;
        }
        .pd-map {
          height: 150px; position: relative;
          background: #0a0a18; overflow: hidden;
          border-radius: 0 0 22px 22px; cursor: pointer;
        }
        .pd-map-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .pd-map-dot {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
        }
        .pd-pulse {
          width: 13px; height: 13px; border-radius: 50%; background: #7c3aed;
          box-shadow: 0 0 0 5px rgba(124,58,237,0.22), 0 0 0 10px rgba(124,58,237,0.09);
          animation: pd-pulse 2s ease-in-out infinite;
        }
        @keyframes pd-pulse {
          0%,100% { box-shadow: 0 0 0 5px rgba(124,58,237,0.22), 0 0 0 10px rgba(124,58,237,0.09); }
          50%      { box-shadow: 0 0 0 9px rgba(124,58,237,0.25), 0 0 0 18px rgba(124,58,237,0.05); }
        }
        .pd-map-tag {
          background: rgba(13,13,26,0.9); color: rgba(255,255,255,0.65);
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: 100px; padding: 4px 12px;
          font-size: 11px; font-family: 'Inter', sans-serif;
          display: flex; align-items: center; gap: 5px; white-space: nowrap;
        }
        .pd-map-tag svg { color: #a78bfa; }

        /* Animations */
        @keyframes pd-fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .pd-fadein { animation: pd-fadein 0.45s ease both; }

        /* Call CTA */
        .pd-call-card {
          background: rgba(124,58,237,0.12);
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: 20px; padding: 20px 22px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .pd-call-label { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 0.04em; }
        .pd-call-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700; color: #fff;
        }
        .pd-call-btn {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 12px; border-radius: 12px;
          background: #7c3aed; color: #fff;
          font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; border: none; transition: all 0.22s; text-decoration: none;
        }
        .pd-call-btn:hover { background: #6d28d9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,58,237,0.3); }
      `}</style>

      <div className="pd-root">
        <div className="pd-glow" />
        <div className="pd-glow2" />

        {/* ── Navbar ── */}
        <nav className="pd-navbar">
          <div className="pd-navbar-inner">
            <a href="/" className="pd-nav-brand">
              <span className="pd-nav-dot" />
              Kalinga <em>Homes</em>
            </a>
            <div className="pd-nav-links">
              <span className="pd-nav-badge">
                <span className="pd-nav-badge-dot" />
                Bhubaneswar's Most Trusted
              </span>
              <a href="/properties" className="pd-nav-link pd-nav-ghost">
                <span className="pd-nav-link-txt">Buy</span>
              </a>
              <a href="/properties?listingType=rent" className="pd-nav-link pd-nav-ghost">
                <span className="pd-nav-link-txt">Rent</span>
              </a>
              <a href="/properties" className="pd-nav-link pd-nav-ghost">
                <span className="pd-nav-link-txt">List Property</span>
              </a>
              <a href="tel:+919438185822" className="pd-nav-link pd-nav-purple">
                <Phone size={13} />
                <span className="pd-nav-link-txt">+91 9438185822</span>
              </a>
            </div>
          </div>
        </nav>

        <div className="pd-content">

          {/* Back */}
          <button className="pd-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back to Listings
          </button>

          {/* Hero text */}
          <div className="pd-hero-text pd-fadein">
            <div className="pd-eyebrow">Property Details</div>
            <h1 className="pd-title">{property.title}</h1>
            <div className="pd-loc"><MapPin size={13} />{property.city}, {property.address}</div>
            <div className="pd-chips">
              {property.isFeatured && (
                <span className="pd-chip pd-chip-feat"><Star size={10} fill="currentColor" /> Featured</span>
              )}
              <span className="pd-chip pd-chip-p">{property.listingType}</span>
              <span className="pd-chip pd-chip-g">{property.propertyType}</span>
            </div>
          </div>

          {/* Main grid */}
          <div className="pd-grid pd-fadein">

            {/* ── Left col ── */}
            <div>
              <div className="pd-card">

                {/* Image viewer */}
                <div className="pd-img-viewer">
                  <img className="pd-main-img" src={selectedImage} alt={property.title} />
                  <div className="pd-img-grad" />
                  <div className="pd-img-tint" />

                  {property.isFeatured && (
                    <div className="pd-feat-badge"><Star size={9} fill="currentColor" /> Featured</div>
                  )}
                  {imageGallery.length > 1 && (
                    <div className="pd-img-count">{activeIdx + 1} / {imageGallery.length}</div>
                  )}

                  {imageGallery.length > 1 && (
                    <div className="pd-img-nav">
                      <button className="pd-hnav" onClick={prev}><ChevronLeft size={18} /></button>
                      <button className="pd-hnav" onClick={next}><ChevronRight size={18} /></button>
                    </div>
                  )}

                  <div className="pd-like-share">
                    <button
                      className={`pd-icon-btn ${liked ? "liked" : ""}`}
                      onClick={() => setLiked(l => !l)}
                    >
                      <Heart size={14} fill={liked ? "currentColor" : "none"} />
                    </button>
                    <button className="pd-icon-btn"><Share2 size={14} /></button>
                  </div>
                </div>

                {/* Thumbnail strip */}
                {imageGallery.length > 1 && (
                  <div className="pd-thumbs-wrap">
                    <div className="pd-thumbs">
                      {imageGallery.map((img, i) => (
                        <div key={i} className={`pd-thumb ${i === activeIdx ? "on" : ""}`} onClick={() => pick(i)}>
                          <img src={img} alt="" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price row */}
                <div className="pd-price-row">
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 4 }}>
                      Asking Price
                    </div>
                    <div className="pd-price">
                      {fmt(property.price)}
                      {property.listingType === "rent" && (
                        <span className="pd-price-mo">/ month</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="pd-stats">
                  {[
                    { icon: <BedDouble size={16} />, l: "Bedrooms",  v: property.bedrooms },
                    { icon: <Bath size={16} />,      l: "Bathrooms", v: property.bathrooms },
                    { icon: <Ruler size={16} />,     l: "Area",      v: `${property.area?.toLocaleString()} ft²` },
                    { icon: <Home size={16} />,       l: "Type",      v: property.propertyType },
                  ].map((s, i) => (
                    <div key={i} className="pd-stat">
                      <div className="pd-stat-ico">{s.icon}</div>
                      <div className="pd-stat-l">{s.l}</div>
                      <div className="pd-stat-v">{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* Tabs */}
                <div className="pd-tabs">
                  {["overview", "amenities", "gallery"].map(t => (
                    <button
                      key={t}
                      className={`pd-tab ${tab === t ? "on" : ""}`}
                      onClick={() => setTab(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="pd-tab-body">

                  {tab === "overview" && (
                    <div className="pd-fadein">
                      <div className="pd-sec">About the Property</div>
                      <p className="pd-desc">{property.description}</p>
                      <div className="pd-sec">Key Highlights</div>
                      <div className="pd-g2">
                        {HIGHLIGHTS.map(h => (
                          <div key={h} className="pd-item"><CheckCircle2 size={13} /> {h}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "amenities" && (
                    <div className="pd-fadein">
                      <div className="pd-sec">Building Amenities</div>
                      <div className="pd-g3">
                        {AMENITIES.map(a => (
                          <div key={a.label} className="pd-item">{a.icon} {a.label}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === "gallery" && (
                    <div className="pd-fadein">
                      <div className="pd-sec">Photo Gallery</div>
                      <div className="pd-gallery">
                        {imageGallery.map((img, i) => (
                          <div key={i} className="pd-gi" onClick={() => { pick(i); setTab("overview"); }}>
                            <img src={img} alt={`Photo ${i + 1}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* ── Right sidebar ── */}
            <div className="pd-sidebar">

              {/* Call CTA */}
              <div className="pd-call-card">
                <div className="pd-call-label">📞 Speak to an expert</div>
                <div className="pd-call-num">+91 9438185822</div>
                <a href="tel:+919438185822" className="pd-call-btn">
                  <Phone size={14} /> Call Now
                </a>
              </div>

              {/* Enquiry form */}
              <div className="pd-card">
                <div className="pd-enquiry-head">
                  <div className="pd-enquiry-eyebrow">Send Enquiry</div>
                  <div className="pd-enquiry-title">Book a Site Visit</div>
                </div>

                <div className="pd-form">
                  {successMsg && <div className="pd-success">{successMsg}</div>}

                  <input
                    className="pd-input"
                    type="text" name="name" placeholder="Your Name"
                    value={formData.name} onChange={handleChange} required
                  />
                  <input
                    className="pd-input"
                    type="email" name="email" placeholder="Email Address"
                    value={formData.email} onChange={handleChange} required
                  />
                  <input
                    className="pd-input"
                    type="text" name="phone" placeholder="Phone Number"
                    value={formData.phone} onChange={handleChange} required
                  />
                  <textarea
                    className="pd-textarea"
                    name="message" placeholder="Your Message (optional)"
                    rows="3" value={formData.message} onChange={handleChange}
                  />
                  <button
                    className="pd-submit"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <Send size={14} />
                    {submitting ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>
              </div>

              {/* Quick property details */}
              <div className="pd-card" style={{ overflow: "hidden" }}>
                <div className="pd-qcard-title">Property Details</div>
                {[
                  ["Listing Type",  property.listingType],
                  ["Property Type", property.propertyType],
                  ["Bedrooms",      property.bedrooms],
                  ["Bathrooms",     property.bathrooms],
                  ["Carpet Area",   `${property.area} sqft`],
                  ["City",          property.city],
                ].map(([k, v]) => (
                  <div key={k} className="pd-drow">
                    <span className="pd-dk">{k}</span>
                    <span className="pd-dv">{v}</span>
                  </div>
                ))}
              </div>

              {/* Location stub */}
              <div className="pd-card" style={{ overflow: "hidden" }}>
                <div className="pd-map-head">
                  <div className="pd-map-tit">Location</div>
                </div>
                <div className="pd-map">
                  <div className="pd-map-grid" />
                  <div className="pd-map-dot">
                    <div className="pd-pulse" />
                    <div className="pd-map-tag"><MapPin size={11} /> {property.city}</div>
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