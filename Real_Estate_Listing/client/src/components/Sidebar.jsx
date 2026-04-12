import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);

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
        <Link to="/" className="group inline-block">
          <h1 className="text-xl font-black text-white transition-opacity duration-200 group-hover:opacity-80">
            Kalinga <span className="text-purple-500">Admin</span>
          </h1>
        </Link>
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
      </nav>

      <div className="p-4 border-t border-purple-900/30">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/60 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] border border-purple-900/40 rounded-2xl p-6 w-72 shadow-2xl">
            <h2 className="text-white font-bold text-base mb-1">Are you sure?</h2>
            <p className="text-gray-400 text-sm mb-5">Do you really want to logout?</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setShowConfirm(false); logout(); }}
                className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 hover:border-red-500/60 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                Yes, Logout
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border border-purple-500/30 hover:border-purple-500/60 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;