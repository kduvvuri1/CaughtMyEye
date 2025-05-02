import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PhotographIcon, 
  QrcodeIcon, 
  LocationMarkerIcon 
} from '@heroicons/react/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-green-500">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Discover Landmarks with AI
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Our cutting-edge application helps you identify and explore beautiful landmarks 
            through advanced photo recognition and QR code technology.
          </p>
          
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Link 
              to="/signup" 
              className="btn-primary inline-block px-8 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="btn-secondary inline-block px-8 py-3 text-lg bg-white text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Photo Recognition",
    description: "Upload photos to identify landmarks instantly",
    icon: PhotographIcon
  },
  {
    title: "QR Code Scanning",
    description: "Quickly access landmark information via QR codes",
    icon: QrcodeIcon
  },
  {
    title: "Location Tracking",
    description: "Save and explore your landmark discoveries",
    icon: LocationMarkerIcon
  }
];