import { useState } from 'react';
import { UserPlus, Search, Filter, Plus, Users, Building, Calendar, X } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
  experience: string;
  status: 'Active' | 'Not Active';
  applicants: number;
  postedDate: string;
}

const initialJobOpenings: JobOpening[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full Time',
    experience: '5+ years',
    status: 'Active',
    applicants: 45,
    postedDate: '2025-03-01'
  },
  {
    id: 2,
    title: 'Product Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full Time',
    experience: '3-5 years',
    status: 'Active',
    applicants: 28,
    postedDate: '2025-03-05'
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full Time',
    experience: '2-4 years',
    status: 'Active',
    applicants: 32,
    postedDate: '2025-03-08'
  }
];

const applications = [
  {
    id: 1,
    candidate: 'John Smith',
    position: 'Senior Software Engineer',
    status: 'Interview Scheduled',
    appliedDate: '2025-03-10',
    email: 'john.smith@example.com',
    experience: '6 years'
  },
  {
    id: 2,
    candidate: 'Sarah Johnson',
    position: 'Product Marketing Manager',
    status: 'Under Review',
    appliedDate: '2025-03-12',
    email: 'sarah.j@example.com',
    experience: '4 years'
  },
  {
    id: 3,
    candidate: 'David Brown',
    position: 'UX Designer',
    status: 'Phone Screening',
    appliedDate: '2025-03-15',
    email: 'david.brown@example.com',
    experience: '3 years'
  }
];

export function Recruitment() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showPostPositionModal, setShowPostPositionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [positionForm, setPositionForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full Time' as const,
    experience: '',
    status: 'Active' as const,
    applicants: 0,
    postedDate: new Date().toISOString().split('T')[0]
  });

  // Load job openings from localStorage on component mount
  useState(() => {
    const savedOpenings = localStorage.getItem('hr_job_openings');
    if (savedOpenings) {
      try {
        setJobOpenings(JSON.parse(savedOpenings));
      } catch (error) {
        console.error('Error loading job openings:', error);
        setJobOpenings(initialJobOpenings);
      }
    } else {
      setJobOpenings(initialJobOpenings);
      localStorage.setItem('hr_job_openings', JSON.stringify(initialJobOpenings));
    }
  });

  // Predefined options
  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
    'Legal',
    'Design',
    'Product Management'
  ];

  const employmentTypes = ['Full Time', 'Part Time', 'Contract', 'Internship'];
  const statusOptions = ['Active', 'Not Active'];

  const filteredOpenings = jobOpenings.filter(opening => {
    const matchesSearch = opening.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opening.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || opening.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!positionForm.title.trim()) newErrors.title = 'Position title is required';
    if (!positionForm.department) newErrors.department = 'Department is required';
    if (!positionForm.location.trim()) newErrors.location = 'Location is required';
    if (!positionForm.experience.trim()) newErrors.experience = 'Experience requirement is required';
    if (!positionForm.postedDate) newErrors.postedDate = 'Posted date is required';

    // Check for duplicate position title in same department
    if (positionForm.title && positionForm.department) {
      const duplicate = jobOpenings.some(opening => 
        opening.title.toLowerCase() === positionForm.title.toLowerCase() &&
        opening.department === positionForm.department &&
        opening.status === 'Active'
      );
      if (duplicate) {
        newErrors.title = 'An active position with this title already exists in this department';
      }
    }

    // Posted date validation (cannot be in the future)
    if (positionForm.postedDate) {
      const postedDate = new Date(positionForm.postedDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (postedDate > today) {
        newErrors.postedDate = 'Posted date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const newPosition: JobOpening = {
        id: Math.max(...jobOpenings.map(opening => opening.id), 0) + 1,
        title: positionForm.title.trim(),
        department: positionForm.department,
        location: positionForm.location.trim(),
        type: positionForm.type,
        experience: positionForm.experience.trim(),
        status: positionForm.status,
        applicants: positionForm.applicants,
        postedDate: positionForm.postedDate
      };

      const updatedOpenings = [...jobOpenings, newPosition];
      setJobOpenings(updatedOpenings);
      localStorage.setItem('hr_job_openings', JSON.stringify(updatedOpenings));

      setSuccessMessage('Job position posted successfully!');
      setPositionForm({
        title: '',
        department: '',
        location: '',
        type: 'Full Time',
        experience: '',
        status: 'Active',
        applicants: 0,
        postedDate: new Date().toISOString().split('T')[0]
      });
      setShowPostPositionModal(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving position:', error);
      setErrors({ submit: 'Failed to save position. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear field error when user starts typing
  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPositionForm(prev => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Positions</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applicants</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Interviews Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900">28</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Departments Hiring</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Openings */}
      <DashboardCard title="Active Job Openings">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>HR</option>
              <option>Finance</option>
            </select>
            
            <button 
              className="btn btn-primary"
              onClick={() => setShowPostPositionModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Position
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOpenings.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    <div className="text-sm text-gray-500">{job.experience} experience</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {job.applicants}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.postedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Applications */}
      <DashboardCard title="Recent Applications">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.candidate}</div>
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${application.status === 'Interview Scheduled' ? 'bg-green-100 text-green-800' :
                        application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.appliedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.experience}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Post New Position Modal */}
      {showPostPositionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Post New Position</h3>
              <button
                onClick={() => {
                  setShowPostPositionModal(false);
                  setPositionForm({
                    title: '',
                    department: '',
                    location: '',
                    type: 'Full Time',
                    experience: '',
                    status: 'Active',
                    applicants: 0,
                    postedDate: new Date().toISOString().split('T')[0]
                  });
                  setErrors({});
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Position Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={positionForm.title}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.title ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter position title"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={positionForm.department}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.department ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a department</option>
                    {departments.map(department => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={positionForm.location}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., San Francisco, CA or Remote"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={positionForm.type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    {employmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience Required <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={positionForm.experience}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.experience ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 3-5 years, Entry level, 5+ years"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={positionForm.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="applicants" className="block text-sm font-medium text-gray-700">
                    Initial Applicant Count
                  </label>
                  <input
                    type="number"
                    id="applicants"
                    name="applicants"
                    value={positionForm.applicants}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    min="0"
                    placeholder="0"
                  />
                  <p className="mt-1 text-sm text-gray-500">Usually starts at 0 for new positions</p>
                </div>

                <div>
                  <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700">
                    Posted Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="postedDate"
                    name="postedDate"
                    value={positionForm.postedDate}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.postedDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.postedDate && <p className="mt-1 text-sm text-red-600">{errors.postedDate}</p>}
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {errors.submit}
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowPostPositionModal(false);
                    setPositionForm({
                      title: '',
                      department: '',
                      location: '',
                      type: 'Full Time',
                      experience: '',
                      status: 'Active',
                      applicants: 0,
                      postedDate: new Date().toISOString().split('T')[0]
                    });
                    setErrors({});
                  }}
                  className="btn btn-outline"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Posting...
                    </>
                  ) : (
                    'Post Position'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}