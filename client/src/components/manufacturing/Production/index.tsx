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
} from 'recharts';
import { PenTool, Calendar, AlertTriangle, CheckCircle, Clock, Settings, BarChart2, Hammer, Truck, HardHat } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const constructionLines = [
  {
    id: 1,
    name: 'Residential Complex A',
    status: 'In Progress',
    efficiency: 92,
    currentPhase: 'Foundation Work',
    targetCompletion: '85%',
    currentProgress: '65%',
    startTime: '07:00 AM',
    estimatedCompletion: '06:00 PM',
    workers: 25,
    equipment: 8,
    boq: {
      concrete: { planned: 450, actual: 380 },
      steel: { planned: 75, actual: 62 },
      bricks: { planned: 25000, actual: 21000 }
    },
    safety: {
      incidents: 0,
      observations: 3,
      compliance: 98
    },
    quality: {
      testsCompleted: 15,
      testsPending: 2,
      approvalRate: 95
    }
  },
  {
    id: 2,
    name: 'Commercial Building B',
    status: 'In Progress',
    efficiency: 88,
    currentPhase: 'Structural Work',
    targetCompletion: '75%',
    currentProgress: '45%',
    startTime: '07:30 AM',
    estimatedCompletion: '05:30 PM',
    workers: 30,
    equipment: 12,
    boq: {
      concrete: { planned: 850, actual: 720 },
      steel: { planned: 120, actual: 98 },
      bricks: { planned: 35000, actual: 28000 }
    },
    safety: {
      incidents: 1,
      observations: 5,
      compliance: 92
    },
    quality: {
      testsCompleted: 22,
      testsPending: 4,
      approvalRate: 91
    }
  },
  {
    id: 3,
    name: 'Infrastructure Project C',
    status: 'On Hold',
    efficiency: 0,
    currentPhase: 'Weather Delay',
    targetCompletion: '60%',
    currentProgress: '40%',
    startTime: '-',
    estimatedCompletion: '-',
    workers: 0,
    equipment: 5,
    boq: {
      concrete: { planned: 320, actual: 250 },
      steel: { planned: 45, actual: 32 },
      bricks: { planned: 15000, actual: 12000 }
    },
    safety: {
      incidents: 0,
      observations: 2,
      compliance: 95
    },
    quality: {
      testsCompleted: 8,
      testsPending: 3,
      approvalRate: 88
    }
  }
];

const hourlyProgress = [
  { hour: '07:00', siteA: 120, siteB: 100, siteC: 0 },
  { hour: '08:00', siteA: 125, siteB: 105, siteC: 0 },
  { hour: '09:00', siteA: 118, siteB: 98, siteC: 0 },
  { hour: '10:00', siteA: 122, siteB: 102, siteC: 0 },
  { hour: '11:00', siteA: 115, siteB: 95, siteC: 0 },
  { hour: '12:00', siteA: 128, siteB: 108, siteC: 0 },
];

export function Production() {
  const [selectedSite, setSelectedSite] = useState(null);

  return (
    <div className="space-y-6">
      {/* Construction Site Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {constructionLines.map((site) => (
          <div key={site.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{site.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                site.status === 'In Progress'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {site.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Efficiency</span>
                <span className="text-sm font-medium">{site.efficiency}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Current Phase</span>
                <span className="text-sm font-medium">{site.currentPhase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-medium">
                  {site.currentProgress}/{site.targetCompletion}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary-600 h-2.5 rounded-full"
                  style={{ width: site.currentProgress }}
                ></div>
              </div>

              {/* BOQ Summary */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">BOQ Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Concrete</span>
                    <span>{Math.round((site.boq.concrete.actual / site.boq.concrete.planned) * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Steel</span>
                    <span>{Math.round((site.boq.steel.actual / site.boq.steel.planned) * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bricks</span>
                    <span>{Math.round((site.boq.bricks.actual / site.boq.bricks.planned) * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Safety & Quality */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Safety</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Compliance</span>
                      <span>{site.safety.compliance}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Incidents</span>
                      <span>{site.safety.incidents}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Quality</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Approval</span>
                      <span>{site.quality.approvalRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span>{site.quality.testsPending}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <span className="text-sm text-gray-500">Workers</span>
                  <div className="flex items-center mt-1">
                    <HardHat className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">{site.workers}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Equipment</span>
                  <div className="flex items-center mt-1">
                    <Hammer className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium">{site.equipment}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>{site.startTime}</span>
                <span>{site.estimatedCompletion}</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              {site.status === 'In Progress' ? (
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Clock className="h-5 w-5" />
                </button>
              ) : (
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Calendar className="h-5 w-5" />
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <BarChart2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Chart */}
      <DashboardCard title="Hourly Progress Tracking">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="siteA" name="Site A" fill="#0088FE" />
              <Bar dataKey="siteB" name="Site B" fill="#00C49F" />
              <Bar dataKey="siteC" name="Site C" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Site Alerts */}
      <DashboardCard title="Construction Alerts">
        <div className="space-y-4">
          <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Weather Advisory</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Expected rain may affect concrete pouring schedule at Site B</p>
              </div>
            </div>
          </div>
          <div className="flex items-start p-4 bg-red-50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Equipment Maintenance Required</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Crane #3 at Site A requires immediate inspection</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Resource Schedule */}
      <DashboardCard title="Today's Resource Schedule">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Slot
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resources
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  08:00 - 12:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Concrete Foundation Pour
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Site A
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  15 workers, 3 mixers
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    In Progress
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  13:00 - 17:00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Steel Framework Installation
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Site B
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  20 workers, 2 cranes
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Scheduled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}