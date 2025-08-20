import { useState } from 'react';
import { Calendar, Clock, Users, AlertTriangle } from 'lucide-react';
import { DashboardCard } from '../../dashboard/DashboardCard';

const events = [
  {
    id: 1,
    title: 'Project Kickoff',
    project: 'Website Redesign',
    date: '2025-03-20',
    time: '10:00 AM',
    attendees: ['John Smith', 'Sarah Johnson', 'Mike Wilson'],
    type: 'Meeting'
  },
  {
    id: 2,
    title: 'Sprint Review',
    project: 'Mobile App Development',
    date: '2025-03-21',
    time: '2:00 PM',
    attendees: ['Sarah Johnson', 'Mike Wilson'],
    type: 'Review'
  },
  {
    id: 3,
    title: 'Database Migration',
    project: 'Data Migration',
    date: '2025-03-22',
    time: '9:00 AM',
    attendees: ['John Smith', 'Mike Wilson'],
    type: 'Milestone'
  }
];

export function ProjectCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('month');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Today's Events</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-accent-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-accent-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Team Meetings</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 bg-warning-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Deadlines</p>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <DashboardCard title="Project Calendar">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button className="btn btn-outline">Today</button>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <h3 className="text-lg font-medium text-gray-900">March 2025</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                selectedView === 'month'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedView('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 rounded ${
                selectedView === 'week'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedView('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 rounded ${
                selectedView === 'day'
                  ? 'bg-primary-100 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedView('day')}
            >
              Day
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className="bg-white min-h-[120px] p-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Upcoming Events */}
      <DashboardCard title="Upcoming Events">
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  event.type === 'Meeting'
                    ? 'bg-blue-100 text-blue-600'
                    : event.type === 'Review'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-green-100 text-green-600'
                }`}>
                  {event.type === 'Meeting' ? (
                    <Users className="h-5 w-5" />
                  ) : event.type === 'Review' ? (
                    <Clock className="h-5 w-5" />
                  ) : (
                    <Calendar className="h-5 w-5" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{event.project}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {event.attendees.map((attendee, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}