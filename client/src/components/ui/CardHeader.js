// src/components/ui/CardHeader.js
import React from 'react';

const CardHeader = ({ children }) => {
  return (
    <h3 className="text-xl font-bold text-gray-700 mb-2">
      {children}
    </h3>
  );
};

export default CardHeader;