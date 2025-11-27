from flask import Flask, render_template, request, redirect, url_for
from flask_mail import Mail, Message

app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'pradhankritikumar999@gmail.com'
app.config['MAIL_PASSWORD'] = 'iiqsdpdbmrqtqcuh'
app.config['MAIL_DEFAULT_SENDER'] = 'pradhankritikumar999@gmail.com'

mail = Mail(app)

@app.route("/")
def home():
  return render_template("index.html")
@app.route("/contact", methods=['GET', 'POST'])
def contact():
  if request.method == 'POST':
    name = request.form.get('name')
    email = request.form.get('email')
    message_content = request.form.get('message')
    msg = Message(
        subject=f'New Portfolio Contact from {name}',
        recipients=['pradhankritikumar999@gmail.com'], 
        body=f"""
Name: {name}
Email: {email}
Message:
{message_content}
        """
    )
    try:
        mail.send(msg)
        return redirect(url_for('home') + '#contact') 
    except Exception as e:
        print(f"Mail sending failed: {e}") 
        return "Mail failed to send. Check console for error.", 500
  return render_template("index.html")

app.run(debug = True)
