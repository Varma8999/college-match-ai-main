import requests
import json

payload = {
    "rank": 100,
    "budget": 500000,
    "location": "Maharashtra",
    "course": "Computer Science",
    "preferred_type": "Government"
}

try:
    response = requests.post("http://localhost:8000/recommend", json=payload)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
