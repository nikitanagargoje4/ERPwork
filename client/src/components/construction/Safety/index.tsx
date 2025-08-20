import { useState } from 'react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { AlertTriangle, Shield, Users, CheckSquare, Camera, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface SafetyIncident {
  id: string;
  date: string;
  type: 'Near Miss' | 'Minor' | 'Major' | 'Critical';
  location: string;
  description: string;
  reportedBy: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  actions: string;
}

interface SafetyObservation {
  id: string;
  date: string;
  category: string;
  location: string;
  description: string;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Closed';
}

export function Safety() {
  const [activeTab, setActiveTab] = useState('incidents');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      console.log('Files uploaded:', acceptedFiles);
    }
  });

  const incidents: SafetyIncident[] = [
    {
      id: '1',
      date: '2025-03-20',
      type: 'Near Miss',
      location: 'Block A - 3rd Floor',
      description: 'Worker nearly slipped due to water spillage',
      reportedBy: 'John Smith',
      status: 'Resolved',
      actions: 'Area cleaned and warning signs placed'
    },
    {
      id: '2',
      date: '2025-03-19',
      type: 'Minor',
      location: 'Material Storage Area',
      description: 'Minor cut while handling materials',
      reportedBy: 'Sarah Johnson',
      status: 'In Progress',
      actions: 'First aid provided, reviewing material handling procedures'
    }
  ];

  const observations: SafetyObservation[] = [
    {
      id: '1',
      date: '2025-03-20',
      category: 'PPE Compliance',
      location: 'Site Wide',
      description: 'Workers not wearing safety helmets in designated areas',
      risk: 'High',
      status: 'Open'
    },
    {
      id: '2',
      date: '2025-03-19',
      category: 'Housekeeping',
      location: 'Block B Ground Floor',
      description: 'Construction debris blocking emergency exit',
      risk: 'Medium',
      status: 'Closed'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Safety Score</p>
              <p className="text-2xl font-semibold text-gray-900">92%</p>
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
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-success-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Workers Trained</p>
              <p className="text-2xl font-semibold text-gray-900">145</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Inspections</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {['incidents', 'observations', 'inspections'].map((tab) => (
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
          {activeTab === 'incidents' && (
            <div className="space-y-6">
              {/* Incident Report Form */}
              <DashboardCard title="Report Safety Incident">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Incident Type</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>Near Miss</option>
                        <option>Minor</option>
                        <option>Major</option>
                        <option>Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Specify incident location"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe what happened..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photos</label>
                    <div
                      {...getRootProps()}
                      className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drag & drop photos here, or click to select
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Immediate Actions Taken</label>
                    <textarea
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe immediate actions taken..."
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button className="btn btn-outline">Save as Draft</button>
                    <button className="btn btn-primary">Submit Report</button>
                  </div>
                </div>
              </DashboardCard>

              {/* Recent Incidents */}
              <DashboardCard title="Recent Incidents">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {incidents.map((incident) => (
                        <tr key={incident.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {incident.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              incident.type === 'Critical'
                                ? 'bg-red-100 text-red-800'
                                : incident.type === 'Major'
                                ? 'bg-orange-100 text-orange-800'
                                : incident.type === 'Minor'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {incident.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {incident.location}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {incident.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              incident.status === 'Resolved'
                                ? 'bg-green-100 text-green-800'
                                : incident.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {incident.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DashboardCard>
            </div>
          )}

          {activeTab === 'observations' && (
            <div className="space-y-6">
              {/* Safety Observation Form */}
              <DashboardCard title="Record Safety Observation">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>PPE Compliance</option>
                        <option>Housekeeping</option>
                        <option>Work at Height</option>
                        <option>Fire Safety</option>
                        <option>Equipment Safety</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Risk Level</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Specify observation location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Describe the safety observation..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photos</label>
                    <div
                      {...getRootProps()}
                      className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drag & drop photos here, or click to select
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button className="btn btn-outline">Save as Draft</button>
                    <button className="btn btn-primary">Submit Observation</button>
                  </div>
                </div>
              </DashboardCard>

              {/* Recent Observations */}
              <DashboardCard title="Recent Observations">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Risk
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {observations.map((observation) => (
                        <tr key={observation.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {observation.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {observation.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {observation.location}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {observation.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              observation.risk === 'High'
                                ? 'bg-red-100 text-red-800'
                                : observation.risk === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {observation.risk}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              observation.status === 'Closed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {observation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DashboardCard>
            </div>
          )}

          {activeTab === 'inspections' && (
            <div className="space-y-6">
              {/* Safety Inspection Form */}
              <DashboardCard title="Safety Inspection">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Inspection Area</label>
                      <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>Site Access</option>
                        <option>Working Area</option>
                        
                        <option>Material Storage</option>
                        <option>Equipment Zone</option>
                        <option>Welfare Facilities</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Inspector</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Inspector name"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Inspection Checklist</h4>
                    
                    {[
                      'PPE compliance in all areas',
                      'Fire extinguishers in place and accessible',
                      'Emergency exits clear and marked',
                      'First aid facilities available',
                      'Proper lighting in work areas'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <select className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                          <option>Pass</option>
                          <option>Fail</option>
                          <option>N/A</option>
                        </select>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Observations</label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="Note any observations or concerns..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Photos</label>
                    <div
                      {...getRootProps()}
                      className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
                    >
                      <input {...getInputProps()} />
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drag & drop inspection photos here, or click to select
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button className="btn btn-outline">Save as Draft</button>
                    <button className="btn btn-primary">Submit Inspection</button>
                  </div>
                </div>
              </DashboardCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}