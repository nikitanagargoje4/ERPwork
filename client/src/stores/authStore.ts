import { create } from 'zustand';

// Define user roles
type UserRole = 'Administrator' | 'Manager' | 'Finance' | 'HR' | 'Sales' | 'Operations' | 'Employee';

// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

// Auth store state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

// Mock users for demo
const mockUsers: Record<string, User> = {
  'admin@example.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    permissions: ['all']
  },
  'manager@example.com': {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    role: 'Manager',
    permissions: ['view:all', 'edit:all']
  },
  'finance@example.com': {
    id: '3',
    name: 'Finance User',
    email: 'finance@example.com',
    role: 'Finance',
    permissions: ['view:finance', 'edit:finance']
  }
};

// Create the auth store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Login function
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in mock data
      if (mockUsers[email] && password === 'password') {
        const user = mockUsers[email];
        
        // Store user in localStorage for persistence
        localStorage.setItem('erp_user', JSON.stringify(user));
        
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem('erp_user');
    set({ user: null, isAuthenticated: false });
  },
  
  // Check if user is authenticated (e.g., on page refresh)
  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check localStorage for user data
      const storedUser = localStorage.getItem('erp_user');
      
      if (storedUser) {
        const user = JSON.parse(storedUser) as User;
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      // If there's an error, log the user out
      localStorage.removeItem('erp_user');
    } finally {
      set({ isLoading: false });
    }
  }
}));