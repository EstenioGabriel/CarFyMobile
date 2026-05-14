import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <div className="w-full h-screen max-w-md mx-auto bg-white sm:border-x sm:border-gray-200 shadow-xl overflow-hidden relative">
      <RouterProvider router={router} />
    </div>
  );
}
