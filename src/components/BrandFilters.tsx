import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Shade {
  name: string;
  code: string;
  undertone: 'Warm' | 'Cool' | 'Neutral';
  hex: string;
}

interface Brand {
  name: string;
  displayName: string;
  shades: Shade[];
}

const brands: Brand[] = [
  {
    name: 'Fenty',
    displayName: 'FENTY BEAUTY',
    shades: [
      { name: 'Pro Filtr', code: '185', undertone: 'Neutral', hex: '#E5B590' },
      { name: 'Pro Filtr', code: '235', undertone: 'Warm', hex: '#D4A072' },
      { name: 'Pro Filtr', code: '310', undertone: 'Cool', hex: '#C68B59' },
      { name: 'Pro Filtr', code: '420', undertone: 'Neutral', hex: '#8E5B3E' },
    ]
  },
  {
    name: 'MAC',
    displayName: 'M·A·C',
    shades: [
      { name: 'Studio Fix', code: 'NC15', undertone: 'Warm', hex: '#F4D3B5' },
      { name: 'Studio Fix', code: 'NC25', undertone: 'Warm', hex: '#E5C4A4' },
      { name: 'Studio Fix', code: 'NC42', undertone: 'Warm', hex: '#D5A075' },
      { name: 'Studio Fix', code: 'NW45', undertone: 'Cool', hex: '#8E5B3E' },
    ]
  },
  {
    name: 'Dior',
    displayName: 'DIOR',
    shades: [
      { name: 'Forever', code: '1N', undertone: 'Neutral', hex: '#F4D3B5' },
      { name: 'Forever', code: '2N', undertone: 'Neutral', hex: '#DDB590' },
      { name: 'Forever', code: '3W', undertone: 'Warm', hex: '#D4A072' },
      { name: 'Forever', code: '4N', undertone: 'Neutral', hex: '#B67B4F' },
    ]
  },
  {
    name: 'NARS',
    displayName: 'NARS',
    shades: [
      { name: 'Natural Radiant', code: 'Mont Blanc', undertone: 'Neutral', hex: '#F2D5BC' },
      { name: 'Natural Radiant', code: 'Punjab', undertone: 'Warm', hex: '#E4BFA0' },
      { name: 'Natural Radiant', code: 'Syracuse', undertone: 'Warm', hex: '#C68B59' },
      { name: 'Natural Radiant', code: 'Macao', undertone: 'Cool', hex: '#B6815E' },
    ]
  }
];

const BrandFilters: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(selectedBrand === brandName ? null : brandName);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => handleBrandClick(brand.name)}
            className={`relative bg-white/70 backdrop-blur-sm rounded-lg p-4 flex justify-center items-center h-20 shadow-sm transform transition-all duration-300 hover:shadow-md ${
              selectedBrand === brand.name 
                ? 'ring-2 ring-rose-600 shadow-lg -translate-y-1' 
                : 'hover:-translate-y-1'
            }`}
          >
            <span className="text-lg font-semibold tracking-wide text-gray-900">
              {brand.displayName}
            </span>
          </button>
        ))}
      </div>

      {/* Shades Display */}
      {selectedBrand && (
        <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {brands.find(b => b.name === selectedBrand)?.displayName} Shades
            </h3>
            <button
              onClick={() => setSelectedBrand(null)}
              className="text-gray-400 hover:text-rose-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands.find(b => b.name === selectedBrand)?.shades.map((shade, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-full shadow-inner mb-3"
                  style={{ backgroundColor: shade.hex }}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {shade.code}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className={`
                      inline-block px-2 py-1 rounded-full text-xs font-medium
                      ${shade.undertone === 'Warm' ? 'bg-amber-100 text-amber-700' : ''}
                      ${shade.undertone === 'Cool' ? 'bg-blue-100 text-blue-700' : ''}
                      ${shade.undertone === 'Neutral' ? 'bg-gray-100 text-gray-700' : ''}
                    `}>
                      {shade.undertone}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandFilters;