from flask import Blueprint, request, jsonify, Response
from database import db, Exam
from sqlalchemy import text
from config import Config
from export import parse_time_range, combine_date_and_time
from ics import Calendar, Event
import pytz
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
        # Common abbreviation mappings for better search
        abbreviation_mappings = {
            'cs': 'cpt_s',
            'cpts': 'cpt_s',
            'computer': 'cpt_s',
            'accounting': 'acctg',
            'acct': 'acctg',
            'math': 'math',
            'mathematics': 'math',
            'english': 'engl',
            'eng': 'engl',
            'biology': 'biol',
            'bio': 'biol',
            'chemistry': 'chem',
            'physics': 'phys',
            'history': 'hist',
            'psychology': 'psyc',
            'psych': 'psyc',
            'economics': 'econ',
            'business': 'bus',
            'management': 'mgmt',
            'marketing': 'mktg',
            'finance': 'fin',
            'statistics': 'stat',
            'engineering': 'engr',
            'nursing': 'nurs',
            'education': 'educ',
            'art': 'art',
            'music': 'mus',
            'theater': 'thtr',
            'philosophy': 'phil',
            'sociology': 'soc',
            'anthropology': 'anth',
            'geography': 'geog',
            'geology': 'geol',
            'political': 'pols',
            'government': 'pols',
            'communications': 'com',
            'journalism': 'jour',
            'foreign': 'forl',
            'language': 'forl'
        }
        
        # Try exact match first
        exams = Exam.query.filter(Exam.section.ilike(f"%{query}%")).all()
        
        # If no results, try abbreviation mappings
        if not exams:
            mapped_query = abbreviation_mappings.get(query, query)
            if mapped_query != query:
                exams = Exam.query.filter(Exam.section.ilike(f"%{mapped_query}%")).all()
        
        # If still no results, try partial matches with common patterns
        if not exams:
            # Try to find sections that start with the query
            exams = Exam.query.filter(Exam.section.ilike(f"{query}%")).all()
            
        # If still no results, try more flexible matching
        if not exams:
            # Split query into parts and search for any part
            query_parts = query.split()
            for part in query_parts:
                if len(part) >= 2:  # Only search for parts with 2+ characters
                    partial_results = Exam.query.filter(Exam.section.ilike(f"%{part}%")).all()
                    if partial_results:
                        exams = partial_results
                        break
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

@routes.route("/export", methods=["GET"])
def export_calendar():
    sections = request.args.getlist("section")
    print("Sections:", sections)  # Debugging line to check the sections received
    if not sections:
        return "No exam sections provided", 400
    
    exams = Exam.query.filter(Exam.section.in_(sections)).all()
    if not exams:
        return "Exams not found", 404
    
    cal = Calendar()
    
    for exam in exams:
        try:
            start_dt, end_dt = combine_date_and_time(exam) 
        
        except Exception as e:
            print(f"Error parsing exam {exam.section}: {e}")  # Debugging
            continue  
        
        event = Event()
        event.name = exam.section
        event.begin = start_dt
        event.end = end_dt
        cal.events.add(event)
    
    ics_content = cal.serialize()
    return Response(ics_content, mimetype="text/calendar",
                    headers={"Content-Disposition": "attachment; filename=wsufinalschedule.ics"})