import React, { useState, useEffect } from "react";
import api from "../../services/api";

const CreatePropertyModal = ({ closeModal, editMode = false, propertyData }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    listingType: "",
    propertyType: "",
    city: "",
    address: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    isFeatured: false,
    thumbnail: "",
    propertyImages: "",
  });

  useEffect(() => {
    if (editMode && propertyData) {
      setFormData({
        title: propertyData.title || "",
        price: propertyData.price || "",
        listingType: propertyData.listingType || "",
        propertyType: propertyData.propertyType || "",
        city: propertyData.city || "",
        address: propertyData.address || "",
        description: propertyData.description || "",
        bedrooms: propertyData.bedrooms || "",
        bathrooms: propertyData.bathrooms || "",
        area: propertyData.area || "",
        isFeatured: propertyData.isFeatured || false,
        thumbnail: propertyData.thumbnail || "",
        propertyImages: propertyData.images?.join(", ") || "",
      });
    }
  }, [editMode, propertyData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Send plain JSON — no FormData, no multer issues
      const payload = {
        ...formData,
        images: formData.propertyImages
          ? formData.propertyImages.split(",").map((u) => u.trim()).filter(Boolean)
          : [],
      };
      delete payload.propertyImages; // remove raw string, backend gets clean array

      if (editMode) {
        await api.put(`/property/${propertyData._id}`, payload);
        alert("Property updated successfully ✅");
      } else {
        await api.post("/property", payload);
        alert("Property created successfully ✅");
      }

      closeModal();
    } catch (error) {
      console.error(error);
      alert(editMode ? "Failed to update ❌" : "Failed to create ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {editMode ? "Update Property" : "Create Property"}
          </h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-red-500 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" name="title" value={formData.title} placeholder="Property Title" onChange={handleChange} required className="font-semibold w-full border rounded-lg p-1" />
            <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} required className="font-semibold w-full border rounded-lg p-1" />
            <select name="listingType" value={formData.listingType} onChange={handleChange} required className="font-semibold w-full border rounded-lg p-1">
              <option value="">Listing Type</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="sell">Sell</option>
              <option value="other">Other</option>
            </select>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} required className="font-semibold w-full border rounded-lg p-1">
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="other">Other</option>
            </select>
            <input type="text" name="city" value={formData.city} placeholder="City" onChange={handleChange} required className="font-semibold w-full border rounded-lg p-1" />
            <input type="text" name="address" value={formData.address} placeholder="Full Address" onChange={handleChange} required className="font-semibold w-full border rounded-lg p-1" />
          </div>

          <textarea name="description" value={formData.description} placeholder="Property Description" onChange={handleChange} required className="font-semibold w-full border rounded-lg p-3" rows={4} />

          {/* Thumbnail URL */}
          <div>
            <label className="block font-semibold mb-2">Thumbnail URL {editMode && "(Optional)"}</label>
            <input
              type="text" name="thumbnail" value={formData.thumbnail}
              placeholder="Paste image URL for thumbnail"
              onChange={handleChange} required={!editMode}
              className="font-semibold w-full border rounded-lg p-3"
            />
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Thumbnail Preview" className="mt-3 h-40 rounded-lg object-cover border" onError={(e) => (e.target.style.display = "none")} />
            )}
          </div>

          {/* Property Images URLs */}
          <div>
            <label className="block font-semibold mb-2">
              Property Image URLs
              <span className="text-gray-400 font-normal text-sm ml-2">(comma separated)</span>
            </label>
            <input
              type="text" name="propertyImages" value={formData.propertyImages}
              placeholder="https://img1.jpg, https://img2.jpg"
              onChange={handleChange} className="font-semibold w-full border p-3 rounded-lg"
            />
            {formData.propertyImages && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {formData.propertyImages.split(",").map((u) => u.trim()).filter(Boolean).map((url, i) => (
                  <img key={i} src={url} alt="Preview" className="h-28 w-full object-cover rounded-lg border" onError={(e) => (e.target.style.display = "none")} />
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input type="number" name="bedrooms" value={formData.bedrooms} placeholder="Bedrooms" onChange={handleChange} className="font-semibold w-full border rounded-lg p-1" />
            <input type="number" name="bathrooms" value={formData.bathrooms} placeholder="Bathrooms" onChange={handleChange} className="font-semibold w-full border rounded-lg p-1" />
            <input type="number" name="area" value={formData.area} placeholder="Area (sqft)" onChange={handleChange} className="font-semibold w-full border rounded-lg p-1" />
          </div>

          <label className="flex items-center gap-3">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5" />
            <span className="font-medium text-gray-700">Featured Property</span>
          </label>

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition">
            {editMode ? "Update Property" : "Create Property"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePropertyModal;