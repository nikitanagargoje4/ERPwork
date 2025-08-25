import { useState } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { Settings as SettingsIcon, User, Shield, Bell, Database, Globe, Palette, HelpCircle } from 'lucide-react';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { SecuritySettings } from '../components/settings/SecuritySettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { IntegrationSettings } from '../components/settings/IntegrationSettings';

export function Settings() {
  const [location] = useLocation();
  const activeTab = 
    location === '/settings' ? 'general' :
    location.includes('/profile') ? 'profile' :
    location.includes('/security') ? 'security' :
    location.includes('/notifications') ? 'notifications' :
    location.includes('/integrations') ? 'integrations' :
    'general';

  const tabs = [
    { id: 'general', name: 'General', href: '/settings', icon: SettingsIcon },
    { id: 'profile', name: 'Profile', href: '/settings/profile', icon: User },
    { id: 'security', name: 'Security', href: '/settings/security', icon: Shield },
    { id: 'notifications', name: 'Notifications', href: '/settings/notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', href: '/settings/integrations', icon: Database },
  ];

  // Render the appropriate settings component based on the active tab
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'general':
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={tab.href}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } flex items-center`}
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {renderActiveComponent()}
    </div>
  );
}