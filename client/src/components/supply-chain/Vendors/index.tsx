import React from 'react';

export function Vendors() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Vendor Management</h2>
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Active Vendors</h3>
          <p className="text-gray-500">No vendors to display</p>
        </div>
      </div>
    </div>
  );
}