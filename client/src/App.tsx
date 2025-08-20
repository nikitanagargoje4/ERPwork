import { useEffect, useState } from 'react';
import { Route, useLocation } from 'wouter';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Finance } from './pages/Finance';
import { HumanResources } from './pages/HumanResources';
import { SupplyChain } from './pages/SupplyChain';
import { CustomerRelationship } from './pages/CustomerRelationship';
import { Manufacturing } from './pages/Manufacturing';
import { ProjectManagement } from './pages/ProjectManagement';
import { Settings } from './pages/Settings';
import { useAuthStore } from './stores/authStore';
import { LoginPage } from './pages/LoginPage';

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [location] = useLocation();

  useEffect(() => {
    // Simulate authentication check
    const loadAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    
    loadAuth();
  }, [checkAuth]);
  
  // Change page title based on current route
  useEffect(() => {
    const pathSegments = location.split('/').filter(Boolean);
    const currentPage = pathSegments.length > 0
      ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
      : 'Dashboard';
      
    document.title = `ERP System | ${currentPage}`;
  }, [location]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-16 w-16 mx-auto border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Route path="/" component={Dashboard} />
      <Route path="/finance" component={Finance} />
      <Route path="/finance/:rest*" component={Finance} />
      <Route path="/human-resources" component={HumanResources} />
      <Route path="/human-resources/:rest*" component={HumanResources} />
      <Route path="/supply-chain/:rest*" component={SupplyChain} />
      <Route path="/crm/:rest*" component={CustomerRelationship} />
      <Route path="/manufacturing/:rest*" component={Manufacturing} />
      <Route path="/projects/:rest*" component={ProjectManagement} />
      <Route path="/settings/:rest*" component={Settings} />
    </Layout>
  );
}

export default App;