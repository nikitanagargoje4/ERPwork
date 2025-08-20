import { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { DollarSign, TrendingUp, Users, Target, ShoppingCart } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

const salesData = [
  { month: 'Jan', sales: 65000, target: 60000 },
  { month: 'Feb', sales: 59000, target: 60000 },
  { month: 'Mar', sales: 80000, target: 60000 },
  { month: 'Apr', sales: 81000, target: 70000 },
  { month: 'May', sales: 76000, target: 70000 },
  { month: 'Jun', sales: 85000, target: 70000 },
];

const salesByProduct = [
  { name: 'Product A', value: 35000 },
  { name: 'Product B', value: 25000 },
  { name: 'Product C', value: 20000 },
  { name: 'Product D', value: 15000 },
  { name: 'Others', value: 5000 },
];

const recentSales = [
  {
    id: 1,
    customer: 'Acme Corp',
    product: 'Enterprise Plan',
    amount: 12000,
    status: 'Completed',
    date: '2025-03-15'
  },
  {
    id: 2,
    customer: 'Global Industries',
    product: 'Professional Plan',
    amount: 8000,
    status: 'Pending',
    date: '2025-03-14'
  },
  {
    id: 3,
    customer: 'Tech Solutions',
    product: 'Basic Plan',
    amount: 4000,
    status: 'Completed',
    date: '2025-03-13'
  }
];

export function Sales() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">$446,000</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Growth</p>
              <p className="text-2xl font-semibold text-gray-900">+15.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New Customers</p>
              <p className="text-2xl font-semibold text-gray-900">64</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Target Progress</p>
              <p className="text-2xl font-semibold text-gray-900">89%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Sales Performance">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#00C49F"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Sales by Product">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByProduct}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="value" name="Sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Sales */}
      <DashboardCard title="Recent Sales">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {sale.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${sale.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sale.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sale.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Sales Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Top Products">
          <div className="space-y-4">
            {salesByProduct.slice(0, 3).map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">${product.value.toLocaleString()} in sales</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Sales Targets">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Monthly Goal</span>
                <span className="text-sm font-medium text-gray-900">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Quarterly Goal</span>
                <span className="text-sm font-medium text-gray-900">76%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Annual Goal</span>
                <span className="text-sm font-medium text-gray-900">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Sales Insights">
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Top Performer</p>
              <p className="mt-1 text-sm text-gray-500">
                Product A leads with 35% of total sales
              </p>
            </div>
            <div className="border-l-4 border-warning-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Growth Opportunity</p>
              <p className="mt-1 text-sm text-gray-500">
                Product C shows 25% growth potential
              </p>
            </div>
            <div className="border-l-4 border-success-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Customer Retention</p>
              <p className="mt-1 text-sm text-gray-500">
                85% customer retention rate achieved
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}