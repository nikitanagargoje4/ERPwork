import { useState } from 'react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { Camera, Upload, Clock, Users, Package, AlertTriangle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';

interface DPREntry {
  id: string;
  date: string;
  site: string;
  activity: string;
  progress: number;
  labor: {
    skilled: number;
    unskilled: number;
  };
  materials: {
    item: string;
    quantity: number;
    unit: string;
  }[];
  weather: string;
  challenges: string;
  status: 'Draft' | 'Submitted' | 'Approved';
}

export function DailyProgress() {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      console.log('Files uploaded:', acceptedFiles);
    }
  });

  const dprEntries: DPREntry[] = [
    {
      id: '1',
      date: '2025-03-20',
      site: 'Project Site A',
      activity: 'Foundation Work',
      progress: 75,
      labor: {
        skilled: 12,
        unskilled: 25
      },
      materials: [
        { item: 'Cement', quantity: 85, unit: 'Bags' },
        { item: 'Sand', quantity: 12, unit: 'Cu.M' }
      ],
      weather: 'Sunny',
      challenges: 'Minor equipment breakdown in the morning',
      status: 'Submitted'
    },
    {
      id: '2',
      date: '2025-03-19',
      site: 'Project Site B',
      activity: 'Column Casting',
      progress: 60,
      labor: {
        skilled: 8,
        unskilled: 15
      },
      materials: [
        { item: 'Steel', quantity: 2.5, unit: 'MT' },
        { item: 'Concrete', quantity: 45, unit: 'Cu.M' }
      ],
      weather: 'Cloudy',
      challenges: 'None',
      status: 'Approved'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Progress</p>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Labor Present</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Material Usage</p>
              <p className="text-2xl font-semibold text-gray-900">12 Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Issues Reported</p>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* DPR Form */}
      <DashboardCard title="Daily Progress Report">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Site</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Project Site A</option>
                <option>Project Site B</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activities</label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Activity description"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="number"
                  placeholder="Progress %"
                  className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Labor Count</label>
              <div className="mt-1 grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Skilled"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Unskilled"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weather Conditions</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Sunny</option>
                <option>Cloudy</option>
                <option>Rainy</option>
                <option>Windy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Material Usage</label>
            <div className="mt-1 space-y-2">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Material"
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <select className="w-24 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option>Units</option>
                  <option>Bags</option>
                  <option>Cu.M</option>
                  <option>MT</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Site Photos</label>
            <div className="mt-1 flex items-center space-x-4">
              <div
                {...getRootProps()}
                className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  Drag & drop photos here, or click to select
                </p>
              </div>
              <button
                onClick={() => setShowCamera(!showCamera)}
                className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200"
              >
                <Camera className="h-6 w-6" />
              </button>
            </div>
            {showCamera && (
              <div className="mt-4">
                <Webcam
                  audio={false}
                  className="w-full rounded-lg"
                  screenshotFormat="image/jpeg"
                />
                <button className="mt-2 btn btn-primary">
                  Capture Photo
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Challenges & Remarks</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Describe any challenges or important observations..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="btn btn-outline">Save as Draft</button>
            <button className="btn btn-primary">Submit Report</button>
          </div>
        </div>
      </DashboardCard>

      {/* Recent DPR Entries */}
      <DashboardCard title="Recent Reports">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Labor
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dprEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.site}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.activity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${entry.progress}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{entry.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {entry.labor.skilled + entry.labor.unskilled}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : entry.status === 'Submitted'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </div>
  );
}