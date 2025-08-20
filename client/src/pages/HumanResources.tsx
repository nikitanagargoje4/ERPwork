import { useState } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { Users, UserPlus, Award, BookOpen, LineChart } from 'lucide-react';

// Import HR sub-pages
import { HROverview } from '../components/hr/HROverview';
import { Employees } from '../components/hr/Employees';
import { Recruitment } from '../components/hr/Recruitment';
import { Training } from '../components/hr/Training';
import { Performance } from '../components/hr/Performance';

export function HumanResources() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(
    location === '/human-resources' ? 'overview' :
    location.includes('/employees') ? 'employees' :
    location.includes('/recruitment') ? 'recruitment' :
    location.includes('/training') ? 'training' :
    location.includes('/performance') ? 'performance' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/human-resources', icon: Users },
    { id: 'employees', name: 'Employees', href: '/human-resources/employees', icon: Users },
    { id: 'recruitment', name: 'Recruitment', href: '/human-resources/recruitment', icon: UserPlus },
    { id: 'training', name: 'Training', href: '/human-resources/training', icon: BookOpen },
    { id: 'performance', name: 'Performance', href: '/human-resources/performance', icon: LineChart },
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

      {location === '/human-resources' && <HROverview />}
      {location === '/human-resources/employees' && <Employees />}
      {location === '/human-resources/recruitment' && <Recruitment />}
      {location === '/human-resources/training' && <Training />}
      {location === '/human-resources/performance' && <Performance />}
    </div>
  );
}