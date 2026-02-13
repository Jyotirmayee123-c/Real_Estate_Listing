export default function PropertyTable() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Price</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td>Luxury Villa</td>
            <td>₹85,00,000</td>
            <td>Bhubaneswar</td>
            <td>
              <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
