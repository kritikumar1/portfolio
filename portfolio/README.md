# Kriti kumar Pradhan — Portfolio Website

A professional full-stack portfolio website built with Flask (Python) + HTML + CSS + JS.

## 📁 Project Structure

```
portfolio/
├── app.py                  ← Flask backend (main file)
├── requirements.txt        ← Python dependencies
├── templates/
│   └── index.html          ← Main HTML template (Jinja2)
└── static/
    ├── css/
    │   └── style.css       ← All styles
    └── js/
        └── main.js         ← Cursor, animations, contact form
```

## 🚀 Setup & Run

### Step 1 — Install dependencies
```bash
pip install -r requirements.txt
```

### Step 2 — Set up email (so contact form sends to your inbox)

Open `app.py` and update these lines:

```python
YOUR_EMAIL    = "your_real_email@gmail.com"
SMTP_EMAIL    = "your_real_email@gmail.com"
SMTP_PASSWORD = "your_16_char_app_password"
```

**How to get Gmail App Password:**
1. Go to myaccount.google.com
2. Security → 2-Step Verification → turn ON
3. Then go to: Security → App passwords
4. Create a new app password → copy the 16 characters
5. Paste it in SMTP_PASSWORD

### Step 3 — Run the app
```bash
python app.py
```

### Step 4 — Open in browser
```
http://localhost:5000
```

## 🌐 Deploy Free on Render.com

1. Push this folder to GitHub
2. Go to render.com → New Web Service
3. Connect your GitHub repo
4. Set:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
5. Deploy → you get a free live URL!

## ✏️ Customise

All personal details are in `app.py` at the top:
- YOUR_NAME, YOUR_EMAIL, YOUR_GITHUB, YOUR_LINKEDIN, YOUR_CONTRA, YOUR_LOCATION

Change those and the whole website updates automatically.
