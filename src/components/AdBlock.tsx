import React from 'react';

interface AdBlockProps {
  className?: string;
}

const AdBlock: React.FC<AdBlockProps> = ({ className = '' }) => {
  return (
    <div id="ad-inline" className={`my-8 mx-auto ${className}`}>
      {/* AdSense code will go here */}
      <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[250px]">
        <p className="text-gray-400 text-sm">Advertisement</p>
      </div>
    </div>
  );
};

export default AdBlock;