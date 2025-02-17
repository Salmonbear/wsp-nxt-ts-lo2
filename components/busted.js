// Busted.js
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const Busted = ({ 
  initialState = false, 
  title = "Busted Test Component",
  className = "" 
}) => {
  const [isWorking, setIsWorking] = useState(initialState);

  return (
    <div className={`p-4 border rounded-lg shadow-sm max-w-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {isWorking ? (
          <Check className="text-green-500" size={24} />
        ) : (
          <X className="text-red-500" size={24} />
        )}
      </div>
      
      <p className="mb-4 text-gray-600">
        This is a test component to verify your import process is working correctly.
      </p>
      
      <button 
        onClick={() => setIsWorking(!isWorking)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Toggle Status
      </button>
      
      <div className="mt-4 p-2 bg-gray-100 rounded">
        <p className="text-sm">
          Status: {isWorking ? 'Working! ✨' : 'Busted! 💔'}
        </p>
      </div>
    </div>
  );
};

export default Busted;