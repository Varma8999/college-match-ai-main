import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useForm } from "@/context/FormContext";
import { courses, locations } from "@/data/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import WizardNavigation from "@/components/WizardNavigation";

const PreferencesPage = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useForm();

  const [selectedCourses, setSelectedCourses] = useState<string[]>(formData.preferredCourses || []);
  const [budgetRange, setBudgetRange] = useState<[number, number]>(formData.budgetRange || [1, 15]);
  const [location, setLocation] = useState(formData.preferredLocation || "");
  const [collegeType, setCollegeType] = useState(formData.collegeType || "");
  const [hostelRequired, setHostelRequired] = useState(formData.hostelRequired || false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (selectedCourses.length === 0) newErrors.courses = "Select at least one course";
    if (!location) newErrors.location = "Select a location";
    if (!collegeType) newErrors.collegeType = "Select college type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    updateFormData({
      preferredCourses: selectedCourses,
      budgetRange,
      preferredLocation: location,
      collegeType,
      hostelRequired,
    });
    navigate("/results");
  };

  const handleBack = () => {
    navigate("/info");
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
            <h1 className="text-5xl font-bold mb-3">Your Preferences</h1>
            <p className="text-lg text-muted-foreground">Step 2 of 3 - Tell us what you're looking for</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-3xl shadow-elevated p-8 space-y-8 glass-effect border border-primary/10"
          >
            {/* Courses */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Preferred Course / Branch</Label>
              <div className="flex flex-wrap gap-3">
                {courses.map((c) => (
                  <Badge
                    key={c}
                    variant={selectedCourses.includes(c) ? "default" : "outline"}
                    className={`cursor-pointer transition-all text-base py-3 px-4 rounded-xl hover:scale-105 active:scale-95 ${
                      selectedCourses.includes(c)
                        ? "gradient-primary text-primary-foreground"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => toggleCourse(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
              {errors.courses && (
                <p className="text-sm text-destructive">{errors.courses}</p>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Budget Range (₹ Lakhs / year)</Label>
              <Slider
                min={1}
                max={30}
                step={1}
                value={budgetRange}
                onValueChange={(v) => setBudgetRange(v as [number, number])}
                className="py-3"
              />
              <div className="flex justify-between text-base font-semibold bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
                <span className="text-primary">₹{budgetRange[0]}L</span>
                <span className="text-secondary">₹{budgetRange[1]}L</span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-lg font-semibold">
                Preferred State
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className={`h-14 text-base rounded-xl border-2 transition-all ${errors.location ? "border-destructive" : "border-border hover:border-primary/50"}`}>
                  <SelectValue placeholder="Select preferred state" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location}</p>
              )}
            </div>

            {/* College Type */}
            <div className="space-y-2">
              <Label htmlFor="collegeType" className="text-lg font-semibold">
                College Type
              </Label>
              <Select value={collegeType} onValueChange={setCollegeType}>
                <SelectTrigger className={`h-14 text-base rounded-xl border-2 transition-all ${errors.collegeType ? "border-destructive" : "border-border hover:border-primary/50"}`}>
                  <SelectValue placeholder="Select college type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Any">Any (No preference)</SelectItem>
                </SelectContent>
              </Select>
              {errors.collegeType && (
                <p className="text-sm text-destructive">{errors.collegeType}</p>
              )}
            </div>

            {/* Hostel */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div>
                <Label className="text-lg font-semibold cursor-pointer">Hostel Required</Label>
                <p className="text-base text-muted-foreground mt-1">Do you need on-campus accommodation?</p>
              </div>
              <Switch
                checked={hostelRequired}
                onCheckedChange={setHostelRequired}
                className="h-6 w-11"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <WizardNavigation onBack={handleBack} onNext={handleNext} step={2} />
    </div>
  );
};

export default PreferencesPage;
