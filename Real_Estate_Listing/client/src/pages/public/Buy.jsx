import React, { useState } from "react";

const propertiesData = [
  {
    id: 1,
    title: "Modern Family House",
    location: "Los Angeles, CA",
    price: 850000,
    beds: 4,
    baths: 3,
    area: 2400,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Luxury Downtown Apartment",
    location: "New York, NY",
    price: 1200000,
    beds: 3,
    baths: 2,
    area: 1800,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9RyDMA4YxYwZzJD-_pnmmLV2VpoUe-yJzg&s",
  },
  {
    id: 3,
    title: "Cozy Suburban Home",
    location: "Austin, TX",
    price: 620000,
    beds: 3,
    baths: 2,
    area: 2000,
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80",
  },
];

const Buy = () => {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProperties = propertiesData.filter((property) => {
    return (
      property.location.toLowerCase().includes(search.toLowerCase()) &&
      (maxPrice === "" || property.price <= parseInt(maxPrice))
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-lg md:text-xl">
          Browse the best properties available for purchase
        </p>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by location..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">
                    {property.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{property.location}</p>

                  <div className="flex justify-between text-gray-700 text-sm mb-3">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.area} sqft</span>
                  </div>

                  <div className="text-blue-600 text-lg font-bold">
                    ${property.price.toLocaleString()}
                  </div>

                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
