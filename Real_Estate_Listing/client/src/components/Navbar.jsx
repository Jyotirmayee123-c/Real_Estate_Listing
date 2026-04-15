import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronRight, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

const navLinks = [
  { to: '/',           label: 'Home'       },
  { to: '/About',      label: 'About'      },
  { to: '/properties', label: 'Properties' },
  { to: '/services',   label: 'Services'   },
  { to: '/contacts',   label: 'Contacts'   },
];

/* ── House SVG logo ── */
const HouseLogo = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 14L16 3L28 14"
      stroke="#a855f7"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="6" y="13" width="20" height="16" rx="1.5" fill="#a855f720" stroke="#a855f7" strokeWidth="2" />
    <rect x="13" y="20" width="6" height="9" rx="1" fill="#a855f7" opacity="0.85" />
    <rect x="8" y="16" width="4" height="4" rx="0.8" fill="#a855f7" opacity="0.6" />
    <rect x="20" y="16" width="4" height="4" rx="0.8" fill="#a855f7" opacity="0.6" />
  </svg>
);

/* ══════════════════════════════════════════
   Profile Dropdown  — Desktop only
   Click "Hi, Rakhi ▾" → shows:
     • User info (avatar + name + email)
     • My Profile
     • Admin Panel  (admin only)
     • Logout
══════════════════════════════════════════ */
const ProfileDropdown = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate('/login');
  };

  // ✅ Priority: name → fullName → username → email prefix → 'User'
  // This ensures "Rakhi" shows instead of "admin24"
  const getDisplayName = (u) => {
    if (!u) return 'User';
    // Use proper name fields first
    if (u.name && u.name.trim()) return u.name.trim();
    if (u.fullName && u.fullName.trim()) return u.fullName.trim();
    // Only fall back to username if no real name exists
    if (u.username && u.username.trim()) return u.username.trim();
    // Last resort: derive from email
    if (u.email) return u.email.split('@')[0];
    return 'User';
  };

  const displayName = getDisplayName(user);
  const firstName   = displayName.split(' ')[0];
  const initial     = firstName[0]?.toUpperCase() || 'U';

  return (
    <div className="relative" ref={ref}>

      {/* ── "Hi, Rakhi ▾" button ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-purple-600/10 transition-all duration-200 group"
      >
        <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 text-xs font-bold select-none">
          {initial}
        </div>
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
          Hi,{''}<span className="text-purple-400 font-semibold">{firstName}</span>
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-purple-900/40 z-50"
          style={{ background: '#1e1e38' }}
        >
          {/* User info */}
          <div className="px-4 py-3 border-b border-white/[0.07] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 text-sm font-bold shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{displayName}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>

          {/* Links */}
          <div className="py-1.5">
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-600/15 transition-all duration-150"
            >
              <User size={14} className="text-purple-400" />
              My Profile
            </Link>

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-purple-600/15 transition-all duration-150"
              >
                <LayoutDashboard size={14} className="text-purple-400" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="border-t border-white/[0.07] py-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   Main Navbar
══════════════════════════════════════════ */
const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // ✅ Same name helper reused for mobile drawer
  const getDisplayName = (u) => {
    if (!u) return 'User';
    if (u.name && u.name.trim()) return u.name.trim();
    if (u.fullName && u.fullName.trim()) return u.fullName.trim();
    if (u.username && u.username.trim()) return u.username.trim();
    if (u.email) return u.email.split('@')[0];
    return 'User';
  };

  const Brand = ({ onClick }) => (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2 flex-shrink-0 group"
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        <HouseLogo size={28} />
      </span>
      <span className="text-xl font-black text-white leading-none">
        Kalinga <span className="text-purple-500">Homes</span>
      </span>
    </Link>
  );

  return (
    <>
      {/* ── Top bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-purple-900/30 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <Brand />

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(to)
                      ? 'text-white bg-purple-600/20 border border-purple-500/40 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-purple-600/10'
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* ✅ Show ProfileDropdown when logged in, else Login + Register */}
              {user ? (
                <ProfileDropdown user={user} logout={logout} />
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive('/login')
                        ? 'text-white bg-purple-600/20 border border-purple-500/40 font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-purple-600/10'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-900/30"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-[#1a1a2e] border-l border-purple-900/30 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-purple-900/30">
          <Brand onClick={() => setMenuOpen(false)} />
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-purple-600/20 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* ✅ Mobile — user info card using getDisplayName */}
        {user && (
          <div className="px-5 py-4 border-b border-purple-900/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 text-sm font-bold shrink-0">
              {getDisplayName(user)[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{getDisplayName(user)}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Nav links */}
        <div className="px-3 py-4 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive(to)
                  ? 'text-white bg-purple-600/20 border border-purple-500/40 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-purple-600/10'
              }`}
            >
              {label}
              <ChevronRight size={15} className="opacity-40" />
            </Link>
          ))}

          {user ? (
            <>
              {/* ✅ My Profile in mobile drawer */}
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive('/profile')
                    ? 'text-white bg-purple-600/20 border border-purple-500/40'
                    : 'text-gray-400 hover:text-white hover:bg-purple-600/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <User size={14} className="text-purple-400" />
                  My Profile
                </span>
                <ChevronRight size={15} className="opacity-40" />
              </Link>

              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    isActive('/admin')
                      ? 'text-purple-300 bg-purple-600/20 border-purple-500/70'
                      : 'text-purple-400 border-purple-500/30 hover:bg-purple-600/10'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard size={14} />
                    Admin Panel
                  </span>
                  <ChevronRight size={15} className="opacity-40" />
                </Link>
              )}

              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="mt-2 w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
              >
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-3">
              <Link
                to="/login"
                className={`px-4 py-3 rounded-xl text-sm font-medium text-center transition-all ${
                  isActive('/login')
                    ? 'text-white bg-purple-600/20 border border-purple-500/40'
                    : 'text-gray-400 border border-purple-900/30 hover:text-white hover:bg-purple-600/10'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-3 rounded-xl text-sm font-semibold text-center bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-lg shadow-purple-900/30"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;