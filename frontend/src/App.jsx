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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FaHome className="text-xl text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">
                  House Price Predictor
                </h1>
                <p className="text-xs text-gray-500">
                  Machine Learning Price Estimation
                </p>
              </div>
            </div>

            {/* Server Status */}
            {serverStatus && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${serverStatus.status === 'healthy'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                    }`}
                />
                <span className="text-xs text-gray-600 hidden sm:block">
                  {serverStatus.status === 'healthy' ? 'Connected' : 'Offline'}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Model Info */}
        <div className="mb-5">
          <ModelInfo />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column - Form */}
          <div>
            <PredictionForm onPredictionComplete={handlePredictionComplete} />
          </div>

          {/* Right Column - Result */}
          <div id="result-section">
            {predictionResult ? (
              <PredictionResult result={predictionResult} />
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                    <FaHome className="text-2xl text-gray-400" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    No Prediction Yet
                  </h3>
                  <p className="text-sm text-gray-500">
                    Enter property details to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              About This Tool
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-indigo-600">AI</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    ML Powered
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Advanced algorithms trained on 10,000+ properties
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">⚡</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Instant Results
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Get predictions in less than a second
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">📊</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Data Driven
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Based on comprehensive market analysis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-600">
                © 2025 House Price Predictor. Educational project.
              </p>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
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








