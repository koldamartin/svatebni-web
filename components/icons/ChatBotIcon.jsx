import React from 'react';

export default function ChatBotIcon({ size = 24, ...props }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 512 512" 
      fill="none"
      {...props}
    >
      {/* Robot head background */}
      <rect x="86" y="86" width="340" height="340" rx="60" fill="#6366F1" />
      
      {/* Eyes */}
      <circle cx="180" cy="220" r="40" fill="#22D3EE" />
      <circle cx="332" cy="220" r="40" fill="#22D3EE" />
      
      {/* Mouth */}
      <path d="M180 320H332" stroke="#22D3EE" strokeWidth="20" strokeLinecap="round" />
      
      {/* Antenna */}
      <circle cx="256" cy="60" r="24" fill="#F472B6" />
      <path d="M256 84V140" stroke="#F472B6" strokeWidth="12" strokeLinecap="round" />
      
      {/* Decorative elements */}
      <circle cx="140" cy="400" r="16" fill="#FBBF24" />
      <circle cx="372" cy="400" r="16" fill="#FBBF24" />
      <path d="M140 400H372" stroke="#FBBF24" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
