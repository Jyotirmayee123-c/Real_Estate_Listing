import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location && !category) {
      alert("Please enter a location or select a category");
      return;
    }
    navigate(`/properties?location=${location}&category=${category}`);
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
        className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap w-full sm:w-auto"
      >
        Search
      </button>
    </div>
  );
}