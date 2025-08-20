import { format, parseISO } from 'date-fns';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  FolderKanban, 
  HeartHandshake,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
  module: string;
  status?: string;
}

interface DashboardRecentActivityProps {
  activities: Activity[];
}

export function DashboardRecentActivity({ activities }: DashboardRecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'purchase_order':
        return <ShoppingCart className="h-5 w-5 text-primary-500" />;
      case 'invoice':
        return <DollarSign className="h-5 w-5 text-success-500" />;
      case 'employee':
        return <Users className="h-5 w-5 text-accent-500" />;
      case 'project':
        return <FolderKanban className="h-5 w-5 text-warning-500" />;
      case 'customer':
        return <HeartHandshake className="h-5 w-5 text-secondary-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            In Progress
          </span>
        );
      default:
        return null;
    }
  };

  const formatTime = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      return format(date, 'MMM d, yyyy - h:mm a');
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <ul className="divide-y divide-gray-200">
      {activities.map((activity) => (
        <li key={activity.id} className="py-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
              {getActivityIcon(activity.type)}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                {getStatusBadge(activity.status)}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <p className="mr-4">{activity.user}</p>
                <p>{formatTime(activity.timestamp)}</p>
              </div>
              <p className="mt-1 text-xs text-gray-400">{activity.module}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}