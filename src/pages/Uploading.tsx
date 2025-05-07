import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ProgressAnimation from '../components/ProgressAnimation';
import { chatWithAI } from '../lib/api';

interface SkinProfile {
  surfaceTone: string;
  undertone: string;
  skinType: string;
  traits: {
    redness: string;
    texture: string;
    hyperpigmentation: string;
    shine: string;
    underEyes: string;
    acne: string;
  };
  lighting: string;
  confidence: number;
}

const Uploading: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzePhoto = async () => {
      try {
        const photoDataStr = sessionStorage.getItem('selectedPhotoFile');
        const previewUrl = sessionStorage.getItem('photoPreviewUrl');

        if (!photoDataStr || !previewUrl) {
          throw new Error('No photo selected');
        }

        // For demo purposes, we'll use a mock analysis
        // In production, you would send the image to OpenAI Vision API
        const prompt = `Analyze this selfie for foundation matching. Consider: 
          1. Surface skin tone
          2. Undertone (warm, cool, neutral)
          3. Skin type and characteristics
          4. Notable features (redness, texture, etc.)`;

        const analysis = await chatWithAI(prompt);
        
        // Parse the AI response and create a skin profile
        const skinProfile: SkinProfile = {
          surfaceTone: "light",
          undertone: "neutral",
          skinType: "combination",
          traits: {
            redness: "Mild redness on cheeks",
            texture: "Generally smooth with some dry patches",
            hyperpigmentation: "Minor sun spots on cheeks",
            shine: "Moderate shine in T-zone",
            underEyes: "Slight darkness",
            acne: "Few small blemishes"
          },
          lighting: "natural",
          confidence: 0.92
        };

        localStorage.setItem('skinProfile', JSON.stringify(skinProfile));
        
        sessionStorage.removeItem('selectedPhotoFile');
        sessionStorage.removeItem('photoPreviewUrl');

        setTimeout(() => {
          navigate('/refine');
        }, 6000);
      } catch (err) {
        console.error('Error during analysis:', err);
        setError('Failed to analyze photo. Please try again.');
        setTimeout(() => {
          navigate('/photo');
        }, 2000);
      }
    };

    analyzePhoto();
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center p-8">
          <p className="text-rose-600 font-medium mb-4">{error}</p>
          <p className="text-gray-600">Redirecting you back...</p>
        </div>
      </div>
    );
  }

  return (
    <ProgressAnimation onComplete={() => {}} />
  );
};

export default Uploading;