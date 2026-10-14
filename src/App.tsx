import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AboutBanner } from './components/AboutBanner';
import { GlassCardSection } from './components/GlassCardSection';
import { VoyantEye } from '../hero-video/divisions/VoyantEye';
import { KhanzMotors } from '../hero-video/divisions/KhanzMotors';
import Minal from '../hero-video/divisions/Minal';
import ThatsItPage from '../hero-video/divisions/ThatsItPage';
import KzoTech from '../hero-video/divisions/KzoTech';

const Home = () => (
  <div id="app-root" className="min-h-screen w-full bg-[#05070a] text-white flex flex-col">
    <Navbar />
    <main className="w-full flex-1 flex flex-col justify-start">
      <AboutBanner />
      <GlassCardSection />
    </main>
  </div>
);

const CrypfoRedirect = () => {
  React.useEffect(() => {
    window.location.href = '/hero-video/divisions/crypfo.html';
  }, []);
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-[#c8dfc3] font-sans">
      <p className="tracking-widest uppercase text-sm">Opening Crypfo Platform...</p>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/divisions/crypfo" element={<CrypfoRedirect />} />
      <Route path="/divisions/voyant-eye" element={<VoyantEye />} />
      <Route path="/divisions/khanz-motors" element={<KhanzMotors />} />
      <Route path="/divisions/minal" element={<Minal />} />
      <Route path="/divisions/thats-it/*" element={<ThatsItPage />} />
      <Route path="/divisions/thats-it" element={<ThatsItPage />} />
      <Route path="/divisions/ThatsitPage/*" element={<ThatsItPage />} />
      <Route path="/divisions/ThatsitPage" element={<ThatsItPage />} />
      <Route path="/divisions/thatsit/*" element={<ThatsItPage />} />
      <Route path="/divisions/thatsit" element={<ThatsItPage />} />
      <Route path="/divisions/kash-electronics" element={<KzoTech />} />
      <Route path="/divisions/kzo-tech" element={<KzoTech />} />
      <Route path="/businesses/kash-electronics" element={<KzoTech />} />
    </Routes>
  );
}
