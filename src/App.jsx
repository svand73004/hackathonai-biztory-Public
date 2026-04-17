import { useState } from 'react';
import Chatbot from './components/Chatbot';
import ToolSection from './components/ToolSection';
import biztoryLogo from './assets/biztory_logo.png';
import bgPattern from './assets/biztory_rounded_pattern_purple.gif';
import heroVideo from './assets/pixar.mp4';
import penguinLogo from './assets/penguin.png';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans scroll-smooth relative overflow-x-hidden">
      {/* Background GIF Pattern */}
      <div 
        className="fixed -bottom-20 -right-20 w-[60vw] h-[60vh] pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url(${bgPattern})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom right'
        }}
      />

      {/* Header - Fixed Purple Gradient */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-900 p-4 shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={biztoryLogo} alt="Biztory Logo" className="h-10 md:h-12 w-auto object-contain brightness-0 invert" />
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white hidden sm:block">The KNOWELDGE Master</h1>
          </div>
          <nav>
            <ul className="flex space-x-4 md:space-x-6 font-medium">
              <li>
                <a href="#chatbot" className="text-purple-100 hover:text-white transition duration-300 px-3 py-2 rounded-md hover:bg-white/10 text-sm md:text-base">
                  Chatbot
                </a>
              </li>
              <li>
                <a href="#tools" className="text-purple-100 hover:text-white transition duration-300 px-3 py-2 rounded-md hover:bg-white/10 text-sm md:text-base">
                  Tools
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-6 pt-28 md:pt-32 space-y-16 relative z-10">
        
        {/* Hero Video Section */}
        <section className="w-full overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-auto object-cover max-h-[500px]"
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* Chatbot Section */}
        <section id="chatbot" className="bg-gray-100 rounded-3xl shadow-xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <div className="flex items-center gap-3">
              <img src={penguinLogo} alt="Penguin" className="h-10 w-10 object-contain" />
              <h2 className="text-3xl font-bold text-purple-900 tracking-tight">Ask the Penguin!</h2>
            </div>
            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase tracking-wider w-fit">
              Powered by Snowflake
            </div>
          </div>
          <Chatbot />
        </section>

        {/* Tools Showcase Section */}
        <section id="tools" className="bg-gray-100 rounded-3xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold mb-10 text-purple-900 tracking-tight text-center md:text-left">
            What's New in the Data World
          </h2>
          <ToolSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 p-12 text-center border-t border-gray-200 relative z-10 mt-16">
        <div className="container mx-auto">
          <img src={biztoryLogo} alt="Biztory Logo" className="h-10 w-auto mx-auto mb-6 opacity-60 grayscale hover:grayscale-0 transition duration-300" />
          <p className="text-gray-500 text-sm tracking-wide">
            &copy; {new Date().getFullYear()} Biztory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
