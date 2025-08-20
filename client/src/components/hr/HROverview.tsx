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
  Cell,
} from 'recharts';
import { Users, UserPlus, UserMinus, Award } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

const departmentData = [
  { name: 'Engineering', employees: 45 },
  { name: 'Sales', employees: 30 },
  { name: 'Marketing', employees: 25 },
  { name: 'Operations', employees: 20 },
  { name: 'HR', employees: 15 },
  { name: 'Finance', employees: 15 },
];

const employeeTrends = [
  { month: 'Jan', hires: 5, departures: 2 },
  { month: 'Feb', hires: 4, departures: 1 },
  { month: 'Mar', hires: 6, departures: 3 },
  { month: 'Apr', hires: 3, departures: 2 },
  { month: 'May', hires: 5, departures: 2 },
  { month: 'Jun', hires: 4, departures: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function HROverview() {
  const [period, setPeriod] = useState('month');
  const totalEmployees = departmentData.reduce((sum, dept) => sum + dept.employees, 0);
  const openPositions = 12;
  const activeRecruitments = 8;

  console.log('HROverview component is rendering');

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
              <p className="text-sm font-medium text-gray-500">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Positions</p>
              <p className="text-2xl font-semibold text-gray-900">{openPositions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <UserMinus className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Recruitments</p>
              <p className="text-2xl font-semibold text-gray-900">{activeRecruitments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Training Programs</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Employee Distribution by Department">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  dataKey="employees"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Employee Trends">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hires" name="New Hires" fill="#0088FE" />
                <Bar dataKey="departures" name="Departures" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Activities */}
      <DashboardCard title="Recent HR Activities">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {[
              {
                id: 1,
                type: 'hire',
                description: 'New employee John Doe joined Engineering team',
                date: '2025-03-15',
                department: 'Engineering'
              },
              {
                id: 2,
                type: 'training',
                description: 'Leadership training program completed by 12 employees',
                date: '2025-03-14',
                department: 'Various'
              },
              {
                id: 3,
                type: 'recruitment',
                description: 'Posted new position for Senior Product Designer',
                date: '2025-03-13',
                department: 'Design'
              },
              {
                id: 4,
                type: 'performance',
                description: 'Quarterly performance reviews completed',
                date: '2025-03-12',
                department: 'All'
              },
              {
                id: 5,
                type: 'policy',
                description: 'Updated remote work policy distributed',
                date: '2025-03-11',
                department: 'HR'
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
                      Department: {activity.department}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </DashboardCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Upcoming Reviews">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Annual Review</p>
              </div>
              <span className="text-sm text-gray-500">Mar 20</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Mike Thompson</p>
                <p className="text-xs text-gray-500">Quarterly Review</p>
              </div>
              <span className="text-sm text-gray-500">Mar 22</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Emily Davis</p>
                <p className="text-xs text-gray-500">Performance Review</p>
              </div>
              <span className="text-sm text-gray-500">Mar 25</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Training Programs">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Leadership Development</p>
                <p className="text-xs text-gray-500">15 Participants</p>
              </div>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Technical Skills</p>
                <p className="text-xs text-gray-500">28 Participants</p>
              </div>
              <span className="badge badge-success">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New Hire Orientation</p>
                <p className="text-xs text-gray-500">8 Participants</p>
              </div>
              <span className="badge badge-warning">Upcoming</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Department Updates">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Engineering</p>
                <p className="text-xs text-gray-500">2 Open Positions</p>
              </div>
              <span className="badge badge-primary">Hiring</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sales</p>
                <p className="text-xs text-gray-500">Team Restructuring</p>
              </div>
              <span className="badge badge-warning">In Progress</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Marketing</p>
                <p className="text-xs text-gray-500">Budget Review</p>
              </div>
              <span className="badge badge-accent">Scheduled</span>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}