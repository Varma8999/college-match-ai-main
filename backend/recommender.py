import pickle
import os

# Load the trained Random Forest model
model_path = os.path.join(os.path.dirname(__file__), "models", "college_recommendation_model.pkl")
try:
    with open(model_path, "rb") as f:
        rf_model = pickle.load(f)
    model_loaded = True
except FileNotFoundError:
    print(f"Warning: Model not found at {model_path}. Using fallback algorithm.")
    rf_model = None
    model_loaded = False


def calculate_score_ml(student, college):
    """
    Use trained Random Forest model to calculate match score.
    """
    # Prepare features for prediction
    rank_match = 1 if student.rank <= college["cutoff_rank"] else 0
    location_match = 1 if student.location.lower().strip() == college["location"].lower().strip() else 0
    
    college_courses = [c.strip().lower() for c in str(college["course"]).split(";")]
    student_course = student.course.lower().strip()
    course_match = 1 if any(student_course in course or course in student_course for course in college_courses) else 0
    
    college_type = college["type"].strip().lower()
    student_type = student.preferred_type.lower().strip()
    type_match = 1 if student_type in college_type or college_type in student_type else 0
    
    # Create feature array
    features = [[
        student.rank,
        student.budget,
        college["cutoff_rank"],
        college["fees"],
        college["placement_rate"],
        location_match,
        course_match,
        type_match
    ]]
    
    # Predict using Random Forest
    score = rf_model.predict(features)[0]
    return round(max(0, min(1, score)), 3)  # Clamp between 0-1


def calculate_score_fallback(student, college):
    """
    Fallback rule-based scoring if model is not available.
    """
    # Rank Eligibility
    if student.rank <= college["cutoff_rank"]:
        rank_score = 1.0
    else:
        rank_score = max(0.3, 1 - ((student.rank - college["cutoff_rank"]) / (college["cutoff_rank"] * 2)))
    
    # Budget Affordability
    if college["fees"] <= student.budget:
        budget_score = 1.0
    else:
        budget_score = max(0.2, student.budget / college["fees"])
    
    # Location Match (Exact Match)
    location_match = college["location"].strip().lower() == student.location.lower().strip()
    location_score = 1.0 if location_match else 0.3
    
    # Course Match (Parse semicolon-separated values)
    college_courses = [c.strip().lower() for c in str(college["course"]).split(";")]
    student_course = student.course.lower().strip()
    course_match = any(student_course in course or course in student_course for course in college_courses)
    course_score = 1.0 if course_match else 0.4
    
    # College Type Preference
    college_type = college["type"].strip().lower()
    student_type = student.preferred_type.lower().strip()
    type_match = student_type in college_type or college_type in student_type
    type_score = 1.0 if type_match else 0.5
    
    # Placement Rate
    placement_rate = min(college["placement_rate"] / 100, 1.0)
    
    # Weighted Score
    final_score = (
        0.35 * rank_score +
        0.20 * location_score +
        0.20 * budget_score +
        0.15 * course_score +
        0.10 * type_score
    )
    
    # Add placement rate as a tiebreaker
    final_score = final_score * (0.85 + 0.15 * placement_rate)
    
    return round(final_score, 3)


def generate_explanation(student, college):
    """Generate detailed explanation for recommendation"""
    college_type = "Government" if "Government" in college["type"] else "Private"
    location_match = college["location"].lower() == student.location.lower()
    
    explanation_parts = []
    
    # Rank match
    if student.rank <= college["cutoff_rank"]:
        explanation_parts.append(f"Your rank ({student.rank}) easily qualifies for cutoff ({college['cutoff_rank']})")
    else:
        explanation_parts.append(f"Your rank ({student.rank}) is above cutoff ({college['cutoff_rank']})")
    
    # Budget match
    fees_in_lakhs = college["fees"] / 100000
    budget_in_lakhs = student.budget / 100000
    if college["fees"] <= student.budget:
        explanation_parts.append(f"Fees (Rs {fees_in_lakhs:.1f}L) within budget (Rs {budget_in_lakhs:.1f}L)")
    else:
        explanation_parts.append(f"Fees (Rs {fees_in_lakhs:.1f}L) slightly exceed budget (Rs {budget_in_lakhs:.1f}L)")
    
    # Location match
    if location_match:
        explanation_parts.append(f"Located in {college['location']} (your preference)")
    else:
        explanation_parts.append(f"Located in {college['location']}")
    
    # Course and placement
    first_course = college['course'].split(';')[0].strip()
    explanation_parts.append(f"Offers {first_course} with {college['placement_rate']}% placement rate")
    explanation_parts.append(f"{college_type} institution")
    
    return " | ".join(explanation_parts)


def get_recommendations(student, df):
    """
    Generate recommendations using trained Random Forest model.
    HARD FILTER by location and exam type (not just soft scoring).
    Falls back to rule-based scoring if model is not available.
    """
    
    # STEP 1: Hard filter by location - ONLY show colleges from the selected state
    location_filtered = df[df["location"].str.lower().str.strip() == student.location.lower().strip()]
    
    if location_filtered.empty:
        # If no colleges found in exact location, show message
        return [{
            "name": "No colleges found",
            "location": student.location,
            "fees": 0,
            "placement_rate": 0,
            "cutoff_rank": 0,
            "type": "",
            "course": "",
            "score": 0,
            "explanation": f"No colleges available in {student.location} for {student.examType}.",
            "prediction_method": "Location Filter"
        }]
    
    # STEP 2: Hard filter by exam type (if exam type is specified in data)
    if "exam_type" in location_filtered.columns:
        exam_filtered = location_filtered[location_filtered["exam_type"].str.contains(student.examType, case=False, na=False)]
        if not exam_filtered.empty:
            location_filtered = exam_filtered
        # If no exam type matches, continue with all colleges from location
    
    recommendations = []
    
    # Choose scoring method
    if model_loaded:
        score_func = calculate_score_ml
        method = "Random Forest ML Model"
    else:
        score_func = calculate_score_fallback
        method = "Rule-Based Algorithm"
    
    # Calculate scores for filtered colleges
    for _, row in location_filtered.iterrows():
        score = score_func(student, row)
        explanation = generate_explanation(student, row)
        
        recommendations.append({
            "name": row["name"],
            "location": row["location"],
            "fees": int(row["fees"]),
            "placement_rate": int(row["placement_rate"]),
            "cutoff_rank": int(row["cutoff_rank"]),
            "type": row["type"],
            "course": row["course"],
            "score": score,
            "explanation": explanation,
            "prediction_method": method
        })
    
    # Sort by score in descending order
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    
    # Return top colleges (up to 5)
    return recommendations[:5]