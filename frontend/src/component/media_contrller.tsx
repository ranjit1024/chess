import React, { useState } from 'react';

// Reusable Button Component for cleaner code
interface ControlButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}

export function ControlButton({ isActive, onClick, children, label }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-in-out
        ${isActive
          ? "bg-zinc-800 text-white hover:bg-zinc-700" // ON State: Neutral/Dark
          : "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600" // OFF State: Red (High alert)
        }
        hover:scale-110 active:scale-95
      `}
    >
      {children}
    </button>
  );
}