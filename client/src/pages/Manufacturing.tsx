import { useState } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { Factory, Settings, CheckSquare, PenTool as Tool, BarChart } from 'lucide-react';
import { ManufacturingOverview } from '../components/manufacturing/ManufacturingOverview';
import { Production } from '../components/manufacturing/Production';
import { QualityControl } from '../components/manufacturing/QualityControl';
import { Maintenance } from '../components/manufacturing/Maintenance';
import { Planning } from '../components/manufacturing/Planning';

export function Manufacturing() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(
    location === '/manufacturing' ? 'overview' :
    location.includes('/production') ? 'production' :
    location.includes('/quality') ? 'quality' :
    location.includes('/maintenance') ? 'maintenance' :
    location.includes('/planning') ? 'planning' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/manufacturing', icon: Factory },
    { id: 'production', name: 'Production', href: '/manufacturing/production', icon: Settings },
    { id: 'quality', name: 'Quality Control', href: '/manufacturing/quality', icon: CheckSquare },
    { id: 'maintenance', name: 'Maintenance', href: '/manufacturing/maintenance', icon: Tool },
    { id: 'planning', name: 'Planning', href: '/manufacturing/planning', icon: BarChart },
  ];

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
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="mr-2 h-5 w-5" />
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <Route path="/manufacturing" component={ManufacturingOverview} />
      <Route path="/manufacturing/production" component={Production} />
      <Route path="/manufacturing/quality" component={QualityControl} />
      <Route path="/manufacturing/maintenance" component={Maintenance} />
      <Route path="/manufacturing/planning" component={Planning} />
    </div>
  );
}