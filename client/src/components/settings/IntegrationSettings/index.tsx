import { useState } from 'react';
import { Database, Link, Check, X } from 'lucide-react';

const integrations = [
  {
    id: 1,
    name: 'Google Calendar',
    description: 'Sync your calendar events',
    icon: 'https://www.google.com/calendar/images/favicon_v2014_1.ico',
    status: 'connected',
    lastSync: '2 hours ago'
  },
  {
    id: 2,
    name: 'Slack',
    description: 'Get notifications in your Slack channels',
    icon: 'https://a.slack-edge.com/80588/marketing/img/meta/favicon-32.png',
    status: 'disconnected'
  },
  {
    id: 3,
    name: 'Microsoft Teams',
    description: 'Collaborate with your team in Microsoft Teams',
    icon: 'https://teams.microsoft.com/favicon.ico',
    status: 'connected',
    lastSync: '1 day ago'
  }
];

export function IntegrationSettings() {
  const [activeIntegrations, setActiveIntegrations] = useState(
    integrations.reduce((acc, integration) => ({
      ...acc,
      [integration.id]: integration.status === 'connected'
    }), {})
  );

  const toggleIntegration = (id: number) => {
    setActiveIntegrations(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Available Integrations */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Available Integrations</h3>
            <Database className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-6">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={integration.icon}
                      alt={integration.name}
                      className="h-8 w-8 rounded"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                    {integration.lastSync && (
                      <p className="text-xs text-gray-400 mt-1">
                        Last synced: {integration.lastSync}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {activeIntegrations[integration.id] ? (
                    <>
                      <span className="flex items-center text-sm text-success-600">
                        <Check className="h-4 w-4 mr-1" />
                        Connected
                      </span>
                      <button
                        className="text-sm text-gray-500 hover:text-gray-700"
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      <Link className="h-4 w-4 mr-2" />
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Settings */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Integration Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-900">
                  Auto-sync integrations
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500 ml-6">
                Automatically sync data with connected integrations
              </p>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-900">
                  Notify on sync errors
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500 ml-6">
                Receive notifications when integration syncs fail
              </p>
            </div>
            
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  defaultChecked
                />
                <span className="ml-2 text-sm text-gray-900">
                  Allow data sharing
                </span>
              </label>
              <p className="mt-1 text-sm text-gray-500 ml-6">
                Share data between connected integrations
              </p>
            </div>
          </div>
        </div>

        {/* Sync Schedule */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sync Schedule</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="syncInterval" className="block text-sm font-medium text-gray-700">
                Sync Interval
              </label>
              <select
                id="syncInterval"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                defaultValue="15"
              >
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every hour</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="retryAttempts" className="block text-sm font-medium text-gray-700">
                Retry Attempts
              </label>
              <select
                id="retryAttempts"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                defaultValue="3"
              >
                <option value="1">1 attempt</option>
                <option value="3">3 attempts</option>
                <option value="5">5 attempts</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end space-x-3">
        <button className="btn btn-outline">Reset All</button>
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  );
}