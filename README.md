# KeyGenius

KeyGenius is a Google Play ASO intelligence platform for indie game developers. Version 2 fetches Google Play search data and Google Trends signals, computes keyword intelligence scores, and generates recommended titles.

## Project Structure

- `frontend/` - Vite + React 18 + TypeScript + TailwindCSS UI
- `backend/` - FastAPI backend with Google Play and Google Trends analysis

## Run Locally

### Backend
1. `cd backend`
2. `python -m venv .venv` (optional)
3. `.\.venv\Scripts\activate` (Windows PowerShell)
4. `python -m pip install -r requirements.txt`
5. `uvicorn main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Full Flow
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:8000`
- Frontend POSTs to `/api/search`

## Notes

- The backend uses `google-play-scraper` and `pytrends` to fetch real-time signals.
- The scoring engine implements Trend Score, Momentum, Relevancy, Competition Score, and Market Score.
- The frontend exports analysis to CSV and displays keyword, competition, and competitor app insights.
