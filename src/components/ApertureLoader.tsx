import React from 'react';

export const ApertureLoader: React.FC = () => {
  return (
    <div className="aperture-overlay pointer-events-none">
      <div className="aperture-ring" />
    </div>
  );
};
