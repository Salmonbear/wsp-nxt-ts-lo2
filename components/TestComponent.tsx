import React from 'react';

const TestComponent = ({ message = "Hello, Plasmic!" }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue', fontSize: '18px' }}>
      {message}
    </div>
  );
};

export default TestComponent;
