from flask import Flask, render_template, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime
from dotenv import load_dotenv

# Load all variables from .env file automatically
load_dotenv()

app = Flask(__name__)

# ─────────────────────────────────────────────
#  CONFIG — all values loaded from .env file
#  Never hardcode secrets here!
# ─────────────────────────────────────────────
YOUR_NAME     = os.getenv("YOUR_NAME",     "Kriti kumar Pradhan")
YOUR_EMAIL    = os.getenv("YOUR_EMAIL",    "kritikumarpradhan999@gmail.com")
YOUR_GITHUB   = os.getenv("YOUR_GITHUB",   "https://github.com/kritikumar1")
YOUR_CONTRA   = os.getenv("YOUR_CONTRA",   "https://contra.com/kriti_kumar_pradhan_1iinyhkm")
YOUR_LOCATION = os.getenv("YOUR_LOCATION", "Cuttack, Odisha, India")

SMTP_SERVER   = "smtp.gmail.com"
SMTP_PORT     = 587
SMTP_EMAIL    = os.getenv("SMTP_EMAIL")     # loaded from .env
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # loaded from .env
# ─────────────────────────────────────────────


def send_email(sender_name, sender_email, message):
    """Send contact form email to yourself."""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Contact from Portfolio — {sender_name}"
        msg["From"]    = SMTP_EMAIL
        msg["To"]      = YOUR_EMAIL

        html_body = f"""
        <div style="font-family:monospace;background:#0a0a0f;color:#e8e8f0;padding:40px;border-radius:8px;">
            <h2 style="color:#7cffd4;margin-bottom:24px;">New message from your portfolio</h2>
            <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:12px 0;color:#6b6b80;width:120px;">Name</td>
                    <td style="padding:12px 0;">{sender_name}</td></tr>
                <tr><td style="padding:12px 0;color:#6b6b80;">Email</td>
                    <td style="padding:12px 0;"><a href="mailto:{sender_email}" style="color:#7cffd4;">{sender_email}</a></td></tr>
                <tr><td style="padding:12px 0;color:#6b6b80;vertical-align:top;">Message</td>
                    <td style="padding:12px 0;">{message.replace(chr(10), '<br>')}</td></tr>
                <tr><td style="padding:12px 0;color:#6b6b80;">Received</td>
                    <td style="padding:12px 0;">{datetime.now().strftime('%d %b %Y, %I:%M %p')}</td></tr>
            </table>
            <hr style="border:1px solid #1e1e2e;margin:24px 0;">
            <p style="color:#6b6b80;font-size:12px;">Sent from your portfolio contact form</p>
        </div>
        """
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.sendmail(SMTP_EMAIL, YOUR_EMAIL, msg.as_string())
        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False


# ─── ROUTES ───────────────────────────────────

@app.route("/")
def index():
    context = {
        "name":     YOUR_NAME,
        "email":    YOUR_EMAIL,
        "github":   YOUR_GITHUB,
        "contra":   YOUR_CONTRA,
        "location": YOUR_LOCATION,
    }
    return render_template("index.html", **context)


@app.route("/contact", methods=["POST"])
def contact():
    data    = request.get_json()
    name    = data.get("name", "").strip()
    email   = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "error": "All fields are required."}), 400

    success = send_email(name, email, message)
    if success:
        return jsonify({"success": True, "message": "Message sent! I'll reply within 24 hours."})
    else:
        return jsonify({"success": False, "error": "Could not send email. Please email me directly."}), 500


if __name__ == "__main__":
    app.run(debug=True)
