import PropertyTable from "@/components/Admin/PropertyTable";

export default function AdminPropertiesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Properties</h1>
      <PropertyTable />
    </div>
  );
}
