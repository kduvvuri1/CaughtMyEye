// src/components/Dashboard/CameraPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import { PhotographIcon } from '@heroicons/react/24/outline';
import { jsQR } from 'jsqr'; 

export default function CameraPage() {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Start camera on component mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      setError("Camera access denied or not available.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    
    const photoDataUrl = canvas.toDataURL('image/jpeg');
    setPhoto(photoDataUrl);
  };

  const analyzePhoto = () => {
    // Implement photo analysis logic
    setLoading(true);
    try {
      // QR Code scanning or other analysis
      const imageElement = new Image();
      imageElement.src = photo;
      
      imageElement.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        context.drawImage(imageElement, 0, 0);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          setLocationData(code.data);
        } else {
          setError('No QR code detected');
        }
        
        setLoading(false);
      };
    } catch (err) {
      setError('Photo analysis failed');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Camera Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full rounded-lg shadow-lg"
          />
          
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={capturePhoto}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <PhotographIcon className="w-5 h-5 mr-2" />
              Capture Photo
            </button>
            
            {photo && (
              <button 
                onClick={analyzePhoto}
                disabled={loading}
                className={`
                  ${loading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} 
                  text-white font-bold py-2 px-4 rounded inline-flex items-center
                `}
              >
                {loading ? 'Analyzing...' : 'Analyze Photo'}
              </button>
            )}
          </div>
        </div>
        
        {photo && (
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Captured Photo</h2>
            <img 
              src={photo} 
              alt="Captured" 
              className="w-full rounded-lg shadow-lg"
            />
            
            {locationData && (
              <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <strong>Location Data:</strong> {locationData}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}x