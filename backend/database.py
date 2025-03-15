from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Accessing the database from pgAdmin
class Exam(db.Model):
    __tablename__ = 'sp25'
    primary = db.Column('Primary', db.String(20))
    term = db.Column('Term', db.Integer)
    campus = db.Column('Campus', db.String(50))
    section = db.Column('Section', db.String(50), primary_key = True)
    day = db.Column('Day', db.Date)
    time = db.Column('Time', db.Text) # change text data type 

    def to_json(self):
        return {
            "primary": self.primary,
            "term": self.term,
            "campus": self.campus,
            "section": self.section,
            "day": self.day.strftime("%Y-%m-%d") if self.day else None,
            "time": self.time
        }