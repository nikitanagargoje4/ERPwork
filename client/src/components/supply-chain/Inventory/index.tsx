import React from 'react';

export function Inventory() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Inventory Management</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inventory Summary Card */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Inventory Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Items</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Low Stock Items</span>
                <span className="text-orange-600 font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Out of Stock</span>
                <span className="text-red-600 font-medium">5</span>
              </div>
            </div>
          </div>

          {/* Stock Value Card */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Stock Value</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Value</span>
                <span className="font-medium">$543,210</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Change</span>
                <span className="text-green-600 font-medium">+$12,345</span>
              </div>
            </div>
          </div>

          {/* Warehouse Status Card */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Warehouse Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Capacity Used</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Space</span>
                <span className="font-medium">22%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Inventory Activity</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Product A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Restocked</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-15</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Product B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Shipped</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-25</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-01-14</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      In Transit
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}