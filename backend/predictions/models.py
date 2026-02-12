from django.db import models

class PredictionHistory(models.Model):
    square_feet = models.IntegerField()
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    age_years = models.IntegerField()
    garage_spaces = models.IntegerField()
    lot_size_sqft = models.IntegerField()
    floors = models.IntegerField()
    crime_rate = models.FloatField()
    school_rating = models.IntegerField()
    distance_to_city_miles = models.FloatField()
    has_pool = models.IntegerField()
    has_fireplace = models.IntegerField()
    has_renovated = models.IntegerField()
    neighborhood_quality = models.IntegerField()
    predicted_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = "Prediction Histories"

    def __str__(self):
        return f"Prediction %{self.predicted_price:,.2f} - {self.created_at}"
