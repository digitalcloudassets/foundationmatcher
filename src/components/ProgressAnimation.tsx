import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProgressAnimationProps {
  onComplete: () => void;
}

const steps = [
  "Analyzing your skin tone...",
  "Detecting undertone...",
  "Matching to products...",
  "Perfect match found!"
];

const ProgressAnimation: React.FC<ProgressAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev === steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-md px-4">
        <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-rose-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="relative h-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="text-xl text-gray-900 font-medium text-center">
                {steps[currentStep]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressAnimation;