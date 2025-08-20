import { useState } from 'react';
import { BookOpen, Users, Calendar, Award, Plus, Search, X, GraduationCap, Clock, User } from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';

interface TrainingProgram {
  id: number;
  name: string;
  type: string;
  instructor: string;
  startDate: string;
  duration: string;
  participants: number;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
}

const initialTrainingPrograms: TrainingProgram[] = [
  {
    id: 1,
    name: 'Leadership Development',
    type: 'Professional Development',
    instructor: 'Dr. Sarah Wilson',
    startDate: '2025-04-01',
    duration: '12 weeks',
    participants: 15,
    status: 'Upcoming'
  },
  {
    id: 2,
    name: 'Technical Skills Workshop',
    type: 'Technical',
    instructor: 'John Anderson',
    startDate: '2025-03-15',
    duration: '8 weeks',
    participants: 25,
    status: 'In Progress'
  },
  // More programs can be added here
];

const completedTrainings = [
  {
    id: 1,
    employee: 'Michael Brown',
    program: 'Project Management Fundamentals',
    completionDate: '2025-03-01',
    score: 95,
    certificate: true
  },
  {
    id: 2,
    employee: 'Emily Davis',
    program: 'Communication Skills',
    completionDate: '2025-02-28',
    score: 88,
    certificate: true
  },
  // More completed trainings can be added here
];

export function Training() {
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgram[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [showCreateProgramModal, setShowCreateProgramModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [programForm, setProgramForm] = useState({
    name: '',
    type: '',
    instructor: '',
    startDate: '',
    duration: '',
    participants: '',
    status: 'Upcoming' as const
  });

  // Load training programs from localStorage on component mount
  useState(() => {
    const savedPrograms = localStorage.getItem('hr_training_programs');
    if (savedPrograms) {
      try {
        setTrainingPrograms(JSON.parse(savedPrograms));
      } catch (error) {
        console.error('Error loading training programs:', error);
        setTrainingPrograms(initialTrainingPrograms);
      }
    } else {
      setTrainingPrograms(initialTrainingPrograms);
      localStorage.setItem('hr_training_programs', JSON.stringify(initialTrainingPrograms));
    }
  });

  // Predefined options
  const programTypes = [
    'Technical',
    'Professional Development',
    'Soft Skills',
    'Compliance',
    'Leadership',
    'Safety',
    'Customer Service',
    'Sales Training'
  ];

  const instructors = [
    'Dr. Sarah Wilson',
    'John Anderson',
    'Emily Johnson',
    'Michael Brown',
    'Lisa Davis',
    'Robert Taylor',
    'Jennifer Wilson',
    'David Miller'
  ];

  const statusOptions = ['Upcoming', 'In Progress', 'Completed', 'Cancelled'];

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || program.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!programForm.name.trim()) newErrors.name = 'Program name is required';
    if (!programForm.type) newErrors.type = 'Program type is required';
    if (!programForm.instructor.trim()) newErrors.instructor = 'Instructor is required';
    if (!programForm.startDate) newErrors.startDate = 'Start date is required';
    if (!programForm.duration.trim()) newErrors.duration = 'Duration is required';
    if (!programForm.participants) newErrors.participants = 'Number of participants is required';

    // Check for duplicate program name
    if (programForm.name && trainingPrograms.some(program => 
      program.name.toLowerCase() === programForm.name.toLowerCase()
    )) {
      newErrors.name = 'A training program with this name already exists';
    }

    // Start date validation (cannot be in the past for upcoming programs)
    if (programForm.startDate && programForm.status === 'Upcoming') {
      const startDate = new Date(programForm.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      
      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past for upcoming programs';
      }
    }

    // Participants validation
    const participantCount = parseInt(programForm.participants);
    if (programForm.participants && (isNaN(participantCount) || participantCount <= 0)) {
      newErrors.participants = 'Number of participants must be a positive number';
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
      const newProgram: TrainingProgram = {
        id: Math.max(...trainingPrograms.map(program => program.id), 0) + 1,
        name: programForm.name.trim(),
        type: programForm.type,
        instructor: programForm.instructor.trim(),
        startDate: programForm.startDate,
        duration: programForm.duration.trim(),
        participants: parseInt(programForm.participants),
        status: programForm.status
      };

      const updatedPrograms = [...trainingPrograms, newProgram];
      setTrainingPrograms(updatedPrograms);
      localStorage.setItem('hr_training_programs', JSON.stringify(updatedPrograms));

      setSuccessMessage('Training program created successfully!');
      setProgramForm({
        name: '',
        type: '',
        instructor: '',
        startDate: '',
        duration: '',
        participants: '',
        status: 'Upcoming'
      });
      setShowCreateProgramModal(false);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving training program:', error);
      setErrors({ submit: 'Failed to save training program. Please try again.' });
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
    setProgramForm(prev => ({ ...prev, [name]: value }));
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
              <BookOpen className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Programs</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Participants</p>
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
              <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Certifications</p>
              <p className="text-2xl font-semibold text-gray-900">45</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Programs */}
      <DashboardCard title="Training Programs">
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option>All Types</option>
              <option>Technical</option>
              <option>Professional Development</option>
              <option>Soft Skills</option>
              <option>Compliance</option>
            </select>
            
            <button 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm flex items-center"
              onClick={() => setShowCreateProgramModal(true)}
              data-testid="button-create-program"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPrograms.map((program) => (
                <tr key={program.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{program.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.startDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {program.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {program.participants}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${program.status === 'In Progress' ? 'bg-green-100 text-green-800' :
                        program.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {program.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Completed Trainings */}
      <DashboardCard title="Recently Completed Trainings">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Date
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certificate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedTrainings.map((training) => (
                <tr key={training.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {training.employee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {training.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {training.completionDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${training.score >= 90 ? 'bg-green-100 text-green-800' :
                        training.score >= 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}>
                      {training.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {training.certificate ? (
                      <Award className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Create Training Program Modal */}
      {showCreateProgramModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-start justify-center p-2 sm:p-4">
          <div className="relative mx-auto w-full max-w-2xl my-4 sm:my-8 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2">
                    <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Create Training Program</h3>
                    <p className="text-blue-100 text-xs sm:text-sm hidden sm:block">Design and launch a new learning program</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowCreateProgramModal(false);
                    setProgramForm({
                      name: '',
                      type: '',
                      instructor: '',
                      startDate: '',
                      duration: '',
                      participants: '',
                      status: 'Upcoming'
                    });
                    setErrors({});
                  }}
                  className="text-white hover:text-gray-200 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-1.5 transition-all duration-200"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            {/* Form content */}
            <div className="px-4 sm:px-6 py-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Program Basic Info Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                    Program Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Program Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={programForm.name}
                        onChange={(e) => {
                          handleInputChange(e);
                          clearFieldError('name');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium ${
                          errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter program name"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Program Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="type"
                        value={programForm.type}
                        onChange={(e) => {
                          handleInputChange(e);
                          clearFieldError('type');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.type ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select a program type</option>
                        {programTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
                    </div>
                  </div>
                </div>

                {/* Instructor and Scheduling Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    Instructor & Schedule
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Instructor <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="instructor"
                        value={programForm.instructor}
                        onChange={(e) => {
                          handleInputChange(e);
                          clearFieldError('instructor');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.instructor ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select an instructor</option>
                        {instructors.map(instructor => (
                          <option key={instructor} value={instructor}>{instructor}</option>
                        ))}
                      </select>
                      {errors.instructor && <p className="mt-1 text-xs text-red-600">{errors.instructor}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={programForm.startDate}
                        onChange={(e) => {
                          handleInputChange(e);
                          clearFieldError('startDate');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.startDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
                    </div>
                  </div>
                </div>

                {/* Program Details Section */}
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-600" />
                    Program Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white rounded-md p-3 border border-gray-300">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Duration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="duration"
                        value={programForm.duration}
                        onChange={(e) => {
                          handleInputChange(e);
                          clearFieldError('duration');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm ${
                          errors.duration ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., 8 weeks, 3 months"
                      />
                      {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Participants <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="participants"
                        value={programForm.participants}
                        onChange={(e) => {
                          handleInputChange(e);
                          clearFieldError('participants');
                        }}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm ${
                          errors.participants ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Number of participants"
                        min="1"
                      />
                      {errors.participants && <p className="mt-1 text-xs text-red-600">{errors.participants}</p>}
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={programForm.status}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-sm"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
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
                      setShowCreateProgramModal(false);
                      setProgramForm({
                        name: '',
                        type: '',
                        instructor: '',
                        startDate: '',
                        duration: '',
                        participants: '',
                        status: 'Upcoming'
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
                        <GraduationCap className="h-4 w-4 mr-2 inline-block" />
                        Create Program
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