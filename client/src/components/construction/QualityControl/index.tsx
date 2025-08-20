import { useState } from 'react';
import { DashboardCard } from '../../dashboard/DashboardCard';
import { CheckSquare, AlertTriangle, FileText, Camera, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';

interface QCTest {
  id: string;
  date: string;
  type: string;
  location: string;
  contractor: string;
  parameters: {
    name: string;
    required: string;
    actual: string;
    status: 'Pass' | 'Fail';
  }[];
  status: 'Pending' | 'Approved' | 'Rejected';
  remarks: string;
}

export function QualityControl() {
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureRef, setSignatureRef] = useState<SignatureCanvas | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      console.log('Files uploaded:', acceptedFiles);
    }
  });

  const tests: QCTest[] = [
    {
      id: '1',
      date: '2025-03-20',
      type: 'Concrete Cube Test',
      location: 'Block A - Foundation',
      contractor: 'ABC Contractors',
      parameters: [
        { name: 'Compressive Strength', required: '25 N/mm²', actual: '27.5 N/mm²', status: 'Pass' },
        { name: 'Slump', required: '100mm', actual: '95mm', status: 'Pass' }
      ],
      status: 'Approved',
      remarks: 'All parameters within acceptable limits'
    },
    {
      id: '2',
      date: '2025-03-19',
      type: 'Steel Tensile Test',
      location: 'Block B - Columns',
      contractor: 'XYZ Steel',
      parameters: [
        { name: 'Yield Strength', required: '415 MPa', actual: '425 MPa', status: 'Pass' },
        { name: 'Ultimate Strength', required: '485 MPa', actual: '460 MPa', status: 'Fail' }
      ],
      status: 'Rejected',
      remarks: 'Ultimate strength below specification'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tests Completed</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Tests</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-success-100 rounded-full flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pass Rate</p>
              <p className="text-2xl font-semibold text-gray-900">92%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-error-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-error-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Failed Tests</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* QC Test Form */}
      <DashboardCard title="Quality Control Test">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Test Type</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                <option>Concrete Cube Test</option>
                <option>Steel Tensile Test</option>
                <option>Soil Compaction Test</option>
                <option>Brick Strength Test</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="e.g., Block A - Foundation"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contractor</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Contractor name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Test Parameters</label>
            <div className="mt-1 space-y-2">
              <div className="grid grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Parameter"
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Required Value"
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <input
                  type="text"
                  placeholder="Actual Value"
                  className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                <select className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                  <option>Pass</option>
                  <option>Fail</option>
                </select>
              </div>
            </div>
            <button className="mt-2 text-sm text-primary-600 hover:text-primary-700">
              + Add Parameter
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Test Reports & Photos</label>
            <div
              {...getRootProps()}
              className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer"
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">
                Drag & drop test reports or photos here, or click to select
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Add any observations or remarks..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Engineer's Signature</label>
            {showSignaturePad ? (
              <div className="mt-1">
                <SignatureCanvas
                  ref={(ref) => setSignatureRef(ref)}
                  canvasProps={{
                    className: 'border border-gray-300 rounded-md w-full h-40'
                  }}
                />
                <div className="mt-2 flex space-x-4">
                  <button
                    className="text-sm text-gray-600 hover:text-gray-700"
                    onClick={() => signatureRef?.clear()}
                  >
                    Clear
                  </button>
                  <button
                    className="text-sm text-primary-600 hover:text-primary-700"
                    onClick={() => setShowSignaturePad(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="mt-1 btn btn-outline"
                onClick={() => setShowSignaturePad(true)}
              >
                Add Signature
              </button>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button className="btn btn-outline">Save as Draft</button>
            <button className="btn btn-primary">Submit Test Report</button>
          </div>
        </div>
      </DashboardCard>

      {/* Recent Tests */}
      <DashboardCard title="Recent Tests">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contractor
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parameters
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {test.contractor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {test.parameters.map((param, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${
                            param.status === 'Pass' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className="text-sm text-gray-500">
                            {param.name}: {param.actual}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      test.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : test.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.status}
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