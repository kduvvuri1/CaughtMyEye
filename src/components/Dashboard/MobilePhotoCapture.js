import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

const MobileScanner = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle successful scans
  const handleScan = async (result) => {
    if (!result) return;
    
    setIsProcessing(true);
    try {
      // 1. Upload image to Firebase Storage
      const imageUrl = await uploadToFirebase(result);
      
      // 2. Process with backend (Cloud Function)
      const landmarkData = await processWithBackend(imageUrl);
      
      // 3. Save to Firestore
      await saveTripToDB(landmarkData);
      
      navigate('/trip-details', { state: { landmarkData } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadToFirebase = async (imageSrc) => {
    const storageRef = ref(storage, `scans/${currentUser.uid}/${Date.now()}.jpg`);
    const blob = await fetch(imageSrc).then(res => res.blob());
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const processWithBackend = async (imageUrl) => {
    const response = await fetch('https://your-cloud-function-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl })
    });
    return await response.json();
  };

  const saveTripToDB = async (data) => {
    await addDoc(collection(db, 'userTrips'), {
      userId: currentUser.uid,
      ...data,
      createdAt: serverTimestamp()
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 bg-gray-800">
        <h1 className="text-xl font-bold">Scan Landmark QR</h1>
      </header>

      {/* Scanner Area */}
      <div className="flex-1 relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'environment' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Scanner Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-4 border-yellow-400 rounded-lg w-64 h-64 animate-pulse" />
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-800 space-y-2">
        <button
          onClick={() => webcamRef.current.getScreenshot().then(handleScan)}
          disabled={isProcessing}
          className="w-full bg-blue-500 py-3 rounded-lg disabled:bg-gray-600"
        >
          {isProcessing ? 'Processing...' : 'Capture & Scan'}
        </button>
        
        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default MobileScanner;