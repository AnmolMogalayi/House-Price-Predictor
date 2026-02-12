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
            <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
            </div>
        );
    }

    if (!modelInfo) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <FaBrain className="text-lg text-indigo-600" />
                    <h2 className="text-base font-semibold text-gray-900">
                        Model Performance
                    </h2>
                </div>

                <span className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <FaCheckCircle className="text-xs" />
                    Active
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Algorithm</div>
                    <div className="text-sm font-semibold text-gray-900 truncate">
                        {modelInfo.model_name}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Accuracy (R²)</div>
                    <div className="text-sm font-semibold text-gray-900">
                        {(modelInfo.test_r2_score * 100).toFixed(1)}%
                    </div>
                </div>

                <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Error (RMSE)</div>
                    <div className="text-sm font-semibold text-gray-900">
                        ${(modelInfo.test_rmse / 1000).toFixed(0)}k
                    </div>
                </div>

                <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Training Set</div>
                    <div className="text-sm font-semibold text-gray-900">
                        {(modelInfo.training_samples / 1000).toFixed(1)}k houses
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">
                    Input Features ({modelInfo.features.length})
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {modelInfo.features.map((feature, index) => (
                        <span
                            key={index}
                            className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
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