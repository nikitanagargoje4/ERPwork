import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Home, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  HeartHandshake, 
  Factory, 
  FolderKanban, 
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

// Main navigation items
const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { 
    name: 'Finance', 
    href: '/finance', 
    icon: DollarSign,
    children: [
      { name: 'Overview', href: '/finance' },
      { name: 'Accounting', href: '/finance/accounting' },
      { name: 'Budgeting', href: '/finance/budgeting' },
      { name: 'Payroll', href: '/finance/payroll' },
      { name: 'Reporting', href: '/finance/reports' },
    ]
  },
  { 
    name: 'Human Resources', 
    href: '/human-resources', 
    icon: Users,
    children: [
      { name: 'Overview', href: '/human-resources' },
      { name: 'Employees', href: '/human-resources/employees' },
      { name: 'Recruitment', href: '/human-resources/recruitment' },
      { name: 'Training', href: '/human-resources/training' },
      { name: 'Performance', href: '/human-resources/performance' },
    ]
  },
  { 
    name: 'Supply Chain', 
    href: '/supply-chain', 
    icon: ShoppingCart,
    children: [
      { name: 'Overview', href: '/supply-chain' },
      { name: 'Procurement', href: '/supply-chain/procurement' },
      { name: 'Inventory', href: '/supply-chain/inventory' },
      { name: 'Vendors', href: '/supply-chain/vendors' },
      { name: 'Logistics', href: '/supply-chain/logistics' },
    ]
  },
  { 
    name: 'CRM', 
    href: '/crm', 
    icon: HeartHandshake,
    children: [
      { name: 'Overview', href: '/crm' },
      { name: 'Customers', href: '/crm/customers' },
      { name: 'Sales', href: '/crm/sales' },
      { name: 'Marketing', href: '/crm/marketing' },
      { name: 'Support', href: '/crm/support' },
    ]
  },
  { 
    name: 'Manufacturing', 
    href: '/manufacturing', 
    icon: Factory,
    children: [
      { name: 'Overview', href: '/manufacturing' },
      { name: 'Production', href: '/manufacturing/production' },
      { name: 'Quality Control', href: '/manufacturing/quality' },
      { name: 'Maintenance', href: '/manufacturing/maintenance' },
      { name: 'Planning', href: '/manufacturing/planning' },
    ]
  },
  { 
    name: 'Projects', 
    href: '/projects', 
    icon: FolderKanban,
    children: [
      { name: 'Overview', href: '/projects' },
      { name: 'Active Projects', href: '/projects/active' },
      { name: 'Tasks', href: '/projects/tasks' },
      { name: 'Resources', href: '/projects/resources' },
      { name: 'Calendar', href: '/projects/calendar' },
    ]
  },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { user } = useAuthStore();
  
  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Check if a menu should be open based on the current route
  const isMenuOpen = (item: typeof navigation[0]) => {
    if (openMenus[item.name] !== undefined) {
      return openMenus[item.name];
    }
    
    // Auto-open if a child route is active
    if (item.children) {
      return item.children.some(child => location.startsWith(child.href));
    }
    
    return false;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Sidebar header with logo and user info */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-md bg-primary-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">E</span>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-900">ERP System</h1>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
        {navigation.map((item) => {
          const isOpen = isMenuOpen(item);
          const isChildActive = item.children?.some(
            child => location === child.href
          );
          
          return (
            <div key={item.name}>
              {!item.children ? (
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    location === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                      isChildActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => toggleMenu(item.name)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      {item.name}
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {/* Submenu items */}
                  {isOpen && (
                    <div className="mt-1 ml-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`block py-2 pr-4 pl-3 text-sm transition-colors duration-150 ${
                            location === child.href
                              ? 'text-primary-600 font-medium'
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
      
      {/* Footer with version info */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">v0.1.0</span>
          <span className="text-xs text-gray-500">© 2025 ERP Inc.</span>
        </div>
      </div>
    </aside>
  );
}