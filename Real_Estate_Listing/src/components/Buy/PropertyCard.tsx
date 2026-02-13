export default function PropertyCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <img
        src="/house.jpg"
        className="h-48 w-full object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-3">Luxury Villa</h3>
      <p className="text-gray-600">Bhubaneswar, Odisha</p>
      <p className="text-purple-600 font-bold mt-1">₹85,00,000</p>
    </div>
  );
}
