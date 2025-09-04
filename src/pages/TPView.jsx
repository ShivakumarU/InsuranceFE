import React from 'react';
import NavBar from '../components/NavBar';

const TPView = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      <div className="container mx-auto p-4 pt-6">
        <h1 className="text-2xl font-bold mb-4">Third Party (TP) Claims</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-green-200">
          <p>This is the Third Party (TP) claims view. Content for TP claims will be displayed here.</p>
          {/* Add your TP-specific components and content here */}
        </div>
      </div>
    </div>
  );
};

export default TPView;
