import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingCTA: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.9; // 90vh - height of hero section
      setIsVisible(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hasAnimated]);

  const handleClick = () => {
    navigate('/photo');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            ...(hasAnimated && { scale: [1, 1.1, 1] })
          }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ...(hasAnimated && {
              scale: {
                duration: 0.4,
                times: [0, 0.5, 1],
                repeat: 2,
                repeatType: "reverse",
                ease: "easeOut"
              }
            })
          }}
          onClick={handleClick}
          className="md:hidden fixed bottom-24 left-4 right-4 z-50 bg-rose-600 text-white py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-rose-700 transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <Camera size={20} />
          <span className="font-medium">Get Matched Now</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;