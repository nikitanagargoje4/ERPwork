import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

export function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="px-6 py-5">
        {children}
      </div>
    </div>
  );
}