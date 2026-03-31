import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0d0d1a] flex items-center justify-center px-4">
      {/* Purple glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-700/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-purple-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-widest uppercase px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block" />
            Kalinga Homes
          </div>
        </div>

        {/* Heading */}
        <h1
          className="text-white text-4xl sm:text-5xl font-bold text-center mb-2 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Reset Your{" "}
          <em className="text-purple-400 not-italic">Password</em>
        </h1>
        <p className="text-white/45 text-center text-sm sm:text-base mb-8">
          {sent
            ? "Check your inbox for the reset link."
            : "Enter your email and we'll send you a reset link."}
        </p>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 sm:p-9 backdrop-blur-sm">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <CheckCircle className="text-green-400" size={28} />
              </div>
              <p className="text-white/60 text-sm text-center">
                A password reset link has been sent to{" "}
                <span className="text-white font-medium">{email}</span>.
                Please check your inbox.
              </p>
              <Link
                to="/login"
                className="mt-2 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                  <span className="shrink-0 mt-0.5">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-white/60 text-xs font-medium tracking-wide uppercase mb-2">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 text-white/30" size={15} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-purple-500/60 focus:bg-purple-500/[0.05] transition-all duration-200"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-purple-400/80 hover:text-purple-400 text-xs transition-colors"
                >
                  <ArrowLeft size={12} />
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          &copy; {new Date().getFullYear()} Kalinga Homes &middot; Bhubaneswar&apos;s Most Trusted Real Estate
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;