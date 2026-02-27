import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "@/context/FormContext";
import { mockColleges } from "@/data/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import RecommendationResults from "@/components/RecommendationResults";
import Footer from "@/components/Footer";
import { College } from "@/types/college";
import { toast } from "sonner";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData, results, setResults } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Results page loaded - formData:", formData);
    console.log("Results page loaded - results:", results);
    
    // Fetch recommendations from backend if not already done
    if (!results) {
      fetchRecommendations();
    }
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ensure formData is available
      if (!formData.rank || !formData.examType) {
        setError("Form data is incomplete. Please go back and fill the form.");
        setLoading(false);
        return;
      }

      // Prepare data for backend API
      const backendPayload = {
        rank: formData.rank,
        examType: formData.examType || "JEE Main", // Add exam type for filtering
        budget: formData.budgetRange ? formData.budgetRange[1] * 100000 : 500000, // Convert lakhs to rupees
        location: formData.preferredLocation || "Maharashtra",
        course: formData.preferredCourses?.[0] || "Computer Science", // Use first preferred course
        preferred_type: formData.collegeType || "Government",
      };

      console.log("Sending request to backend with payload:", backendPayload);

      const response = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendPayload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

      // Transform backend response to match College interface
      const transformedColleges: College[] = data.map((item: any, index: number) => ({
        id: `college-${index}`,
        name: item.name,
        location: item.location,
        course: item.course || formData.preferredCourses?.[0] || "Computer Science",
        estimatedFees: item.fees ? `₹${(item.fees / 100000).toFixed(1)} L` : "N/A",
        ranking: item.cutoff_rank || 0,
        rating: item.placement_rate ? (item.placement_rate / 10) : 8,
        matchScore: Math.round(item.score * 100), // Convert to percentage
        matchReason: item.explanation || "Good match for your profile",
        description: `${item.name} in ${item.location}`,
        placementStats: {
          avgPackage: "₹8-12 LPA",
          highestPackage: "₹30+ LPA",
          placementRate: `${item.placement_rate || 90}%`,
        },
        feeStructure: {
          tuition: item.fees ? `₹${(item.fees * 0.7 / 100000).toFixed(1)} L` : "N/A",
          hostel: item.fees ? `₹${(item.fees * 0.2 / 100000).toFixed(1)} L` : "N/A",
          other: item.fees ? `₹${(item.fees * 0.1 / 100000).toFixed(1)} L` : "N/A",
          total: item.fees ? `₹${(item.fees / 100000).toFixed(1)} L` : "N/A",
        },
        cutoffTrends: [
          { year: "2023", cutoff: `${item.cutoff_rank}` },
          { year: "2024", cutoff: `${item.cutoff_rank}` },
        ],
        facilities: ["Computer Labs", "Library", "Hostel", "Cafeteria", "Sports"],
        eligibility: `Rank: ${formData.rank} or below`,
        strengths: ["Strong faculty", "Good placements", "Industry connections"],
        budgetFit: item.fees <= (formData.budgetRange?.[1] || 500000) ? "Perfect fit" : "Within budget",
        rankSafety: item.cutoff_rank ? (item.cutoff_rank <= formData.rank ? "Very Safe" : "Moderate") : "Safe",
        type: (item.type?.includes("Government") || formData.collegeType?.includes("Government")) ? "Government" : "Private",
      }));

      setResults(transformedColleges);
      toast.success(`Found ${transformedColleges.length} matching colleges!`);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Using sample data instead.");
      toast.error("Could not reach backend. Showing sample recommendations.");
      // Fallback to mock data
      const sorted = [...mockColleges].sort((a, b) => b.matchScore - a.matchScore);
      setResults(sorted);
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Fetching recommendations...</p>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">No recommendations found</p>
          <Button onClick={() => navigate("/preferences")} className="rounded-xl h-12 px-6">
            Try Different Preferences
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-6xl px-4 py-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Your Recommendations</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Based on your preferences, we found the best colleges for you
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-8 flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/preferences")}
              variant="outline"
              className="rounded-xl border-2 text-base h-12 px-6 hover:border-primary/50 transition-all"
            >
              ← Back to Preferences
            </Button>
            <Button
              onClick={handleStartOver}
              variant="ghost"
              className="rounded-xl text-base h-12 px-6 hover:bg-primary/10 transition-all"
            >
              Start Over
            </Button>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8 text-amber-900 dark:text-amber-100 text-center"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        <RecommendationResults colleges={results} />
      </div>

      <Footer />
    </div>
  );
};

export default ResultsPage;
