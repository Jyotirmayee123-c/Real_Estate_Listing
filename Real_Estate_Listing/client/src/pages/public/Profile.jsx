import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Edit2,
  Save,
  X,
  Home,
  Heart,
  Bell,
  Shield,
} from "lucide-react";

// ── Mock saved properties ────────────────────────────────────
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "3BHK Luxury Apartment",
    location: "Patia, Bhubaneswar",
    price: "₹85 Lakhs",
    type: "Apartment",
    status: "Available",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
  },
  {
    id: 2,
    title: "2BHK Modern Flat",
    location: "Nayapalli, Bhubaneswar",
    price: "₹52 Lakhs",
    type: "Flat",
    status: "Available",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
  },
  {
    id: 3,
    title: "Independent Villa",
    location: "Saheed Nagar, Bhubaneswar",
    price: "₹1.4 Cr",
    type: "Villa",
    status: "Sold",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  },
];

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "Bhubaneswar",
  });

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleSave = async () => {
    setError("");
    if (!form.name.trim() || form.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        updateProfile(data.user || form);
        setSaveSuccess(true);
        setEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch {
      // If no backend yet, just update locally
      updateProfile(form);
      setSaveSuccess(true);
      setEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "saved", label: "Saved Properties", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-700/10 rounded-full blur-[140px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/[0.07] bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full inline-block" />
            Kalinga Homes
          </div>
          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-full transition-colors"
              >
                <Shield size={12} />
                Admin Panel
              </button>
            )}
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
        {/* Header */}
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-2xl font-bold text-purple-300 uppercase shrink-0">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <h1
              className="text-white text-2xl sm:text-3xl font-bold leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {user?.name || "Welcome"}
            </h1>
            <p className="text-white/40 text-sm mt-0.5">{user?.email}</p>
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

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8 max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-semibold text-lg">Personal Information</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Edit2 size={12} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditing(false); setError(""); }}
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <X size={12} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 text-xs text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Save size={12} />
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            {/* Success */}
            {saveSuccess && (
              <div className="mb-5 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-xl">
                ✓ Profile updated successfully!
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                ⚠ {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">
                  Full Name
                </label>
                {editing ? (
                  <div className="relative flex items-center">
                    <User className="absolute left-4 text-white/30" size={14} />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/10 text-white text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-purple-500/60 transition-all duration-200"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <User size={14} className="text-white/30" />
                    {user?.name || "—"}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <Mail size={14} className="text-white/30" />
                  {user?.email || "—"}
                  <span className="text-xs text-white/30">(cannot be changed)</span>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">
                  Phone Number
                </label>
                {editing ? (
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 text-white/30" size={14} />
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-purple-500/60 transition-all duration-200"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <Phone size={14} className="text-white/30" />
                    {user?.phone || "Not added"}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">
                  City
                </label>
                {editing ? (
                  <div className="relative flex items-center">
                    <MapPin className="absolute left-4 text-white/30" size={14} />
                    <input
                      type="text"
                      placeholder="Your city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/10 text-white placeholder-white/25 text-sm rounded-xl pl-10 pr-4 py-3 outline-none focus:border-purple-500/60 transition-all duration-200"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <MapPin size={14} className="text-white/30" />
                    {user?.city || "Bhubaneswar"}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── SAVED PROPERTIES TAB ── */}
        {activeTab === "saved" && (
          <div>
            <h2 className="text-white font-semibold text-lg mb-6">Saved Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_PROPERTIES.map((property) => (
                <div
                  key={property.id}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-200 group"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          property.status === "Available"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                    <button className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/20 transition-colors">
                      <Heart size={13} className="text-red-400 fill-red-400" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-medium text-sm mb-1">{property.title}</p>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs mb-3">
                      <MapPin size={11} />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 font-semibold text-sm">{property.price}</span>
                      <span className="text-white/30 text-xs border border-white/10 px-2 py-0.5 rounded-full">
                        {property.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS TAB ── */}
        {activeTab === "notifications" && (
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8 max-w-2xl">
            <h2 className="text-white font-semibold text-lg mb-6">Notifications</h2>
            <div className="space-y-3">
              {[
                { title: "New property in Patia", time: "2 hours ago", read: false },
                { title: "Price drop: 3BHK in Nayapalli", time: "1 day ago", read: false },
                { title: "Your profile was updated", time: "3 days ago", read: true },
                { title: "Welcome to Kalinga Homes!", time: "1 week ago", read: true },
              ].map((notif, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                    !notif.read
                      ? "bg-purple-500/[0.05] border-purple-500/20"
                      : "bg-white/[0.02] border-white/[0.05]"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? "bg-purple-400" : "bg-white/20"}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${!notif.read ? "text-white" : "text-white/50"}`}>
                      {notif.title}
                    </p>
                    <p className="text-white/30 text-xs mt-0.5">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;