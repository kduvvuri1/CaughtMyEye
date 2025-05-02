import React from 'react';

export default function LoadingSpinner({ fullScreen = false }) {
    const classes = fullScreen 
      ? "fixed inset-0 flex items-center justify-center bg-white/50 z-50" 
      : "flex items-center justify-center";
  
    return (
      <div className={classes}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }