import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const demoImages = [
  {
    url: "https://i.postimg.cc/xTQM8psf/a-candid-portrait-photograph-of-a-beauti-t-Abr-Qv-YSOa-MDE43-A1g4v-Q-OD9-KWf-Ih-Rd-Kd-TMj-Cd5g-WTw.png",
    shade: "#C68B59",
    match: "Fenty Pro Filt'r - 310",
    description: "Medium-tan with warm undertones",
    alt: "Portrait of a woman with medium-tan skin and warm undertones wearing Fenty foundation"
  },
  {
    url: "https://i.postimg.cc/VLFMC9Tj/a-close-up-portrait-photograph-of-a-beau-my94-AAKWRC-c-DU4dg0a-Uv-Q-3-OPI9mdt-Q4-WMKIH3-XADQg.png",
    shade: "#E5C4A4",
    match: "MAC Studio Fix Fluid - NC25",
    description: "Light-medium with warm undertones",
    alt: "Close-up portrait of a woman with light-medium skin and warm undertones wearing MAC foundation"
  },
  {
    url: "https://i.postimg.cc/6Q8GgkQ0/a-close-up-portrait-photograph-of-a-beau-VFj1-O1l-OTDqzt-HV1-Zq0-Hd-Q-PNHu-Jheq-QTO9fym-JEx-Uw9g.png",
    shade: "#F2D5BC",
    match: "NARS Natural Radiant - Mont Blanc",
    description: "Light with neutral undertones",
    alt: "Portrait of a woman with light skin and neutral undertones wearing NARS foundation"
  },
  {
    url: "https://i.postimg.cc/TPBW6tLX/a-natural-intimate-portrait-photograph-o-1-Csidz5w-RKi-N6-H8-W28-He-A-N0qz-R1-Wh-QGiw-Gt-Calkko-HQ.png",
    shade: "#DDB590",
    match: "Dior Forever - 2N",
    description: "Light-medium with neutral undertones",
    alt: "Natural portrait of a woman with light-medium skin and neutral undertones wearing Dior foundation"
  },
  {
    url: "https://i.postimg.cc/C1fkB3T1/a-natural-intimate-portrait-photograph-o-9t95-J9xa-Sbu-UG7vv-Gf-L6g-c-Ek1dctp-Skunx7v-N56ks-Nw.png",
    shade: "#8E5B3E",
    match: "Fenty Pro Filt'r - 420",
    description: "Deep with warm undertones",
    alt: "Intimate portrait of a woman with deep skin and warm undertones wearing Fenty foundation"
  },
  {
    url: "https://i.postimg.cc/MH7Bt1GJ/a-natural-intimate-portrait-photograph-o-VFyg-Mp8-RR5-Ggbdyvt-FW39-Q-akj-K2-Oet-Tpm-Nx-Jk-ACJi-WA.png",
    shade: "#B67B4F",
    match: "Estée Lauder Double Wear - 4W1 Honey Bronze",
    description: "Medium-deep with warm undertones",
    alt: "Natural portrait of a woman with medium-deep skin and warm undertones wearing Estée Lauder foundation"
  },
  {
    url: "https://i.postimg.cc/26vL8nhL/a-natural-softly-lit-portrait-photograph-Zsa-Lw-TEMQ6-Sw-J7-Ze-UMmy-A-S7v7e-F-k-Sq-2-Iej-Vpo-DE0g.png",
    shade: "#E3B590",
    match: "Charlotte Tilbury Airbrush - 4 Neutral",
    description: "Light-medium with neutral undertones",
    alt: "Softly lit portrait of a woman with light-medium skin and neutral undertones wearing Charlotte Tilbury foundation"
  },
  {
    url: "https://i.postimg.cc/6Qqdw7MC/a-soft-natural-light-portrait-photograph-1v-Nqk-Da6-QAi-bu-Xcp3-Jdqg-i-YUwfjso-RIu-uc-Nk-OL9-gw.png",
    shade: "#F4D3B5",
    match: "Armani Luminous Silk - 3",
    description: "Light with warm undertones",
    alt: "Natural light portrait of a woman with light skin and warm undertones wearing Armani foundation"
  },
  {
    url: "https://i.postimg.cc/jj1yjs1m/a-soft-natural-light-portrait-photograph-z1-Xc-Wv-Tn-SEu1pix0dd-M7-WA-Rnw40-Lyl-Sn2cvbti-f-D2-Yw.png",
    shade: "#D5A075",
    match: "Too Faced Born This Way - Golden",
    description: "Medium with warm undertones",
    alt: "Soft natural portrait of a woman with medium skin and warm undertones wearing Too Faced foundation"
  },
  {
    url: "https://i.postimg.cc/cL43MgyP/a-soft-natural-portrait-photograph-of-a-jou-E5x-Kq-Tp-Ofa-Pp-ZRzrfzg-3-Oi0-Cx-Ef-Tp-Oowi-Y2-Yis4x-Q.png",
    shade: "#E8C3A3",
    match: "Lancôme Teint Idole - 210 Buff N",
    description: "Light-medium with neutral undertones",
    alt: "Natural portrait of a woman with light-medium skin and neutral undertones wearing Lancôme foundation"
  },
  {
    url: "https://i.postimg.cc/1RwD91r7/a-soft-natural-portrait-photograph-of-a-luzi8sk7-Qt6l1-RATc6-Qvg-oeq5gi-WTu-Garb-FWNbr-Oc-Q.png",
    shade: "#B6815E",
    match: "Make Up For Ever HD Skin - Y405",
    description: "Medium-tan with warm undertones",
    alt: "Soft natural portrait of a woman with medium-tan skin and warm undertones wearing Make Up For Ever foundation"
  },
  {
    url: "https://i.postimg.cc/T37DkdT1/a-soft-natural-portrait-photograph-of-a-pj-Ltx-VL6-T-i-SQTG3o-LKu-XA-5c39-IJSRRMm-Px-Dvpye-Do4-A.png",
    shade: "#E4BFA0",
    match: "Rare Beauty Liquid Touch - 170W",
    description: "Light-medium with warm undertones",
    alt: "Natural portrait of a woman with light-medium skin and warm undertones wearing Rare Beauty foundation"
  }
];

const Demo: React.FC = () => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * demoImages.length)
  );
  const currentImage = demoImages[currentImageIndex];

  useEffect(() => {
    // Start animation sequence after a short delay
    const timer = setTimeout(() => setVisible(true), 500);

    // Advance through steps
    const stepTimers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 3000),
      setTimeout(() => setStep(3), 4500)
    ];

    // Rotate images every 10 seconds
    const rotationTimer = setInterval(() => {
      setStep(0);
      setCurrentImageIndex((prev) => (prev + 1) % demoImages.length);
      setTimeout(() => setStep(1), 1500);
      setTimeout(() => setStep(2), 3000);
      setTimeout(() => setStep(3), 4500);
    }, 10000);

    return () => {
      clearTimeout(timer);
      stepTimers.forEach(t => clearTimeout(t));
      clearInterval(rotationTimer);
    };
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50 opacity-70 animate-gradient-shift"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            See how it works
          </h2>
          <p className="text-gray-600">
            Watch our AI analyze and match a foundation in seconds
          </p>
        </div>

        <div className={`max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="aspect-[3/4] relative bg-gray-50">
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Analysis overlay */}
            {step === 1 && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p className="text-lg font-medium">Detecting skin tone...</p>
                </div>
              </div>
            )}

            {/* Matching overlay */}
            {step === 2 && (
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <p className="text-lg font-medium">Matching with top brands...</p>
                </div>
              </div>
            )}

            {/* Shade indicator */}
            {step === 3 && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full shadow-inner" 
                      style={{ backgroundColor: currentImage.shade }}
                    ></div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Detected Shade</p>
                      <p className="text-gray-600">{currentImage.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Result card */}
          {step === 3 && (
            <div className="p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-rose-600 font-medium">Perfect Match Found</p>
                  <h3 className="text-xl font-bold text-gray-900">{currentImage.match}</h3>
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  98% Match
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg shadow-inner" 
                  style={{ backgroundColor: currentImage.shade }}
                ></div>
                <div>
                  <p className="text-gray-600">{currentImage.description}</p>
                  <p className="text-sm text-gray-500">Perfect for your skin tone</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Coverage</span>
                  <span className="font-medium text-gray-900">Medium to Full</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Finish</span>
                  <span className="font-medium text-gray-900">Natural Matte</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;