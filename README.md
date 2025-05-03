# User Manual: CaughtMyEye Web Application

## Overview
CaughtMyEye is a web-based travel assistant that allows users to upload an image or scan a QR code from a location and instantly receive travel-related information. This includes the name of the landmark in the image, nearby hotels, flight options, and the ability to save trips for later. It is built using React, Firebase, and a set of external APIs like Google Vision, Google Maps, Skyscanner, and Amadeus.

---

## Getting Started

1. **Access the Web Application**  
   Visit the CaughtMyEye web app in your browser. You can start by signing in using your email and password, or by logging in via Google.

2. **Login or Sign Up**  
   If you are a new user, create an account. All your trips and interactions will be saved under your user profile in Firebase Authentication.

3. **Connect Mobile Device**  
   The mobile device is used to capture landmark photos. Use the pairing code and scan the QR code generated on the web dashboard. This establishes a secure session between your mobile device and the web app.

---

## Uploading and Processing a Landmark Image

1. **Scan QR Code & Enter Pairing Code**  
   On your mobile device, open the camera feature and scan the QR code from the web dashboard. Enter the pairing code shown on the web app.

2. **Capture an Image**  
   Once paired, the mobile camera opens and allows you to take a picture of a landmark. Confirm the photo, and it is uploaded to Firebase Storage.

3. **Image Classification**  
   The image is processed by the Google Vision API. It detects the name of the landmark, location coordinates (latitude and longitude), and stores metadata about the photo.

---

## Getting Travel Data

1. **Flight Information**  
   The landmark coordinates are passed to the Amadeus or Skyscanner API. The app fetches flight data from your current location (e.g., ATL) to the nearest international airport near the landmark (e.g., DEL for the Taj Mahal). The information includes airline name, price, flight duration, number of stops, and flight number.

2. **Hotel Information**  
   The same coordinates are used to search for hotels using the Amadeus API. Hotel results include hotel name, address, rating, and cost. Filters allow you to sort by rating, price, and distance.

3. **Map Preview**  
   Google Maps API is used to place a pin on the recognized location. You can use it to get directions via walking, driving, or public transportation.

---

## Saving and Viewing Trips

1. **Save Trip**  
   After selecting your preferred hotel and flight, click "Save Trip." The app saves the landmark name, flight details, hotel details, and image metadata to your user account in Firebase Firestore.

2. **View Saved Trips**  
   On the dashboard, your saved trips are shown at the bottom. Each trip includes the landmark name, saved date, landmark image, flight details (departure, arrival, airline), and hotel information (name, rating, address).

3. **Trip Management**  
   Trips are displayed using expandable containers. Click to expand and review trip details. Currently, trips cannot be edited after saving.

---

## Limitations

- The app may not recognize less-known or low-quality images.
- API limits from services like Amadeus may restrict heavy usage.
- Email-based itinerary delivery is not currently available.
- The mobile version (React Native) is not yet supported due to compatibility issues with certain libraries.

---

## Contact and Support

For issues or feedback, please contact the project team via the support form on the website or through the GitHub repository.
