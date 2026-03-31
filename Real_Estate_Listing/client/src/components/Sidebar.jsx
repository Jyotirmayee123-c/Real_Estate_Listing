import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { to: '/admin',          label: 'Dashboard' },
    { to: '/admin/users',    label: 'Users'     },
    { to: '/admin/contact',  label: 'Contacts'  },
    { to: '/admin/property', label: 'Property'  },
    { to: '/admin/enquiry',  label: 'Enquiry'   },
  ];

  const isActive = (path) =>
    path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(path);

  return (
    <div className="w-64 bg-[#1a1a2e] h-screen text-white flex flex-col border-r border-purple-900/30">
      <div className="p-5 border-b border-purple-900/30">
        <h1 className="text-xl font-black text-white">
          Kalinga <span className="text-purple-500">Admin</span>
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`block py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(to)
                ? 'text-white bg-purple-600/20 border border-purple-500/40 font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-purple-600/10'
            }`}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/"
          className="block py-2 px-4 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-purple-600/10 transition-all duration-200"
        >
          ← Back to Site
        </Link>
      </nav>

      <div className="p-4 border-t border-purple-900/30">
        <button
          onClick={logout}
          className="w-full bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/60 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;