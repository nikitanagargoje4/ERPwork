import { useState } from 'react';
import { Globe, Palette, HelpCircle } from 'lucide-react';

export function GeneralSettings() {
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  const [theme, setTheme] = useState('light');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Language and Region */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Language and Region</h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                Timezone
              </label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="CST">Central Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                Date Format
              </label>
              <select
                id="dateFormat"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
            <Palette className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Enable animations</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">Compact mode</span>
              </label>
            </div>
          </div>
        </div>

        {/* Help and Support */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Help and Support</h3>
            <HelpCircle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              <div className="text-sm font-medium text-gray-900">Documentation</div>
              <div className="text-sm text-gray-500">View user guides and documentation</div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              <div className="text-sm font-medium text-gray-900">Support Center</div>
              <div className="text-sm text-gray-500">Get help from our support team</div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50">
              <div className="text-sm font-medium text-gray-900">Feedback</div>
              <div className="text-sm text-gray-500">Share your feedback and suggestions</div>
            </button>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
}