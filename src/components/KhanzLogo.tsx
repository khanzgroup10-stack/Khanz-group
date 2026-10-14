import React from 'react';

interface KhanzLogoProps {
  className?: string;
  height?: number | string;
}

export const KhanzLogo: React.FC<KhanzLogoProps> = ({ 
  className = "h-12 w-auto", 
  height 
}) => {
  return (
    <div 
      id="khanz-brand-logo-container" 
      className={`inline-flex items-center select-none cursor-pointer transition-transform duration-300 hover:opacity-95 ${className}`}
      style={height ? { height } : undefined}
    >
      <img 
        src="/logo.png" 
        alt="KHANZ Group of Companies Logo"
        className="h-full w-auto max-w-full drop-shadow-sm object-contain"
      />
    </div>
  );
};
