import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "@/context/FormContext";
import { examTypes } from "@/data/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import WizardNavigation from "@/components/WizardNavigation";

const UserInfoPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm();
  
  const [rank, setRank] = useState(formData.rank?.toString() || "");
  const [examType, setExamType] = useState(formData.examType || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!rank || isNaN(Number(rank)) || Number(rank) <= 0) {
      newErrors.rank = "Enter a valid rank";
    }
    if (!examType) {
      newErrors.examType = "Select an exam type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    updateFormData({
      rank: Number(rank),
      examType,
    });
    navigate("/preferences");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-5xl font-bold mb-3">Your Exam Details</h1>
            <p className="text-lg text-muted-foreground">Step 1 of 3 - Tell us about your entrance exam</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-3xl shadow-elevated p-8 space-y-8 glass-effect border border-primary/10"
          >
            {/* Exam Type */}
            <div className="space-y-2">
              <Label htmlFor="examType" className="text-lg font-semibold">
                Entrance Exam Type
              </Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger className={`h-14 text-base rounded-xl border-2 transition-all ${errors.examType ? "border-destructive" : "border-border hover:border-primary/50"}`}>
                  <SelectValue placeholder="Select your entrance exam" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.examType && (
                <p className="text-sm text-destructive">{errors.examType}</p>
              )}
            </div>

            {/* Rank */}
            <div className="space-y-2">
              <Label htmlFor="rank" className="text-lg font-semibold">
                Your Entrance Exam Rank
              </Label>
              <Input
                id="rank"
                type="number"
                placeholder="e.g. 1500"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className={`h-14 text-base rounded-xl border-2 transition-all ${errors.rank ? "border-destructive" : "border-border hover:border-primary/50"}`}
              />
              {errors.rank && (
                <p className="text-sm text-destructive">{errors.rank}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <WizardNavigation onBack={handleBack} onNext={handleNext} step={1} />
    </div>
  );
};

export default UserInfoPage;
