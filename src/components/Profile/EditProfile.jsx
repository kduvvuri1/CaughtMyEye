// EditProfile.jsx - Enhanced Version
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

export default function EditProfile() {
  const { currentUser, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    travelPreferences: {
      budget: 'mid-range',
      airlines: []
    }
  });
  const [photoFile, setPhotoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = currentUser.photoURL;
    
    if (photoFile) {
      const storageRef = ref(storage, `profile-photos/${currentUser.uid}`);
      await uploadBytes(storageRef, photoFile);
      photoURL = await getDownloadURL(storageRef);
    }

    await updateUserProfile({
      ...formData,
      photoURL,
      profileComplete: true
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Photo Upload */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setPhotoFile(e.target.files[0])} 
      />
      
      {/* Username */}
      <input
        value={formData.displayName}
        onChange={(e) => setFormData({...formData, displayName: e.target.value})}
        placeholder="Username"
      />
      
      {/* Travel Preferences */}
      <select 
        value={formData.travelPreferences.budget}
        onChange={(e) => setFormData({
          ...formData, 
          travelPreferences: {
            ...formData.travelPreferences,
            budget: e.target.value
          }
        })}
      >
        <option value="budget">Budget</option>
        <option value="mid-range">Mid-Range</option>
        <option value="luxury">Luxury</option>
      </select>
      
      <button type="submit">Save</button>
    </form>
  );
}