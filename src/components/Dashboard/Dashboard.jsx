import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to CaughtMyEye Dashboard
          </h1>
          
          {user && (
            <div className="mb-6">
              <p className="text-gray-700">
                Hello, <span className="font-semibold">{user.email}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/profile"
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-colors"
            >
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Profile</h2>
              <p className="text-blue-700">View and edit your profile information</p>
            </Link>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Trips</h2>
              <p className="text-gray-700">View your saved trips</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Camera</h2>
              <p className="text-gray-700">Capture new landmarks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
