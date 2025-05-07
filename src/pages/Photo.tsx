import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Sun, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Photo: React.FC = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Please select an image smaller than 10MB.');
        return;
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setSelectedFile(file);
    }
  };

  const handleRetake = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContinue = () => {
    if (selectedFile) {
      // Store the file in sessionStorage for the uploading page
      sessionStorage.setItem('selectedPhotoFile', JSON.stringify({
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        lastModified: selectedFile.lastModified
      }));
      
      // Store the preview URL for display
      sessionStorage.setItem('photoPreviewUrl', previewUrl || '');
      
      navigate('/uploading');
    }
  };

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/')}
            className="mb-8 flex items-center text-gray-600 hover:text-rose-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to home
          </button>
          
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Take Your Selfie
            </h1>

            {!previewUrl ? (
              <>
                <div className="mb-8 space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-lg">
                    <div className="flex-shrink-0 text-amber-500">
                      <Sun size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">Natural Light is Key!</h3>
                      <p className="mt-1 text-sm text-amber-800">
                        Stand near a window or in a well-lit room with natural daylight for the most accurate results.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 text-blue-500">
                      <Camera size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-900">Photo Tips:</h3>
                      <ul className="mt-2 text-sm text-blue-800 space-y-2">
                        <li>• Face the light source directly</li>
                        <li>• Hold camera at arm's length</li>
                        <li>• Keep your face centered</li>
                        <li>• Remove any makeup if possible</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-rose-50 rounded-lg">
                    <div className="flex-shrink-0 text-rose-500">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-rose-900">Before you start:</h3>
                      <p className="mt-1 text-sm text-rose-800">
                        Make sure you're in a well-lit area with natural daylight for the most accurate skin tone analysis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileChange}
                    className="hidden"
                    id="camera"
                  />
                  <button
                    onClick={openCamera}
                    className="w-full py-4 bg-rose-600 text-white text-center text-lg font-medium rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center"
                  >
                    <Camera size={24} className="mr-2" />
                    Take Selfie
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={previewUrl}
                    alt="Preview of your selfie for foundation matching"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleRetake}
                    className="py-4 bg-gray-200 text-gray-800 text-lg font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Retake Photo
                  </button>
                  <button
                    onClick={handleContinue}
                    className="py-4 bg-rose-600 text-white text-lg font-medium rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Photo;