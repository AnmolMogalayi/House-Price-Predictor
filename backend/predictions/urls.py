from django.urls import path
from .views import predicted_price, model_info, prediction_history, health_check

urlpatterns = [
    path('predict/', predicted_price, name='predicted_price'),
    path('model-info/', model_info, name='model_info'),
    path('history/', prediction_history, name='prediction_history'),
    path('health/', health_check, name='health_check'),
]   

