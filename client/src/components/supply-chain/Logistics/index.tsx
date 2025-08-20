import React from 'react';

export function Logistics() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Logistics Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Shipment Tracking</h3>
          <div className="space-y-4">
            <p className="text-gray-600">Monitor and manage active shipments across your supply chain network.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Route Optimization</h3>
          <div className="space-y-4">
            <p className="text-gray-600">Optimize delivery routes for maximum efficiency and cost savings.</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Carrier Management</h3>
          <div className="space-y-4">
            <p className="text-gray-600">Manage relationships with shipping carriers and track performance metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
}