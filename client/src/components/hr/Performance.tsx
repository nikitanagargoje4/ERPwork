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
} from 'recharts';
import { LineChart as LineChartIcon, Target, TrendingUp, Award } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

const performanceData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 88 },
  { month: 'Mar', score: 87 },
  { month: 'Apr', score: 90 },
  { month: 'May', score: 89 },
  { month: 'Jun', score: 92 },
];

const departmentScores = [
  { department: 'Engineering', score: 88 },
  { department: 'Sales', score: 85 },
  { department: 'Marketing', score: 82 },
  { department: 'Operations', score: 87 },
  { department: 'HR', score: 90 },
  { department: 'Finance', score: 86 },
];

const reviews = [
  {
    id: 1,
    employee: 'John Doe',
    position: 'Senior Developer',
    department: 'Engineering',
    reviewDate: '2025-03-15',
    score: 92,
    status: 'Completed'
  },
  {
    id: 2,
    employee: 'Jane Smith',
    position: 'Marketing Manager',
    department: 'Marketing',
    reviewDate: '2025-03-14',
    score: 88,
    status: 'Completed'
  },
  // Add more reviews...
];

export function Performance() {
  const [period, setPeriod] = useState('quarter');
  const averageScore = performanceData.reduce((acc, curr) => acc + curr.score, 0) / performanceData.length;
  const topPerformer = reviews.reduce((max, review) => review.score > max.score ? review : max, reviews[0]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <LineChartIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900">{averageScore.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Reviews Completed</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Improvement Rate</p>
              <p className="text-2xl font-semibold text-gray-900">+8.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Top Performer</p>
              <p className="text-2xl font-semibold text-gray-900">{topPerformer.score}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Performance Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Performance Score"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Department Performance">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="score"
                  name="Average Score"
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>

      {/* Recent Reviews */}
      <DashboardCard title="Recent Performance Reviews">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Review Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {review.employee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {review.reviewDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${review.score >= 90 ? 'bg-green-100 text-green-800' :
                        review.score >= 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {review.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${review.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {review.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Key Performance Indicators">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Productivity</p>
                <div className="mt-1 h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Quality of Work</p>
                <div className="mt-1 h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Initiative</p>
                <div className="mt-1 h-2 w-full bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">78%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Reviews">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-gray-500">Marketing Specialist</p>
              </div>
              <span className="text-sm text-gray-500">Mar 25</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Michael Brown</p>
                <p className="text-xs text-gray-500">Software Engineer</p>
              </div>
              <span className="text-sm text-gray-500">Mar 28</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Emily Davis</p>
                <p className="text-xs text-gray-500">Product Manager</p>
              </div>
              <span className="text-sm text-gray-500">Mar 30</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Performance Insights">
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">High Performer Alert</p>
              <p className="mt-1 text-sm text-gray-500">
                Engineering team showing 15% improvement in Q1
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Training Recommendation</p>
              <p className="mt-1 text-sm text-gray-500">
                Consider leadership training for high-potential employees
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Performance Gap</p>
              <p className="mt-1 text-sm text-gray-500">
                Sales team productivity below target by 8%
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}