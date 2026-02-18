import React, { useState } from 'react';
import { FaHome, FaBed, FaBath, FaCar, FaSwimmingPool, FaFire } from 'react-icons/fa';
import { MdLayers } from 'react-icons/md';
import api from '../services/api';

const PredictionForm = ({ onPredictionComplete }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        square_feet: 2500,
        bedrooms: 4,
        bathrooms: 3,
        age_years: 10,
        garage_spaces: 2,
        lot_size_sqft: 8000,
        floors: 2,
        crime_rate: 3.5,
        school_rating: 8,
        distance_to_city_miles: 15.0,
        has_pool: 1,
        has_fireplace: 1,
        has_renovated: 1,
        neighborhood_quality: 4,
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseFloat(value) : parseInt(value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await api.predictPrice(formData);
            onPredictionComplete(result);
        } catch (error) {
            alert(`Prediction failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            square_feet: 2500,
            bedrooms: 4,
            bathrooms: 3,
            age_years: 10,
            garage_spaces: 2,
            lot_size_sqft: 8000,
            floors: 2,
            crime_rate: 3.5,
            school_rating: 8,
            distance_to_city_miles: 15.0,
            has_pool: 1,
            has_fireplace: 1,
            has_renovated: 1,
            neighborhood_quality: 4,
        });
    };

    return (
        <div className="glass-card rounded-2xl p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                    <FaHome className="text-lg text-white" />
                </div>
                <h2 className="text-base font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Property Details
                </h2>
            </div>

            {loading && (
                <div className="mb-6 bg-slate-900/60 rounded-2xl p-6 border border-indigo-500/30 relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute inset-0 shimmer"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        <div className="mb-4">
                            <div className="inline-block">
                                <svg className="animate-spin h-12 w-12 text-indigo-400" viewBox="0 0 24 24">
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
                        </div>
                        <p className="text-white text-lg font-semibold mb-2 pulse-glow">
                            Cold starting... please wait a moment
                        </p>
                        <p className="text-slate-300 text-sm">
                            Waking up the prediction engine
                        </p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Property Basics */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></span>
                        Basic Information
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Square Feet
                            </label>
                            <input
                                type="number"
                                name="square_feet"
                                value={formData.square_feet}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="100"
                                max="10000"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                                <FaBed className="text-xs text-indigo-400" />
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                                <FaBath className="text-xs text-indigo-400" />
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Age (Years)
                            </label>
                            <input
                                type="number"
                                name="age_years"
                                value={formData.age_years}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="0"
                                max="150"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                                <FaCar className="text-xs text-indigo-400" />
                                Garage
                            </label>
                            <input
                                type="number"
                                name="garage_spaces"
                                value={formData.garage_spaces}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="0"
                                max="5"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Lot Size (sq ft)
                            </label>
                            <input
                                type="number"
                                name="lot_size_sqft"
                                value={formData.lot_size_sqft}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="500"
                                max="50000"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                                <MdLayers className="text-xs text-indigo-400" />
                                Floors
                            </label>
                            <input
                                type="number"
                                name="floors"
                                value={formData.floors}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Location & Quality */}
                <div className="pt-5 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></span>
                        Location & Quality
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Crime Rate (0–20)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="crime_rate"
                                value={formData.crime_rate}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="0"
                                max="20"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                School Rating (1–10)
                            </label>
                            <input
                                type="number"
                                name="school_rating"
                                value={formData.school_rating}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Distance to City (mi)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="distance_to_city_miles"
                                value={formData.distance_to_city_miles}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Neighborhood (1–5)
                            </label>
                            <input
                                type="number"
                                name="neighborhood_quality"
                                value={formData.neighborhood_quality}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-800/50 backdrop-blur-sm transition-all duration-200 hover:bg-slate-800/70 text-slate-100"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="pt-5 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></span>
                        Amenities
                    </h3>

                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="has_pool"
                                checked={formData.has_pool === 1}
                                onChange={(e) =>
                                    setFormData({ ...formData, has_pool: e.target.checked ? 1 : 0 })
                                }
                                className="w-4 h-4 text-indigo-500 border-white/20 rounded focus:ring-indigo-500 transition-all bg-slate-800/50"
                            />
                            <span className="flex items-center gap-1.5 text-sm text-slate-300 group-hover:text-indigo-400 transition-colors font-medium">
                                <FaSwimmingPool className="text-sm text-blue-400" />
                                Pool
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="has_fireplace"
                                checked={formData.has_fireplace === 1}
                                onChange={(e) =>
                                    setFormData({ ...formData, has_fireplace: e.target.checked ? 1 : 0 })
                                }
                                className="w-4 h-4 text-indigo-500 border-white/20 rounded focus:ring-indigo-500 transition-all bg-slate-800/50"
                            />
                            <span className="flex items-center gap-1.5 text-sm text-slate-300 group-hover:text-indigo-400 transition-colors font-medium">
                                <FaFire className="text-sm text-orange-400" />
                                Fireplace
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="has_renovated"
                                checked={formData.has_renovated === 1}
                                onChange={(e) =>
                                    setFormData({ ...formData, has_renovated: e.target.checked ? 1 : 0 })
                                }
                                className="w-4 h-4 text-indigo-500 border-white/20 rounded focus:ring-indigo-500 transition-all bg-slate-800/50"
                            />
                            <span className="flex items-center gap-1.5 text-sm text-slate-300 group-hover:text-indigo-400 transition-colors font-medium">
                                <FaHome className="text-sm text-green-400" />
                                Renovated
                            </span>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-5">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold py-3 px-4 rounded-xl hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Calculating...
                            </>
                        ) : (
                            'Predict Price'
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                        disabled={loading}
                        className="px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-800/50 border-2 border-white/10 rounded-xl hover:bg-slate-700/50 hover:border-white/20 disabled:opacity-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PredictionForm;