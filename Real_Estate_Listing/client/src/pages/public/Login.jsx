import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/profile", { replace: true });
      }
    } else {
      setError(result.message);
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
          Welcome <em className="text-purple-400 not-italic">Back</em>
        </h1>
        <p className="text-white/45 text-center text-sm sm:text-base mb-8">
          Sign in to explore verified properties in Bhubaneswar.
        </p>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 sm:p-9 backdrop-blur-sm">

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
              <span className="shrink-0 mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-white/60 text-xs font-medium tracking-wide uppercase mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-white/30" size={15} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm rounded-xl pl-10 pr-11 py-3 outline-none focus:border-purple-500/60 focus:bg-purple-500/[0.05] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-purple-400/80 hover:text-purple-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider — bg-white/8 is invalid Tailwind, fixed to bg-white/[0.08] */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-white/25 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          &copy; {new Date().getFullYear()} Kalinga Homes &middot; Bhubaneswar&apos;s Most Trusted Real Estate
        </p>
      </div>
    </div>
  );
};

export default Login;