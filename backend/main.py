from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from recommender import get_recommendations

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV once
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "data", "colleges.csv")
df = pd.read_csv(file_path, encoding="utf-8-sig")

class StudentInput(BaseModel):
    rank: int
    examType: str  # e.g., "JEE Main", "NEET", "EAMCET"
    budget: float
    location: str
    course: str
    preferred_type: str  # Government or Private

@app.post("/recommend")
def recommend(student: StudentInput):
    results = get_recommendations(student, df)
    return results