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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Megaphone, Target, Users, TrendingUp, Mail, Share2 } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

const campaignData = [
  { month: 'Jan', leads: 120, conversions: 45 },
  { month: 'Feb', leads: 140, conversions: 55 },
  { month: 'Mar', leads: 160, conversions: 65 },
  { month: 'Apr', leads: 180, conversions: 75 },
  { month: 'May', leads: 200, conversions: 85 },
  { month: 'Jun', leads: 220, conversions: 95 },
];

const channelPerformance = [
  { name: 'Email', value: 35 },
  { name: 'Social', value: 25 },
  { name: 'Search', value: 20 },
  { name: 'Direct', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const activeCampaigns = [
  {
    id: 1,
    name: 'Summer Sale 2025',
    status: 'Active',
    reach: '50K+',
    engagement: '12%',
    conversion: '3.5%'
  },
  {
    id: 2,
    name: 'Product Launch',
    status: 'Active',
    reach: '75K+',
    engagement: '15%',
    conversion: '4.2%'
  },
  {
    id: 3,
    name: 'Brand Awareness',
    status: 'Scheduled',
    reach: '100K+',
    engagement: '-',
    conversion: '-'
  }
];

export function Marketing() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Megaphone className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Reach</p>
              <p className="text-2xl font-semibold text-gray-900">250K+</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Engagement Rate</p>
              <p className="text-2xl font-semibold text-gray-900">13.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">3.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Campaign Performance">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="leads"
                  name="Leads"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  name="Conversions"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Channel Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {channelPerformance.map((entry, index) => (
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

      {/* Active Campaigns */}
      <DashboardCard title="Active Campaigns">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reach
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      campaign.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.reach}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.engagement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.conversion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Marketing Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Email Campaigns">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Open Rate</span>
              </div>
              <span className="text-sm font-medium text-gray-900">24.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Click Rate</span>
              </div>
              <span className="text-sm font-medium text-gray-900">12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Unsubscribe Rate</span>
              </div>
              <span className="text-sm font-medium text-gray-900">0.8%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Social Media">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Share2 className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Followers</span>
              </div>
              <span className="text-sm font-medium text-gray-900">125K</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Share2 className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Engagement</span>
              </div>
              <span className="text-sm font-medium text-gray-900">4.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Share2 className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">Reach</span>
              </div>
              <span className="text-sm font-medium text-gray-900">450K</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Campaign Insights">
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Best Performing</p>
              <p className="mt-1 text-sm text-gray-500">
                Summer Sale campaign leads with 4.2% conversion
              </p>
            </div>
            <div className="border-l-4 border-warning-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Opportunity</p>
              <p className="mt-1 text-sm text-gray-500">
                Email campaigns show 15% growth potential
              </p>
            </div>
            <div className="border-l-4 border-success-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Trend</p>
              <p className="mt-1 text-sm text-gray-500">
                Social media engagement up 25% this month
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}