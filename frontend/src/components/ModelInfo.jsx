import React, { useState, useEffect } from 'react';
import { FaBrain, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';

const ModelInfo = () => {
    const [modelInfo, setModelInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModelInfo();
    }, []);

    const fetchModelInfo = async () => {
        try {
            const response = await api.getModelInfo();
            setModelInfo(response.data);
        } catch (error) {
            console.error('Error fetching model info:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="glass-card rounded-2xl p-5 animate-pulse shadow-2xl shadow-black/20">
                <div className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-40 mb-4"></div>
                <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg w-56"></div>
            </div>
        );
    }

    if (!modelInfo) return null;

    return (
        <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-black/20">

            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <FaBrain className="text-lg text-white" />
                    </div>
                    <h2 className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Model Performance
                    </h2>
                </div>

                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-gradient-to-br from-green-900/40 to-emerald-900/40 px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-lg backdrop-blur-sm">
                    <FaCheckCircle className="text-xs" />
                    Active
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl p-4 border border-indigo-500/20 hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-slate-400 mb-2">Algorithm</div>
                    <div className="text-sm font-bold text-slate-200 truncate">
                        {modelInfo.model_name}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-xl p-4 border border-green-500/20 hover:shadow-xl hover:border-green-500/40 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-slate-400 mb-2">Accuracy (R²)</div>
                    <div className="text-sm font-bold text-slate-200">
                        {(modelInfo.test_r2_score * 100).toFixed(1)}%
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 rounded-xl p-4 border border-amber-500/20 hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-slate-400 mb-2">Error (RMSE)</div>
                    <div className="text-sm font-bold text-slate-200">
                        ${(modelInfo.test_rmse / 1000).toFixed(0)}k
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 rounded-xl p-4 border border-blue-500/20 hover:shadow-xl hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-xs font-semibold text-slate-400 mb-2">Training Set</div>
                    <div className="text-sm font-bold text-slate-200">
                        {(modelInfo.training_samples / 1000).toFixed(1)}k houses
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-300 mb-3">
                    Input Features ({modelInfo.features.length})
                </div>
                <div className="flex flex-wrap gap-2">
                    {modelInfo.features.map((feature, index) => (
                        <span
                            key={index}
                            className="text-xs font-medium text-slate-300 bg-gradient-to-br from-slate-800/60 to-slate-700/60 px-3 py-1.5 rounded-lg border border-white/10 hover:shadow-lg hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            {feature.replace(/_/g, ' ')}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default ModelInfo;