import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronRight } from 'lucide-react';

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
    {/* Roof */}
    <path
      d="M4 14L16 3L28 14"
      stroke="#a855f7"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Walls */}
    <rect
      x="6" y="13" width="20" height="16" rx="1.5"
      fill="#a855f720"
      stroke="#a855f7"
      strokeWidth="2"
    />
    {/* Door */}
    <rect
      x="13" y="20" width="6" height="9" rx="1"
      fill="#a855f7"
      opacity="0.85"
    />
    {/* Left window */}
    <rect
      x="8" y="16" width="4" height="4" rx="0.8"
      fill="#a855f7"
      opacity="0.6"
    />
    {/* Right window */}
    <rect
      x="20" y="16" width="4" height="4" rx="0.8"
      fill="#a855f7"
      opacity="0.6"
    />
  </svg>
);

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

            {/* Desktop nav */}
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

              {user ? (
                <>
                  <span className="text-gray-500 text-sm px-2">
                    Hi, <span className="text-purple-400 font-semibold">{user.name}</span>
                  </span>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border ${
                        isActive('/admin')
                          ? 'text-purple-300 bg-purple-600/20 border-purple-500/70'
                          : 'text-purple-400 border-purple-500/40 hover:text-purple-300 hover:border-purple-500/70'
                      }`}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/60 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
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

        {/* User greeting */}
        {user && (
          <div className="px-5 py-4 border-b border-purple-900/20">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Signed in as</p>
            <p className="text-purple-400 font-semibold">{user.name}</p>
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
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    isActive('/admin')
                      ? 'text-purple-300 bg-purple-600/20 border-purple-500/70'
                      : 'text-purple-400 border-purple-500/30 hover:bg-purple-600/10'
                  }`}
                >
                  Admin Panel
                  <ChevronRight size={15} className="opacity-40" />
                </Link>
              )}
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="mt-2 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
              >
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