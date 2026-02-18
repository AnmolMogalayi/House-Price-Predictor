import React from 'react';
import { FaCheckCircle, FaChartLine, FaCog } from 'react-icons/fa';

const PredictionResult = ({ result }) => {
    if (!result) return null;

    const { data } = result;
    const price = data.predicted_price;
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);

    const confidencePercentage = (data.confidence_score * 100).toFixed(1);

    return (
        <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                    <FaCheckCircle className="text-lg text-white" />
                </div>
                <div>
                    <h2 className="text-base font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Prediction Complete
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                        AI-powered analysis
                    </p>
                </div>
            </div>

            {/* Predicted Price */}
            <div className="bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-pink-900/60 border-2 border-indigo-500/30 rounded-2xl p-6 mb-5 shadow-2xl shadow-indigo-500/20 relative overflow-hidden backdrop-blur-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full filter blur-2xl"></div>
                <div className="relative z-10">
                    <div className="text-xs font-semibold text-indigo-300 mb-2">Estimated Value</div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                        {formattedPrice}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                        Based on current market data
                    </div>
                </div>
            </div>

            {/* Model Information */}
            <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-slate-800/40 rounded-xl p-4 border border-white/10 hover:shadow-xl hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCog className="text-sm text-indigo-400" />
                        <div className="text-xs font-semibold text-slate-400">ML Algorithm</div>
                    </div>
                    <div className="text-sm font-bold text-slate-200 truncate">
                        {data.model_name}
                    </div>
                </div>

                <div className="bg-slate-800/40 rounded-xl p-4 border border-white/10 hover:shadow-xl hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <FaChartLine className="text-sm text-indigo-400" />
                        <div className="text-xs font-semibold text-slate-400">Confidence</div>
                    </div>

                    <div className="text-sm font-bold text-slate-200 mb-2">
                        {confidencePercentage}%
                    </div>

                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500 shadow-lg shadow-indigo-500/50"
                            style={{ width: `${confidencePercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Features Summary */}
            <div className="border-t border-white/10 pt-5">
                <div className="text-xs font-semibold text-slate-300 mb-4">Property Summary</div>

                <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-xl p-3 border border-blue-500/20 hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm">
                        <div className="text-xs font-medium text-slate-400 mb-1">Size</div>
                        <div className="text-sm font-bold text-slate-200">
                            {data.features_used.square_feet.toLocaleString()} ft²
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-3 border border-purple-500/20 hover:shadow-xl hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm">
                        <div className="text-xs font-medium text-slate-400 mb-1">Beds</div>
                        <div className="text-sm font-bold text-slate-200">
                            {data.features_used.bedrooms}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl p-3 border border-green-500/20 hover:shadow-xl hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
                        <div className="text-xs font-medium text-slate-400 mb-1">Baths</div>
                        <div className="text-sm font-bold text-slate-200">
                            {data.features_used.bathrooms}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 rounded-xl p-3 border border-orange-500/20 hover:shadow-xl hover:border-orange-500/40 transition-all duration-300 backdrop-blur-sm">
                        <div className="text-xs font-medium text-slate-400 mb-1">Age</div>
                        <div className="text-sm font-bold text-slate-200">
                            {data.features_used.age_years} yrs
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-5 bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-500/30 rounded-xl p-4 shadow-lg backdrop-blur-sm">
                <p className="text-xs text-amber-200 leading-relaxed">
                    <strong className="font-bold">Note:</strong> Predictions are estimates based on historical data.
                    Actual prices may vary based on market conditions and property specifics.
                </p>
            </div>
        </div>
    );
};

export default PredictionResult;




