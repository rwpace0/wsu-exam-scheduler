from flask import Blueprint, request, jsonify
from database import db
from sqlalchemy import text

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    try:
        db.session.execute(text('SELECT 1'))
        return "Connection successful"
    except Exception as e:
        return f"Connection Failed: {str(e)}"
    
