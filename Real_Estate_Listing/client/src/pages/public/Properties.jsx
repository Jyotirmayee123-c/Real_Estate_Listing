import React, { useEffect, useState } from "react";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Properties = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await api.get(`/property`);
      setProperties(res.data.properties || res.data.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Explore Properties
        </h1>
        <p className="text-gray-500 mt-2">
          Find your dream home from our premium listings
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-lg font-medium text-gray-600">
          Loading properties...
        </div>
      )}

      {/* Empty State */}
      {!loading && properties.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No properties available
        </div>
      )}

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={property.thumbnail}
                alt={property.title}
                className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
              />

              {property.isFeatured && (
                <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h2 className="text-xl font-semibold text-gray-800">
                {property.title}
              </h2>

              <div className="flex items-center text-gray-500 text-sm gap-1">
                <MapPin size={16} />
                {property.city}
              </div>

              {/* Price */}
              <p className="text-purple-600 font-bold text-lg">
                ₹ {property.price?.toLocaleString()}
              </p>

              {/* Property Details */}
              <div className="flex justify-between text-gray-600 text-sm pt-2 border-t">
                <span className="flex items-center gap-1">
                  <BedDouble size={16} /> {property.bedrooms}
                </span>

                <span className="flex items-center gap-1">
                  <Bath size={16} /> {property.bathrooms}
                </span>

                <span className="flex items-center gap-1">
                  <Ruler size={16} /> {property.area} sqft
                </span>
              </div>

              {/* Button */}
              <button
                onClick={() => navigate(`/property/${property._id}`)}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;