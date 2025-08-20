import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
import { DashboardCard } from '../dashboard/DashboardCard';
import { Download, Filter, FileText, Calendar, RefreshCw, Plus, ChevronDown } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 150000, expenses: 120000, profit: 30000 },
  { month: 'Feb', revenue: 160000, expenses: 125000, profit: 35000 },
  { month: 'Mar', revenue: 170000, expenses: 130000, profit: 40000 },
  { month: 'Apr', revenue: 180000, expenses: 135000, profit: 45000 },
  { month: 'May', revenue: 190000, expenses: 140000, profit: 50000 },
  { month: 'Jun', revenue: 200000, expenses: 145000, profit: 55000 },
];

const departmentExpenses = [
  { name: 'Sales', value: 45000 },
  { name: 'Marketing', value: 32000 },
  { name: 'Operations', value: 51000 },
  { name: 'R&D', value: 29000 },
  { name: 'HR', value: 19000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const reportTemplates = [
  {
    id: 1,
    name: 'Monthly Financial Statement',
    description: 'Comprehensive monthly financial report including P&L, balance sheet, and cash flow',
    type: 'Financial',
    frequency: 'Monthly'
  },
  {
    id: 2,
    name: 'Quarterly Tax Report',
    description: 'Detailed tax obligations and payments summary for the quarter',
    type: 'Tax',
    frequency: 'Quarterly'
  },
  {
    id: 3,
    name: 'Annual Budget Analysis',
    description: 'Year-end budget analysis with variances and forecasting',
    type: 'Budget',
    frequency: 'Annually'
  },
  {
    id: 4,
    name: 'Department Expense Report',
    description: 'Breakdown of expenses by department with trend analysis',
    type: 'Expense',
    frequency: 'Monthly'
  }
];

const scheduledReports = [
  {
    id: 1,
    name: 'Monthly P&L Statement',
    nextRun: '2025-04-01',
    frequency: 'Monthly',
    format: 'PDF',
    recipients: ['finance@example.com', 'ceo@example.com']
  },
  {
    id: 2,
    name: 'Weekly Cash Flow Report',
    nextRun: '2025-03-25',
    frequency: 'Weekly',
    format: 'Excel',
    recipients: ['treasury@example.com']
  },
  {
    id: 3,
    name: 'Quarterly Financial Review',
    nextRun: '2025-06-30',
    frequency: 'Quarterly',
    format: 'PDF',
    recipients: ['board@example.com', 'investors@example.com']
  }
];

export function FinanceReports() {
  const [dateRange, setDateRange] = useState('monthly');
  const [reportType, setReportType] = useState('all');
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
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
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
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
                <option value="all">All Reports</option>
                <option value="financial">Financial Statements</option>
                <option value="tax">Tax Reports</option>
                <option value="budget">Budget Reports</option>
                <option value="audit">Audit Reports</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-outline">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </button>
            <button className="btn btn-primary" onClick={() => setShowNewReportModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <DashboardCard title="Report Templates">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reportTemplates.map((template) => (
            <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-6 w-6 text-primary-500" />
                <span className="text-xs font-medium text-gray-500">{template.frequency}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{template.type}</span>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Revenue vs Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#FF8042"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Department Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentExpenses}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                >
                  {departmentExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Scheduled Reports */}
      <DashboardCard 
        title={
          <div className="flex items-center justify-between">
            <span>Scheduled Reports</span>
            <button className="btn btn-outline btn-sm">
              <Plus className="h-4 w-4 mr-2" />
              Schedule New Report
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Run
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Frequency
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scheduledReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.nextRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.frequency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.format}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.recipients.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Export Options">
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
              <Download className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <span className="block font-medium">Export as PDF</span>
                <span className="text-sm text-gray-500">High-quality print format</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
              <Download className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <span className="block font-medium">Export as Excel</span>
                <span className="text-sm text-gray-500">Editable spreadsheet format</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
              <Download className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <span className="block font-medium">Export as CSV</span>
                <span className="text-sm text-gray-500">Raw data format</span>
              </div>
            </button>
          </div>
        </DashboardCard>

        <DashboardCard title="Report Settings">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Format</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Auto-Schedule</label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Email reports automatically
                </span>
              </label>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Activity">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Monthly Report Generated</p>
                <p className="text-xs text-gray-500">March 15, 2025</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Schedule Updated</p>
                <p className="text-xs text-gray-500">March 14, 2025</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Download className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Report Downloaded</p>
                <p className="text-xs text-gray-500">March 13, 2025</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}