import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfileView() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Add this effect to log navigation
  useEffect(() => {
    console.log('ProfileView mounted');
    return () => console.log('ProfileView unmounted');
  }, []);

  // Add this click handler to test navigation
  const handleButtonClick = () => {
    console.log('Button clicked - profile should remain visible');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
        
        <button 
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Button
        </button>

        {currentUser && (
          <div className="mt-4 space-y-2">
            <p>Email: {currentUser.email}</p>
            <p>UID: {currentUser.uid}</p>
          </div>
        )}
      </div>
    </div>
  );
}