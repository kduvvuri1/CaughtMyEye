import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useAuth } from '../context/AuthContext';

export default function QRGenerator() {
  const { currentUser } = useAuth();
  const [qrValue, setQrValue] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Generate unique session ID when component mounts
    const id = 'session-' + Math.random().toString(36).substring(2, 9);
    setSessionId(id);
    setQrValue(JSON.stringify({
      userId: currentUser.uid,
      sessionId: id,
      url: window.location.origin
    }));
  }, [currentUser]);

  return (
    <div className="text-center p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Scan with your phone</h2>
      <div className="p-4 bg-gray-50 rounded inline-block">
        <QRCode 
          value={qrValue} 
          size={256}
          level="H" // High error correction
          includeMargin={true}
        />
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Scan this code with your phone camera to connect
      </p>
    </div>
  );
}