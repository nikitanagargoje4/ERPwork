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
import { Factory, TrendingUp, AlertCircle, Clock, CheckCircle, PenTool, Truck, HardHat } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const productionData = [
  { month: 'Jan', planned: 1000, actual: 950 },
  { month: 'Feb', planned: 1200, actual: 1150 },
  { month: 'Mar', planned: 1400, actual: 1380 },
  { month: 'Apr', planned: 1300, actual: 1250 },
  { month: 'May', planned: 1500, actual: 1480 },
  { month: 'Jun', planned: 1600, actual: 1550 },
];

const qualityData = [
  { name: 'Pass', value: 85 },
  { name: 'Minor Issues', value: 10 },
  { name: 'Major Issues', value: 5 },
];

const constructionSites = [
  { name: 'Site A - Residential Complex', progress: 75, workers: 45, equipment: 12 },
  { name: 'Site B - Commercial Center', progress: 60, workers: 35, equipment: 8 },
  { name: 'Site C - Infrastructure', progress: 40, workers: 25, equipment: 15 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

export function ManufacturingOverview() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Factory className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Sites</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <HardHat className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Workers</p>
              <p className="text-2xl font-semibold text-gray-900">105</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <PenTool className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Equipment Units</p>
              <p className="text-2xl font-semibold text-gray-900">35</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Truck className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Material Deliveries</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Construction Sites Overview */}
      <DashboardCard title="Active Construction Sites">
        <div className="space-y-4">
          {constructionSites.map((site, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">{site.name}</h3>
                <span className="text-sm text-gray-500">{site.progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: `${site.progress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Workers on Site</p>
                  <p className="text-lg font-medium">{site.workers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Equipment Units</p>
                  <p className="text-lg font-medium">{site.equipment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Production Performance">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="planned"
                  name="Planned"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title="Quality Metrics">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {qualityData.map((entry, index) => (
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

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard title="Safety Compliance">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">PPE Compliance</span>
              <span className="text-sm font-medium text-gray-900">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Safety Training</span>
              <span className="text-sm font-medium text-gray-900">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">Incident Reports</span>
              <span className="text-sm font-medium text-gray-900">0 this month</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Equipment Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-medium">Operational</span>
              </div>
              <span className="text-sm text-gray-500">28 units</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm font-medium">Under Maintenance</span>
              </div>
              <span className="text-sm text-gray-500">5 units</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm font-medium">Out of Service</span>
              </div>
              <span className="text-sm text-gray-500">2 units</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Material Inventory">
          <div className="space-y-4">
            <div className="border-l-4 border-primary-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Concrete</p>
              <p className="mt-1 text-sm text-gray-500">
                180 cubic yards in stock
              </p>
            </div>
            <div className="border-l-4 border-secondary-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Steel</p>
              <p className="mt-1 text-sm text-gray-500">
                25 tons available
              </p>
            </div>
            <div className="border-l-4 border-warning-500 pl-4 py-2">
              <p className="text-sm font-medium text-gray-900">Lumber</p>
              <p className="mt-1 text-sm text-gray-500">
                Low stock - reorder needed
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}