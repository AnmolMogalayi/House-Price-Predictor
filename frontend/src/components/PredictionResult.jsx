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
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <FaCheckCircle className="text-lg text-green-600" />
                <div>
                    <h2 className="text-base font-semibold text-gray-900">
                        Prediction Complete
                    </h2>
                    <p className="text-xs text-gray-500">
                        AI-powered analysis
                    </p>
                </div>
            </div>

            {/* Predicted Price */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 mb-4">
                <div className="text-xs text-gray-600 mb-1">Estimated Value</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formattedPrice}
                </div>
                <div className="text-xs text-gray-500">
                    Based on current market data
                </div>
            </div>

            {/* Model Information */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-2">
                        <FaCog className="text-xs text-gray-500" />
                        <div className="text-xs text-gray-500">ML Algorithm</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900 truncate">
                        {data.model_name}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-2">
                        <FaChartLine className="text-xs text-gray-500" />
                        <div className="text-xs text-gray-500">Confidence</div>
                    </div>

                    <div className="text-sm font-semibold text-gray-900">
                        {confidencePercentage}%
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${confidencePercentage}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Features Summary */}
            <div className="border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-500 mb-3">Property Summary</div>

                <div className="grid grid-cols-4 gap-3 text-center">
                    <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">Size</div>
                        <div className="text-sm font-semibold text-gray-900">
                            {data.features_used.square_feet.toLocaleString()} ft²
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">Beds</div>
                        <div className="text-sm font-semibold text-gray-900">
                            {data.features_used.bedrooms}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">Baths</div>
                        <div className="text-sm font-semibold text-gray-900">
                            {data.features_used.bathrooms}
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded p-2">
                        <div className="text-xs text-gray-500">Age</div>
                        <div className="text-sm font-semibold text-gray-900">
                            {data.features_used.age_years} yrs
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-md p-3">
                <p className="text-xs text-amber-900">
                    <strong>Note:</strong> Predictions are estimates based on historical data.
                    Actual prices may vary based on market conditions and property specifics.
                </p>
            </div>
        </div>
    );
};

export default PredictionResult;




