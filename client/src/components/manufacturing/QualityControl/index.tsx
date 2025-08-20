import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { CheckCircle, AlertTriangle, XCircle, BarChart2 } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const qualityMetrics = [
  { month: 'Jan', defectRate: 2.1, firstPassYield: 95.5 },
  { month: 'Feb', defectRate: 1.8, firstPassYield: 96.2 },
  { month: 'Mar', defectRate: 1.5, firstPassYield: 97.0 },
  { month: 'Apr', defectRate: 1.9, firstPassYield: 95.8 },
  { month: 'May', defectRate: 1.6, firstPassYield: 96.5 },
  { month: 'Jun', defectRate: 1.4, firstPassYield: 97.2 },
];

const defectTypes = [
  { name: 'Minor Defects', value: 65 },
  { name: 'Major Defects', value: 25 },
  { name: 'Critical Defects', value: 10 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const inspectionResults = [
  {
    id: 1,
    batch: 'B-2025-001',
    product: 'Product X-123',
    inspectedBy: 'John Smith',
    date: '2025-03-15',
    result: 'Pass',
    defects: 0,
    notes: 'All quality parameters within acceptable range'
  },
  {
    id: 2,
    batch: 'B-2025-002',
    product: 'Product Y-456',
    inspectedBy: 'Sarah Johnson',
    date: '2025-03-15',
    result: 'Minor Issues',
    defects: 2,
    notes: 'Minor surface imperfections detected'
  },
  {
    id: 3,
    batch: 'B-2025-003',
    product: 'Product Z-789',
    inspectedBy: 'Mike Wilson',
    date: '2025-03-14',
    result: 'Fail',
    defects: 5,
    notes: 'Multiple quality parameters out of specification'
  }
];

export function QualityControl() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">First Pass Yield</p>
              <p className="text-2xl font-semibold text-gray-900">96.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Defect Rate</p>
              <p className="text-2xl font-semibold text-gray-900">1.8%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Quality Score</p>
              <p className="text-2xl font-semibold text-gray-900">94.2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejection Rate</p>
              <p className="text-2xl font-semibold text-gray-900">0.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Metrics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Quality Trends">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="firstPassYield"
                  name="First Pass Yield (%)"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="defectRate"
                  name="Defect Rate (%)"
                  stroke="#FF8042"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Defect Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defectTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {defectTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Inspections */}
      <DashboardCard title="Recent Quality Inspections">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspector
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inspectionResults.map((inspection) => (
                <tr key={inspection.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inspection.batch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.inspectedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      inspection.result === 'Pass'
                        ? 'bg-green-100 text-green-800'
                        : inspection.result === 'Minor Issues'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {inspection.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Quality Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Quality Alerts">
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Critical Quality Alert</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Line B - Product Y-456 showing increased defect rate</p>
                </div>
              </div>
            </div>
            <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Quality Check Required</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Batch B-2025-004 pending final quality inspection</p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Quality Metrics">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Process Capability</span>
                <span className="text-sm font-medium text-gray-900">1.33</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Customer Complaints</span>
                <span className="text-sm font-medium text-gray-900">0.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Inspection Coverage</span>
                <span className="text-sm font-medium text-gray-900">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}