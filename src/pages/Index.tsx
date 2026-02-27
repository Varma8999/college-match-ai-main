import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import StudentForm from "@/components/StudentForm";
import RecommendationResults from "@/components/RecommendationResults";
import Footer from "@/components/Footer";
import { StudentFormData, College } from "@/types/college";
import { mockColleges } from "@/data/mockData";

const Index = () => {
  const [results, setResults] = useState<College[] | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (data: StudentFormData) => {
    // Simulate AI-powered filtering/sorting
    const sorted = [...mockColleges].sort((a, b) => b.matchScore - a.matchScore);
    setResults(sorted);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={handleGetStarted} />

      <div ref={formRef}>
        <StudentForm onSubmit={handleFormSubmit} />
      </div>

      {results && (
        <div ref={resultsRef}>
          <RecommendationResults colleges={results} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
