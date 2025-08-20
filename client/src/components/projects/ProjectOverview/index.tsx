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
import { FolderKanban, Clock, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const projectStatus = [
  { name: 'On Track', value: 60 },
  { name: 'At Risk', value: 25 },
  { name: 'Delayed', value: 15 }
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const projectProgress = [
  { month: 'Jan', planned: 20, actual: 18 },
  { month: 'Feb', planned: 40, actual: 35 },
  { month: 'Mar', planned: 60, actual: 55 },
  { month: 'Apr', planned: 80, actual: 72 },
  { month: 'May', planned: 90, actual: 85 },
  { month: 'Jun', planned: 100, actual: 95 },
];

const resourceAllocation = [
  { department: 'Engineering', allocated: 45, available: 50 },
  { department: 'Design', allocated: 20, available: 25 },
  { department: 'Marketing', allocated: 15, available: 20 },
  { department: 'QA', allocated: 10, available: 15 },
];

export function ProjectOverview() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <FolderKanban className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
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
              <p className="text-sm font-medium text-gray-500">On-Time Delivery</p>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Budget Utilization</p>
              <p className="text-2xl font-semibold text-gray-900">92%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Project Status Distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {projectStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Project Progress">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projectProgress}>
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
      </div>

      {/* Resource Allocation */}
      <DashboardCard title="Resource Allocation">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={resourceAllocation}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="allocated" name="Allocated Resources" fill="#8884d8" />
              <Bar dataKey="available" name="Available Resources" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Project Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Project Health">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Schedule Performance</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Cost Performance</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">Quality Metrics</span>
                <span className="text-sm font-medium text-gray-900">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Risk Assessment">
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-error-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">High Risk</p>
                <p className="text-xs text-gray-500">Resource constraints in Engineering team</p>
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Medium Risk</p>
                <p className="text-xs text-gray-500">Potential delay in vendor deliveries</p>
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-success-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Low Risk</p>
                <p className="text-xs text-gray-500">Minor budget variations</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Milestones">
          <div className="space-y-4">
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Phase 1 Completion</p>
                <p className="text-xs text-gray-500">Due in 5 days</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Client Review</p>
                <p className="text-xs text-gray-500">Due in 2 weeks</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Beta Launch</p>
                <p className="text-xs text-gray-500">Due in 1 month</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}