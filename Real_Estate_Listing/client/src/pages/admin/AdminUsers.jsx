import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Trash2 } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/auth/users");
            setUsers(res.data.users || res.data.data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;

        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Delete error", error);
            alert("Failed to delete user");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    User Management
                </h1>

                {/* Loading */}
                {loading && (
                    <div className="text-center text-lg font-semibold">
                        Loading users...
                    </div>
                )}

                {/* Empty */}
                {!loading && users.length === 0 && (
                    <div className="text-center text-gray-500 text-lg">
                        No users found
                    </div>
                )}

                {/* Users List */}
                <div className="space-y-6">
                    {users.map((user) => (
                        <div
                            key={user._id}
                            className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition"
                        >
                            {/* User Info */}
                            <div>
                                <h2 className="font-semibold text-lg text-gray-800">
                                    {user.name}
                                </h2>

                                <p className="text-gray-600">{user.email}</p>

                                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                    <span>
                                        Role:{" "}
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "admin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </span>

                                    <span>
                                        Joined:{" "}
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default AdminUsers;