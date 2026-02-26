import React, { useEffect, useState } from "react";
import api from "../../services/api"
import { Trash2 } from "lucide-react";

function AdminContact() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await api.get(`/contact`);
      setContacts(res?.data?.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/contact/${id}`);

      // Remove deleted item from UI instantly
      setContacts((prev) => prev.filter((item) => item._id !== id));

      alert("Deleted successfully ✅");
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete ❌");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Contact Enquiries
      </h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="overflow-x-auto">

          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Looking To</th>
                <th className="px-6 py-3">Property</th>
                <th className="px-6 py-3">Preferred Contact</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.length > 0 ? (
                contacts?.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {contact.fullName}
                    </td>

                    <td className="px-6 py-4 truncate max-w-[180px]">
                      {contact.email}
                    </td>

                    <td className="px-6 py-4">
                      {contact.phone}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {contact.lookingTo}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {contact.propertyType}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {contact.preferredContactMethod || "-"}
                    </td>

                    <td className="px-6 py-4 max-w-[250px] truncate">
                      {contact.description || "No Description"}
                    </td>

                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-gray-500"
                  >
                    No contact enquiries found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
}

export default AdminContact;