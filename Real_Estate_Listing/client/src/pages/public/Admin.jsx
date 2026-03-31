import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  Home,
  TrendingUp,
  LogOut,
  Trash2,
  Eye,
  Plus,
  X,
  CheckCircle,
  MapPin,
  User,
  Shield,
} from "lucide-react";

// ── Mock data ────────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1, name: "Ravi Kumar", email: "ravi@example.com", role: "user", joined: "Jan 2024" },
  { id: 2, name: "Priya Dash", email: "priya@example.com", role: "user", joined: "Feb 2024" },
  { id: 3, name: "Amit Nayak", email: "amit@example.com", role: "user", joined: "Mar 2024" },
  { id: 4, name: "Sneha Patro", email: "sneha@example.com", role: "admin", joined: "Jan 2024" },
];

const MOCK_PROPERTIES = [
  { id: 1, title: "3BHK Luxury Apartment", location: "Patia", price: "₹85L", type: "Apartment", status: "Available" },
  { id: 2, title: "2BHK Modern Flat", location: "Nayapalli", price: "₹52L", type: "Flat", status: "Available" },
  { id: 3, title: "Independent Villa", location: "Saheed Nagar", price: "₹1.4Cr", type: "Villa", status: "Sold" },
  { id: 4, title: "Studio Apartment", location: "Bhubaneswar", price: "₹28L", type: "Studio", status: "Available" },
];

// ── Stat Card ────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-white/40 text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState(MOCK_USERS);
  const [properties, setProperties] = useState(MOCK_PROPERTIES);
  const [toast, setToast] = useState("");

  // Add property modal state
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [newProperty, setNewProperty] = useState({ title: "", location: "", price: "", type: "Apartment", status: "Available" });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast("User removed successfully.");
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    showToast("Property removed successfully.");
  };

  const togglePropertyStatus = (id) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "Available" ? "Sold" : "Available" } : p
      )
    );
  };

  const handleAddProperty = () => {
    if (!newProperty.title.trim() || !newProperty.location.trim() || !newProperty.price.trim()) {
      showToast("Please fill all fields.");
      return;
    }
    setProperties((prev) => [
      { ...newProperty, id: Date.now() },
      ...prev,
    ]);
    setNewProperty({ title: "", location: "", price: "", type: "Apartment", status: "Available" });
    setShowAddProperty(false);
    showToast("Property added successfully.");
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "users", label: "Users", icon: Users },
    { id: "properties", label: "Properties", icon: Home },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-700/10 rounded-full blur-[140px]" />
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg">
          <CheckCircle size={14} />
          {toast}
        </div>
      )}

      {/* Add Property Modal */}
      {showAddProperty && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-[#13131f] border border-white/[0.1] rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">Add New Property</h3>
              <button onClick={() => setShowAddProperty(false)} className="text-white/40 hover:text-white/70 transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Property Title", key: "title", placeholder: "e.g. 3BHK Luxury Apartment" },
                { label: "Location", key: "location", placeholder: "e.g. Patia, Bhubaneswar" },
                { label: "Price", key: "price", placeholder: "e.g. ₹85L" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={newProperty[key]}
                    onChange={(e) => setNewProperty({ ...newProperty, [key]: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm rounded-xl px-4 py-3 outline-none focus:border-purple-500/60 transition-all duration-200"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">Type</label>
                  <select
                    value={newProperty.type}
                    onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-purple-500/60 transition-all duration-200"
                  >
                    {["Apartment", "Flat", "Villa", "Studio", "Plot"].map((t) => (
                      <option key={t} value={t} className="bg-[#13131f]">{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">Status</label>
                  <select
                    value={newProperty.status}
                    onChange={(e) => setNewProperty({ ...newProperty, status: e.target.value })}
                    className="w-full bg-white/[0.05] border border-white/10 text-white text-sm rounded-xl px-4 py-3 outline-none focus:border-purple-500/60 transition-all duration-200"
                  >
                    {["Available", "Sold"].map((s) => (
                      <option key={s} value={s} className="bg-[#13131f]">{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddProperty(false)}
                className="flex-1 text-sm text-white/50 border border-white/10 py-2.5 rounded-full hover:text-white/70 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProperty}
                className="flex-1 text-sm text-white bg-purple-600 hover:bg-purple-700 py-2.5 rounded-full transition-colors"
              >
                Add Property
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.07] bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block" />
              Kalinga Homes
            </div>
            <span className="text-white/20 text-xs hidden sm:inline">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 border border-white/10 px-3 py-1.5 rounded-full transition-colors"
            >
              <User size={12} />
              My Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-red-400 border border-white/10 hover:border-red-500/30 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Page title */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
            <Shield size={18} className="text-purple-400" />
          </div>
          <div>
            <h1
              className="text-white text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin <em className="text-purple-400 not-italic">Dashboard</em>
            </h1>
            <p className="text-white/35 text-xs mt-0.5">Manage users and properties</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/[0.03] border border-white/[0.07] rounded-xl p-1 w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === id
                  ? "bg-purple-600 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StatCard icon={Users} label="Total Users" value={users.length} color="bg-purple-600/40" />
              <StatCard icon={Home} label="Total Properties" value={properties.length} color="bg-blue-600/40" />
              <StatCard
                icon={TrendingUp}
                label="Available"
                value={properties.filter((p) => p.status === "Available").length}
                color="bg-green-600/40"
              />
            </div>

            {/* Recent users */}
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Recent Users</h3>
              <div className="space-y-3">
                {users.slice(0, 3).map((u) => (
                  <div key={u.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300 uppercase">
                      {u.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm">{u.name}</p>
                      <p className="text-white/35 text-xs">{u.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${u.role === "admin" ? "text-purple-400 border-purple-500/30 bg-purple-500/10" : "text-white/40 border-white/10 bg-white/[0.03]"}`}>
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── USERS TAB ── */}
        {activeTab === "users" && (
          <div>
            <h2 className="text-white font-semibold text-lg mb-6">
              All Users <span className="text-white/30 text-sm font-normal ml-2">({users.length})</span>
            </h2>
            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
              {users.map((u, i) => (
                <div
                  key={u.id}
                  className={`flex items-center gap-4 px-6 py-4 ${i !== users.length - 1 ? "border-b border-white/[0.05]" : ""} hover:bg-white/[0.02] transition-colors`}
                >
                  <div className="w-9 h-9 rounded-full bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-300 uppercase shrink-0">
                    {u.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{u.name}</p>
                    <p className="text-white/35 text-xs truncate">{u.email}</p>
                  </div>
                  <span className="text-white/35 text-xs hidden sm:inline">{u.joined}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${u.role === "admin" ? "text-purple-400 border-purple-500/30 bg-purple-500/10" : "text-white/40 border-white/10"}`}>
                    {u.role}
                  </span>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="text-white/25 hover:text-red-400 transition-colors shrink-0"
                      title="Remove user"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROPERTIES TAB ── */}
        {activeTab === "properties" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-lg">
                All Properties <span className="text-white/30 text-sm font-normal ml-2">({properties.length})</span>
              </h2>
              <button
                onClick={() => setShowAddProperty(true)}
                className="flex items-center gap-1.5 text-xs text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors"
              >
                <Plus size={13} />
                Add Property
              </button>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
              {properties.map((p, i) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-4 px-6 py-4 ${i !== properties.length - 1 ? "border-b border-white/[0.05]" : ""} hover:bg-white/[0.02] transition-colors`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Home size={16} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm font-medium truncate">{p.title}</p>
                    <div className="flex items-center gap-1 text-white/35 text-xs">
                      <MapPin size={10} />
                      {p.location}
                    </div>
                  </div>
                  <span className="text-purple-400 text-sm font-semibold hidden sm:inline shrink-0">{p.price}</span>
                  <span className="text-white/35 text-xs hidden md:inline shrink-0">{p.type}</span>
                  <button
                    onClick={() => togglePropertyStatus(p.id)}
                    className={`text-xs px-2 py-0.5 rounded-full border shrink-0 transition-colors cursor-pointer ${
                      p.status === "Available"
                        ? "text-green-400 border-green-500/30 bg-green-500/10 hover:bg-green-500/20"
                        : "text-red-400 border-red-500/30 bg-red-500/10 hover:bg-red-500/20"
                    }`}
                    title="Toggle status"
                  >
                    {p.status}
                  </button>
                  <button
                    onClick={() => deleteProperty(p.id)}
                    className="text-white/25 hover:text-red-400 transition-colors shrink-0"
                    title="Remove property"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;