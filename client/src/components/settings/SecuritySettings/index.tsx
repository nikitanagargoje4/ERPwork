import { useState } from 'react';
import { Key, Smartphone, Shield, AlertTriangle } from 'lucide-react';

export function SecuritySettings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Password Settings */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Password</h3>
            <Key className="h-5 w-5 text-gray-400" />
          </div>
          
          {!showChangePassword ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Last changed 3 months ago
                </p>
              </div>
              <button
                className="btn btn-outline"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
            <Smartphone className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center">
              <button
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={twoFactorEnabled}
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Login History */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Login History</h3>
            <Shield className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {[
              { device: 'Chrome on Windows', location: 'New York, USA', time: '2 hours ago', current: true },
              { device: 'Safari on iPhone', location: 'Boston, USA', time: '1 day ago' },
              { device: 'Firefox on MacOS', location: 'San Francisco, USA', time: '3 days ago' },
            ].map((session, index) => (
              <div key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="mr-4">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {session.device}
                      {session.current && (
                        <span className="ml-2 text-xs font-medium text-primary-600">
                          (Current Session)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.location} • {session.time}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button className="text-sm text-error-600 hover:text-error-700">
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Alerts */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-900">
                Email me about suspicious login attempts
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-900">
                Email me about new device logins
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                defaultChecked
              />
              <span className="ml-2 text-sm text-gray-900">
                Email me about password changes
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}