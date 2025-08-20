import { useState, useEffect } from 'react';
import { DollarSign, Users, Clock, Calendar, Download, Filter, Plus, X, UserPlus, Mail, Briefcase } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface Employee {
  id: number;
  name: string;
  email?: string;
  position: string;
  department: string;
  salary: number;
  status: 'Full-time' | 'Part-time' | 'Contract';
  lastPayment: string;
}

const initialEmployees: Employee[] = [
  { 
    id: 1, 
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Senior Developer',
    department: 'Engineering',
    salary: 95000,
    status: 'Full-time',
    lastPayment: '2025-03-01'
  },
  { 
    id: 2, 
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    position: 'Marketing Manager',
    department: 'Marketing',
    salary: 85000,
    status: 'Full-time',
    lastPayment: '2025-03-01'
  },
  { 
    id: 3, 
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    position: 'Sales Representative',
    department: 'Sales',
    salary: 65000,
    status: 'Full-time',
    lastPayment: '2025-03-01'
  },
  { 
    id: 4, 
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    position: 'HR Specialist',
    department: 'Human Resources',
    salary: 70000,
    status: 'Part-time',
    lastPayment: '2025-03-01'
  },
  { 
    id: 5, 
    name: 'David Brown',
    email: 'david.brown@example.com',
    position: 'Financial Analyst',
    department: 'Finance',
    salary: 80000,
    status: 'Full-time',
    lastPayment: '2025-03-01'
  }
];

const payrollHistory = [
  {
    id: 1,
    period: 'March 2025',
    totalAmount: 395000,
    employeeCount: 5,
    status: 'Completed',
    date: '2025-03-01'
  },
  {
    id: 2,
    period: 'February 2025',
    totalAmount: 392000,
    employeeCount: 5,
    status: 'Completed',
    date: '2025-02-01'
  },
  {
    id: 3,
    period: 'January 2025',
    totalAmount: 390000,
    employeeCount: 5,
    status: 'Completed',
    date: '2025-01-01'
  }
];

export function Payroll() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    status: 'Full-time' as const,
    lastPayment: new Date().toISOString().split('T')[0]
  });

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('payroll_employees');
    if (savedEmployees) {
      try {
        setEmployees(JSON.parse(savedEmployees));
      } catch (error) {
        console.error('Error loading employees:', error);
        setEmployees(initialEmployees);
      }
    } else {
      setEmployees(initialEmployees);
      localStorage.setItem('payroll_employees', JSON.stringify(initialEmployees));
    }
  }, []);

  // Predefined options
  const departments = [
    'Engineering',
    'Marketing', 
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
    'Legal'
  ];

  const positions = [
    'Senior Developer',
    'Junior Developer',
    'Marketing Manager',
    'Sales Representative',
    'HR Specialist',
    'Financial Analyst',
    'Operations Manager',
    'Customer Support Specialist',
    'Legal Counsel',
    'Project Manager',
    'Designer',
    'QA Engineer'
  ];

  const filteredEmployees = employees.filter(employee => {
    if (selectedDepartment !== 'All' && employee.department !== selectedDepartment) return false;
    if (selectedStatus !== 'All' && employee.status !== selectedStatus) return false;
    return true;
  });

  const totalPayroll = filteredEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = totalPayroll / filteredEmployees.length;

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!employeeForm.name.trim()) newErrors.name = 'Full name is required';
    if (!employeeForm.email.trim()) newErrors.email = 'Email is required';
    if (!employeeForm.position.trim()) newErrors.position = 'Position is required';
    if (!employeeForm.department.trim()) newErrors.department = 'Department is required';
    if (!employeeForm.salary) newErrors.salary = 'Salary is required';
    if (!employeeForm.lastPayment) newErrors.lastPayment = 'Last payment date is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (employeeForm.email && !emailRegex.test(employeeForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Salary validation
    const salary = parseFloat(employeeForm.salary);
    if (employeeForm.salary && (isNaN(salary) || salary <= 0)) {
      newErrors.salary = 'Salary must be a positive number';
    }

    // Check for duplicate email
    if (employeeForm.email && employees.some(emp => emp.email?.toLowerCase() === employeeForm.email.toLowerCase())) {
      newErrors.email = 'An employee with this email already exists';
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
      const newEmployee: Employee = {
        id: Math.max(...employees.map(emp => emp.id), 0) + 1,
        name: employeeForm.name.trim(),
        email: employeeForm.email.trim(),
        position: employeeForm.position.trim(),
        department: employeeForm.department.trim(),
        salary: parseFloat(employeeForm.salary),
        status: employeeForm.status,
        lastPayment: employeeForm.lastPayment
      };

      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      localStorage.setItem('payroll_employees', JSON.stringify(updatedEmployees));

      setSuccessMessage('Employee added successfully!');
      setEmployeeForm({
        name: '',
        email: '',
        position: '',
        department: '',
        salary: '',
        status: 'Full-time',
        lastPayment: new Date().toISOString().split('T')[0]
      });
      setShowAddEmployeeModal(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving employee:', error);
      setErrors({ submit: 'Failed to save employee. Please try again.' });
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
    setEmployeeForm(prev => ({ ...prev, [name]: value }));
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
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payroll</p>
              <p className="text-2xl font-semibold text-gray-900">${totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredEmployees.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Salary</p>
              <p className="text-2xl font-semibold text-gray-900">${Math.round(averageSalary).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Next Payroll</p>
              <p className="text-2xl font-semibold text-gray-900">Mar 31</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option>All</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Human Resources</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option>All</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
            
            <button 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => setShowAddEmployeeModal(true)}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <DashboardCard title="Employee Payroll">
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
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${employee.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${employee.status === 'Full-time' ? 'bg-green-100 text-green-800' :
                        employee.status === 'Part-time' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.lastPayment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Payroll History */}
      <DashboardCard title="Payroll History">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollHistory.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ${record.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {record.employeeCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-3xl my-4 sm:my-8 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2">
                    <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Add New Employee</h3>
                    <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Add a new employee to the payroll system</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="text-white hover:text-gray-200 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-1.5 transition-all duration-200"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Personal Information Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={employeeForm.name}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter full name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        <Mail className="h-3 w-3 inline mr-1" />
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={employeeForm.email}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                </div>

                {/* Job Information Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-blue-600" />
                    Job Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="position" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={employeeForm.position}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.position ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a position</option>
                        {positions.map(position => (
                          <option key={position} value={position}>{position}</option>
                        ))}
                      </select>
                      {errors.position && <p className="mt-1 text-xs text-red-600">{errors.position}</p>}
                    </div>

                    <div>
                      <label htmlFor="department" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={employeeForm.department}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.department ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a department</option>
                        {departments.map(department => (
                          <option key={department} value={department}>{department}</option>
                        ))}
                      </select>
                      {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
                    </div>
                  </div>
                </div>

                {/* Compensation Details Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    Compensation Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label htmlFor="salary" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Annual Salary <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="salary"
                          name="salary"
                          value={employeeForm.salary}
                          onChange={handleInputChange}
                          className={`block w-full pl-8 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium ${
                            errors.salary ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="0"
                          min="0"
                          step="1000"
                        />
                      </div>
                      {errors.salary && <p className="mt-1 text-xs text-red-600">{errors.salary}</p>}
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Employment Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={employeeForm.status}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4">
                    <label htmlFor="lastPayment" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      Last Payment Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="lastPayment"
                      name="lastPayment"
                      value={employeeForm.lastPayment}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                        errors.lastPayment ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.lastPayment && <p className="mt-1 text-xs text-red-600">{errors.lastPayment}</p>}
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md">
                    <span className="text-sm font-medium">{errors.submit}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddEmployeeModal(false);
                      setEmployeeForm({
                        name: '',
                        email: '',
                        position: '',
                        department: '',
                        salary: '',
                        status: 'Full-time',
                        lastPayment: new Date().toISOString().split('T')[0]
                      });
                      setErrors({});
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium text-sm"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2 inline-block" />
                        Save Employee
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}