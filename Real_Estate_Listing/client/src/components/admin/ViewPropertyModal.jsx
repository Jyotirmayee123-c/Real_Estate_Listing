import React from "react";
import { MapPin, BedDouble, Bath, Home, Ruler } from "lucide-react";

const ViewPropertyModal = ({ property, closeModal }) => {
    if (!property) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white shadow-md hover:bg-red-500 hover:text-white transition p-2 rounded-full text-gray-600 z-10"
                >
                    ✕
                </button>

                {/* Thumbnail */}
                <div className="relative">
                    <img
                        src={property.thumbnail}
                        alt={property.title}
                        className="w-full h-56 object-cover rounded-t-2xl"
                    />

                    <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-2xl font-bold drop-shadow-md">
                            {property.title}
                        </h2>
                        <div className="flex items-center gap-2 text-sm mt-1">
                            <MapPin size={16} />
                            <span>{property.city}, {property.address}</span>
                        </div>
                    </div>

                    {property.isFeatured && (
                        <span className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold shadow">
                            ⭐ Featured
                        </span>
                    )}
                </div>

                <div className="p-5 space-y-5">

                    {/* Price */}
                    <div className="flex justify-between items-center flex-wrap gap-3">
                        <p className="text-2xl font-bold text-purple-600">
                            ₹ {property.price?.toLocaleString()}
                        </p>

                        <div className="flex gap-2">
                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs capitalize">
                                {property.listingType}
                            </span>
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs capitalize">
                                {property.propertyType}
                            </span>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-2">
                            <BedDouble size={18} className="text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Beds</p>
                                <p className="text-sm font-semibold">{property.bedrooms}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-2">
                            <Bath size={18} className="text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Baths</p>
                                <p className="text-sm font-semibold">{property.bathrooms}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-2">
                            <Ruler size={18} className="text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Area</p>
                                <p className="text-sm font-semibold">{property.area} sqft</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-2">
                            <Home size={18} className="text-purple-600" />
                            <div>
                                <p className="text-xs text-gray-500">Type</p>
                                <p className="text-sm font-semibold capitalize">
                                    {property.propertyType}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-md font-semibold mb-2 border-b pb-1">
                            Description
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {property.description}
                        </p>
                    </div>

                    {/* Gallery */}
                    {property.images && property.images.length > 0 && (
                        <div>
                            <h3 className="text-md font-semibold mb-3 border-b pb-1">
                                Gallery
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {property.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-xl shadow-sm group"
                                    >
                                        <img
                                            src={img}
                                            alt="Property"
                                            className="h-32 w-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ViewPropertyModal;