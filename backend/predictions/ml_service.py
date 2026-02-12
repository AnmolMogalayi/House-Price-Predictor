import os
import pickle
import pandas as pd
from django.conf import settings


class MLModelService:
    _instance = None
    _model = None
    _scaler = None
    _features_names = None
    _metadata = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MLModelService, cls).__new__(cls)
            cls._instance._load_models()
        return cls._instance

    def _load_models(self):
        """Load model, scaler, and metadata from disk"""
        base_path = os.path.join(settings.BASE_DIR, 'predictions', 'ml_models')
        
        try:
            
            # Load model
            with open(os.path.join(base_path, 'house_price_model.pkl'), 'rb') as f:
                self._model = pickle.load(f)

            # Load scaler
            with open(os.path.join(base_path, 'scaler.pkl'), 'rb') as f:
                self._scaler = pickle.load(f)

            # Load Feature names
            with open(os.path.join(base_path, 'feature_names.pkl'), 'rb') as f:
                self._features_names = pickle.load(f)

            # Load metadata
            with open(os.path.join(base_path, 'model_metadata.pkl'), 'rb') as f:
                self._metadata = pickle.load(f)

            print("ML Models loaded successfully")
            print(f"Model: {self._metadata['model_name']}")
            print(f"Test R2 Score: {self._metadata['test_r2']:.4f}")

        except Exception as e:
            print(f"Error loading ML models: {str(e)}")
            raise 

    def predict(self, features_dict):
        try:
            features_df = pd.DataFrame([features_dict])[self._features_names]

            features_scaled = self._scaler.transform(features_df)

            predicted_price = self._model.predict(features_scaled)[0]
    
            confidence = self._metadata['test_r2']

            return {
                'predicted_price': float(predicted_price),
                'model_name': self._metadata['model_name'],
                'confidence_score': float(confidence),
                'features_used': features_dict
            }

        except Exception as e:
            raise Exception (f"Prediction error: {str(e)}")

    def get_model_info(self):
        return {
            'model_name': self._metadata['model_name'],
            'test_r2_score': self._metadata['test_r2'],
            'test_rmse': self._metadata['test_rmse'],
            'test_mae': self._metadata['test_mae'],
            'training_samples': self._metadata['training_samples'],
            'features': self._features_names
        }