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
  ResponsiveContainer,
} from 'recharts';
import { Users, TrendingUp, MessageSquare, Target, DollarSign } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const customerData = [
  { month: 'Jan', newCustomers: 120, activeCustomers: 1200 },
  { month: 'Feb', newCustomers: 140, activeCustomers: 1300 },
  { month: 'Mar', newCustomers: 160, activeCustomers: 1400 },
  { month: 'Apr', newCustomers: 180, activeCustomers: 1500 },
  { month: 'May', newCustomers: 200, activeCustomers: 1600 },
  { month: 'Jun', newCustomers: 220, activeCustomers: 1700 },
];

const revenueData = [
  { month: 'Jan', revenue: 150000 },
  { month: 'Feb', revenue: 160000 },
  { month: 'Mar', revenue: 170000 },
  { month: 'Apr', revenue: 180000 },
  { month: 'May', revenue: 190000 },
  { month: 'Jun', revenue: 200000 },
];

export function CRMOverview() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-semibold text-gray-900">1,734</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Growth Rate</p>
              <p className="text-2xl font-semibold text-gray-900">+12.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">48</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Opportunities</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Customer Growth">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="newCustomers"
                  name="New Customers"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="activeCustomers"
                  name="Active Customers"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Revenue Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Recent Activities">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    type: 'customer',
                    description: 'New customer registration',
                    name: 'John Smith',
                    date: '2025-03-15',
                    status: 'completed'
                  },
                  {
                    id: 2,
                    type: 'support',
                    description: 'Support ticket resolved',
                    name: 'Technical Issue #123',
                    date: '2025-03-14',
                    status: 'completed'
                  },
                  {
                    id: 3,
                    type: 'sale',
                    description: 'New sale completed',
                    name: 'Premium Package',
                    date: '2025-03-13',
                    status: 'completed'
                  }
                ].map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{activity.description}</h3>
                          <p className="text-sm text-gray-500">{activity.date}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {activity.name}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard title="Quick Stats">
            <div className="space-y-4">
              <div className="border-l-4 border-primary-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Customer Satisfaction</p>
                <p className="mt-1 text-sm text-gray-500">
                  92% positive feedback this month
                </p>
              </div>
              <div className="border-l-4 border-secondary-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Response Time</p>
                <p className="mt-1 text-sm text-gray-500">
                  Average 2.5 hours for first response
                </p>
              </div>
              <div className="border-l-4 border-accent-500 pl-4 py-2">
                <p className="text-sm font-medium text-gray-900">Sales Conversion</p>
                <p className="mt-1 text-sm text-gray-500">
                  15% conversion rate on leads
                </p>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}