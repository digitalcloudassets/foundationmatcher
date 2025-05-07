import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdBlock from '../components/AdBlock';

interface Product {
  id: string;
  name: string;
  brand: string;
  shade: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  match: number;
  amazonUrl: string;
}

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate API call to get product recommendations
    const getRecommendations = async () => {
      // Get user preferences from localStorage
      const skinProfile = JSON.parse(localStorage.getItem('skinProfile') || '{}');
      const refinementProfile = JSON.parse(localStorage.getItem('refinementProfile') || '{}');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock product recommendations based on user preferences
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Fit Me Matte + Poreless',
          brand: 'Maybelline',
          shade: '120 Classic Ivory',
          price: 7.99,
          rating: 4.5,
          reviews: 2831,
          description: 'Perfect match for your neutral undertone with medium, buildable coverage.',
          image: 'https://images.pexels.com/photos/2688991/pexels-photo-2688991.jpeg?auto=compress&cs=tinysrgb&w=800',
          match: 98,
          amazonUrl: 'https://www.amazon.com/dp/B00PFCSX6W?tag=foundationmatcher-20'
        },
        {
          id: '2',
          name: 'Pro Filt\'r Soft Matte',
          brand: 'Fenty Beauty',
          shade: '185',
          price: 39.00,
          rating: 4.7,
          reviews: 1523,
          description: 'Long-wearing, light as air texture with buildable medium to full coverage.',
          image: 'https://images.pexels.com/photos/2688992/pexels-photo-2688992.jpeg?auto=compress&cs=tinysrgb&w=800',
          match: 96,
          amazonUrl: 'https://www.amazon.com/dp/B07GL4HLTH?tag=foundationmatcher-20'
        }
      ];

      setProducts(mockProducts);
      setIsLoading(false);
    };

    getRecommendations();
  }, []);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className={i <= rating ? 'text-amber-400 fill-current' : 'text-gray-300'}
        />
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="text-center p-8">
          <Loader2 className="w-12 h-12 text-rose-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Finding your perfect matches...</h2>
          <p className="text-gray-600">We're analyzing thousands of products</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/photo')}
            className="mb-8 flex items-center text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Take another photo
          </button>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
                >
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <div className="aspect-square relative bg-gray-100">
                        <img
                          src={product.image}
                          alt={`${product.brand} ${product.name} ${product.shade}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {product.match}% Match
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/2 p-6 space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-rose-600 font-medium">
                            {product.brand}
                          </span>
                          <div className="flex items-center space-x-1">
                            {renderStars(product.rating)}
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                          {product.name} - {product.shade}
                        </h2>
                        <p className="text-gray-600">
                          {product.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-sm text-gray-600">
                            {product.reviews.toLocaleString()} reviews
                          </div>
                        </div>

                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-4 bg-rose-600 text-white text-center text-lg font-medium rounded-xl hover:bg-rose-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                        >
                          <ShoppingCart size={20} className="mr-2" />
                          Buy on Amazon
                        </a>
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Why this foundation works for you:
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <span className="text-rose-600 mr-2">•</span>
                            Matches your undertone perfectly
                          </li>
                          <li className="flex items-start">
                            <span className="text-rose-600 mr-2">•</span>
                            Provides your preferred coverage level
                          </li>
                          <li className="flex items-start">
                            <span className="text-rose-600 mr-2">•</span>
                            Fits within your budget
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;