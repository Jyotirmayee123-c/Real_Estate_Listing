import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import api from "../../services/api";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Review {
  _id: string;
  userName: string;
  userEmail: string;
  comment: string;
  rating: number;
  propertyName?: string;
  isApproved: boolean;
  createdAt: string;
}

// ── Fallback static testimonials (shown when API has no approved reviews yet) ──
const FALLBACK_TESTIMONIALS = [
  {
    name: "Amit Patel",
    role: "Property Buyer",
    image: "/Images/testimonial-1.jpg",
    rating: 5,
    review:
      "Kalinga Homes made buying my first home a breeze. Their team was professional, patient, and guided me through every step. Highly recommend!",
  },
  {
    name: "Priya Sharma",
    role: "Interior Design Client",
    image: "/Images/testimonial-2.jpg",
    rating: 5,
    review:
      "The interior design team transformed my apartment into a beautiful space. They understood my vision perfectly and delivered beyond expectations.",
  },
  {
    name: "Rajesh Kumar",
    role: "Property Seller",
    image: "/Images/testimonial-3.jpg",
    rating: 5,
    review:
      "Sold my property within 2 weeks at the best price! The team's market knowledge and negotiation skills are exceptional. Thank you!",
  },
  {
    name: "Ananya Das",
    role: "Rental Client",
    image: "/Images/testimonial-4.jpg",
    rating: 5,
    review:
      "Found my perfect rental apartment through Kalinga Homes. The process was smooth, transparent, and hassle-free. Great service!",
  },
];

const trustStats = [
  { value: "1000+", label: "Happy Clients" },
  { value: "500+",  label: "Properties Sold" },
  { value: "98%",   label: "Satisfaction Rate" },
  { value: "24/7",  label: "Support" },
];

// ── Star row helper ───────────────────────────────────────────────────────────
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}
        />
      ))}
    </div>
  );
}

// ── Avatar helper ─────────────────────────────────────────────────────────────
function Avatar({ name, image }: { name: string; image?: string }) {
  const [imgError, setImgError] = useState(false);

  if (image && !imgError) {
    return (
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600/20 border border-purple-900/30 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-900/30 flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-lg">{name?.charAt(0)?.toUpperCase() || "?"}</span>
    </div>
  );
}

// ── Testimonial Card (static) ─────────────────────────────────────────────────
function StaticCard({ t, index }: { t: typeof FALLBACK_TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div
      className="group relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
      <div className="absolute top-5 right-5 opacity-10">
        <Quote className="text-purple-400" size={36} />
      </div>
      <div className="mb-4">
        <Stars rating={t.rating} />
      </div>
      <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 relative z-10">
        {t.review}
      </p>
      <div className="flex items-center gap-3 border-t border-purple-900/30 pt-4">
        <Avatar name={t.name} image={t.image} />
        <div>
          <h4 className="text-white font-semibold text-sm xs:text-base">{t.name}</h4>
          <p className="text-purple-400 text-xs xs:text-sm">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Dynamic Review Card (from API) ────────────────────────────────────────────
function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      className="group relative bg-[#252544] rounded-2xl sm:rounded-3xl p-6 xs:p-7 sm:p-8 border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-600/0 group-hover:bg-purple-600/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
      <div className="absolute top-5 right-5 opacity-10">
        <Quote className="text-purple-400" size={36} />
      </div>

      <div className="mb-4">
        <Stars rating={review.rating} />
      </div>

      {review.comment ? (
        <p className="text-gray-300 text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 relative z-10">
          {review.comment}
        </p>
      ) : (
        <p className="text-gray-500 italic text-sm mb-5 sm:mb-6 relative z-10">
          No comment provided.
        </p>
      )}

      <div className="flex items-center gap-3 border-t border-purple-900/30 pt-4">
        <Avatar name={review.userName} />
        <div>
          <h4 className="text-white font-semibold text-sm xs:text-base">{review.userName}</h4>
          {review.propertyName ? (
            <p className="text-purple-400 text-xs xs:text-sm">{review.propertyName}</p>
          ) : (
            <p className="text-purple-400 text-xs xs:text-sm">Verified Client</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ClientSay() {
  const [reviews,  setReviews]  = useState<Review[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const res = await api.get("/review");
        const all: Review[] = res?.data?.data || [];
        // Only show admin-approved reviews on the public page
        const approved = all.filter((r) => r.isApproved);
        if (approved.length === 0) {
          setUseFallback(true);
        } else {
          setReviews(approved);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedReviews();
  }, []);

  // Compute average rating from approved reviews
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : null;

  return (
    <section className="relative bg-gradient-to-b from-[#1a1a2e] to-[#252544] py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-500 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            What Our <span className="text-purple-500">Clients Say</span>
          </h2>
          <p className="text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-4">
            Real experiences from real people who trusted us with their property needs
          </p>

          {/* Live average rating badge — only shown when we have API reviews */}
          {!loading && !useFallback && avgRating && (
            <motion.div
              className="inline-flex items-center gap-2 mt-4 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star size={14} className="fill-yellow-400" />
              {avgRating} average · {reviews.length} verified {reviews.length === 1 ? "review" : "reviews"}
            </motion.div>
          )}

          <div className="w-16 xs:w-20 sm:w-24 h-1 bg-purple-600 mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin text-purple-400" />
              <span className="text-sm font-medium">Loading reviews…</span>
            </div>
          </div>
        )}

        {/* ── Cards Grid ── */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {useFallback
              ? FALLBACK_TESTIMONIALS.map((t, i) => (
                  <StaticCard key={i} t={t} index={i} />
                ))
              : reviews.map((r, i) => (
                  <ReviewCard key={r._id} review={r} index={i} />
                ))}
          </div>
        )}

        {/* ── Trust Stats ── */}
        <motion.div
          className="mt-12 sm:mt-16 bg-[#252544] border border-purple-900/30 rounded-2xl sm:rounded-3xl p-6 xs:p-8 sm:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {trustStats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl xs:text-4xl sm:text-5xl font-bold text-purple-500 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm xs:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}