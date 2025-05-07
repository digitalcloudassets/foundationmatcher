import React from 'react';
import { Camera, Clock, Award, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  index: number;
}

const FeatureItem: React.FC<FeatureProps> = ({ icon, title, description, details, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative">
        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100">
          <ul className="space-y-2 text-sm text-gray-600 pl-4">
            {details.map((detail, index) => (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight size={14} className="text-rose-400" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const ProgressStep: React.FC<{ icon: string; text: string; isLast?: boolean; index: number }> = ({ icon, text, isLast, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex items-center"
    >
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-2">
          {icon}
        </div>
        <span className="text-sm text-gray-600 text-center">{text}</span>
      </div>
      {!isLast && (
        <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-rose-200 to-rose-100 mx-2 mt-[-1.5rem]" />
      )}
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Camera size={24} />,
      title: "Quick Photo Analysis",
      description: "Take a selfie and our AI will analyze your unique skin tone and undertones in seconds.",
      details: [
        "Advanced AI color detection",
        "Instant skin tone analysis",
        "Undertone identification",
        "Lighting quality check"
      ]
    },
    {
      icon: <Clock size={24} />,
      title: "30-Second Results",
      description: "Get personalized foundation matches across multiple brands and price points instantly.",
      details: [
        "Real-time processing",
        "Multiple shade options",
        "Price range comparison",
        "Instant recommendations"
      ]
    },
    {
      icon: <Award size={24} />,
      title: "120+ Top Brands",
      description: "We match you with foundations from luxury to drugstore brands, all in one place.",
      details: [
        "Luxury to drugstore options",
        "Verified shade matches",
        "Regular catalog updates",
        "Brand comparison tools"
      ]
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Privacy Guaranteed",
      description: "Your photos are analyzed and then immediately deleted. We never store your images.",
      details: [
        "Secure photo analysis",
        "Instant deletion",
        "GDPR compliant",
        "Data protection guaranteed"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50/50 to-amber-50/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center mb-16">
          <ProgressStep icon="📷" text="Take a photo" index={0} />
          <ProgressStep icon="🎯" text="Get analyzed" index={1} />
          <ProgressStep icon="🛍" text="Match your shade" isLast index={2} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            How ToneMatch Works
          </h2>
          <p className="text-gray-600">
            Our advanced technology makes finding your perfect foundation simple and accurate
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              details={feature.details}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;