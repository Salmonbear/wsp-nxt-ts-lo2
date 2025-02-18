import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import styles from '../styles/Busted.module.css';

interface BustedProps {
  initialState?: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  workingText?: string;
  bustedText?: string;
}

const Busted: React.FC<BustedProps> = ({ 
  initialState = false,
  title = "Status Checker",
  description = "Click the button to toggle the status",
  buttonText = "Toggle Status",
  workingText = "Working! ✨",
  bustedText = "Busted! 💔"
}) => {
  const [isWorking, setIsWorking] = useState(initialState);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {isWorking ? (
          <Check color="#22c55e" size={24} />
        ) : (
          <X color="#ef4444" size={24} />
        )}
      </div>
      
      <p className={styles.description}>
        {description}
      </p>
      
      <button 
        onClick={() => setIsWorking(!isWorking)}
        className={styles.button}
      >
        {buttonText}
      </button>
      
      <div className={styles.statusBox}>
        <p className={styles.statusText}>
          Status: {isWorking ? workingText : bustedText}
        </p>
      </div>
    </div>
  );
};

export default Busted;