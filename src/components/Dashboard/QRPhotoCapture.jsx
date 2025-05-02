// QRPhotoCapture.jsx
import { useCamera } from 'react-camera';
import QrReader from 'react-qr-reader';

export default function QRPhotoCapture() {
  const [result, setResult] = useState(null);
  const { capture } = useCamera();

  const handleScan = (data) => {
    if (data) {
      setResult(data); // QR contains Taj Mahal ID
      capture(); // Trigger photo capture
    }
  };

  return (
    <div>
      <QrReader
        onScan={handleScan}
        onError={(err) => console.error(err)}
      />
      {result && <p>Scan detected: {result}</p>}
    </div>
  );
}