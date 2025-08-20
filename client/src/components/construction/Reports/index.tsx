import { useState } from 'react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { FileText, Download, BarChart2, Calendar, Filter } from 'lucide-react';
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
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const progressData = [
  { month: 'Jan', planned: 15, actual: 12 },
  { month: 'Feb', planned: 35, actual: 30 },
  { month: 'Mar', planned: 55, actual: 48 },
  { month: 'Apr', planned: 75, actual: 65 },
  { month: 'May', planned: 90, actual: 82 },
  { month: 'Jun', planned: 100, actual: 95 },
];

const costData = [
  { category: 'Labor', planned: 450000, actual: 480000 },
  { category: 'Materials', planned: 850000, actual: 820000 },
  { category: 'Equipment', planned: 250000, actual: 265000 },
  { category: 'Subcontractors', planned: 350000, actual: 340000 },
];

const qualityData = [
  { name: 'Passed', value: 85 },
  { name: 'Minor Issues', value: 10 },
  { name: 'Failed', value: 5 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export function Reports() {
  const [reportType, setReportType] = useState('progress');
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="progress">Progress Report</option>
                <option value="cost">Cost Analysis</option>
                <option value="quality">Quality Report</option>
                <option value="safety">Safety Report</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                Date Range
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
            <button className="btn btn-primary">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <DashboardCard title="Project Progress">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planned"
                  name="Planned Progress"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Progress"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        {/* Cost Analysis */}
        <DashboardCard title="Cost Analysis">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="planned" name="Planned Cost" fill="#8884d8" />
                <Bar dataKey="actual" name="Actual Cost" fill="#82ca9d" />
              </BarChart>
            </Responsive
Container>
          </div>
        </DashboardCard>

        {/* Quality Metrics */}
        <DashboardCard title="Quality Metrics">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {qualityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        {/* Safety Statistics */}
        <DashboardCard title="Safety Statistics">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Incident Free Days</span>
                <span className="text-sm font-medium text-gray-900">45 Days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Safety Compliance</span>
                <span className="text-sm font-medium text-gray-900">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Risk Assessment</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Reports */}
      <DashboardCard title="Recent Reports">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated On
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated By
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  name: 'Monthly Progress Report - March 2025',
                  type: 'Progress',
                  date: '2025-03-31',
                  generatedBy: 'John Smith'
                },
                {
                  id: 2,
                  name: 'Quality Inspection Report #45',
                  type: 'Quality',
                  date: '2025-03-28',
                  generatedBy: 'Sarah Johnson'
                },
                {
                  id: 3,
                  name: 'Cost Analysis Report Q1 2025',
                  type: 'Financial',
                  date: '2025-03-25',
                  generatedBy: 'Mike Wilson'
                }
              ].map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.generatedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <Download className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}