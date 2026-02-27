import { motion } from "framer-motion";
import { GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-accent opacity-60" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2 text-base font-semibold text-primary-foreground hover:shadow-floating transition-all">
            <Sparkles className="h-5 w-5" />
            AI-Powered Recommendations
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight mb-8"
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
            onClick={onGetStarted}
            size="lg"
            className="gradient-primary text-primary-foreground px-10 py-7 text-xl rounded-xl shadow-elevated hover:shadow-floating transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Get Started
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 flex items-center justify-center gap-12 text-base text-muted-foreground flex-wrap"
        >
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-medium">500+ Colleges</span>
          </div>
          <div className="h-5 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-secondary" />
            <span className="font-medium">AI Matching</span>
          </div>
          <div className="h-5 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-3">
            <span className="text-success font-bold text-xl">98%</span>
            <span className="font-medium">Accuracy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
