import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = f"postgresql://postgres:{os.getenv('DB_PASSWORD')}@localhost:5432/exam_scheduler"
    SQLALCHEMY_TRACK_MODIFICATIONS = False