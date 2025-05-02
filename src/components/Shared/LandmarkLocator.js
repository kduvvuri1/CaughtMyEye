// src/components/Shared/LandmarkLocator.js
import axios from 'axios';

const GOOGLE_VISION_API_KEY = 'AIzaSyD6QROJZ1Y3ZfiugqBxpPeeuQ7J3K22CbQ'; // Replace with your actual key

export async function detectLandmarkFromImage(imageUrl) {
  try {
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
      {
        requests: [
          {
            image: {
              source: {
                imageUri: imageUrl
              }
            },
            features: [
              {
                type: "LANDMARK_DETECTION",
                maxResults: 1
              }
            ]
          }
        ]
      }
    );

    const landmark = response.data.responses[0]?.landmarkAnnotations?.[0];
    if (!landmark) throw new Error("No landmark detected");

    return {
      name: landmark.description,
      coordinates: {
        lat: landmark.locations[0].latLng.latitude,
        lng: landmark.locations[0].latLng.longitude
      }
    };
  } catch (error) {
    console.error("Google Vision API error:", error.response?.data || error.message);
    return null;
  }
}
