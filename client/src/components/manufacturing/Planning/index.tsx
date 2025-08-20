import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Calendar, Clock, TrendingUp, Package, Plus } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const productionPlan = [
  {
    id: 1,
    product: 'Product A',
    quantity: 1000,
    startDate: '2025-03-20',
    endDate: '2025-03-25',
    status: 'Scheduled',
    line: 'Line 1',
    priority: 'High'
  },
  {
    id: 2,
    product: 'Product B',
    quantity: 750,
    startDate: '2025-03-26',
    endDate: '2025-03-30',
    status: 'Pending',
    line: 'Line 2',
    priority: 'Medium'
  },
  {
    id: 3,
    product: 'Product C',
    quantity: 500,
    startDate: '2025-04-01',
    endDate: '2025-04-05',
    status: 'Draft',
    line: 'Line 1',
    priority: 'Low'
  }
];

const capacityData = [
  { month: 'Jan', planned: 90, actual: 85 },
  { month: 'Feb', planned: 85, actual: 82 },
  { month: 'Mar', planned: 95, actual: 90 },
  { month: 'Apr', planned: 88, actual: 85 },
  { month: 'May', planned: 92, actual: 88 },
  { month: 'Jun', planned: 96, actual: 92 },
];

const demandForecast = [
  { month: 'Jul', forecast: 1200, confirmed: 800 },
  { month: 'Aug', forecast: 1300, confirmed: 900 },
  { month: 'Sep', forecast: 1400, confirmed: 850 },
  { month: 'Oct', forecast: 1500, confirmed: 1000 },
  { month: 'Nov', forecast: 1600, confirmed: 1100 },
  { month: 'Dec', forecast: 1700, confirmed: 1200 },
];

export function Planning() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Planned Orders</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Lead Time</p>
              <p className="text-2xl font-semibold text-gray-900">5.2 days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Capacity Utilization</p>
              <p className="text-2xl font-semibold text-gray-900">87%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">WIP Inventory</p>
              <p className="text-2xl font-semibold text-gray-900">$125K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Plan */}
      <DashboardCard 
        title={
          <div className="flex items-center justify-between">
            <span>Production Plan</span>
            <button className="btn btn-primary btn-sm">
              <Plus className="h-4 w-4 mr-2" />
              New Plan
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Line
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productionPlan.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {plan.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.endDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.line}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      plan.status === 'Scheduled'
                        ? 'bg-green-100 text-green-800'
                        : plan.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      plan.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : plan.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {plan.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Capacity Utilization">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={capacityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planned"
                  name="Planned Capacity (%)"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Utilization (%)"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Demand Forecast">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="forecast" name="Forecasted Demand" fill="#8884d8" />
                <Bar dataKey="confirmed" name="Confirmed Orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Planning Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Resource Allocation">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Line 1</span>
                <span className="text-sm font-medium text-gray-900">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Line 2</span>
                <span className="text-sm font-medium text-gray-900">82%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Line 3</span>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Material Requirements">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Raw Material A</span>
              </div>
              <span className="text-sm text-gray-500">2,500 units</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Raw Material B</span>
              </div>
              <span className="text-sm text-gray-500">1,800 units</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Raw Material C</span>
              </div>
              <span className="text-sm text-gray-500">3,200 units</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Planning Alerts">
          <div className="space-y-4">
            <div className="border-l-4 border-warning-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Capacity Alert</p>
              <p className="mt-1 text-sm text-gray-500">
                Line 1 approaching maximum capacity
              </p>
            </div>
            <div className="border-l-4 border-error-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Material Shortage</p>
              <p className="mt-1 text-sm text-gray-500">
                Raw Material B inventory below safety stock
              </p>
            </div>
            <div className="border-l-4 border-success-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Schedule Update</p>
              <p className="mt-1 text-sm text-gray-500">
                Production schedule optimized for next week
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}