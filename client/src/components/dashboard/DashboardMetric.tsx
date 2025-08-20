import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DashboardMetricProps {
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon?: ReactNode;
}

export function DashboardMetric({ title, value, change, changeType, icon }: DashboardMetricProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success-600';
      case 'decrease':
        return 'text-error-600';
      case 'neutral':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4" />;
      case 'neutral':
        return <Minus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center">
        {icon && <div className="mr-4">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change !== 0 && (
              <p className={`ml-2 flex items-center text-sm ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="ml-1">{Math.abs(change)}%</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}