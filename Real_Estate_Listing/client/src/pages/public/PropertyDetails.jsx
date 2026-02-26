import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, BedDouble, Bath, Ruler, Home, ArrowLeft } from "lucide-react";
import api from "../../services/api";

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const fetchProperty = async () => {
        try {
            const res = await api.get(`/property/${id}`);
            const data = res.data.property || res.data?.data;
            setProperty(data);
            setSelectedImage(data.thumbnail);
        } catch (error) {
            console.error("Error fetching property", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMsg("");

        try {
            await api.post("/enquiry", {
                ...formData,
                property: id,
            });

            setSuccessMsg("Enquiry sent successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
            });
        } catch (error) {
            console.error("Enquiry error:", error);
            alert("Failed to send enquiry");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
                Loading property...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Property not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

                {/* LEFT SECTION */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">

                    {/* Back Button */}
                    <div className="p-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-purple-600 font-medium hover:underline"
                        >
                            <ArrowLeft size={18} /> Back
                        </button>
                    </div>

                    {/* Image Section */}
                    <div className="grid md:grid-cols-2 gap-8 p-6">

                        <div>
                            <img
                                src={selectedImage}
                                alt={property.title}
                                className="w-full h-96 object-cover rounded-2xl"
                            />

                            <div className="flex gap-3 mt-4 flex-wrap">
                                {[property.thumbnail, ...(property.images || [])].map(
                                    (img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt="thumbnail"
                                            onClick={() => setSelectedImage(img)}
                                            className={`h-20 w-28 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === img
                                                    ? "border-purple-600"
                                                    : "border-transparent"
                                                }`}
                                        />
                                    )
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {property.title}
                            </h1>

                            <div className="flex items-center text-gray-500 gap-2">
                                <MapPin size={18} />
                                {property.city}, {property.address}
                            </div>

                            <div className="text-3xl font-bold text-purple-600">
                                ₹ {property.price?.toLocaleString()}
                            </div>

                            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <BedDouble className="text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                        <p className="font-semibold">{property.bedrooms}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Bath className="text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                        <p className="font-semibold">{property.bathrooms}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Ruler className="text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Area</p>
                                        <p className="font-semibold">{property.area} sqft</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Home className="text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-500">Type</p>
                                        <p className="font-semibold capitalize">
                                            {property.propertyType}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm capitalize">
                                    {property.listingType}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="px-6 pb-10">
                        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                            Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            {property.description}
                        </p>
                    </div>
                </div>

                {/* RIGHT SECTION - ENQUIRY FORM */}
                <div className="bg-white rounded-3xl shadow-lg p-6 h-fit sticky top-10">
                    <h2 className="text-xl font-semibold mb-5">
                        Send Enquiry
                    </h2>

                    {successMsg && (
                        <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleEnquirySubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"
                        />

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition"
                        >
                            {submitting ? "Sending..." : "Send Enquiry"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default PropertyDetails;