import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

export default function PhotoReview() {
  const { user } = useAuth();
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'userPhotos'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        setPhotoData(data);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">📸 Latest Uploaded Photo</h2>
      {photoData ? (
        <img src={photoData.url} alt="Latest Upload" className="rounded-xl mt-4" />
      ) : (
        <p className="text-gray-500">No photo uploaded yet.</p>
      )}
    </div>
  );
}
