import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Trash2 } from "lucide-react";

const AdminEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = async () => {
        try {
            const res = await api.get("/enquiry");
            setEnquiries(res.data.enquiries || res.data.data);
            console.log(res?.data?.data)
        } catch (error) {
            console.error("Error fetching enquiries", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?"))
            return;

        try {
            await api.delete(`/enquiry/${id}`);
            setEnquiries(enquiries.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Delete error", error);
            alert("Failed to delete enquiry");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Enquiry Management
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center text-lg font-semibold">
                        Loading enquiries...
                    </div>
                )}

                {/* Empty */}
                {!loading && enquiries.length === 0 && (
                    <div className="text-center text-gray-500 text-lg">
                        No enquiries found
                    </div>
                )}

                {/* Enquiry List */}
                <div className="space-y-6">
                    {enquiries.map((enquiry) => (
                        <div
                            key={enquiry._id}
                            className="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-3 gap-6 hover:shadow-lg transition"
                        >
                            {/* Property Section */}
                            <div className="flex gap-4">
                                <img
                                    src={enquiry.property?.thumbnail}
                                    alt={enquiry.property?.title}
                                    className="w-28 h-28 object-cover rounded-xl"
                                />

                                <div>
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        {enquiry.property?.title}
                                    </h2>

                                    <p className="text-purple-600 font-semibold">
                                        ₹ {enquiry.property?.price?.toLocaleString()}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {enquiry.property?.city}
                                    </p>
                                </div>
                            </div>

                            {/* Enquiry Details */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    User Details
                                </h3>

                                <p><span className="font-medium">Name:</span> {enquiry.name}</p>
                                <p><span className="font-medium">Email:</span> {enquiry.email}</p>
                                <p><span className="font-medium">Phone:</span> {enquiry.phone}</p>

                                <p className="mt-2 text-gray-600 text-sm">
                                    <span className="font-medium">Message:</span> {enquiry.message}
                                </p>
                            </div>

                            {/* Action Section */}
                            <div className="flex flex-col justify-between items-end">
                                <p className="text-sm text-gray-400">
                                    {new Date(enquiry.createdAt).toLocaleString()}
                                </p>

                                <button
                                    onClick={() => handleDelete(enquiry._id)}
                                    className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminEnquiry;