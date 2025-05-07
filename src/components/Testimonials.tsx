import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  author: string;
  rating: number;
  image: string;
  match: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "After years of buying the wrong shade, Foundation Matcher found my perfect match on the first try!",
    author: "Sarah L.",
    rating: 5,
    image: "https://i.postimg.cc/xTQM8psf/a-candid-portrait-photograph-of-a-beauti-t-Abr-Qv-YSOa-MDE43-A1g4v-Q-OD9-KWf-Ih-Rd-Kd-TMj-Cd5g-WTw.png",
    match: "Matched with: Fenty Pro Filt'r 310"
  },
  {
    quote: "The app recommended a foundation I would have never picked myself, but it's absolutely perfect.",
    author: "Michelle K.",
    rating: 5,
    image: "https://i.postimg.cc/VLFMC9Tj/a-close-up-portrait-photograph-of-a-beau-my94-AAKWRC-c-DU4dg0a-Uv-Q-3-OPI9mdt-Q4-WMKIH3-XADQg.png",
    match: "Matched with: MAC Studio Fix NC25"
  },
  {
    quote: "I'm amazed by how accurate this is! Saved me so much time and money on returns.",
    author: "Jessica T.",
    rating: 5,
    image: "https://i.postimg.cc/6Q8GgkQ0/a-close-up-portrait-photograph-of-a-beau-VFj1-O1l-OTDqzt-HV1-Zq0-Hd-Q-PNHu-Jheq-QTO9fym-JEx-Uw9g.png",
    match: "Matched with: NARS Natural Radiant Mont Blanc"
  },
  {
    quote: "Finally found my perfect shade after years of trial and error. This app is a game-changer!",
    author: "Emily W.",
    rating: 5,
    image: "https://i.postimg.cc/MH7Bt1GJ/a-natural-intimate-portrait-photograph-o-VFyg-Mp8-RR5-Ggbdyvt-FW39-Q-akj-K2-Oet-Tpm-Nx-Jk-ACJi-WA.png",
    match: "Matched with: Estée Lauder Double Wear 4W1"
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, rating, image, match }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl p-6 shadow-lg mx-4 my-2 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img 
            src={image} 
            alt={`Portrait of ${author} wearing their perfect foundation match`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{author}</h3>
          <p className="text-sm text-rose-600">{match}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? "text-amber-400 fill-current" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <blockquote className="text-gray-700 italic">"{quote}"</blockquote>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 5000);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-amber-50/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600">
            Join over 2 million women who've found their perfect foundation
          </p>
        </motion.div>
        
        <div className="relative max-w-xl mx-auto">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-600 hover:text-rose-600 transition-colors z-10 hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-600 hover:text-rose-600 transition-colors z-10 hidden md:block"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0"
                  >
                    <TestimonialCard {...testimonial} />
                  </div>
                ))}
              </div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-rose-600 w-4' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;