import React, { useEffect, useState } from "react";
import api from "../../services/api";
import CreatePropertyModal from "../../components/admin/CreatePropertyModal";
import ViewPropertyModal from "../../components/admin/ViewPropertyModal";

const AdminProperty = () => {
    const [openModal, setOpenModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Properties
    const fetchProperties = async () => {
        try {
            setLoading(true);
            const res = await api.get("/property");
            setProperties(res.data.data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch properties");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        try {
            await api.delete(`/property/${id}`);
            alert("Property deleted successfully ✅");
            fetchProperties();
        } catch (error) {
            alert("Failed to delete property ❌");
        }
    };

    // View
    const handleView = (property) => {
        setSelectedProperty(property);
        setViewModal(true);
    };

    // Update
    const handleEdit = (property) => {
        setSelectedProperty(property);
        setEditMode(true);
        setOpenModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Admin Properties
                </h1>

                <button
                    onClick={() => {
                        setSelectedProperty(null);
                        setEditMode(false);
                        setOpenModal(true);
                    }}
                    className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
                >
                    + Create Property
                </button>
            </div>

            {loading && <p className="text-center">Loading...</p>}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <div
                        key={property._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border"
                    >
                        <img
                            src={property.thumbnail}
                            alt={property.title}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4 space-y-2">
                            <h2 className="text-lg font-semibold truncate">
                                {property.title}
                            </h2>

                            <p className="text-purple-600 font-bold">
                                ₹ {property.price.toLocaleString()}
                            </p>

                            <p className="text-sm text-gray-500">
                                {property.city} • {property.propertyType}
                            </p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-lg text-sm"
                                    onClick={() => handleView(property)}
                                >
                                    View
                                </button>

                                <button
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 rounded-lg text-sm"
                                    onClick={() => handleEdit(property)}
                                >
                                    Update
                                </button>

                                <button
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg text-sm"
                                    onClick={() => handleDelete(property._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create / Update Modal */}
            {openModal && (
                <CreatePropertyModal
                    closeModal={() => {
                        setOpenModal(false);
                        setEditMode(false);
                        fetchProperties();
                    }}
                    editMode={editMode}
                    propertyData={selectedProperty}
                />
            )}

            {/* View Modal */}
            {viewModal && (
                <ViewPropertyModal
                    property={selectedProperty}
                    closeModal={() => setViewModal(false)}
                />
            )}
        </div>
    );
};

export default AdminProperty;