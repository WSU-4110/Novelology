import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export default function Error({ message = '404 Page not found' }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Error</h2>
      <p className="text-lg mb-4">{message}</p>
      <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
    </div>
  );
}
