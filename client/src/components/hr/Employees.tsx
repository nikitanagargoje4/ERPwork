import { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, Download, Edit, Trash2, X, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: 'Active' | 'Inactive' | 'On Leave' | 'Terminated';
  startDate: string;
  manager: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'Active',
    startDate: '2024-01-15',
    manager: 'Sarah Wilson'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'Active',
    startDate: '2023-08-01',
    manager: 'Michael Brown'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    department: 'Sales',
    position: 'Sales Representative',
    status: 'Active',
    startDate: '2024-03-10',
    manager: 'Jennifer Davis'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    department: 'Human Resources',
    position: 'HR Specialist',
    status: 'On Leave',
    startDate: '2023-11-20',
    manager: 'Robert Taylor'
  }
];

export function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    status: 'Active' as const,
    startDate: '',
    manager: ''
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    status: 'Active' as 'Active' | 'Inactive' | 'On Leave' | 'Terminated',
    startDate: '',
    manager: ''
  });

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('hr_employees');
    if (savedEmployees) {
      try {
        setEmployees(JSON.parse(savedEmployees));
      } catch (error) {
        console.error('Error loading employees:', error);
        setEmployees(initialEmployees);
      }
    } else {
      setEmployees(initialEmployees);
      localStorage.setItem('hr_employees', JSON.stringify(initialEmployees));
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
    'Legal',
    'Design',
    'Product Management'
  ];

  const managers = [
    'Sarah Wilson',
    'Michael Brown',
    'Jennifer Davis',
    'Robert Taylor',
    'Lisa Anderson',
    'David Miller',
    'Emily Johnson',
    'James Wilson'
  ];

  // Initialize edit form when editing employee changes
  useEffect(() => {
    if (editingEmployee) {
      setEditForm({
        name: editingEmployee.name,
        email: editingEmployee.email,
        department: editingEmployee.department,
        position: editingEmployee.position,
        status: editingEmployee.status,
        startDate: editingEmployee.startDate,
        manager: editingEmployee.manager
      });
    }
  }, [editingEmployee]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!employeeForm.name.trim()) newErrors.name = 'Employee name is required';
    if (!employeeForm.email.trim()) newErrors.email = 'Email is required';
    if (!employeeForm.department) newErrors.department = 'Department is required';
    if (!employeeForm.position.trim()) newErrors.position = 'Position is required';
    if (!employeeForm.startDate) newErrors.startDate = 'Start date is required';
    if (!employeeForm.manager) newErrors.manager = 'Manager is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (employeeForm.email && !emailRegex.test(employeeForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Check for duplicate email
    if (employeeForm.email && employees.some(emp => emp.email.toLowerCase() === employeeForm.email.toLowerCase())) {
      newErrors.email = 'An employee with this email already exists';
    }

    // Start date validation (cannot be in the future)
    if (employeeForm.startDate) {
      const startDate = new Date(employeeForm.startDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (startDate > today) {
        newErrors.startDate = 'Start date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Edit form validation
  const validateEditForm = () => {
    const newErrors: Record<string, string> = {};

    if (!editForm.name.trim()) newErrors.name = 'Employee name is required';
    if (!editForm.email.trim()) newErrors.email = 'Email is required';
    if (!editForm.department) newErrors.department = 'Department is required';
    if (!editForm.position.trim()) newErrors.position = 'Position is required';
    if (!editForm.startDate) newErrors.startDate = 'Start date is required';
    if (!editForm.manager) newErrors.manager = 'Manager is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (editForm.email && !emailRegex.test(editForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Check for duplicate email (excluding current employee)
    if (editForm.email && employees.some(emp => 
      emp.email.toLowerCase() === editForm.email.toLowerCase() && 
      emp.id !== editingEmployee?.id
    )) {
      newErrors.email = 'An employee with this email already exists';
    }

    // Start date validation (cannot be in the future)
    if (editForm.startDate) {
      const startDate = new Date(editForm.startDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // End of today
      
      if (startDate > today) {
        newErrors.startDate = 'Start date cannot be in the future';
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
      const newEmployee: Employee = {
        id: Math.max(...employees.map(emp => emp.id), 0) + 1,
        name: employeeForm.name.trim(),
        email: employeeForm.email.trim().toLowerCase(),
        department: employeeForm.department,
        position: employeeForm.position.trim(),
        status: employeeForm.status,
        startDate: employeeForm.startDate,
        manager: employeeForm.manager
      };

      const updatedEmployees = [...employees, newEmployee];
      setEmployees(updatedEmployees);
      localStorage.setItem('hr_employees', JSON.stringify(updatedEmployees));

      setSuccessMessage('Employee added successfully!');
      setEmployeeForm({
        name: '',
        email: '',
        department: '',
        position: '',
        status: 'Active',
        startDate: '',
        manager: ''
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

  // Edit form submission handler
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEditForm() || !editingEmployee) return;

    setIsLoading(true);

    try {
      const updatedEmployee: Employee = {
        ...editingEmployee,
        name: editForm.name.trim(),
        email: editForm.email.trim().toLowerCase(),
        department: editForm.department,
        position: editForm.position.trim(),
        status: editForm.status,
        startDate: editForm.startDate,
        manager: editForm.manager
      };

      const updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id ? updatedEmployee : emp
      );
      
      setEmployees(updatedEmployees);
      localStorage.setItem('hr_employees', JSON.stringify(updatedEmployees));

      setSuccessMessage('Employee updated successfully!');
      setShowEditEmployeeModal(false);
      setEditingEmployee(null);
      setErrors({});

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating employee:', error);
      setErrors({ submit: 'Failed to update employee. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete employee handler
  const handleDeleteEmployee = async () => {
    if (!deletingEmployee) return;

    setIsLoading(true);

    try {
      const updatedEmployees = employees.filter(emp => emp.id !== deletingEmployee.id);
      setEmployees(updatedEmployees);
      localStorage.setItem('hr_employees', JSON.stringify(updatedEmployees));

      setSuccessMessage(`Employee ${deletingEmployee.name} deleted successfully!`);
      setShowDeleteConfirmModal(false);
      setDeletingEmployee(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting employee:', error);
      setErrors({ submit: 'Failed to delete employee. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click
  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowEditEmployeeModal(true);
    setErrors({});
  };

  // Handle delete button click
  const handleDeleteClick = (employee: Employee) => {
    setDeletingEmployee(employee);
    setShowDeleteConfirmModal(true);
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

  // Handle edit form input changes
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
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

      {/* Header with actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search employees..."
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
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Terminated</option>
            </select>
            
            <button className="btn btn-outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
            
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddEmployeeModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <DashboardCard title="Employee Directory">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                        employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.manager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary-600 hover:text-primary-900 mr-3"
                      onClick={() => handleEditClick(employee)}
                      title="Edit employee"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClick(employee)}
                      title="Delete employee"
                    >
                      <Trash2 className="h-4 w-4" />
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Add New Employee</h3>
              <button
                onClick={() => {
                  setShowAddEmployeeModal(false);
                  setEmployeeForm({
                    name: '',
                    email: '',
                    department: '',
                    position: '',
                    status: 'Active',
                    startDate: '',
                    manager: ''
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={employeeForm.name}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={employeeForm.email}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={employeeForm.department}
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

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={employeeForm.position}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.position ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter position title"
                  />
                  {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={employeeForm.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={employeeForm.startDate}
                    onChange={handleInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.startDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
                  Manager <span className="text-red-500">*</span>
                </label>
                <select
                  id="manager"
                  name="manager"
                  value={employeeForm.manager}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                    errors.manager ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a manager</option>
                  {managers.map(manager => (
                    <option key={manager} value={manager}>{manager}</option>
                  ))}
                </select>
                {errors.manager && <p className="mt-1 text-sm text-red-600">{errors.manager}</p>}
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
                    setShowAddEmployeeModal(false);
                    setEmployeeForm({
                      name: '',
                      email: '',
                      department: '',
                      position: '',
                      status: 'Active',
                      startDate: '',
                      manager: ''
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
                      Saving...
                    </>
                  ) : (
                    'Save Employee'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditEmployeeModal && editingEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Edit Employee</h3>
              <button
                onClick={() => {
                  setShowEditEmployeeModal(false);
                  setEditingEmployee(null);
                  setErrors({});
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="editName" className="block text-sm font-medium text-gray-700">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="editName"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="editEmail"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="editDepartment" className="block text-sm font-medium text-gray-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="editDepartment"
                    name="department"
                    value={editForm.department}
                    onChange={handleEditInputChange}
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

                <div>
                  <label htmlFor="editPosition" className="block text-sm font-medium text-gray-700">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="editPosition"
                    name="position"
                    value={editForm.position}
                    onChange={handleEditInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.position ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter position title"
                  />
                  {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="editStatus" className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="editStatus"
                    name="status"
                    value={editForm.status}
                    onChange={handleEditInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="editStartDate" className="block text-sm font-medium text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="editStartDate"
                    name="startDate"
                    value={editForm.startDate}
                    onChange={handleEditInputChange}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                      errors.startDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="editManager" className="block text-sm font-medium text-gray-700">
                  Manager <span className="text-red-500">*</span>
                </label>
                <select
                  id="editManager"
                  name="manager"
                  value={editForm.manager}
                  onChange={handleEditInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
                    errors.manager ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a manager</option>
                  {managers.map(manager => (
                    <option key={manager} value={manager}>{manager}</option>
                  ))}
                </select>
                {errors.manager && <p className="mt-1 text-sm text-red-600">{errors.manager}</p>}
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
                    setShowEditEmployeeModal(false);
                    setEditingEmployee(null);
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
                      Updating...
                    </>
                  ) : (
                    'Update Employee'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && deletingEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-96 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Delete Employee</h3>
              </div>
              <button
                onClick={() => {
                  setShowDeleteConfirmModal(false);
                  setDeletingEmployee(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete <strong>{deletingEmployee.name}</strong>? 
                This action cannot be undone and will permanently remove the employee from the system.
              </p>
              
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">{deletingEmployee.name}</span>
                    <span className="text-gray-500">Department:</span>
                    <span className="font-medium">{deletingEmployee.department}</span>
                    <span className="text-gray-500">Position:</span>
                    <span className="font-medium">{deletingEmployee.position}</span>
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium">{deletingEmployee.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirmModal(false);
                  setDeletingEmployee(null);
                }}
                className="btn btn-outline"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteEmployee}
                className="btn btn-error"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Employee
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}