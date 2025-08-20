import { useState } from 'react';
import { Camera, Mail, Phone, MapPin } from 'lucide-react';

export function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Manager',
    department: 'Operations',
    location: 'New York, NY',
    bio: 'Experienced manager with a focus on operational efficiency and team leadership.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Profile Photo */}
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-2xl font-medium">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </span>
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-sm border border-gray-300 hover:bg-gray-50">
                  <Camera className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="ml-6">
              <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload a new profile photo or remove the current one
              </p>
              <div className="mt-4 flex space-x-3">
                <button className="btn btn-outline">Upload</button>
                <button className="btn btn-outline text-error-600 hover:text-error-700">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={profileData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                id="department"
                value={profileData.department}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={4}
                value={profileData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
              <p className="mt-2 text-sm text-gray-500">
                Brief description for your profile.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <button className="btn btn-outline">Cancel</button>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
}