import { useState, useEffect } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { DollarSign, TrendingUp, Users, FileText, PieChart } from 'lucide-react';

// Finance sub-pages
import { FinanceOverview } from '../components/finance/FinanceOverview';
import { Accounting } from '../components/finance/Accounting';
import { Budgeting } from '../components/finance/Budgeting';
import { Payroll } from '../components/finance/Payroll';
import { FinanceReports } from '../components/finance/FinanceReports';

export function Finance() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // Update active tab based on current location
  useEffect(() => {
    if (location === '/finance' || location === '/finance/') {
      setActiveTab('overview');
    } else if (location.includes('/accounting')) {
      setActiveTab('accounting');
    } else if (location.includes('/budgeting')) {
      setActiveTab('budgeting');
    } else if (location.includes('/payroll')) {
      setActiveTab('payroll');
    } else if (location.includes('/reports')) {
      setActiveTab('reports');
    }
  }, [location]);

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/finance', icon: DollarSign },
    { id: 'accounting', name: 'Accounting', href: '/finance/accounting', icon: FileText },
    { id: 'budgeting', name: 'Budgeting', href: '/finance/budgeting', icon: PieChart },
    { id: 'payroll', name: 'Payroll', href: '/finance/payroll', icon: Users },
    { id: 'reports', name: 'Reports', href: '/finance/reports', icon: TrendingUp },
  ];

  // Render content based on current route
  const renderContent = () => {
    console.log('Finance page location:', location); // Debug log
    console.log('Rendering FinanceOverview component'); // Debug log
    
    // Simple test to ensure component is working
    if (location === '/finance' || location === '/finance/') {
      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Finance Overview Page</h1>
          <p className="text-gray-600 mb-4">This is a test to confirm the page is loading.</p>
          <FinanceOverview />
        </div>
      );
    } else if (location === '/finance/accounting') {
      return <Accounting />;
    } else if (location === '/finance/budgeting') {
      return <Budgeting />;
    } else if (location === '/finance/payroll') {
      return <Payroll />;
    } else if (location === '/finance/reports') {
      return <FinanceReports />;
    }
    // Default to overview
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Finance Overview Page (Default)</h1>
        <p className="text-gray-600 mb-4">This is a test to confirm the page is loading.</p>
        <FinanceOverview />
      </div>
    );
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
                  href={tab.href}
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

      {/* Render the active component */}
      <div className="bg-gray-50 min-h-screen p-6">
        {renderContent()}
      </div>
    </div>
  );
}