import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-accent opacity-60" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full gradient-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            AI-Powered Recommendations
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight mb-6"
        >
          <span className="text-foreground">College Admission</span>
          <br />
          <span className="text-gradient animate-fade-in">Assistance Agent</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Find the best college based on your rank, budget, and preferences
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-muted-foreground/75 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Our AI analyzes thousands of colleges, cutoff trends, and placement data to deliver personalized recommendations tailored just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => navigate("/info")}
            size="lg"
            className="gradient-primary text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-elevated hover:shadow-floating transition-all duration-300 hover:scale-[1.02]"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground flex-wrap"
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Explore Top Colleges</span>
          </div>
          <div className="h-1 w-1 bg-muted-foreground rounded-full hidden sm:block" />
          <span>AI-Powered Matching</span>
          <div className="h-1 w-1 bg-muted-foreground rounded-full hidden sm:block" />
          <span>Personalized Insights</span>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
