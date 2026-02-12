from rest_framework import serializers
from .models import PredictionHistory

class HouseFeatureSerializer(serializers.Serializer):
    square_feet = serializers.IntegerField(min_value=100, max_value=100000)
    bedrooms = serializers.IntegerField(min_value=1, max_value=10)
    bathrooms = serializers.IntegerField(min_value=1, max_value=10)
    age_years = serializers.IntegerField(min_value=0, max_value=150)
    garage_spaces = serializers.IntegerField(min_value=0, max_value=5)
    lot_size_sqft = serializers.IntegerField(min_value=500, max_value=50000)
    floors = serializers.IntegerField(min_value=1, max_value=7)
    crime_rate = serializers.FloatField(min_value=0.0, max_value=20.0)
    school_rating = serializers.IntegerField(min_value=1, max_value=10)
    distance_to_city_miles = serializers.FloatField(min_value=0.0, max_value=100.0)
    has_pool = serializers.IntegerField(min_value=0, max_value=1)
    has_fireplace = serializers.IntegerField(min_value=0, max_value=1)
    has_renovated = serializers.IntegerField(min_value=0, max_value=1)
    neighborhood_quality = serializers.IntegerField(min_value=1, max_value=5)

class PredictionResponseSerializer(serializers.Serializer):
    predicted_price = serializers.FloatField()
    model_name = serializers.CharField()
    confidence_score = serializers.FloatField()
    features_used = serializers.DictField()

class PredictionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionHistory
        fields = '__all__'