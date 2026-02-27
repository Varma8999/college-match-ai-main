import pandas as pd
from recommender import get_recommendations

# Load college data
df = pd.read_csv("data/colleges.csv")

# Create a simple student input class
class StudentInput:
    def __init__(self, rank, examType, budget, location, course, preferred_type):
        self.rank = rank
        self.examType = examType
        self.budget = budget
        self.location = location
        self.course = course
        self.preferred_type = preferred_type

# Test 1: Telangana + JEE Main
print("=" * 60)
print("Test 1: Telangana + JEE Main (rank 200)")
print("=" * 60)
student1 = StudentInput(
    rank=200,
    examType="JEE Main",
    budget=1500000,
    location="Telangana",
    course="Computer Science",
    preferred_type="Government"
)
results1 = get_recommendations(student1, df)
print(f"\nFound {len(results1)} colleges:")
for college in results1:
    print(f"  - {college['name']} (Score: {college['score']})")

# Test 2: Karnataka + NEET
print("\n" + "=" * 60)
print("Test 2: Karnataka + NEET (rank 500)")
print("=" * 60)
student2 = StudentInput(
    rank=500,
    examType="NEET",
    budget=1000000,
    location="Karnataka",
    course="General",
    preferred_type="Government"
)
results2 = get_recommendations(student2, df)
print(f"\nFound {len(results2)} colleges:")
for college in results2:
    print(f"  - {college['name']} (Score: {college['score']})")

# Test 3: Tamil Nadu + JEE Main
print("\n" + "=" * 60)
print("Test 3: Tamil Nadu + JEE Main (rank 100)")
print("=" * 60)
student3 = StudentInput(
    rank=100,
    examType="JEE Main",
    budget=2000000,
    location="Tamil Nadu",
    course="Computer Science",
    preferred_type="Government"
)
results3 = get_recommendations(student3, df)
print(f"\nFound {len(results3)} colleges:")
for college in results3:
    print(f"  - {college['name']} (Score: {college['score']})")
