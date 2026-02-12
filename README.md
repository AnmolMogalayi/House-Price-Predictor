# House Price Predictor

![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=26&duration=2400&pause=700&color=0EA5E9&vCenter=true&center=true&width=900&lines=House+Price+Predictor;Django+%2B+DRF+Backend+%7C+React+%2B+Vite+Frontend;ML-powered+price+estimates+with+real-time+UI)

A full-stack house price prediction app. The backend serves a trained ML model via a Django REST API, and the frontend delivers a fast, responsive UI for entering property details and viewing predictions.

## Highlights

- End-to-end flow: form input -> API -> model inference -> UI result
- Django REST API with health, model info, prediction, and history endpoints
- React + Vite frontend with Tailwind UI components
- Model artifacts loaded once and reused per request

## Tech Stack

- Backend: Django, Django REST Framework, scikit-learn, pandas
- Frontend: React, Vite, Tailwind CSS, axios
- Storage: SQLite (prediction history)

## Project Structure

```
backend/
  config/           # Django settings and URL routing
  predictions/      # API + ML service
  db.sqlite3
frontend/
  src/              # React app
  public/
train and test/
  house_data.csv
  Model Training And Testing.ipynb
```

## API Endpoints

Base URL: http://127.0.0.1:8000/api

- POST /predict/         -> Predict house price
- GET  /model-info/      -> Model metadata (R2, RMSE, features)
- GET  /history/?limit=  -> Recent prediction history
- GET  /health/          -> Health check

## Quick Start

### 1) Backend (Django)

```bash
cd backend
python -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2) Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Open the UI at: http://localhost:3000

## Environment Notes

- The frontend expects the API at http://127.0.0.1:8000/api
- CORS is enabled for http://localhost:3000

## Model Files

The ML service loads these from backend/predictions/ml_models:

- house_price_model.pkl
- scaler.pkl
- feature_names.pkl
- model_metadata.pkl

## Development Tips

- If the UI looks unstyled, make sure Tailwind is installed and `npm run dev` is restarted.
- If API calls fail, verify the Django server is running and the endpoint is reachable.

## License

MIT
