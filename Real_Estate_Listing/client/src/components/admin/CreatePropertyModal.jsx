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
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  // 🔥 Preview States
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  // ✅ Prefill Data in Edit Mode
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
      });

      // 🔥 Show existing images
      setThumbnailPreview(propertyData.thumbnail || null);
      setImagePreviews(propertyData.images || []);
    }
  }, [editMode, propertyData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔥 Thumbnail Change + Preview
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 Multiple Image Change + Preview
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      if (images.length > 0) {
        images.forEach((img) => {
          data.append("images", img);
        });
      }

      if (editMode) {
        await api.put(`/property/${propertyData._id}`, data);
        alert("Property updated successfully ✅");
      } else {
        await api.post("/property", data);
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
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={formData.title} placeholder="Property Title" onChange={handleChange} required className="input-style" />
            <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} required className="input-style" />
            <select name="listingType" value={formData.listingType} onChange={handleChange} required className="input-style">
              <option value="">Listing Type</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="sell">Sell</option>
              <option value="other">Other</option>
            </select>
            <select name="propertyType" value={formData.propertyType} onChange={handleChange} required className="input-style">
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
              <option value="other">Other</option>
            </select>
            <input type="text" name="city" value={formData.city} placeholder="City" onChange={handleChange} required className="input-style" />
            <input type="text" name="address" value={formData.address} placeholder="Full Address" onChange={handleChange} required className="input-style" />
          </div>

          <textarea name="description" value={formData.description} placeholder="Property Description" onChange={handleChange} required className="w-full border rounded-lg p-3" rows={4} />

          {/* 🔥 Thumbnail Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Thumbnail {editMode && "(Optional)"}
            </label>
            {/* <input type="file" accept="image/*" onChange={handleThumbnailChange} className="w-full border p-2 rounded-lg" /> */}
            <input type="text" name="thumbnail" placeholder="Image with Url" value={formData.thumbnail} onChange={handleChange}  required className="w-full border rounded-lg p-3" rows={4} />
          

            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-3 h-40 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* 🔥 Multiple Images Upload */}
          <div>
            <label className="block font-semibold mb-2">
              Property Images {editMode && "(Optional)"}
            </label>
            <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="w-full border p-2 rounded-lg" />

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {imagePreviews.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Preview"
                    className="h-28 w-full object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-3 gap-4">
            <input type="number" name="bedrooms" value={formData.bedrooms} placeholder="Bedrooms" onChange={handleChange} className="input-style" />
            <input type="number" name="bathrooms" value={formData.bathrooms} placeholder="Bathrooms" onChange={handleChange} className="input-style" />
            <input type="number" name="area" value={formData.area} placeholder="Area (sqft)" onChange={handleChange} className="input-style" />
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