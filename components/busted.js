import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

// You might want to add these styles to your global CSS file
const styles = {
  container: {
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '400px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: '600'
  },
  description: {
    marginBottom: '16px',
    color: '#4b5563'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  },
  status: {
    marginTop: '16px',
    padding: '8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px'
  },
  statusText: {
    fontSize: '0.875rem'
  }
};

const Busted = ({ 
  initialState = false,
  title = "Status Checker",
  description = "Click the button to toggle the status",
  buttonText = "Toggle Status",
  workingText = "Working! ✨",
  bustedText = "Busted! 💔",
  className = ""
}) => {
  const [isWorking, setIsWorking] = useState(initialState);

  return (
    <div style={{...styles.container}}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        {isWorking ? (
          <Check color="#22c55e" size={24} />
        ) : (
          <X color="#ef4444" size={24} />
        )}
      </div>
      
      <p style={styles.description}>
        {description}
      </p>
      
      <button 
        onClick={() => setIsWorking(!isWorking)}
        style={styles.button}
      >
        {buttonText}
      </button>
      
      <div style={styles.status}>
        <p style={styles.statusText}>
          Status: {isWorking ? workingText : bustedText}
        </p>
      </div>
    </div>
  );
};

export default Busted;