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
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

const ticketData = [
  { month: 'Jan', opened: 120, resolved: 110 },
  { month: 'Feb', opened: 140, resolved: 130 },
  { month: 'Mar', opened: 160, resolved: 150 },
  { month: 'Apr', opened: 180, resolved: 170 },
  { month: 'May', opened: 200, resolved: 190 },
  { month: 'Jun', opened: 220, resolved: 210 },
];

const responseTimeData = [
  { day: 'Mon', time: 2.5 },
  { day: 'Tue', time: 2.8 },
  { day: 'Wed', time: 2.2 },
  { day: 'Thu', time: 2.7 },
  { day: 'Fri', time: 2.4 },
  { day: 'Sat', time: 1.8 },
  { day: 'Sun', time: 1.5 },
];

const activeTickets = [
  {
    id: 1,
    customer: 'John Smith',
    subject: 'Login Issue',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Sarah Wilson',
    created: '2025-03-15'
  },
  {
    id: 2,
    customer: 'Jane Doe',
    subject: 'Payment Failed',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Mike Johnson',
    created: '2025-03-14'
  },
  {
    id: 3,
    customer: 'Bob Wilson',
    subject: 'Feature Request',
    priority: 'Low',
    status: 'Open',
    assignedTo: 'Emily Davis',
    created: '2025-03-13'
  }
];

export function Support() {
  const [period, setPeriod] = useState('week');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">48</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
              <p className="text-2xl font-semibold text-gray-900">2.5h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolution Rate</p>
              <p className="text-2xl font-semibold text-gray-900">94%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
              <p className="text-2xl font-semibold text-gray-900">4.8/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Ticket Volume">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="opened"
                  name="Opened Tickets"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved Tickets"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Response Time Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="time" name="Response Time (hours)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Active Tickets */}
      <DashboardCard title="Active Tickets">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ticket.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : ticket.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.status === 'Open'
                        ? 'bg-blue-100 text-blue-800'
                        : ticket.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.created}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Support Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Ticket Categories">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Technical Issues</span>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Billing Questions</span>
              <span className="text-sm font-medium text-gray-900">30%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Feature Requests</span>
              <span className="text-sm font-medium text-gray-900">25%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-accent-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Team Performance">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Sarah Wilson</span>
              </div>
              <span className="text-sm font-medium text-gray-900">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Mike Johnson</span>
              </div>
              <span className="text-sm font-medium text-gray-900">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-600" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Emily Davis</span>
              </div>
              <span className="text-sm font-medium text-gray-900">92%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Support Insights">
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Peak Hours</p>
              <p className="mt-1 text-sm text-gray-500">
                Highest ticket volume between 9AM-11AM
              </p>
            </div>
            <div className="border-l-4 border-warning-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Common Issues</p>
              <p className="mt-1 text-sm text-gray-500">
                Login problems account for 25% of tickets
              </p>
            </div>
            <div className="border-l-4 border-success-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Customer Feedback</p>
              <p className="mt-1 text-sm text-gray-500">
                95% satisfaction with response time
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}