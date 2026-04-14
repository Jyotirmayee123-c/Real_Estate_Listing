import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin, BedDouble, Bath, Ruler, Home, ArrowLeft,
  Star, CheckCircle2, Wifi, Car, Wind, Dumbbell, Trees, Shield,
  Phone, Send, ChevronLeft, ChevronRight, Share2, Heart,
  CreditCard, X, ShieldCheck, Wallet, CalendarClock, BadgeCheck,
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

/* ═══════════════════════════════════════════════
   REVIEW MODAL — fixed
═══════════════════════════════════════════════ */
function ReviewModal({ propertyTitle, propertyId, onClose }) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef(null);

  const displayRating = hoverRating || rating;
  const ratingLabels  = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
  const ratingColors  = ["", "#f87171", "#fb923c", "#facc15", "#34d399", "#a78bfa"];
  const activeColor   = ratingColors[displayRating] || "rgba(255,255,255,0.15)";
  const activeLabel   = ratingLabels[displayRating] || "";

  const canSubmit = rating > 0 && name.trim().length > 0 && email.trim().length > 0;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await api.post("/review", {
        userName:     name.trim(),
        userEmail:    email.trim(),
        comment:      comment.trim(),
        rating:       Number(rating),
        propertyName: propertyTitle || "",
        propertyId:   propertyId    || "",
      });
    } catch (err) {
      console.error("Review error:", err);
    } finally {
      setSubmitting(false);
      setStep(2);
    }
  };

  return (
    <>
      <style>{`
        .rv-overlay{position:fixed;inset:0;z-index:10000;background:rgba(4,4,16,0.9);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;padding:16px;}
        .rv-box{background:#0f0f1c;border:1px solid rgba(255,255,255,0.09);border-radius:26px;width:100%;max-width:448px;max-height:88vh;overflow-y:auto;scrollbar-width:none;box-shadow:0 32px 80px rgba(0,0,0,0.9),0 0 0 1px rgba(124,58,237,0.15);}
        .rv-box::-webkit-scrollbar{display:none}
        .rv-head{display:flex;justify-content:space-between;align-items:flex-start;padding:22px 22px 0;}
        .rv-h-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:#fff;}
        .rv-h-sub{font-size:11.5px;color:rgba(255,255,255,0.32);margin-top:3px;font-family:'Inter',sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:290px;}
        .rv-close{width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.4);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .18s;}
        .rv-close:hover{background:rgba(239,68,68,0.1);border-color:rgba(239,68,68,0.25);color:#f87171;}
        .rv-body{padding:18px 22px 24px;}
        .rv-stars-block{text-align:center;padding:4px 0 18px;}
        .rv-stars-hint{font-size:10px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:14px;font-family:'Inter',sans-serif;}
        .rv-stars-row{display:flex;justify-content:center;gap:11px;margin-bottom:10px;}
        .rv-star{cursor:pointer;transition:transform .14s ease;display:block;line-height:0;}
        .rv-star:hover{transform:scale(1.28);}
        .rv-star.active{transform:scale(1.16);}
        .rv-rating-text{font-family:'Playfair Display',serif;font-size:.9rem;font-weight:600;height:1.25rem;transition:color .18s;}
        .rv-div{height:1px;background:rgba(255,255,255,0.07);margin:0 0 16px;}
        .rv-field{margin-bottom:13px;}
        .rv-lbl{font-size:10px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,0.32);margin-bottom:6px;font-family:'Inter',sans-serif;}
        .rv-req{color:#f87171;margin-left:2px;}
        .rv-inp{width:100%;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.09);border-radius:10px;padding:11px 13px;color:#fff;font-family:'Inter',sans-serif;font-size:13px;outline:none;transition:border-color .2s,background .2s;box-sizing:border-box;}
        .rv-inp::placeholder{color:rgba(255,255,255,0.2);}
        .rv-inp:focus{border-color:rgba(124,58,237,0.55);background:rgba(124,58,237,0.04);}
        .rv-textarea{width:100%;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.09);border-radius:10px;padding:11px 13px;color:#fff;font-family:'Inter',sans-serif;font-size:13px;outline:none;resize:vertical;min-height:90px;box-sizing:border-box;transition:border-color .2s,background .2s;}
        .rv-textarea::placeholder{color:rgba(255,255,255,0.2);}
        .rv-textarea:focus{border-color:rgba(124,58,237,0.55);background:rgba(124,58,237,0.04);}
        .rv-chars{text-align:right;font-size:10px;color:rgba(255,255,255,0.2);margin-top:4px;font-family:'Inter',sans-serif;}
        .rv-btn{width:100%;padding:13px;border:none;border-radius:12px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .22s;display:flex;align-items:center;justify-content:center;gap:8px;background:#7c3aed;color:#fff;box-shadow:0 4px 16px rgba(124,58,237,0.28);}
        .rv-btn:hover:not(:disabled){background:#6d28d9;transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,58,237,0.42);}
        .rv-btn:disabled{opacity:.35;cursor:not-allowed;transform:none!important;box-shadow:none;}
        .rv-moderated{display:flex;align-items:center;justify-content:center;gap:5px;font-size:10.5px;color:rgba(255,255,255,0.22);margin-top:9px;font-family:'Inter',sans-serif;}
        .rv-spin{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,0.2);border-top-color:#fff;animation:rvspin .6s linear infinite;}
        @keyframes rvspin{to{transform:rotate(360deg)}}
        .rv-success{text-align:center;padding:10px 0 6px;}
        .rv-suc-ring{width:72px;height:72px;border-radius:50%;margin:0 auto 16px;background:rgba(124,58,237,0.1);border:2px solid #a78bfa;display:flex;align-items:center;justify-content:center;font-size:28px;}
        .rv-suc-title{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700;color:#fff;margin-bottom:7px;}
        .rv-suc-stars{display:flex;justify-content:center;gap:5px;margin-bottom:13px;}
        .rv-suc-msg{font-size:12.5px;color:rgba(255,255,255,0.4);line-height:1.75;margin-bottom:20px;font-family:'Inter',sans-serif;}
        .rv-suc-btn{width:100%;padding:12px;border-radius:12px;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.6);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:500;cursor:pointer;transition:all .2s;}
        .rv-suc-btn:hover{background:rgba(124,58,237,0.1);border-color:rgba(167,139,250,0.35);color:#a78bfa;}
      `}</style>

      <div ref={overlayRef} className="rv-overlay" onClick={handleOverlayClick}>
        <div className="rv-box">

          <div className="rv-head">
            <div>
              <div className="rv-h-title">
                {step === 2 ? "Review Submitted!" : "Write a Review"}
              </div>
              <div className="rv-h-sub">
                {step === 2 ? "Thank you for your feedback 🙏" : propertyTitle}
              </div>
            </div>
            <button className="rv-close" onClick={onClose} type="button">
              <X size={14} />
            </button>
          </div>

          <div className="rv-body">

            {step === 1 && (
              <>
                <div className="rv-stars-block">
                  <div className="rv-stars-hint">Rate your experience</div>
                  <div className="rv-stars-row">
                    {[1, 2, 3, 4, 5].map((n) => {
                      const filled = n <= displayRating;
                      return (
                        <svg
                          key={n}
                          className={`rv-star ${n <= rating ? "active" : ""}`}
                          width="32" height="32" viewBox="0 0 24 24"
                          fill={filled ? activeColor : "rgba(255,255,255,0.1)"}
                          stroke={filled ? activeColor : "rgba(255,255,255,0.14)"}
                          strokeWidth="1.2"
                          onMouseEnter={() => setHoverRating(n)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(n)}
                        >
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                      );
                    })}
                  </div>
                  <div className="rv-rating-text" style={{ color: activeColor }}>
                    {activeLabel}
                  </div>
                </div>

                <div className="rv-div" />

                <div className="rv-field">
                  <div className="rv-lbl">Full Name <span className="rv-req">*</span></div>
                  <input
                    className="rv-inp"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>

                <div className="rv-field">
                  <div className="rv-lbl">Email Address <span className="rv-req">*</span></div>
                  <input
                    className="rv-inp"
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className="rv-field">
                  <div className="rv-lbl" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Your Review</span>
                    <span style={{ color: "rgba(255,255,255,0.18)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: 10 }}>optional</span>
                  </div>
                  <textarea
                    className="rv-textarea"
                    placeholder="Share your experience with this property or our team…"
                    value={comment}
                    maxLength={500}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="rv-chars">{comment.length} / 500</div>
                </div>

                <button
                  className="rv-btn"
                  type="button"
                  disabled={!canSubmit || submitting}
                  onClick={handleSubmit}
                >
                  {submitting
                    ? <><div className="rv-spin" /> Submitting…</>
                    : <><Send size={14} /> Submit Review</>}
                </button>

                <div className="rv-moderated">
                  <ShieldCheck size={11} />
                  Reviews are moderated before going live
                </div>
              </>
            )}

            {step === 2 && (
              <div className="rv-success">
                <div className="rv-suc-ring">⭐</div>
                <div className="rv-suc-title">Thank You!</div>
                <div className="rv-suc-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg key={n} width="19" height="19" viewBox="0 0 24 24"
                      fill={n <= rating ? "#a78bfa" : "rgba(255,255,255,0.07)"} stroke="none">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <div className="rv-suc-msg">
                  Your {rating}-star review has been submitted and is pending moderation.
                  Once approved it may be featured on our website.
                  <br /><br />We truly appreciate your feedback!
                </div>
                <button className="rv-suc-btn" type="button" onClick={onClose}>Close</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}


/* ═══════════════════════════════════════════════
   PAYMENT MODAL
═══════════════════════════════════════════════ */
function PaymentModal({ price, propertyTitle, propertyType, onClose, onPaymentSaved }) {
  const [step, setStep] = useState(1);
  const [payType, setPayType] = useState(null);
  const [upiApp, setUpiApp] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [userInfoError, setUserInfoError] = useState("");
  const overlayRef = useRef(null);

  const fmt = (n) =>
    n >= 1e7 ? "₹" + (n / 1e7).toFixed(2) + " Cr"
    : n >= 1e5 ? "₹" + (n / 1e5).toFixed(1) + " L"
    : "₹" + n?.toLocaleString();

  const payTypes = [
    {
      id: "advance", icon: <Wallet size={22} />, label: "Advance",
      sub: "Pay 30% now", dueNow: Math.round(price * 0.3), color: "#a78bfa",
      breakdown: [
        ["Pay Now (30%)", fmt(Math.round(price * 0.3)), true],
        ["Balance (70%)", fmt(Math.round(price * 0.7)), false],
        ["Balance Due By", "Within 30 days", false],
      ],
    },
    {
      id: "installment", icon: <CalendarClock size={22} />, label: "Installment",
      sub: "3 equal EMIs", dueNow: Math.round(price / 3), color: "#38bdf8",
      breakdown: [
        ["EMI 1 — Now",     fmt(Math.round(price / 3)), true],
        ["EMI 2 — Month 2", fmt(Math.round(price / 3)), false],
        ["EMI 3 — Month 3", fmt(Math.round(price / 3)), false],
        ["Interest",        "0% — No extra charges",   false],
      ],
    },
    {
      id: "full", icon: <BadgeCheck size={22} />, label: "Full Payment",
      sub: "Best value", dueNow: price, color: "#34d399",
      breakdown: [
        ["Total Amount", fmt(price),       true],
        ["One-time Pay", "No hidden fees", false],
        ["Benefit",      "Best Value ✓",   false],
      ],
    },
  ];

  const upiApps = [
    { id: "phonepe", emoji: "📱", name: "PhonePe",    tag: "UPI",        accentColor: "#5200ff", bg: "rgba(82,0,255,0.12)"   },
    { id: "gpay",    emoji: "🔵", name: "Google Pay", tag: "UPI",        accentColor: "#4285f4", bg: "rgba(66,133,244,0.12)" },
    { id: "paytm",   emoji: "💙", name: "Paytm",      tag: "UPI/Wallet", accentColor: "#00baff", bg: "rgba(0,186,255,0.12)"  },
  ];

  const selType    = payTypes.find(p => p.id === payType);
  const selApp     = upiApps.find(a => a.id === upiApp);
  const canPay     = upiApp && upiId.trim().length > 4;
  const canProceed = userInfo.name.trim() && userInfo.email.trim() && userInfo.phone.trim();
  const upiAppToMethod = { phonepe: "upi", gpay: "upi", paytm: "wallet" };

  const handlePay = async () => {
    setProcessing(true);
    const generatedTxnId = "TXN" + Date.now().toString().slice(-10).toUpperCase();
    const paymentStatus = payType === "full" ? "success" : "pending";
    try {
      await api.post("/payment", {
        userName: userInfo.name, userEmail: userInfo.email, userPhone: userInfo.phone,
        propertyName: propertyTitle, propertyType: propertyType || "apartment",
        amount: price, amountPaid: selType?.dueNow || 0,
        paymentMethod: upiAppToMethod[upiApp] || "upi",
        paymentStatus, transactionId: generatedTxnId,
        notes: payType === "installment" ? "Installment plan — 3 EMIs" : payType === "advance" ? "Advance payment — 30% paid" : "",
      });
      if (onPaymentSaved) onPaymentSaved();
    } catch (err) {
      console.error("Payment error:", err);
    }
    setTimeout(() => { setTxnId(generatedTxnId); setStep(4); setProcessing(false); }, 2400);
  };

  const bar = (n) => n < step ? "done" : n === step ? "active" : "";

  return (
    <>
      <style>{`
        .pm-overlay{position:fixed;inset:0;z-index:9999;background:rgba(4,4,16,0.84);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;padding:16px;animation:pmfade .2s ease;}
        @keyframes pmfade{from{opacity:0}to{opacity:1}}
        .pm-box{background:#0f0f1c;border:1px solid rgba(255,255,255,0.09);border-radius:28px;width:100%;max-width:468px;max-height:92vh;overflow-y:auto;scrollbar-width:none;box-shadow:0 40px 100px rgba(0,0,0,0.85),0 0 0 1px rgba(124,58,237,0.12);animation:pmup .32s cubic-bezier(.34,1.56,.64,1);}
        .pm-box::-webkit-scrollbar{display:none}
        @keyframes pmup{from{opacity:0;transform:translateY(30px) scale(.97)}to{opacity:1;transform:none}}
        .pm-hd{display:flex;justify-content:space-between;align-items:flex-start;padding:26px 26px 0;}
        .pm-htitle{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#fff;}
        .pm-hsub{font-size:12.5px;color:rgba(255,255,255,0.38);margin-top:4px;font-family:'Inter',sans-serif;}
        .pm-xbtn{width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;}
        .pm-xbtn:hover{background:rgba(239,68,68,0.12);border-color:rgba(239,68,68,0.3);color:#f87171;}
        .pm-prog{display:flex;gap:6px;padding:20px 26px 0;}
        .pm-bar{flex:1;height:3px;border-radius:100px;background:rgba(255,255,255,0.07);transition:background .4s;}
        .pm-bar.active{background:#7c3aed;}.pm-bar.done{background:#10b981;}
        .pm-body{padding:22px 26px 28px;}
        .pm-slabel{font-size:10.5px;font-weight:600;letter-spacing:.11em;text-transform:uppercase;color:#a78bfa;margin-bottom:16px;font-family:'Inter',sans-serif;}
        .pm-types{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
        .pm-tcard{background:rgba(255,255,255,0.03);border:1.5px solid rgba(255,255,255,0.08);border-radius:16px;padding:16px 10px;text-align:center;cursor:pointer;transition:all .22s;position:relative;}
        .pm-tcard:hover{transform:translateY(-2px);}
        .pm-tcard.sel{border-color:var(--tc)!important;background:rgba(124,58,237,0.08);}
        .pm-tcard.sel::after{content:'✓';position:absolute;top:8px;right:10px;font-size:10px;font-weight:700;color:var(--tc);}
        .pm-t-ico{display:flex;justify-content:center;margin-bottom:9px;}
        .pm-t-name{font-size:12.5px;font-weight:600;color:#fff;font-family:'Inter',sans-serif;}
        .pm-t-sub{font-size:10.5px;color:rgba(255,255,255,0.35);margin-top:3px;font-family:'Inter',sans-serif;}
        .pm-info{background:rgba(124,58,237,0.07);border:1px solid rgba(124,58,237,0.2);border-radius:14px;padding:14px 16px;margin-bottom:20px;}
        .pm-info-ttl{font-size:10.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:#a78bfa;margin-bottom:10px;font-family:'Inter',sans-serif;}
        .pm-irow{display:flex;justify-content:space-between;align-items:center;padding:5px 0;font-size:13px;font-family:'Inter',sans-serif;}
        .pm-irow span:first-child{color:rgba(255,255,255,0.4);}.pm-irow span:last-child{font-weight:600;color:#fff;}.pm-irow span.hl{color:#a78bfa;}
        .pm-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;}
        .pm-acard{border:1.5px solid rgba(255,255,255,0.08);border-radius:16px;padding:18px 10px 14px;text-align:center;cursor:pointer;background:rgba(255,255,255,0.03);transition:all .22s;position:relative;}
        .pm-acard:hover{transform:translateY(-3px);}
        .pm-a-emoji{font-size:28px;margin-bottom:8px;}
        .pm-a-name{font-size:12px;font-weight:600;font-family:'Inter',sans-serif;}
        .pm-a-tag{font-size:10px;color:rgba(255,255,255,0.32);margin-top:3px;font-family:'Inter',sans-serif;}
        .pm-lbl{font-size:11px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:rgba(255,255,255,0.38);margin-bottom:8px;font-family:'Inter',sans-serif;}
        .pm-inp{width:100%;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:12px;padding:13px 15px;color:#fff;font-family:'Courier New',monospace;font-size:13.5px;outline:none;transition:border-color .22s,background .22s;margin-bottom:14px;}
        .pm-inp-text{font-family:'Inter',sans-serif!important;}
        .pm-inp::placeholder{color:rgba(255,255,255,0.25);}.pm-inp:focus{border-color:rgba(124,58,237,0.55);background:rgba(124,58,237,0.05);}
        .pm-err{color:#f87171;font-size:11.5px;margin-bottom:12px;font-family:'Inter',sans-serif;}
        .pm-summary{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:14px 16px;margin-bottom:20px;}
        .pm-srow{display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:5px 0;font-family:'Inter',sans-serif;}
        .pm-srow span:first-child{color:rgba(255,255,255,0.38);}.pm-srow span:last-child{color:#fff;font-weight:500;}
        .pm-srow.total{border-top:1px solid rgba(255,255,255,0.07);margin-top:8px;padding-top:12px;font-size:15px;font-weight:700;}
        .pm-srow.total span:last-child{color:#10b981;font-family:'Playfair Display',serif;}
        .pm-btn{width:100%;padding:14px;border:none;border-radius:14px;font-family:'Inter',sans-serif;font-size:14.5px;font-weight:600;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px;letter-spacing:.02em;}
        .pm-btn-purple{background:#7c3aed;color:#fff;box-shadow:0 4px 20px rgba(124,58,237,0.28);}
        .pm-btn-purple:hover:not(:disabled){background:#6d28d9;transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,58,237,0.4);}
        .pm-btn-green{background:linear-gradient(135deg,#059669,#10b981);color:#fff;box-shadow:0 4px 20px rgba(16,185,129,0.25);}
        .pm-btn-green:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 28px rgba(16,185,129,0.38);}
        .pm-btn:disabled{opacity:.4;cursor:not-allowed;transform:none!important;}
        .pm-secure{display:flex;align-items:center;justify-content:center;gap:6px;font-size:11.5px;color:rgba(255,255,255,0.28);margin-top:12px;font-family:'Inter',sans-serif;}
        .pm-secure svg{color:#10b981;}
        .pm-divider{height:1px;background:rgba(255,255,255,0.06);margin:18px 0;}
        .pm-back-lnk{background:none;border:none;color:rgba(255,255,255,0.38);font-size:12.5px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;font-family:'Inter',sans-serif;transition:color .2s;}
        .pm-back-lnk:hover{color:#a78bfa;}
        .pm-spin{width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,0.25);border-top-color:#fff;animation:pmspin .7s linear infinite;}
        @keyframes pmspin{to{transform:rotate(360deg)}}
        .pm-suc{text-align:center;padding:12px 0 8px;}
        .pm-suc-ico{width:76px;height:76px;border-radius:50%;margin:0 auto 20px;background:rgba(16,185,129,0.12);border:2px solid #10b981;display:flex;align-items:center;justify-content:center;font-size:32px;}
        .pm-suc-title{font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700;color:#fff;margin-bottom:10px;}
        .pm-suc-msg{font-size:13.5px;color:rgba(255,255,255,0.45);line-height:1.7;margin-bottom:22px;font-family:'Inter',sans-serif;}
        .pm-txn{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 18px;margin-bottom:22px;}
        .pm-txn-lbl{font-size:10.5px;color:rgba(255,255,255,0.32);text-transform:uppercase;letter-spacing:.09em;margin-bottom:6px;font-family:'Inter',sans-serif;}
        .pm-txn-id{font-family:'Courier New',monospace;font-size:14px;color:#a78bfa;font-weight:700;letter-spacing:.05em;}
        .pm-done{width:100%;padding:13px;border-radius:14px;background:rgba(255,255,255,0.05);border:1.5px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;}
        .pm-done:hover{background:rgba(255,255,255,0.08);color:#fff;}
        .pm-status-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;font-size:12px;font-weight:600;font-family:'Inter',sans-serif;margin-bottom:16px;}
        .pm-status-success{background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);color:#10b981;}
        .pm-status-pending{background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.3);color:#fbbf24;}
      `}</style>

      <div ref={overlayRef} className="pm-overlay" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
        <div className="pm-box">
          <div className="pm-hd">
            <div>
              <div className="pm-htitle">{step === 4 ? "Booking Confirmed" : "Complete Purchase"}</div>
              <div className="pm-hsub">{step === 4 ? "Your booking is recorded 🎉" : `${propertyTitle} · ${fmt(price)}`}</div>
            </div>
            <button className="pm-xbtn" onClick={onClose}><X size={16} /></button>
          </div>
          {step < 4 && (
            <div className="pm-prog">
              {[1, 2, 3].map(n => <div key={n} className={`pm-bar ${bar(n)}`} />)}
            </div>
          )}
          <div className="pm-body">
            {step === 1 && (
              <>
                <div className="pm-slabel">Step 1 of 3 — Your Details</div>
                <div className="pm-lbl">Full Name</div>
                <input className="pm-inp pm-inp-text" type="text" placeholder="Your full name" value={userInfo.name} onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} />
                <div className="pm-lbl">Email Address</div>
                <input className="pm-inp pm-inp-text" type="email" placeholder="you@email.com" value={userInfo.email} onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} />
                <div className="pm-lbl">Phone Number</div>
                <input className="pm-inp pm-inp-text" type="text" placeholder="9XXXXXXXXX" value={userInfo.phone} onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })} style={{ marginBottom: 20 }} />
                {userInfoError && <div className="pm-err">{userInfoError}</div>}
                <button className="pm-btn pm-btn-purple" disabled={!canProceed} onClick={() => { setUserInfoError(""); setStep(2); }}>Continue →</button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="pm-slabel">Step 2 of 3 — Choose Payment Type</div>
                <div className="pm-types">
                  {payTypes.map(t => (
                    <div key={t.id} className={`pm-tcard ${payType === t.id ? "sel" : ""}`} style={{ "--tc": t.color }} onClick={() => setPayType(t.id)}>
                      <div className="pm-t-ico" style={{ color: t.color }}>{t.icon}</div>
                      <div className="pm-t-name">{t.label}</div>
                      <div className="pm-t-sub">{t.sub}</div>
                    </div>
                  ))}
                </div>
                {selType && (
                  <div className="pm-info">
                    <div className="pm-info-ttl">Payment Breakdown</div>
                    {selType.breakdown.map(([k, v, hl], i) => (
                      <div key={i} className="pm-irow"><span>{k}</span><span className={hl ? "hl" : ""}>{v}</span></div>
                    ))}
                    <div className="pm-irow" style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      <span>Status after payment</span>
                      <span style={{ color: payType === "full" ? "#10b981" : "#fbbf24", fontWeight: 700 }}>
                        {payType === "full" ? "✓ Paid" : "⏳ Pending"}
                      </span>
                    </div>
                  </div>
                )}
                <button className="pm-btn pm-btn-purple" disabled={!payType} onClick={() => setStep(3)}>Continue to Payment →</button>
                <div className="pm-divider" />
                <button className="pm-back-lnk" onClick={() => setStep(1)}>← Back</button>
              </>
            )}
            {step === 3 && (
              <>
                <div className="pm-slabel">Step 3 of 3 — Select Payment App</div>
                <div className="pm-apps">
                  {upiApps.map(a => (
                    <div key={a.id} className="pm-acard" style={{ borderColor: upiApp === a.id ? a.accentColor : undefined, background: upiApp === a.id ? a.bg : undefined }} onClick={() => setUpiApp(a.id)}>
                      {upiApp === a.id && <span style={{ position: "absolute", top: 8, right: 10, fontSize: 10, fontWeight: 700, color: a.accentColor }}>✓</span>}
                      <div className="pm-a-emoji">{a.emoji}</div>
                      <div className="pm-a-name" style={{ color: upiApp === a.id ? a.accentColor : "#fff" }}>{a.name}</div>
                      <div className="pm-a-tag">{a.tag}</div>
                    </div>
                  ))}
                </div>
                <div className="pm-lbl">UPI ID / Mobile Number</div>
                <input className="pm-inp" type="text" placeholder="yourname@upi  or  9XXXXXXXXX" value={upiId} onChange={e => setUpiId(e.target.value)} />
                <div className="pm-summary">
                  <div className="pm-srow"><span>Buyer</span><span>{userInfo.name}</span></div>
                  <div className="pm-srow"><span>Property</span><span style={{ fontSize: 11, maxWidth: 180, textAlign: "right" }}>{propertyTitle}</span></div>
                  <div className="pm-srow"><span>Payment Type</span><span>{selType?.label}</span></div>
                  <div className="pm-srow"><span>Via</span><span>{selApp?.name ?? "—"}</span></div>
                  <div className="pm-srow total"><span>Amount Due Now</span><span>{selType ? fmt(selType.dueNow) : "—"}</span></div>
                </div>
                <button className="pm-btn pm-btn-green" disabled={!canPay || processing} onClick={handlePay}>
                  {processing ? <><div className="pm-spin" /> Saving & Processing...</> : <>Pay {selType ? fmt(selType.dueNow) : ""}</>}
                </button>
                <div className="pm-secure"><ShieldCheck size={13} /> 256-bit SSL encrypted · Powered by UPI</div>
                <div className="pm-divider" />
                <button className="pm-back-lnk" onClick={() => setStep(2)}>← Back to payment type</button>
              </>
            )}
            {step === 4 && (
              <div className="pm-suc">
                <div className="pm-suc-ico">✓</div>
                <div className="pm-suc-title">{payType === "full" ? "Payment Successful!" : "Booking Recorded!"}</div>
                <div className={`pm-status-badge ${payType === "full" ? "pm-status-success" : "pm-status-pending"}`}>
                  {payType === "full" ? "✓ Paid" : "⏳ Pending — Balance Due"}
                </div>
                <div className="pm-suc-msg">
                  {fmt(selType?.dueNow)} paid via {selApp?.name} ({selType?.label}).
                  {payType !== "full" && " Your remaining balance has been recorded and is visible in admin."}
                  {" "}A confirmation will be sent to {userInfo.email}.
                </div>
                <div className="pm-txn">
                  <div className="pm-txn-lbl">Transaction ID</div>
                  <div className="pm-txn-id">{txnId}</div>
                </div>
                <button className="pm-done" onClick={onClose}>Done</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


/* ═══════════════════════════════════════════════
   PROPERTY DETAILS (MAIN)
═══════════════════════════════════════════════ */
export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property,      setProperty]      = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeIdx,     setActiveIdx]     = useState(0);
  const [loading,       setLoading]       = useState(true);
  const [liked,         setLiked]         = useState(false);
  const [tab,           setTab]           = useState("overview");
  const [showPayment,   setShowPayment]   = useState(false);
  const [showReview,    setShowReview]    = useState(false);

  const [formData,   setFormData]   = useState({ name: "", email: "", phone: "", message: "" });
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
        const res  = await api.get(`/property/${id}`);
        const data = res.data.property || res.data?.data;
        setProperty(data);
        if (data?.thumbnail) setSelectedImage(getImageUrl(data.thumbnail));
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

  const pick = (i) => { setActiveIdx(i); setSelectedImage(imageGallery[i]); };
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
          <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Inter',sans-serif", marginTop: 16, fontSize: 14 }}>Loading property...</p>
        </div>
        <style>{`.pd-spinner{width:40px;height:40px;border-radius:50%;margin:0 auto;border:3px solid rgba(124,58,237,0.15);border-top-color:#7c3aed;animation:pd-spin .8s linear infinite;}@keyframes pd-spin{to{transform:rotate(360deg)}}`}</style>
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
        *{box-sizing:border-box;margin:0;padding:0;}
        .pd-root{min-height:100vh;background:#0d0d1a;font-family:'Inter',sans-serif;position:relative;overflow-x:hidden;}
        .pd-glow{position:fixed;top:0;left:50%;transform:translateX(-50%);width:800px;height:500px;background:rgba(139,92,246,0.13);border-radius:50%;filter:blur(130px);pointer-events:none;z-index:0;}
        .pd-glow2{position:fixed;bottom:-100px;right:-100px;width:500px;height:500px;background:rgba(109,40,217,0.08);border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0;}
        .pd-content{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:96px 20px 80px;}
        .pd-navbar{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(13,13,26,0.85);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.07);}
        .pd-navbar-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:16px 20px;}
        .pd-nav-brand{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#fff;letter-spacing:.01em;text-decoration:none;display:flex;align-items:center;gap:8px;}
        .pd-nav-brand em{font-style:normal;color:#a78bfa;}
        .pd-nav-dot{width:6px;height:6px;border-radius:50%;background:#7c3aed;display:inline-block;box-shadow:0 0 8px rgba(124,58,237,0.6);}
        .pd-nav-links{display:flex;align-items:center;gap:6px;}
        @media(max-width:640px){.pd-nav-links .pd-nav-link-txt{display:none;}}
        .pd-nav-link{display:inline-flex;align-items:center;gap:5px;padding:7px 16px;border-radius:100px;font-family:'Inter',sans-serif;font-size:12.5px;font-weight:500;cursor:pointer;transition:all .22s;letter-spacing:.02em;text-decoration:none;border:none;}
        .pd-nav-ghost{background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.65);border:1px solid rgba(255,255,255,0.12);}
        .pd-nav-ghost:hover{border-color:rgba(167,139,250,0.45);color:#a78bfa;background:rgba(124,58,237,0.06);}
        .pd-nav-purple{background:#7c3aed;color:#fff;border:none;}
        .pd-nav-purple:hover{background:#6d28d9;transform:scale(1.03);box-shadow:0 4px 16px rgba(124,58,237,0.35);}
        .pd-nav-badge{display:inline-flex;align-items:center;gap:5px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.25);color:#a78bfa;padding:5px 12px;border-radius:100px;font-family:'Inter',sans-serif;font-size:10.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-right:4px;}
        .pd-nav-badge-dot{width:5px;height:5px;border-radius:50%;background:#a78bfa;display:inline-block;}
        .pd-back{display:inline-flex;align-items:center;gap:8px;color:rgba(255,255,255,0.5);font-size:13px;font-weight:500;cursor:pointer;background:none;border:none;padding:0;margin-bottom:28px;transition:color .2s;font-family:'Inter',sans-serif;}
        .pd-back:hover{color:#a78bfa;}
        .pd-back svg{transition:transform .2s;}.pd-back:hover svg{transform:translateX(-3px);}
        .pd-hero-text{margin-bottom:32px;}
        .pd-eyebrow{font-size:10.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#a78bfa;margin-bottom:8px;}
        .pd-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;color:#fff;line-height:1.15;margin-bottom:10px;}
        .pd-loc{display:inline-flex;align-items:center;gap:6px;color:rgba(255,255,255,0.45);font-size:13px;}
        .pd-loc svg{color:#a78bfa;}
        .pd-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;}
        .pd-chip{padding:4px 14px;border-radius:100px;font-size:11px;font-weight:500;text-transform:capitalize;letter-spacing:.03em;}
        .pd-chip-p{background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);}
        .pd-chip-g{background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.1);}
        .pd-chip-feat{background:rgba(124,58,237,0.9);color:#fff;border:1px solid rgba(167,139,250,0.4);display:inline-flex;align-items:center;gap:4px;}
        .pd-grid{display:grid;grid-template-columns:1fr 360px;gap:24px;align-items:start;}
        @media(max-width:1024px){.pd-grid{grid-template-columns:1fr;}}
        .pd-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:24px;transition:border-color .3s;}
        .pd-card:hover{border-color:rgba(124,58,237,0.2);}
        .pd-img-viewer{border-radius:24px 24px 0 0;overflow:hidden;position:relative;height:420px;}
        @media(max-width:640px){.pd-img-viewer{height:260px;}}
        .pd-main-img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease;}
        .pd-main-img:hover{transform:scale(1.04);}
        .pd-img-grad{position:absolute;inset:0;pointer-events:none;background:linear-gradient(to bottom,rgba(13,13,26,0.2) 0%,transparent 40%,rgba(13,13,26,0.5) 100%);}
        .pd-img-tint{position:absolute;inset:0;pointer-events:none;background:rgba(109,40,217,0.07);}
        .pd-img-nav{position:absolute;top:50%;left:0;right:0;transform:translateY(-50%);display:flex;justify-content:space-between;padding:0 16px;pointer-events:none;}
        .pd-hnav{pointer-events:all;width:40px;height:40px;border-radius:50%;background:rgba(13,13,26,0.65);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.12);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s;}
        .pd-hnav:hover{background:#7c3aed;border-color:transparent;}
        .pd-img-count{position:absolute;top:14px;right:16px;background:rgba(13,13,26,0.7);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);padding:4px 12px;border-radius:100px;font-size:11.5px;color:rgba(255,255,255,0.65);}
        .pd-feat-badge{position:absolute;top:14px;left:16px;display:inline-flex;align-items:center;gap:4px;background:rgba(124,58,237,0.88);color:#fff;padding:4px 12px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;border:1px solid rgba(167,139,250,0.35);}
        .pd-like-share{position:absolute;bottom:14px;right:16px;display:flex;gap:8px;}
        .pd-icon-btn{width:36px;height:36px;border-radius:50%;background:rgba(13,13,26,0.65);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
        .pd-icon-btn:hover{border-color:rgba(124,58,237,0.4);color:#a78bfa;}
        .pd-icon-btn.liked{background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.3);color:#f87171;}
        .pd-thumbs-wrap{padding:14px 20px;border-top:1px solid rgba(255,255,255,0.06);overflow-x:auto;scrollbar-width:none;}
        .pd-thumbs-wrap::-webkit-scrollbar{display:none;}
        .pd-thumbs{display:flex;gap:10px;width:max-content;}
        .pd-thumb{width:80px;height:52px;border-radius:10px;overflow:hidden;cursor:pointer;flex-shrink:0;border:2px solid transparent;opacity:.45;transition:all .2s;}
        .pd-thumb.on{border-color:#7c3aed;opacity:1;}
        .pd-thumb img{width:100%;height:100%;object-fit:cover;}
        .pd-price-row{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:20px 20px 0;}
        .pd-price{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;color:#fff;line-height:1;}
        .pd-price-mo{font-size:1rem;color:#a78bfa;font-weight:400;margin-left:5px;}
        .pd-action-row{display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
        .pd-buy-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all .25s;box-shadow:0 4px 20px rgba(124,58,237,0.38);letter-spacing:.02em;white-space:nowrap;}
        .pd-buy-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(124,58,237,0.52);}
        .pd-review-btn{display:inline-flex;align-items:center;gap:7px;padding:12px 20px;border-radius:12px;background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-family:'Inter',sans-serif;font-size:13.5px;font-weight:500;cursor:pointer;border:1.5px solid rgba(255,255,255,0.12);transition:all .25s;white-space:nowrap;}
        .pd-review-btn:hover{background:rgba(124,58,237,0.1);border-color:rgba(167,139,250,0.45);color:#a78bfa;transform:translateY(-2px);}
        .pd-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:20px 20px 0;}
        @media(max-width:600px){.pd-stats{grid-template-columns:repeat(2,1fr);}}
        .pd-stat{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:16px 12px;display:flex;flex-direction:column;align-items:center;gap:7px;transition:border-color .3s,transform .3s,background .3s;cursor:default;}
        .pd-stat:hover{border-color:rgba(124,58,237,0.4);background:rgba(124,58,237,0.07);transform:translateY(-2px);}
        .pd-stat-ico{width:36px;height:36px;border-radius:10px;background:rgba(124,58,237,0.12);display:flex;align-items:center;justify-content:center;color:#a78bfa;}
        .pd-stat-l{font-size:10px;color:rgba(255,255,255,0.32);text-transform:uppercase;letter-spacing:.07em;}
        .pd-stat-v{font-family:'Playfair Display',serif;font-size:1.1rem;color:#fff;font-weight:600;}
        .pd-tabs{display:flex;border-bottom:1px solid rgba(255,255,255,0.07);margin:20px 20px 0;overflow-x:auto;scrollbar-width:none;}
        .pd-tabs::-webkit-scrollbar{display:none;}
        .pd-tab{padding:10px 20px;font-size:13px;font-weight:500;color:rgba(255,255,255,0.35);cursor:pointer;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;white-space:nowrap;font-family:'Inter',sans-serif;}
        .pd-tab.on{color:#a78bfa;border-bottom-color:#7c3aed;}
        .pd-tab:hover:not(.on){color:rgba(255,255,255,0.65);}
        .pd-tab-body{padding:24px 20px 28px;}
        .pd-sec{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:600;color:#fff;margin:0 0 14px;display:flex;align-items:center;gap:10px;}
        .pd-sec::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.07);}
        .pd-desc{font-size:14px;line-height:1.82;color:rgba(255,255,255,0.45);margin-bottom:28px;}
        .pd-g2{display:grid;grid-template-columns:repeat(2,1fr);gap:9px;margin-bottom:24px;}
        .pd-g3{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;}
        @media(max-width:480px){.pd-g2,.pd-g3{grid-template-columns:repeat(2,1fr);}}
        .pd-item{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:11px 13px;font-size:12px;color:rgba(255,255,255,0.65);transition:border-color .22s,background .22s;}
        .pd-item:hover{border-color:rgba(124,58,237,0.35);background:rgba(124,58,237,0.06);}
        .pd-item svg{color:#a78bfa;flex-shrink:0;}
        .pd-gallery{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:120px;gap:9px;}
        .pd-gi{border-radius:12px;overflow:hidden;cursor:pointer;position:relative;}
        .pd-gi:first-child{grid-column:span 2;grid-row:span 2;}
        .pd-gi img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
        .pd-gi:hover img{transform:scale(1.07);}
        .pd-gi::after{content:'';position:absolute;inset:0;border-radius:12px;background:rgba(124,58,237,0);transition:background .3s;}
        .pd-gi:hover::after{background:rgba(124,58,237,0.12);}
        .pd-sidebar{display:flex;flex-direction:column;gap:16px;position:sticky;top:80px;}
        .pd-enquiry-head{padding:22px 22px 16px;border-bottom:1px solid rgba(255,255,255,0.07);}
        .pd-enquiry-eyebrow{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:5px;}
        .pd-enquiry-title{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:600;color:#fff;}
        .pd-form{padding:20px 22px 22px;display:flex;flex-direction:column;gap:12px;}
        .pd-input,.pd-textarea{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px 14px;color:#fff;font-family:'Inter',sans-serif;font-size:13.5px;outline:none;transition:border-color .22s,background .22s;}
        .pd-input::placeholder,.pd-textarea::placeholder{color:rgba(255,255,255,0.28);}
        .pd-input:focus,.pd-textarea:focus{border-color:rgba(124,58,237,0.5);background:rgba(124,58,237,0.05);}
        .pd-textarea{resize:vertical;min-height:100px;}
        .pd-submit{width:100%;padding:13px;background:#7c3aed;color:#fff;border:none;border-radius:12px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .22s;display:flex;align-items:center;justify-content:center;gap:7px;letter-spacing:.02em;}
        .pd-submit:hover:not(:disabled){background:#6d28d9;transform:translateY(-1px);box-shadow:0 8px 24px rgba(124,58,237,0.3);}
        .pd-submit:disabled{opacity:.6;cursor:not-allowed;}
        .pd-success{background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.25);color:#6ee7b7;border-radius:10px;padding:10px 14px;font-size:13px;text-align:center;}
        .pd-qcard-title{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#a78bfa;margin-bottom:14px;padding:20px 22px 0;}
        .pd-drow{display:flex;justify-content:space-between;align-items:center;padding:9px 22px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:13px;}
        .pd-drow:last-child{border-bottom:none;padding-bottom:20px;}
        .pd-dk{color:rgba(255,255,255,0.35);}.pd-dv{color:#fff;font-weight:500;text-transform:capitalize;}
        .pd-map-head{padding:18px 22px 14px;border-bottom:1px solid rgba(255,255,255,0.06);}
        .pd-map-tit{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#a78bfa;}
        .pd-map{height:150px;position:relative;background:#0a0a18;overflow:hidden;border-radius:0 0 22px 22px;cursor:pointer;}
        .pd-map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(124,58,237,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.06) 1px,transparent 1px);background-size:24px 24px;}
        .pd-map-dot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:8px;}
        .pd-pulse{width:13px;height:13px;border-radius:50%;background:#7c3aed;box-shadow:0 0 0 5px rgba(124,58,237,0.22),0 0 0 10px rgba(124,58,237,0.09);animation:pd-pulse 2s ease-in-out infinite;}
        @keyframes pd-pulse{0%,100%{box-shadow:0 0 0 5px rgba(124,58,237,0.22),0 0 0 10px rgba(124,58,237,0.09);}50%{box-shadow:0 0 0 9px rgba(124,58,237,0.25),0 0 0 18px rgba(124,58,237,0.05);}}
        .pd-map-tag{background:rgba(13,13,26,0.9);color:rgba(255,255,255,0.65);border:1px solid rgba(124,58,237,0.25);border-radius:100px;padding:4px 12px;font-size:11px;font-family:'Inter',sans-serif;display:flex;align-items:center;gap:5px;white-space:nowrap;}
        .pd-map-tag svg{color:#a78bfa;}
        @keyframes pd-fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .pd-fadein{animation:pd-fadein .45s ease both;}
        .pd-call-card{background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.25);border-radius:20px;padding:20px 22px;display:flex;flex-direction:column;gap:10px;}
        .pd-call-label{font-size:11px;font-weight:500;color:rgba(255,255,255,0.45);letter-spacing:.04em;}
        .pd-call-num{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#fff;}
        .pd-call-btn{display:flex;align-items:center;justify-content:center;gap:7px;padding:12px;border-radius:12px;background:#7c3aed;color:#fff;font-family:'Inter',sans-serif;font-size:13px;font-weight:500;cursor:pointer;border:none;transition:all .22s;text-decoration:none;}
        .pd-call-btn:hover{background:#6d28d9;transform:translateY(-1px);box-shadow:0 8px 24px rgba(124,58,237,0.3);}
      `}</style>

      {showPayment && (
        <PaymentModal
          price={property.price}
          propertyTitle={property.title}
          propertyType={property.propertyType}
          onClose={() => setShowPayment(false)}
          onPaymentSaved={() => console.log("Payment saved")}
        />
      )}

      {showReview && (
        <ReviewModal
          propertyTitle={property.title}
          propertyId={id}
          onClose={() => setShowReview(false)}
        />
      )}

      <div className="pd-root">
        <div className="pd-glow" /><div className="pd-glow2" />

        <nav className="pd-navbar">
          <div className="pd-navbar-inner">
            <a href="/" className="pd-nav-brand">
              <span className="pd-nav-dot" />Kalinga <em>Homes</em>
            </a>
            <div className="pd-nav-links">
              <span className="pd-nav-badge"><span className="pd-nav-badge-dot" /> Bhubaneswar's Most Trusted</span>
              <a href="/properties" className="pd-nav-link pd-nav-ghost"><span className="pd-nav-link-txt">Buy</span></a>
              <a href="/properties?listingType=rent" className="pd-nav-link pd-nav-ghost"><span className="pd-nav-link-txt">Rent</span></a>
              <a href="/properties" className="pd-nav-link pd-nav-ghost"><span className="pd-nav-link-txt">List Property</span></a>
              <a href="tel:+919438185822" className="pd-nav-link pd-nav-purple">
                <Phone size={13} /><span className="pd-nav-link-txt">+91 9438185822</span>
              </a>
            </div>
          </div>
        </nav>

        <div className="pd-content">
          <button className="pd-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back to Listings
          </button>

          <div className="pd-hero-text pd-fadein">
            <div className="pd-eyebrow">Property Details</div>
            <h1 className="pd-title">{property.title}</h1>
            <div className="pd-loc"><MapPin size={13} />{property.city}, {property.address}</div>
            <div className="pd-chips">
              {property.isFeatured && <span className="pd-chip pd-chip-feat"><Star size={10} fill="currentColor" /> Featured</span>}
              <span className="pd-chip pd-chip-p">{property.listingType}</span>
              <span className="pd-chip pd-chip-g">{property.propertyType}</span>
            </div>
          </div>

          <div className="pd-grid pd-fadein">
            <div>
              <div className="pd-card">
                <div className="pd-img-viewer">
                  <img className="pd-main-img" src={selectedImage} alt={property.title} />
                  <div className="pd-img-grad" /><div className="pd-img-tint" />
                  {property.isFeatured && <div className="pd-feat-badge"><Star size={9} fill="currentColor" /> Featured</div>}
                  {imageGallery.length > 1 && <div className="pd-img-count">{activeIdx + 1} / {imageGallery.length}</div>}
                  {imageGallery.length > 1 && (
                    <div className="pd-img-nav">
                      <button className="pd-hnav" onClick={prev}><ChevronLeft size={18} /></button>
                      <button className="pd-hnav" onClick={next}><ChevronRight size={18} /></button>
                    </div>
                  )}
                  <div className="pd-like-share">
                    <button className={`pd-icon-btn ${liked ? "liked" : ""}`} onClick={() => setLiked(l => !l)}>
                      <Heart size={14} fill={liked ? "currentColor" : "none"} />
                    </button>
                    <button className="pd-icon-btn"><Share2 size={14} /></button>
                  </div>
                </div>

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

                <div className="pd-price-row">
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 4 }}>
                      Asking Price
                    </div>
                    <div className="pd-price">
                      {fmt(property.price)}
                      {property.listingType === "rent" && <span className="pd-price-mo">/ month</span>}
                    </div>
                  </div>
                  <div className="pd-action-row">
                    <button className="pd-review-btn" type="button" onClick={() => setShowReview(true)}>
                      <Star size={14} style={{ color: "#facc15" }} />
                      Write a Review
                    </button>
                    <button className="pd-buy-btn" type="button" onClick={() => setShowPayment(true)}>
                      <CreditCard size={16} /> Buy Now
                    </button>
                  </div>
                </div>

                <div className="pd-stats">
                  {[
                    { icon: <BedDouble size={16} />, l: "Bedrooms",  v: property.bedrooms },
                    { icon: <Bath size={16} />,      l: "Bathrooms", v: property.bathrooms },
                    { icon: <Ruler size={16} />,     l: "Area",      v: `${property.area?.toLocaleString()} ft²` },
                    { icon: <Home size={16} />,      l: "Type",      v: property.propertyType },
                  ].map((s, i) => (
                    <div key={i} className="pd-stat">
                      <div className="pd-stat-ico">{s.icon}</div>
                      <div className="pd-stat-l">{s.l}</div>
                      <div className="pd-stat-v">{s.v}</div>
                    </div>
                  ))}
                </div>

                <div className="pd-tabs">
                  {["overview", "amenities", "gallery"].map(t => (
                    <button key={t} className={`pd-tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="pd-tab-body">
                  {tab === "overview" && (
                    <div className="pd-fadein">
                      <div className="pd-sec">About the Property</div>
                      <p className="pd-desc">{property.description}</p>
                      <div className="pd-sec">Key Highlights</div>
                      <div className="pd-g2">
                        {HIGHLIGHTS.map(h => <div key={h} className="pd-item"><CheckCircle2 size={13} /> {h}</div>)}
                      </div>
                    </div>
                  )}
                  {tab === "amenities" && (
                    <div className="pd-fadein">
                      <div className="pd-sec">Building Amenities</div>
                      <div className="pd-g3">
                        {AMENITIES.map(a => <div key={a.label} className="pd-item">{a.icon} {a.label}</div>)}
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

            <div className="pd-sidebar">
              <div className="pd-call-card">
                <div className="pd-call-label">📞 Speak to an expert</div>
                <div className="pd-call-num">+91 9438185822</div>
                <a href="tel:+919438185822" className="pd-call-btn"><Phone size={14} /> Call Now</a>
              </div>

              <div className="pd-card">
                <div className="pd-enquiry-head">
                  <div className="pd-enquiry-eyebrow">Send Enquiry</div>
                  <div className="pd-enquiry-title">Book a Site Visit</div>
                </div>
                <div className="pd-form">
                  {successMsg && <div className="pd-success">{successMsg}</div>}
                  <input className="pd-input" type="text"  name="name"    placeholder="Your Name"          value={formData.name}    onChange={handleChange} />
                  <input className="pd-input" type="email" name="email"   placeholder="Email Address"       value={formData.email}   onChange={handleChange} />
                  <input className="pd-input" type="text"  name="phone"   placeholder="Phone Number"        value={formData.phone}   onChange={handleChange} />
                  <textarea className="pd-textarea" name="message" placeholder="Your Message (optional)" rows="3" value={formData.message} onChange={handleChange} />
                  <button className="pd-submit" onClick={handleSubmit} disabled={submitting}>
                    <Send size={14} />{submitting ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>
              </div>

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
                    <span className="pd-dk">{k}</span><span className="pd-dv">{v}</span>
                  </div>
                ))}
              </div>

              <div className="pd-card" style={{ overflow: "hidden" }}>
                <div className="pd-map-head"><div className="pd-map-tit">Location</div></div>
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