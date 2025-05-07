import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Demo from '../components/Demo';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Demo />
        <Features />
        <Testimonials />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
};

export default Home;