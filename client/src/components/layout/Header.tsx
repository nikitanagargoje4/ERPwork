import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Bell, Search, Menu, X, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface HeaderProps {
  onMenuButtonClick: () => void;
}

export function Header({ onMenuButtonClick }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuthStore();
  const [, setLocation] = useLocation();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex flex-1 items-center justify-between px-4 md:px-6">
        {/* Left: Menu button (mobile) and logo */}
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden -ml-2 mr-2 p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={onMenuButtonClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-primary-600">ERP System</h1>
          </div>
        </div>

        {/* Center: Search bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <div className="w-full max-w-lg">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                placeholder="Search across all modules..."
                type="search"
              />
            </div>
          </div>
        </div>

        {/* Right: Mobile search, notifications, user menu */}
        <div className="flex items-center space-x-4">
          {/* Mobile search button */}
          <button 
            type="button"
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              className="relative p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white"></span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto py-2">
                  {[1, 2, 3].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                      onClick={(e) => {
                        e.preventDefault();
                        setNotificationsOpen(false);
                      }}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                            <User className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="ml-3 w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">Notification title {item}</p>
                          <p className="mt-1 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                          <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="border-t border-gray-200 px-4 py-2">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    View all notifications
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-700">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                <span className="text-xs text-gray-500">{user?.role}</span>
              </span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="border-b border-gray-200 px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/settings/profile');
                    setUserMenuOpen(false);
                  }}
                >
                  <User className="mr-3 h-5 w-5 text-gray-400" />
                  Your Profile
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation('/settings');
                    setUserMenuOpen(false);
                  }}
                >
                  <Settings className="mr-3 h-5 w-5 text-gray-400" />
                  Settings
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    // Documentation or help section
                    setUserMenuOpen(false);
                  }}
                >
                  <HelpCircle className="mr-3 h-5 w-5 text-gray-400" />
                  Help & Documentation
                </a>
                <button
                  type="button"
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search panel */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-16 z-10 md:hidden">
          <div className="bg-white px-4 py-3 shadow-md">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-primary-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}