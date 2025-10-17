// src/components/Shared/Navbar.jsx
import React from 'react' // Must be in every JSX file
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoIcon from '../../../assets/eye-with-driaphragm.svg';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', requireAuth: true },
    { path: '/profile', label: 'ProfileView', requireAuth: true }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to home after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleProfileClick = (e) => {
    navigate('/profile');
  };

  const renderNavLink = (path, label, isActive) => (
    <Link 
      to={path} 
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive 
          ? 'bg-blue-800 text-white' 
          : 'text-blue-100 hover:text-white hover:bg-blue-600'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={() => window.location.reload()}>
            <img src={LogoIcon} alt="CaughtMyEye Logo" className="w-10 h-10 fill-white" />
            <span className="ml-2 text-xl font-bold tracking-tight">CaughtMyEye</span>
            </Link>
          </div>

{/* Navigation Links */}
<div className="space-x-4 mt-4">
          {user ? (
            // Authenticated User Links
            <>
              <Link to="/dashboard" className="hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-200">
                Dashboard
              </Link>

              <Link to="/profile" className="hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-200">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            // Unauthenticated User Links
            <>
              <Link 
                to="/login" 
                className="hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-200"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="hover:bg-indigo-700 px-3 py-2 rounded-md transition duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}