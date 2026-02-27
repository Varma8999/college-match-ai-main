import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Load college data
df = pd.read_csv("data/colleges.csv")

print("Training Random Forest Model for College Recommendations...")
print(f"Dataset shape: {df.shape}")
print(f"Colleges: {df.head()}")

# Prepare features for training
# We'll create synthetic training data based on the colleges dataset
training_data = []

# Generate training examples by creating hypothetical student-college matches
for idx, college in df.iterrows():
    # For each college, create multiple student profiles
    for rank_offset in range(-500, 501, 100):  # Create variations around cutoff
        for budget_offset in range(-2, 3):  # Budget variations
            for location_match in [0, 1]:  # Location match or not
                for course_match in [0, 1]:  # Course match or not
                    for type_match in [0, 1]:  # Type match or not
                        
                        student_rank = max(1, college["cutoff_rank"] + rank_offset)
                        student_budget = college["fees"] + (budget_offset * 100000)
                        
                        # Calculate match score based on criteria
                        rank_score = 1.0 if student_rank <= college["cutoff_rank"] else max(0.3, 1 - ((student_rank - college["cutoff_rank"]) / (college["cutoff_rank"] * 2)))
                        budget_score = 1.0 if student_budget >= college["fees"] else max(0.2, student_budget / college["fees"])
                        location_score = 1.0 if location_match else 0.3
                        course_score = 1.0 if course_match else 0.4
                        type_score = 1.0 if type_match else 0.5
                        
                        placement_rate = min(college["placement_rate"] / 100, 1.0)
                        
                        final_score = (
                            0.35 * rank_score +
                            0.20 * location_score +
                            0.20 * budget_score +
                            0.15 * course_score +
                            0.10 * type_score
                        )
                        final_score = final_score * (0.85 + 0.15 * placement_rate)
                        
                        training_data.append({
                            "student_rank": student_rank,
                            "student_budget": student_budget,
                            "college_cutoff": college["cutoff_rank"],
                            "college_fees": college["fees"],
                            "college_placement": college["placement_rate"],
                            "location_match": location_match,
                            "course_match": course_match,
                            "type_match": type_match,
                            "match_score": final_score
                        })

train_df = pd.DataFrame(training_data)

print(f"\nTraining dataset shape: {train_df.shape}")
print(f"Features:\n{train_df.head()}")

# Prepare features and target
X = train_df[["student_rank", "student_budget", "college_cutoff", "college_fees", 
              "college_placement", "location_match", "course_match", "type_match"]]
y = train_df["match_score"]

# Train Random Forest model
print("\nTraining Random Forest Regressor...")
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1,
    verbose=1
)

model.fit(X, y)

print("\nModel Training Complete!")
print(f"Model Score (R²): {model.score(X, y):.4f}")

# Feature importance
feature_importance = pd.DataFrame({
    "feature": X.columns,
    "importance": model.feature_importances_
}).sort_values("importance", ascending=False)

print("\nFeature Importance:")
print(feature_importance)

# Save the model
model_path = "models/college_recommendation_model.pkl"
os.makedirs("models", exist_ok=True)

with open(model_path, "wb") as f:
    pickle.dump(model, f)

print(f"\nModel saved to {model_path}")
