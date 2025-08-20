import { useState } from 'react';
import { Route, Link, useLocation } from 'wouter';
import { ShoppingCart, Package, Truck, Users, BarChart } from 'lucide-react';
import { SupplyChainOverview } from '../components/supply-chain/SupplyChainOverview/index';
import { Procurement } from '../components/supply-chain/Procurement/index';
import { Inventory } from '../components/supply-chain/Inventory/index';
import { Vendors } from '../components/supply-chain/Vendors/index';
import { Logistics } from '../components/supply-chain/Logistics/index';

export function SupplyChain() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState(
    location === '/supply-chain' ? 'overview' :
    location.includes('/procurement') ? 'procurement' :
    location.includes('/inventory') ? 'inventory' :
    location.includes('/vendors') ? 'vendors' :
    location.includes('/logistics') ? 'logistics' :
    'overview'
  );

  const tabs = [
    { id: 'overview', name: 'Overview', href: '/supply-chain', icon: BarChart },
    { id: 'procurement', name: 'Procurement', href: '/supply-chain/procurement', icon: ShoppingCart },
    { id: 'inventory', name: 'Inventory', href: '/supply-chain/inventory', icon: Package },
    { id: 'vendors', name: 'Vendors', href: '/supply-chain/vendors', icon: Users },
    { id: 'logistics', name: 'Logistics', href: '/supply-chain/logistics', icon: Truck },
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

      <Route path="/supply-chain" component={SupplyChainOverview} />
      <Route path="/supply-chain/procurement" component={Procurement} />
      <Route path="/supply-chain/inventory" component={Inventory} />
      <Route path="/supply-chain/vendors" component={Vendors} />
      <Route path="/supply-chain/logistics" component={Logistics} />
    </div>
  );
}