import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      {/* Sticky bottom banner ad */}
      <div id="ad-footer" className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-2 text-center">
        {/* AdSense code will go here */}
        <div className="h-[50px] md:h-[90px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Advertisement</p>
        </div>
      </div>

      {/* Add padding to prevent content from being hidden behind the sticky ad */}
      <div className="h-[60px] md:h-[100px]"></div>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                © {currentYear} Foundation Matcher. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;