from flask import Blueprint, request, jsonify
from database import db, Exam
from sqlalchemy import text
from config import Config
import psycopg2

routes = Blueprint('routes', __name__)

@routes.route('/')
def index():
    try:
        db.session.execute(text('SELECT 1'))
        return "Connection successful"
    except Exception as e:
        return f"Connection Failed: {str(e)}"
    
@routes.route('/search', methods = ['GET'])
def search():
   
    query = request.args.get('q', '').strip().lower()
    
    if query:
        exams = Exam.query.filter(Exam.section.ilike(f"%{query}%")).all()
    else:
        exams = Exam.query.all()  # If no query, return all exams
    
    json_exams = [exam.to_json() for exam in exams]
    return jsonify({"exams": json_exams})

    
    
@routes.route('/search/results', methods = ['GET'])
def results():
    return jsonify({'message': 'Hello from results'}), 200

@routes.route('/viewClasses', methods = ['GET'])
def view():
    return jsonify({'message': 'Hello from view'}), 200