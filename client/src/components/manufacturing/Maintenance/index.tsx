import { useState } from 'react';
import { PenTool, Calendar, AlertTriangle, CheckCircle, Clock, Settings, BarChart2 } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const maintenanceSchedule = [
  {
    id: 1,
    equipment: 'Production Line A',
    type: 'Preventive',
    dueDate: '2025-03-20',
    assignedTo: 'John Smith',
    status: 'Scheduled',
    priority: 'High'
  },
  {
    id: 2,
    equipment: 'CNC Machine 3',
    type: 'Routine',
    dueDate: '2025-03-18',
    assignedTo: 'Mike Johnson',
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    id: 3,
    equipment: 'Assembly Robot 2',
    type: 'Repair',
    dueDate: '2025-03-15',
    assignedTo: 'Sarah Wilson',
    status: 'Completed',
    priority: 'High'
  }
];

const equipmentStatus = [
  {
    id: 1,
    name: 'Production Line A',
    status: 'Operational',
    lastMaintenance: '2025-02-15',
    nextMaintenance: '2025-03-15',
    uptime: '98.5%'
  },
  {
    id: 2,
    name: 'Production Line B',
    status: 'Maintenance Required',
    lastMaintenance: '2025-02-01',
    nextMaintenance: '2025-03-01',
    uptime: '92.3%'
  },
  {
    id: 3,
    name: 'Production Line C',
    status: 'Under Repair',
    lastMaintenance: '2025-02-28',
    nextMaintenance: '2025-03-28',
    uptime: '85.7%'
  }
];

export function Maintenance() {
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <PenTool className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Equipment Uptime</p>
              <p className="text-2xl font-semibold text-gray-900">92.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled Tasks</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-error-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-error-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Critical Issues</p>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed Today</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Status */}
      <DashboardCard title="Equipment Status">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Maintenance
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Maintenance
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipmentStatus.map((equipment) => (
                <tr key={equipment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {equipment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      equipment.status === 'Operational'
                        ? 'bg-green-100 text-green-800'
                        : equipment.status === 'Maintenance Required'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {equipment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.nextMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.uptime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Maintenance Schedule */}
      <DashboardCard title="Maintenance Schedule">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Equipment
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceSchedule.map((task) => (
                <tr key={task.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.equipment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Maintenance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Maintenance Metrics">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">MTBF</span>
                <span className="text-sm font-medium text-gray-900">168 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">MTTR</span>
                <span className="text-sm font-medium text-gray-900">4.2 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-warning-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">PM Compliance</span>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Recent Issues">
          <div className="space-y-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-warning-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Bearing Wear</p>
                <p className="text-xs text-gray-500">Production Line B - Station 3</p>
                <p className="text-xs text-gray-500">Reported 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-error-500 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Motor Overheating</p>
                <p className="text-xs text-gray-500">Assembly Robot 2</p>
                <p className="text-xs text-gray-500">Reported 4 hours ago</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Maintenance">
          <div className="space-y-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Preventive Maintenance</p>
                <p className="text-xs text-gray-500">Production Line A</p>
                <p className="text-xs text-gray-500">Scheduled for tomorrow</p>
              </div>
            </div>
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Calibration</p>
                <p className="text-xs text-gray-500">Quality Control Equipment</p>
                <p className="text-xs text-gray-500">Scheduled for next week</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}