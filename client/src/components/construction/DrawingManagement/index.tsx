import { useState } from 'react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { FileText, Upload, Download, History, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface Drawing {
  id: string;
  number: string;
  title: string;
  revision: string;
  category: string;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  uploadedBy: string;
  uploadDate: string;
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
}

interface DrawingRevision {
  id: string;
  version: string;
  date: string;
  status: string;
  changes: string;
}

export function DrawingManagement() {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedDrawing, setSelectedDrawing] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.dwg', '.dxf', '.png', '.jpg']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      console.log('Files uploaded:', acceptedFiles);
    }
  });

  const drawings: Drawing[] = [
    {
      id: '1',
      number: 'ARCH-001',
      title: 'Ground Floor Plan',
      revision: 'R2',
      category: 'Architectural',
      status: 'Approved',
      uploadedBy: 'John Smith',
      uploadDate: '2025-03-15',
      reviewedBy: 'Sarah Johnson',
      reviewDate: '2025-03-16',
      comments: 'Approved with minor comments'
    },
    {
      id: '2',
      number: 'STR-001',
      title: 'Foundation Layout',
      revision: 'R1',
      category: 'Structural',
      status: 'Pending Review',
      uploadedBy: 'Mike Wilson',
      uploadDate: '2025-03-18'
    }
  ];

  const revisions: DrawingRevision[] = [
    {
      id: '1',
      version: 'R0',
      date: '2025-02-01',
      status: 'Superseded',
      changes: 'Initial Issue'
    },
    {
      id: '2',
      version: 'R1',
      date: '2025-02-15',
      status: 'Superseded',
      changes: 'Updated as per client comments'
    },
    {
      id: '3',
      version: 'R2',
      date: '2025-03-01',
      status: 'Current',
      changes: 'Modified column locations'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Drawings</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Review</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-semibold text-gray-900">142</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-error-100 rounded-full flex items-center justify-center">
              <XCircle className="h-6 w-6 text-error-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-semibold text-gray-900">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Drawing Upload */}
      <DashboardCard title="Upload Drawings">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Drawing Number</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g., ARCH-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Drawing title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Architectural</option>
                <option>Structural</option>
                <option>MEP</option>
                <option>Interior</option>
                <option>Site Plan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Drawing Files</label>
            <div
              {...getRootProps()}
              className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">
                Drag & drop drawing files here, or click to select
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: PDF, DWG, DXF, PNG, JPG
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Revision Notes</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Describe the changes in this revision..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Upload Drawing</button>
          </div>
        </div>
      </DashboardCard>

      {/* Drawing List */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {['current', 'history', 'review'].map((tab) => (
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
          {activeTab === 'current' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Drawing
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revision
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Info
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {drawings.map((drawing) => (
                    <tr key={drawing.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{drawing.number}</div>
                        <div className="text-sm text-gray-500">{drawing.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {drawing.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {drawing.revision}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          drawing.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : drawing.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {drawing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          <div>By: {drawing.uploadedBy}</div>
                          <div>Date: {drawing.uploadDate}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-4">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-primary-600 hover:text-primary-900 mr-4">
                          <Download className="h-5 w-5" />
                        </button>
                        <button className="text-primary-600 hover:text-primary-900">
                          <History className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Drawing Number</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    value={selectedDrawing || ''}
                    onChange={(e) => setSelectedDrawing(e.target.value)}
                  >
                    <option value="">Select Drawing</option>
                    {drawings.map(drawing => (
                      <option key={drawing.id} value={drawing.id}>
                        {drawing.number} - {drawing.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedDrawing && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Version
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Changes
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {revisions.map((revision) => (
                        <tr key={revision.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {revision.version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {revision.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              revision.status === 'Current'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {revision.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {revision.changes}
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
              )}
            </div>
          )}

          {activeTab === 'review' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Drawing
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted By
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submission Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {drawings
                      .filter(drawing => drawing.status === 'Pending Review')
                      .map((drawing) => (
                        <tr key={drawing.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{drawing.number}</div>
                            <div className="text-sm text-gray-500">{drawing.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {drawing.uploadedBy}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {drawing.uploadDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-4">
                              <Eye className="h-5 w-5" />
                            </button>
                            <button className="text-success-600 hover:text-success-900 mr-4">
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button className="text-error-600 hover:text-error-900">
                              <XCircle className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}