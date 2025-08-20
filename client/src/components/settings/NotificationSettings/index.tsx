import { useState } from 'react';
import { Bell, Mail, MessageSquare, Calendar } from 'lucide-react';

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    security: true,
    updates: true,
    marketing: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    messages: true,
    reminders: true,
    updates: false,
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Email Notifications */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Security Alerts</p>
                <p className="text-sm text-gray-500">
                  Get notified about security-related events
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  emailNotifications.security ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                onClick={() => setEmailNotifications(prev => ({
                  ...prev,
                  security: !prev.security
                }))}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailNotifications.security ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Product Updates</p>
                <p className="text-sm text-gray-500">
                  Receive updates about new features and improvements
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  emailNotifications.updates ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                onClick={() => setEmailNotifications(prev => ({
                  ...prev,
                  updates: !prev.updates
                }))}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailNotifications.updates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Marketing</p>
                <p className="text-sm text-gray-500">
                  Receive marketing and promotional emails
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  emailNotifications.marketing ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                onClick={() => setEmailNotifications(prev => ({
                  ...prev,
                  marketing: !prev.marketing
                }))}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    emailNotifications.marketing ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Messages</p>
                <p className="text-sm text-gray-500">
                  Get notified when you receive new messages
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  pushNotifications.messages ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                onClick={() => setPushNotifications(prev => ({
                  ...prev,
                  messages: !prev.messages
                }))}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    pushNotifications.messages ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Reminders</p>
                <p className="text-sm text-gray-500">
                  Get notified about upcoming events and deadlines
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  pushNotifications.reminders ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                onClick={() => setPushNotifications(prev => ({
                  ...prev,
                  reminders: !prev.reminders
                }))}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    pushNotifications.reminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">System Updates</p>
                <p className="text-sm text-gray-500">
                  Get notified about system updates and maintenance
                </p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  pushNotifications.updates ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                onClick={() => setPushNotifications(prev => ({
                  ...prev,
                  updates: !prev.updates
                }))}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    pushNotifications.updates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Notification Schedule</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="quietHoursStart" className="block text-sm font-medium text-gray-700">
                Quiet Hours Start
              </label>
              <input
                type="time"
                id="quietHoursStart"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                defaultValue="22:00"
              />
            </div>
            <div>
              <label htmlFor="quietHoursEnd" className="block text-sm font-medium text-gray-700">
                Quiet Hours End
              </label>
              <input
                type="time"
                id="quietHoursEnd"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                defaultValue="07:00"
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-900">
                  Enable Do Not Disturb during quiet hours
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <button className="btn btn-outline">Reset to Default</button>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
}