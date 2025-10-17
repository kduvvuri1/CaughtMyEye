import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function ProfileView() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setProfileData(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-32"></div>
          
          {/* Profile Content */}
          <div className="px-6 pb-6">
            {/* Profile Photo and Name */}
            <div className="flex items-end -mt-16 mb-6">
              <div className="relative">
                {currentUser?.photoURL || profileData?.photoURL ? (
                  <img
                    src={currentUser?.photoURL || profileData?.photoURL}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
                    <span className="text-4xl text-gray-600">
                      {currentUser?.email?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profileData?.displayName || currentUser?.displayName || 'User'}
                </h1>
                <p className="text-gray-600">{currentUser?.email}</p>
              </div>
              <button
                onClick={() => navigate('/edit-profile')}
                className="ml-auto mb-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              {profileData?.bio && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Bio</h2>
                  <p className="text-gray-700">{profileData.bio}</p>
                </div>
              )}

              {profileData?.phoneNumber && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
                  <p className="text-gray-700">Phone: {profileData.phoneNumber}</p>
                </div>
              )}

              {profileData?.travelPreferences && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Travel Preferences</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">
                      <span className="font-medium">Budget:</span>{' '}
                      <span className="capitalize">{profileData.travelPreferences.budget}</span>
                    </p>
                    {profileData.travelPreferences.airlines && profileData.travelPreferences.airlines.length > 0 && (
                      <p className="text-gray-700 mt-2">
                        <span className="font-medium">Preferred Airlines:</span>{' '}
                        {profileData.travelPreferences.airlines.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h2>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">User ID:</span> {currentUser?.uid}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Account Created:</span>{' '}
                    {currentUser?.metadata?.creationTime
                      ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  {profileData?.updatedAt && (
                    <p className="text-gray-700 text-sm">
                      <span className="font-medium">Last Updated:</span>{' '}
                      {new Date(profileData.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}