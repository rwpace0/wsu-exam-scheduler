from flask import Flask
from flask_cors import CORS
from config import Config
from database import db
from routes import routes

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, origins=["https://wsuexamscheduler.vercel.app"])  # Allow frontend access
db.init_app(app)

app.register_blueprint(routes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)