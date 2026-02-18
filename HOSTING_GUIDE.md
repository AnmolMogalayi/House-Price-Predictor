# 🚀 Hosting Guide: Free Tier (Render + Vercel)

## Phase 1: Backend Deployment (Render.com)

### Step 1: Prepare Backend for Production

1. Update `backend/config/settings.py`:

```python
# Add your Render domain
ALLOWED_HOSTS = ['*.onrender.com', 'localhost', '127.0.0.1']

# Disable debug in production
DEBUG = False  # Change this

# Add WhiteNoise for static files
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    'corsheaders.middleware.CorsMiddleware',
    ...
]

# CORS for Vercel frontend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://*.vercel.app",  # Add this for Vercel
]

STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Add this
```

2. Install production dependencies:
```bash
pip install whitenoise gunicorn
pip freeze > backend/requirements.txt
```

3. Create `backend/Procfile`:
```
web: gunicorn config.wsgi
```

4. Create `backend/render.yaml`:
```yaml
services:
  - type: web
    name: house-price-api
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt && python manage.py migrate
    startCommand: gunicorn config.wsgi
    envVars:
      - key: DEBUG
        value: "False"
      - key: ALLOWED_HOSTS
        value: ".onrender.com"
```

### Step 2: Deploy Backend to Render

1. Go to **render.com** → Sign up
2. Click **New +** → **Web Service**
3. Connect your GitHub repo
4. Fill in:
   - **Name:** `house-price-api`
   - **Branch:** `main`
   - **Build Command:** `pip install -r backend/requirements.txt && python backend/manage.py migrate`
   - **Start Command:** `cd backend && gunicorn config.wsgi`
   - **Instance Type:** Free
5. Click **Deploy**

⏳ Wait 5-10 min. You'll get a URL like: `https://house-price-api.onrender.com`

---

## Phase 2: Frontend Deployment (Vercel)

### Step 1: Update Frontend API URL

Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

// Or for production:
const API_BASE_URL = 'https://house-price-api.onrender.com/api';
```

### Step 2: Deploy Frontend to Vercel

1. Go to **vercel.com** → Sign up with GitHub
2. Click **Add New...** → **Project**
3. Select your GitHub repo
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://house-price-api.onrender.com/api`
6. Click **Deploy**

⏳ Wait 2-3 min. You'll get a URL like: `https://house-price-predictor.vercel.app`

---

## Phase 3: Test Live App

1. Open your Vercel URL
2. Try making a prediction
3. Check browser console for errors (F12)

If API calls fail:
- Check Render backend is running (visit `https://house-price-api.onrender.com/api/health/` in browser)
- Verify CORS is set correctly

---

## 📝 Important Notes

**ML Models:** ✅ Already included in repo → deploy automatically  
**Database:** SQLite file persists in Render's ephemeral storage (data lost if you redeploy)  
**Free Tier Limits:** Render spins down after 15 min inactivity (first request = slow)

---

## Next Steps After Deployment

Want to upgrade to paid? I can help you move to Railway/Render paid tier for persistent database.

---

**Ready?** Let me know once you've completed each phase and I'll help debug any issues!
