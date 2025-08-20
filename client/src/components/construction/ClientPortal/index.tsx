import { useState } from 'react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { FileText, Download, MessageSquare, Calendar, Clock, AlertTriangle } from 'lucide-react';

interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Delayed';
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface DPRSummary {
  id: string;
  date: string;
  weather: string;
  progress: number;
  activities: string[];
  laborCount: number;
  issues?: string;
}

export function ClientPortal() {
  const [activeTab, setActiveTab] = useState('overview');

  const milestones: ProjectMilestone[] = [
    {
      id: '1',
      title: 'Foundation Work',
      dueDate: '2025-04-15',
      status: 'Completed',
      progress: 100
    },
    {
      id: '2',
      title: 'Structural Work',
      dueDate: '2025-06-30',
      status: 'In Progress',
      progress: 45
    },
    {
      id: '3',
      title: 'MEP Installation',
      dueDate: '2025-08-15',
      status: 'Pending',
      progress: 0
    }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Construction Drawings R2',
      type: 'PDF',
      date: '2025-03-15',
      size: '25 MB',
      status: 'Approved'
    },
    {
      id: '2',
      name: 'Material Specifications',
      type: 'PDF',
      date: '2025-03-10',
      size: '12 MB',
      status: 'Approved'
    }
  ];

  const dprSummaries: DPRSummary[] = [
    {
      id: '1',
      date: '2025-03-20',
      weather: 'Sunny',
      progress: 85,
      activities: [
        'Column reinforcement work',
        'Slab shuttering',
        'Material testing'
      ],
      laborCount: 45
    },
    {
      id: '2',
      date: '2025-03-19',
      weather: 'Cloudy',
      progress: 75,
      activities: [
        'Foundation waterproofing',
        'Backfilling work'
      ],
      laborCount: 38,
      issues: 'Minor delay due to material delivery'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Project Progress</p>
              <p className="text-2xl font-semibold text-gray-900">45%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Time Elapsed</p>
              <p className="text-2xl font-semibold text-gray-900">120 Days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-success-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved Docs</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Issues</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {['overview', 'documents', 'progress', 'issues'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Milestones */}
              <DashboardCard title="Project Milestones">
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{milestone.title}</h4>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          milestone.status === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : milestone.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : milestone.status === 'Delayed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {milestone.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Due: {milestone.dueDate}</span>
                        <span className="text-gray-900">{milestone.progress}%</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>

              {/* Daily Progress Reports */}
              <DashboardCard title="Recent Progress Reports">
                <div className="space-y-4">
                  {dprSummaries.map((dpr) => (
                    <div key={dpr.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Date: {dpr.date}</h4>
                          <p className="text-sm text-gray-500">Weather: {dpr.weather}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{dpr.progress}% Complete</span>
                      </div>
                      <div className="mt-2">
                        <h5 className="text-sm font-medium text-gray-900">Activities:</h5>
                        <ul className="mt-1 space-y-1">
                          {dpr.activities.map((activity, index) => (
                            <li key={index} className="text-sm text-gray-500">
                              • {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-500">Labor Count: {dpr.laborCount}</span>
                        {dpr.issues && (
                          <span className="text-warning-600">
                            <AlertTriangle className="h-4 w-4 inline mr-1" />
                            {dpr.issues}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {documents.map((doc) => (
                      <tr key={doc.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {doc.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            doc.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : doc.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900">
                            <Download className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="space-y-6">
              {/* Issue Reporting Form */}
              <DashboardCard title="Report an Issue">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issue Type</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>Quality Concern</option>
                        <option>Schedule Delay</option>
                        <option>Safety Issue</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Priority</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe the issue in detail..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button className="btn btn-primary">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Submit Issue
                    </button>
                  </div>
                </div>
              </DashboardCard>

              {/* Issue History */}
              <DashboardCard title="Issue History">
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      type: 'Quality Concern',
                      description: 'Concrete finish quality below specification',
                      status: 'Resolved',
                      date: '2025-03-15',
                      priority: 'High'
                    },
                    {
                      id: 2,
                      type: 'Schedule Delay',
                      description: 'Material delivery delay affecting timeline',
                      status: 'In Progress',
                      date: '2025-03-14',
                      priority: 'Medium'
                    }
                  ].map((issue) => (
                    <div key={issue.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{issue.type}</h4>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            issue.priority === 'High'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {issue.priority}
                          </span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            issue.status === 'Resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {issue.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{issue.description}</p>
                      <div className="mt-2 text-xs text-gray-400">
                        Reported on: {issue.date}
                      </div>
                    </div>
                  ))}
                </div>
              </DashboardCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}