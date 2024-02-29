import React from 'react';
import { Link } from 'react-router-dom'; 

// destructuring errmessage from props
export default function ErrorPage({ errorMessage = '404 Page not found' }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Error</h2>
      <p className="text-lg mb-4">{errorMessage}</p>
      <Link to="/" className="text-blue-500 hover:underline" aria-label="Go to Home">Go to Home</Link>
    </div>
  );
}
