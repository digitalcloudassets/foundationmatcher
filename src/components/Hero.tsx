import React, { useEffect, useRef } from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrandFilters from './BrandFilters';
import Typed from 'typed.js';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const typedRef = useRef<HTMLSpanElement>(null);
  const typed = useRef<Typed | null>(null);

  useEffect(() => {
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: ['30 Seconds', 'Every Shade', 'Real-Time AI', 'Over 120 Brands'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    }

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  const handleGetMatched = () => {
    navigate('/photo');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50 opacity-70 animate-gradient-shift"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 -left-10 w-[400px] h-[400px] bg-rose-200/30 rounded-full blur-3xl animate-pulse-slow"
        />
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl animate-pulse-slow delay-1000"
        />
      </div>

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Find Your Perfect Foundation in{" "}
            <span className="text-rose-600 relative inline-block">
              <span ref={typedRef}></span>
              <div className="absolute inset-x-0 bottom-0 h-3 bg-rose-200/30 -rotate-1 transform -translate-y-2"></div>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            No more guesswork. Our AI technology analyzes your skin tone and recommends your ideal foundation match across 120+ brands.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <button
              onClick={handleGetMatched}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-rose-600 text-white text-lg font-medium rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-rose-700 transform hover:-translate-y-1"
            >
              <span className="relative flex items-center">
                Get Matched Now
                <ArrowRight className="ml-2 transform transition-transform duration-500 group-hover:translate-x-1" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>

            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 animate-bounce-slow">
              <Camera className="text-rose-600" size={24} />
            </div>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-sm flex items-center justify-center gap-2"
          >
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            Over 2 million women have found their perfect match
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <BrandFilters />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;