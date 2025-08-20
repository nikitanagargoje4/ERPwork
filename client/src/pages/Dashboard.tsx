import { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Clipboard,
  Calendar,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { DashboardMetric } from '../components/dashboard/DashboardMetric';
import { DashboardRecentActivity } from '../components/dashboard/DashboardRecentActivity';

// Mock data for charts
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
  { month: 'Aug', sales: 4000 },
  { month: 'Sep', sales: 4500 },
  { month: 'Oct', sales: 6000 },
  { month: 'Nov', sales: 5500 },
  { month: 'Dec', sales: 7000 },
];

const departmentBudget = [
  { name: 'R&D', value: 20 },
  { name: 'Marketing', value: 30 },
  { name: 'Sales', value: 25 },
  { name: 'Operations', value: 15 },
  { name: 'HR', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9370DB'];

// Dashboard activity types
interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
  module: string;
  status?: string;
}

// Mock activity data
const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'purchase_order',
    description: 'Purchase order #12345 created',
    timestamp: '2025-03-15T13:45:00Z',
    user: 'John Doe',
    module: 'Supply Chain',
    status: 'pending'
  },
  {
    id: '2',
    type: 'invoice',
    description: 'Invoice #INV-2025-0321 paid',
    timestamp: '2025-03-15T10:30:00Z',
    user: 'Sarah Johnson',
    module: 'Finance',
    status: 'completed'
  },
  {
    id: '3',
    type: 'employee',
    description: 'New employee Alice Smith onboarded',
    timestamp: '2025-03-14T16:20:00Z',
    user: 'HR Manager',
    module: 'Human Resources'
  },
  {
    id: '4',
    type: 'project',
    description: 'Project "Website Redesign" status updated',
    timestamp: '2025-03-14T11:15:00Z',
    user: 'Project Manager',
    module: 'Projects',
    status: 'in_progress'
  },
  {
    id: '5',
    type: 'customer',
    description: 'New customer Acme Corp added',
    timestamp: '2025-03-13T09:45:00Z',
    user: 'Sales Rep',
    module: 'CRM'
  }
];

export function Dashboard() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    tasks: 0
  });

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMetrics({
        revenue: 248970,
        orders: 1245,
        customers: 567,
        tasks: 89
      });
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-1 text-gray-500">
          Here's what's happening across your business today
        </p>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardMetric
          title="Total Revenue"
          value={formatCurrency(metrics.revenue)}
          change={12.5}
          changeType="increase"
          icon={<DollarSign className="h-6 w-6 text-primary-500" />}
        />
        <DashboardMetric
          title="Orders"
          value={metrics.orders.toString()}
          change={8.2}
          changeType="increase"
          icon={<ShoppingCart className="h-6 w-6 text-secondary-500" />}
        />
        <DashboardMetric
          title="New Customers"
          value={metrics.customers.toString()}
          change={-3.1}
          changeType="decrease"
          icon={<Users className="h-6 w-6 text-accent-500" />}
        />
        <DashboardMetric
          title="Pending Tasks"
          value={metrics.tasks.toString()}
          change={0}
          changeType="neutral"
          icon={<Clipboard className="h-6 w-6 text-warning-500" />}
        />
      </div>
      
      {/* Charts and data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales chart */}
        <DashboardCard title="Revenue Trend">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="sales" stroke="#0052ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
        
        {/* Budget allocation */}
        <DashboardCard title="Budget Allocation">
          <div className="h-80 flex items-center">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentBudget}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {departmentBudget.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Budget']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center space-y-3">
                {departmentBudget.map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-700">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
      
      {/* Additional dashboard components */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity feed */}
        <div className="lg:col-span-2">
          <DashboardCard title="Recent Activity">
            <div className="flow-root">
              <DashboardRecentActivity activities={recentActivities} />
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                View all activity
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </DashboardCard>
        </div>
        
        {/* Upcoming calendar */}
        <div>
          <DashboardCard title="Upcoming Calendar">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Weekly Team Meeting</h4>
                  <p className="mt-1 text-sm text-gray-500">Today at 10:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-secondary-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-secondary-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Client Presentation</h4>
                  <p className="mt-1 text-sm text-gray-500">Tomorrow at 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-md bg-warning-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-warning-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-gray-900">Project Deadline</h4>
                  <p className="mt-1 text-sm text-gray-500">March 18, 2025</p>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-200 pt-4">
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                View calendar
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </DashboardCard>
          
          {/* System alerts */}
          <div className="mt-6">
            <DashboardCard title="System Alerts">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-warning-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">System maintenance</h4>
                    <p className="mt-1 text-sm text-gray-500">Scheduled for March 20, 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-error-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">License renewal</h4>
                    <p className="mt-1 text-sm text-gray-500">Your license expires in 15 days</p>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
}