import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/',           label: 'Home'       },
    { to: '/About',      label: 'About' },
    { to: '/properties', label: 'Properties'      },
    { to: '/services',   label: 'Services'   },
    { to: '/contacts',   label: 'Contacts'   },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] border-b border-purple-900/30 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-black text-white">
              Kalinga <span className="text-purple-500">Homes</span>
            </Link>
          </div>
          <div className="flex items-center space-x-1">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;