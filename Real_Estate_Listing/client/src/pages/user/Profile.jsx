import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="min-h-screen bg-[#0f1117] text-white p-8">

      {/* Page Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6366f1] mb-1">Administration</p>
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <p className="text-sm text-[#6b7280] mt-1">Manage account details and access permissions</p>
      </div>

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Card — Avatar & Quick Info */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-2xl p-6 flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-indigo-900/40">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-[#1a1d27] rounded-full"></span>
            </div>

            <h2 className="text-lg font-semibold text-white">{user?.name || 'Unknown User'}</h2>
            <p className="text-sm text-[#6b7280] mt-1">{user?.email || '—'}</p>

            {/* Role Badge */}
            <div className="mt-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase
                ${user?.role === 'admin'
                  ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${user?.role === 'admin' ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                {user?.role || 'user'}
              </span>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-[#2a2d3a] my-5"></div>

            {/* Quick stats */}
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="bg-[#12151f] rounded-xl p-3">
                <p className="text-xs text-[#6b7280]">Status</p>
                <p className="text-sm font-semibold text-emerald-400 mt-0.5">Active</p>
              </div>
              <div className="bg-[#12151f] rounded-xl p-3">
                <p className="text-xs text-[#6b7280]">Access</p>
                <p className="text-sm font-semibold text-[#6366f1] mt-0.5 capitalize">{user?.role === 'admin' ? 'Full' : 'Limited'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card — Detail Fields */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Details Card */}
          <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2a2d3a] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white tracking-wide">Personal Information</h3>
              <button className="text-xs text-[#6366f1] hover:text-indigo-300 font-medium transition-colors">Edit</button>
            </div>

            <div className="divide-y divide-[#2a2d3a]">
              {/* Full Name */}
              <div className="px-6 py-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#12151f] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wider">Full Name</p>
                </div>
                <p className="text-sm font-medium text-white">{user?.name || '—'}</p>
              </div>

              {/* Email */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#12151f] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wider">Email Address</p>
                </div>
                <p className="text-sm font-medium text-white">{user?.email || '—'}</p>
              </div>

              {/* Role */}
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#12151f] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wider">Role</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                  ${user?.role === 'admin'
                    ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${user?.role === 'admin' ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                  {user?.role || 'user'}
                </span>
              </div>
            </div>
          </div>

          {/* Permissions Card */}
          <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#2a2d3a]">
              <h3 className="text-sm font-semibold text-white tracking-wide">Access & Permissions</h3>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 gap-3">
              {[
                { label: 'View Properties', allowed: true },
                { label: 'Edit Records', allowed: user?.role === 'admin' },
                { label: 'Manage Users', allowed: user?.role === 'admin' },
                { label: 'Export Data', allowed: user?.role === 'admin' },
              ].map((perm) => (
                <div key={perm.label} className="flex items-center gap-2.5 bg-[#12151f] rounded-xl px-4 py-3">
                  <span className={`w-2 h-2 rounded-full ${perm.allowed ? 'bg-emerald-400' : 'bg-[#3a3d4a]'}`}></span>
                  <span className={`text-xs font-medium ${perm.allowed ? 'text-white' : 'text-[#4b5563]'}`}>{perm.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;