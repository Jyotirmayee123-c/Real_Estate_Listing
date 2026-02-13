import PropertyCard from "@/components/Buy/PropertyCard";

export default function BuyPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Dream Home</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
}
