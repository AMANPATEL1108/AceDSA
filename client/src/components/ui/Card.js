// src/components/ui/Card.js
import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {children}
    </div>
  );
};

export default Card;