import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface QuizOption {
  id: string;
  label: string;
  description?: string;
}

interface QuizStep {
  question: string;
  options: QuizOption[];
  multiSelect: boolean;
}

const quizSteps: QuizStep[] = [
  {
    question: "What's your skin type? (Select all that apply)",
    multiSelect: true,
    options: [
      { id: 'dry', label: 'Dry', description: 'Feels tight and flaky' },
      { id: 'oily', label: 'Oily', description: 'Shiny and prone to breakouts' },
      { id: 'combination', label: 'Combination', description: 'Oily T-zone, dry cheeks' },
      { id: 'normal', label: 'Normal', description: 'Generally balanced' },
      { id: 'sensitive', label: 'Sensitive', description: 'Easily irritated' },
    ],
  },
  {
    question: "What coverage level do you prefer?",
    multiSelect: true,
    options: [
      { id: 'light', label: 'Light Coverage', description: 'Natural, sheer finish' },
      { id: 'medium', label: 'Medium Coverage', description: 'Balanced coverage' },
      { id: 'full', label: 'Full Coverage', description: 'Maximum coverage' },
    ],
  },
  {
    question: "What kind of finish do you prefer?",
    multiSelect: true,
    options: [
      { id: 'matte', label: 'Matte', description: 'No shine, velvety finish' },
      { id: 'natural', label: 'Natural', description: 'Skin-like finish' },
      { id: 'dewy', label: 'Dewy', description: 'Glowing, radiant finish' },
    ],
  },
  {
    question: "What are you buying this foundation for?",
    multiSelect: true,
    options: [
      { id: 'everyday', label: 'Everyday Wear', description: 'Light, breathable coverage' },
      { id: 'special', label: 'Special Events', description: 'Long-lasting, photo-ready' },
      { id: 'professional', label: 'Professional Setting', description: 'Polished, professional look' },
      { id: 'travel', label: 'Travel', description: 'Versatile, easy to pack' },
    ],
  },
  {
    question: "Do you want to target anything in particular?",
    multiSelect: true,
    options: [
      { id: 'redness', label: 'Redness', description: 'Color-correcting coverage' },
      { id: 'dark-spots', label: 'Dark Spots', description: 'Even skin tone' },
      { id: 'texture', label: 'Texture', description: 'Smooth, pore-blurring' },
      { id: 'fine-lines', label: 'Fine Lines', description: 'Anti-aging benefits' },
      { id: 'none', label: 'None', description: 'Just even coverage' },
    ],
  },
  {
    question: "What's your preferred price range?",
    multiSelect: true,
    options: [
      { id: 'budget', label: 'Budget-Friendly', description: 'Under $20' },
      { id: 'mid-range', label: 'Mid-Range', description: '$20-$45' },
      { id: 'luxury', label: 'Luxury', description: '$45+' },
      { id: 'any', label: 'Show All', description: 'View all price ranges' },
    ],
  },
];

const Refine: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const handleSelect = (optionId: string) => {
    const currentAnswers = answers[currentStep] || [];
    const newStepAnswers = currentAnswers.includes(optionId)
      ? currentAnswers.filter(id => id !== optionId)
      : [...currentAnswers, optionId];

    setAnswers({ ...answers, [currentStep]: newStepAnswers });
  };

  const handleNext = () => {
    if (currentStep === quizSteps.length - 1) {
      handleComplete(answers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = (finalAnswers: Record<number, string[]>) => {
    const refinementProfile = {
      skinType: finalAnswers[0] || [],
      coverage: finalAnswers[1] || [],
      finish: finalAnswers[2] || [],
      purposes: finalAnswers[3] || [],
      concerns: finalAnswers[4] || [],
      priceRange: finalAnswers[5] || [],
    };
    localStorage.setItem('refinementProfile', JSON.stringify(refinementProfile));
    navigate('/results');
  };

  const handleBack = () => {
    if (currentStep === 0) {
      navigate('/uploading');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentAnswers = answers[currentStep] || [];
  const canProceed = currentAnswers.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      <div className="relative h-full min-h-screen flex flex-col">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <div 
            className="h-full bg-rose-600 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / quizSteps.length) * 100}%` }}
          />
        </div>

        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-4 p-2 text-gray-600 hover:text-rose-600 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center p-6 max-w-xl mx-auto w-full">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {quizSteps[currentStep].question}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Step {currentStep + 1} of {quizSteps.length}
            </p>
          </div>

          <div className="space-y-4">
            {quizSteps[currentStep].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full p-6 rounded-xl text-left transition-all duration-300 transform hover:translate-x-1 relative group ${
                  currentAnswers.includes(option.id)
                    ? 'bg-rose-600 text-white shadow-lg'
                    : 'bg-white hover:bg-rose-50 text-gray-900 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{option.label}</h3>
                    {option.description && (
                      <p className={`text-sm ${
                        currentAnswers.includes(option.id)
                          ? 'text-rose-100'
                          : 'text-gray-600'
                      }`}>
                        {option.description}
                      </p>
                    )}
                  </div>
                  {currentAnswers.includes(option.id) ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <ChevronRight
                      size={20}
                      className="text-gray-400 group-hover:text-rose-600 transform transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`mt-8 w-full py-4 rounded-xl font-medium transition-all duration-300 ${
              canProceed
                ? 'bg-rose-600 text-white hover:bg-rose-700 transform hover:-translate-y-1'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentStep === quizSteps.length - 1 ? 'See Results' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Refine;