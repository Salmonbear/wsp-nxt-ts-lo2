// MinimalTest.js
import React from 'react';

const MinimalTest = ({ className = "" }) => {
  return (
    <div className="bg-blue-500 p-4 rounded-lg w-64 shadow-lg text-white">
      <h2 className="text-xl font-bold mb-2">Test Component</h2>
      <p className="text-sm">If you see this with blue background, styles work!</p>
    </div>
  );
};

export default MinimalTest;