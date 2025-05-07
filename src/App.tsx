import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Photo from './pages/Photo';
import Uploading from './pages/Uploading';
import Refine from './pages/Refine';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/uploading" element={<Uploading />} />
        <Route path="/refine" element={<Refine />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;