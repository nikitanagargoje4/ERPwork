import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, User, Building, Calendar, Save, X } from 'lucide-react';
import { useAuthStore } from '../../../stores/authStore';

export function ProfileSettings() {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Initialize profile data from current user or default values
  const [profileData, setProfileData] = useState({
    firstName: user?.name.split(' ')[0] || 'Admin',
    lastName: user?.name.split(' ')[1] || 'User',
    email: user?.email || 'admin@example.com',
    phone: '+1 (555) 123-4567',
    title: 'System Administrator',
    department: 'Information Technology',
    location: 'New York, NY',
    bio: 'Experienced system administrator with expertise in ERP systems and team leadership.',
    role: user?.role || 'Administrator'
  });

  // Store original data for cancel functionality
  const [originalData, setOriginalData] = useState(profileData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!profileData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!profileData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!profileData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update user in auth store and localStorage
      const updatedUser = {
        ...user!,
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email
      };

      // Save to localStorage (simulating JSON file storage)
      const profileStorageKey = 'erp_user_profile';
      localStorage.setItem(profileStorageKey, JSON.stringify(profileData));
      localStorage.setItem('erp_user', JSON.stringify(updatedUser));

      // Update original data to reflect saved state
      setOriginalData(profileData);
      
      // Update auth store if needed
      if (updateUser) {
        updateUser(updatedUser);
      }

      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel changes
  const handleCancel = () => {
    setProfileData(originalData);
    setErrors({});
    setSuccessMessage('');
  };

  // Check if form has changes
  const hasChanges = JSON.stringify(profileData) !== JSON.stringify(originalData);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          <span className="block sm:inline font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-2 sm:p-3">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Profile Settings</h1>
              <p className="text-indigo-100 text-sm sm:text-base">Manage your personal and professional information</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Camera className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-600" />
            Profile Photo
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              </div>
              <button 
                type="button"
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-md border-2 border-gray-100 hover:bg-gray-50 transition-all duration-200"
                data-testid="button-change-photo"
              >
                <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-900">Update Profile Picture</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Upload a professional photo for your profile
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button 
                  type="button"
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-all duration-200"
                  data-testid="button-upload-photo"
                >
                  Upload New
                </button>
                <button 
                  type="button"
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200"
                  data-testid="button-remove-photo"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm font-medium ${
                  errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter first name"
                data-testid="input-firstName"
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
            </div>

            <div className="bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm font-medium ${
                  errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter last name"
                data-testid="input-lastName"
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
            </div>

            <div className="bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm ${
                    errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                  data-testid="input-email"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div className="bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  placeholder="Enter phone number"
                  data-testid="input-phone"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
            Professional Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={profileData.title}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm ${
                  errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter job title"
                data-testid="input-title"
              />
              {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            </div>

            <div className="bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Department <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="department"
                value={profileData.department}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm ${
                  errors.department ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter department"
                data-testid="input-department"
              />
              {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
            </div>

            <div className="sm:col-span-2 bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                  placeholder="Enter location"
                  data-testid="input-location"
                />
              </div>
            </div>

            <div className="sm:col-span-2 bg-white rounded-md p-3 border border-gray-300">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Professional Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm resize-none"
                placeholder="Brief description of your professional background..."
                data-testid="textarea-bio"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide a brief overview of your experience and expertise
              </p>
            </div>
          </div>
        </div>

        {/* Error message */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <span className="text-sm font-medium">{errors.submit}</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium text-sm"
            disabled={isLoading}
            data-testid="button-cancel"
          >
            <X className="h-4 w-4 mr-2 inline-block" />
            Cancel Changes
          </button>
          <button
            type="submit"
            className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-md hover:from-indigo-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm ${
              !hasChanges ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading || !hasChanges}
            data-testid="button-save"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2 inline-block" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}