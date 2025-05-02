// src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Shared/Navbar';
import LoadingSpinner from './components/Shared/LoadingSpinner';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import './styles/index.css';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  useNavigate,
  useLocation  // Add this import
} from 'react-router-dom';

const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const ProfileView = lazy(() => import('./components/Profile/ProfileView'));
const EditProfile = lazy(() => import('./components/Profile/EditProfile'));

function AppContent() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner fullScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
            <Route path="/profile" element={user ? <ProfileView /> : <Navigate to="/login" replace />} />
            <Route path="/edit-profile" element={user ? <EditProfile /> : <Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;