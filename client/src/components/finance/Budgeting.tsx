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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DashboardCard } from '../dashboard/DashboardCard';
import { AlertCircle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const departments = [
  { id: 1, name: 'Sales & Marketing', budget: 250000, spent: 180000, remaining: 70000 },
  { id: 2, name: 'Research & Development', budget: 350000, spent: 200000, remaining: 150000 },
  { id: 3, name: 'Operations', budget: 200000, spent: 150000, remaining: 50000 },
  { id: 4, name: 'Human Resources', budget: 150000, spent: 100000, remaining: 50000 },
  { id: 5, name: 'IT Infrastructure', budget: 180000, spent: 160000, remaining: 20000 },
];

const monthlyExpenses = [
  { month: 'Jan', planned: 80000, actual: 75000 },
  { month: 'Feb', planned: 85000, actual: 82000 },
  { month: 'Mar', planned: 90000, actual: 88000 },
  { month: 'Apr', planned: 88000, actual: 85000 },
  { month: 'May', planned: 85000, actual: 89000 },
  { month: 'Jun', planned: 92000, actual: 95000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function Budgeting() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');

  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const totalSpent = departments.reduce((sum, dept) => sum + dept.spent, 0);
  const totalRemaining = departments.reduce((sum, dept) => sum + dept.remaining, 0);
  const spentPercentage = ((totalSpent / totalBudget) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Fiscal Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
              </select>
            </div>
            <div>
              <label htmlFor="quarter" className="block text-sm font-medium text-gray-700">
                Quarter
              </label>
              <select
                id="quarter"
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option>Q1</option>
                <option>Q2</option>
                <option>Q3</option>
                <option>Q4</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary">
            <DollarSign className="h-4 w-4 mr-2" />
            Adjust Budget
          </button>
        </div>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-2xl font-semibold mt-1">${(totalBudget / 1000).toFixed(1)}k</p>
            </div>
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Spent</p>
              <p className="text-2xl font-semibold mt-1">${(totalSpent / 1000).toFixed(1)}k</p>
              <p className="text-sm text-gray-500 mt-1">{spentPercentage}% of budget</p>
            </div>
            <div className="h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining</p>
              <p className="text-2xl font-semibold mt-1">${(totalRemaining / 1000).toFixed(1)}k</p>
            </div>
            <div className="h-12 w-12 bg-success-100 rounded-full flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Budget vs. Actual Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="planned" name="Planned" fill="#8884d8" />
                <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Department Budget Allocation">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departments}
                  dataKey="budget"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}k`}
                >
                  {departments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Department Budgets Table */}
      <DashboardCard title="Department Budget Details">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spent
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => {
                const spentPercentage = (dept.spent / dept.budget) * 100;
                let status;
                if (spentPercentage >= 90) {
                  status = { text: 'Critical', class: 'bg-red-100 text-red-800' };
                } else if (spentPercentage >= 75) {
                  status = { text: 'Warning', class: 'bg-yellow-100 text-yellow-800' };
                } else {
                  status = { text: 'Good', class: 'bg-green-100 text-green-800' };
                }

                return (
                  <tr key={dept.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${dept.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${dept.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${dept.remaining.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.class}`}>
                        {status.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Budget Alerts */}
      <DashboardCard title="Budget Alerts">
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800">IT Infrastructure over budget</h4>
              <p className="mt-1 text-sm text-red-700">
                Department has exceeded 90% of allocated budget for Q1 2025
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Sales & Marketing approaching limit</h4>
              <p className="mt-1 text-sm text-yellow-700">
                Department has used 75% of quarterly budget with 2 months remaining
              </p>
            </div>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}