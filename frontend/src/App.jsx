import React, { useState, useEffect } from 'react';
import { FaHome, FaGithub } from 'react-icons/fa';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import ModelInfo from './components/ModelInfo';
import api from './services/api';

function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      const response = await api.healthCheck();
      setServerStatus(response);
    } catch (error) {
      setServerStatus({ status: 'offline', error: error.message });
    }
  };

  const handlePredictionComplete = (result) => {
    setPredictionResult(result);
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Global Cold Start Loader */}
      {serverStatus === null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md fade-in">
          <div className="glass-card rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-black/50">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg className="animate-spin h-16 w-16 text-indigo-400" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 pulse-glow">
                Waking up the prediction engine
              </h2>
              <p className="text-sm text-slate-300">
                Cold start in progress. This may take up to 30 seconds.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="glass sticky top-0 z-10 shadow-2xl shadow-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <FaHome className="text-xl text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  House Price Predictor
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  AI-Powered Price Estimation
                </p>
              </div>
            </div>

            {/* Server Status */}
            {serverStatus && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark">
                <div
                  className={`w-2 h-2 rounded-full ${serverStatus.status === 'healthy'
                    ? 'bg-green-400 shadow-lg shadow-green-400/50'
                    : 'bg-red-400 shadow-lg shadow-red-400/50'
                    }`}
                />
                <span className="text-xs text-white font-medium hidden sm:block">
                  {serverStatus.status === 'healthy' ? 'Connected' : 'Offline'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Model Info */}
        <div className="mb-6">
          <ModelInfo />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <PredictionForm onPredictionComplete={handlePredictionComplete} />
          </div>

          {/* Right Column - Result */}
          <div id="result-section" className="transform transition-all duration-300 hover:scale-[1.01]">
            {predictionResult ? (
              <PredictionResult result={predictionResult} />
            ) : (
              <div className="glass-card rounded-2xl p-8 flex items-center justify-center min-h-[400px] shadow-2xl shadow-black/20">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl mb-4 float border border-white/10">
                    <FaHome className="text-3xl text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">
                    No Prediction Yet
                  </h3>
                  <p className="text-sm text-slate-400">
                    Enter property details to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8">
          <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-black/20">
            <h3 className="text-base font-bold text-slate-200 mb-5">
              About This Tool
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex gap-3 p-3 rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 hover:shadow-xl transition-all duration-300 border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">AI</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">
                    ML Powered
                  </h4>
                  <p className="text-xs text-slate-400">
                    Advanced algorithms trained on 10,000+ properties
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 hover:shadow-xl transition-all duration-300 border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">⚡</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">
                    Instant Results
                  </h4>
                  <p className="text-xs text-slate-400">
                    Get predictions in less than a second
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 hover:shadow-xl transition-all duration-300 border border-white/10">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">📊</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 mb-1">
                    Data Driven
                  </h4>
                  <p className="text-xs text-slate-400">
                    Based on comprehensive market analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass mt-12 border-t border-white/10 relative z-10 shadow-2xl shadow-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-400 font-medium">
                © 2026 House Price Predictor. Educational project.
              </p>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors transform hover:scale-110 duration-200"
            >
              <FaGithub className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;








