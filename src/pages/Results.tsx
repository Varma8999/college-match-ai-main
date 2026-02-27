import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useForm } from "@/context/FormContext";
import { mockColleges } from "@/data/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import RecommendationResults from "@/components/RecommendationResults";
import Footer from "@/components/Footer";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { formData, results, setResults } = useForm();

  useEffect(() => {
    // Redirect to home if no form data
    if (!formData.examType || !formData.rank) {
      navigate("/info");
      return;
    }

    // Generate recommendations if not already done
    if (!results) {
      const sorted = [...mockColleges].sort((a, b) => b.matchScore - a.matchScore);
      setResults(sorted);
    }
  }, [formData, results, setResults, navigate]);

  const handleStartOver = () => {
    navigate("/");
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading recommendations...</p>
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
        </motion.div>

        <RecommendationResults colleges={results} />
      </div>

      <Footer />
    </div>
  );
};

export default ResultsPage;
