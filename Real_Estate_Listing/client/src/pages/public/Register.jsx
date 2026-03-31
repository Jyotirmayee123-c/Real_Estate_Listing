import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect already-authenticated users away from register page
  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/profile', { replace: true });
    return null;
  }

  const getPasswordStrength = (pwd) => {
    if (pwd.length === 0) return null;
    if (pwd.length < 6) return { label: 'Too short', color: 'bg-red-500', width: 'w-1/4' };
    if (pwd.length < 8) return { label: 'Weak', color: 'bg-orange-500', width: 'w-2/4' };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
    return { label: 'Medium', color: 'bg-yellow-500', width: 'w-3/4' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim() || name.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register(name.trim(), email.trim().toLowerCase(), password);
    setLoading(false);

    if (result.success) {
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/profile', { replace: true }), 1500);
    } else {
      setError(result.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0d0d1a] flex items-center justify-center px-4 py-12">
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
          Create Your{' '}
          <em className="text-purple-400 not-italic">Account</em>
        </h1>
        <p className="text-white/45 text-center text-sm sm:text-base mb-8">
          Join thousands of happy clients finding homes in Bhubaneswar.
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

          {/* Success */}
          {success && (
            <div className="mb-5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <CheckCircle size={15} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-white/60 text-xs font-medium tracking-wide uppercase mb-2">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-white/30" size={15} />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-purple-500/60 focus:bg-purple-500/[0.05] transition-all duration-200"
                />
              </div>
            </div>

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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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
              {/* Password strength bar */}
              {strength && (
                <div className="mt-2">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                  </div>
                  <p className="text-white/35 text-xs mt-1">{strength.label}</p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/60 text-xs font-medium tracking-wide uppercase mb-2">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-white/30" size={15} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className={`w-full bg-white/[0.05] border text-white placeholder-white/25 text-sm rounded-xl pl-10 pr-11 py-3 outline-none transition-all duration-200
                    ${confirmPassword && password !== confirmPassword
                      ? 'border-red-500/50 focus:border-red-500/70'
                      : confirmPassword && password === confirmPassword
                      ? 'border-green-500/50 focus:border-green-500/70'
                      : 'border-white/10 focus:border-purple-500/60 focus:bg-purple-500/[0.05]'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Match hint */}
              {confirmPassword && (
                <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-green-400/70' : 'text-red-400/70'}`}>
                  {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider — fixed: bg-white/8 → bg-white/[0.08] */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-white/25 text-xs">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-white/40">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
              Login here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} Kalinga Homes · Bhubaneswar&apos;s Most Trusted Real Estate
        </p>
      </div>
    </div>
  );
};

export default Register;