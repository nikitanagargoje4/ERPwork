import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface FinanceData {
  overview: {
    totalRevenue: { current: number; previous: number; changePercent: number };
    totalExpenses: { current: number; previous: number; changePercent: number };
    netProfit: { current: number; previous: number; changePercent: number };
  };
  monthlyData: Array<{ month: string; revenue: number; expenses: number }>;
  departmentExpenses: Array<{ department: string; amount: number }>;
}

export function FinanceOverview() {
  const [financeData, setFinanceData] = useState<FinanceData | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('FinanceOverview component mounted'); // Debug log

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        console.log('Fetching finance data...'); // Debug log
        const response = await fetch('/api/finance-data');
        console.log('Response status:', response.status); // Debug log
        const data = await response.json();
        console.log('Finance data loaded:', data); // Debug log
        setFinanceData(data);
      } catch (error) {
        console.error('Error fetching finance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  if (loading) {
    console.log('FinanceOverview showing loading state'); // Debug log
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Finance Overview - Loading...</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!financeData) {
    console.log('FinanceOverview showing error state'); // Debug log
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Finance Overview - Error</h2>
        <p className="text-gray-500">Unable to load finance data</p>
      </div>
    );
  }

  const { overview, monthlyData, departmentExpenses } = financeData;

  console.log('FinanceOverview rendering main content'); // Debug log

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Finance Overview</h2>
      {/* Financial summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue (YTD)</p>
              <p className="text-2xl font-semibold mt-1">${overview.totalRevenue.current.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-600 text-sm font-medium">+{overview.totalRevenue.changePercent}%</span>
            <span className="text-gray-500 text-sm ml-2">vs last year</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Expenses (YTD)</p>
              <p className="text-2xl font-semibold mt-1">${overview.totalExpenses.current.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-red-600 text-sm font-medium">+{overview.totalExpenses.changePercent}%</span>
            <span className="text-gray-500 text-sm ml-2">vs last year</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Net Profit (YTD)</p>
              <p className="text-2xl font-semibold mt-1">${overview.netProfit.current.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-green-600 text-sm font-medium">+{overview.netProfit.changePercent}%</span>
            <span className="text-gray-500 text-sm ml-2">vs last year</span>
          </div>
        </div>
      </div>

      {/* Financial charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Revenue vs Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue"
                  stroke="#0052ff"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="#ff4d4f"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Department Expenses">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentExpenses.map(item => ({ name: item.department, value: item.amount }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Expenses']} />
                <Bar dataKey="value" name="Expenses" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Financial insights and recent transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Recent Transactions">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { id: 1, name: 'Invoice #1089', date: 'Mar 14, 2025', amount: '$8,750.00', status: 'Paid' },
                    { id: 2, name: 'Supplier Payment', date: 'Mar 13, 2025', amount: '$12,650.00', status: 'Processing' },
                    { id: 3, name: 'Payroll', date: 'Mar 10, 2025', amount: '$45,250.00', status: 'Completed' },
                    { id: 4, name: 'Office Supplies', date: 'Mar 8, 2025', amount: '$1,250.00', status: 'Completed' },
                    { id: 5, name: 'Invoice #1088', date: 'Mar 5, 2025', amount: '$7,325.00', status: 'Paid' },
                  ].map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                View all transactions
              </a>
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="Financial Insights">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Cash Flow Positive</p>
                <p className="mt-1 text-sm text-gray-500">
                  Cash flow remains positive for the 8th consecutive month.
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Budget Alert</p>
                <p className="mt-1 text-sm text-gray-500">
                  Marketing department is at 92% of allocated quarterly budget.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Revenue Growth</p>
                <p className="mt-1 text-sm text-gray-500">
                  Q1 revenue exceeded projections by 7.3%.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Investment Return</p>
                <p className="mt-1 text-sm text-gray-500">
                  R&D investments showing 15% ROI, exceeding 12% target.
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
              <button className="w-full btn btn-primary">
                Generate Financial Report
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}