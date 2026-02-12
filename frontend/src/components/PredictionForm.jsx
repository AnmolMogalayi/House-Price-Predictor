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
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <FaHome className="text-lg text-indigo-600" />
                <h2 className="text-base font-semibold text-gray-900">
                    Property Details
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Property Basics */}
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Basic Information
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Square Feet
                            </label>
                            <input
                                type="number"
                                name="square_feet"
                                value={formData.square_feet}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="100"
                                max="10000"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <FaBed className="text-xs text-indigo-600" />
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <FaBath className="text-xs text-indigo-600" />
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Age (Years)
                            </label>
                            <input
                                type="number"
                                name="age_years"
                                value={formData.age_years}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="0"
                                max="150"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <FaCar className="text-xs text-indigo-600" />
                                Garage
                            </label>
                            <input
                                type="number"
                                name="garage_spaces"
                                value={formData.garage_spaces}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="0"
                                max="5"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Lot Size (sq ft)
                            </label>
                            <input
                                type="number"
                                name="lot_size_sqft"
                                value={formData.lot_size_sqft}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="500"
                                max="50000"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                                <MdLayers className="text-xs text-indigo-600" />
                                Floors
                            </label>
                            <input
                                type="number"
                                name="floors"
                                value={formData.floors}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Location & Quality */}
                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                        Location & Quality
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Crime Rate (0–20)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="crime_rate"
                                value={formData.crime_rate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="0"
                                max="20"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                School Rating (1–10)
                            </label>
                            <input
                                type="number"
                                name="school_rating"
                                value={formData.school_rating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="1"
                                max="10"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Distance to City (mi)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="distance_to_city_miles"
                                value={formData.distance_to_city_miles}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="0"
                                max="100"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Neighborhood (1–5)
                            </label>
                            <input
                                type="number"
                                name="neighborhood_quality"
                                value={formData.neighborhood_quality}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                min="1"
                                max="5"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Amenities</h3>

                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="has_pool"
                                checked={formData.has_pool === 1}
                                onChange={(e) =>
                                    setFormData({ ...formData, has_pool: e.target.checked ? 1 : 0 })
                                }
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="flex items-center gap-1.5 text-sm text-gray-700">
                                <FaSwimmingPool className="text-sm text-blue-600" />
                                Pool
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="has_fireplace"
                                checked={formData.has_fireplace === 1}
                                onChange={(e) =>
                                    setFormData({ ...formData, has_fireplace: e.target.checked ? 1 : 0 })
                                }
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="flex items-center gap-1.5 text-sm text-gray-700">
                                <FaFire className="text-sm text-orange-600" />
                                Fireplace
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="has_renovated"
                                checked={formData.has_renovated === 1}
                                onChange={(e) =>
                                    setFormData({ ...formData, has_renovated: e.target.checked ? 1 : 0 })
                                }
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="flex items-center gap-1.5 text-sm text-gray-700">
                                <FaHome className="text-sm text-green-600" />
                                Renovated
                            </span>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PredictionForm;