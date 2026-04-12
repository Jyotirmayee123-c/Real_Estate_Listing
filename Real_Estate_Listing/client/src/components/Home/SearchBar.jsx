import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!location && !category) {
      alert("Please enter a location or select a category");
      return;
    }

    try {
      setLoading(true);

      // Build query params
      const params = new URLSearchParams();
      if (location) params.append("location", location);
      if (category) params.append("category", category);

      // Fetch from backend to validate data exists
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/properties?${params.toString()}`
      );

      if (response.data.length === 0) {
        alert("No properties found for your search. Try different filters.");
        return;
      }

      // Navigate to properties page with search params
      navigate(`/properties?${params.toString()}`);

    } catch (error) {
      console.error("Search error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 bg-white/[0.06] border border-white/15 backdrop-blur-md rounded-full px-5 py-2.5 sm:py-2 mb-8">

      {/* Location Input */}
      <div className="flex items-center flex-1 gap-2 min-w-0">
        <Search className="text-white/35 shrink-0" size={16} />
        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full bg-transparent outline-none text-white placeholder-white/35 text-sm"
        />
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-5 bg-white/15" />

      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-transparent outline-none text-white/65 text-sm cursor-pointer w-full sm:w-auto"
      >
        <option value="" className="bg-[#1a1a2e]">Category</option>
        <option value="Apartment" className="bg-[#1a1a2e]">Apartment</option>
        <option value="House" className="bg-[#1a1a2e]">House</option>
        <option value="Villa" className="bg-[#1a1a2e]">Villa</option>
        <option value="Commercial" className="bg-[#1a1a2e]">Commercial</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-7 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap w-full sm:w-auto"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}