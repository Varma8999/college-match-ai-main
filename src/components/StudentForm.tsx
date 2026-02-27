import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { StudentFormData } from "@/types/college";
import { examTypes, courses, locations } from "@/data/mockData";

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
}

const StudentForm = ({ onSubmit }: StudentFormProps) => {
  const [rank, setRank] = useState("");
  const [examType, setExamType] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([1, 15]);
  const [location, setLocation] = useState("");
  const [collegeType, setCollegeType] = useState("");
  const [hostelRequired, setHostelRequired] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!rank || isNaN(Number(rank)) || Number(rank) <= 0) newErrors.rank = "Enter a valid rank";
    if (!examType) newErrors.examType = "Select an exam type";
    if (selectedCourses.length === 0) newErrors.courses = "Select at least one course";
    if (!location) newErrors.location = "Select a location";
    if (!collegeType) newErrors.collegeType = "Select college type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      rank: Number(rank),
      examType,
      preferredCourses: selectedCourses,
      budgetRange,
      preferredLocation: location,
      collegeType,
      hostelRequired,
    });
  };

  return (
    <section id="form-section" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">Tell Us About You</h2>
          <p className="text-muted-foreground">Fill in your details and we'll find the perfect colleges for you</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl shadow-elevated p-6 sm:p-8 space-y-6"
        >
          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="rank">Entrance Exam Rank</Label>
              <Input
                id="rank"
                type="number"
                placeholder="e.g. 1500"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className={errors.rank ? "border-destructive" : ""}
              />
              {errors.rank && <p className="text-sm text-destructive">{errors.rank}</p>}
            </div>

            <div className="space-y-2">
              <Label>Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger className={errors.examType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.examType && <p className="text-sm text-destructive">{errors.examType}</p>}
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-2">
            <Label>Preferred Course / Branch</Label>
            <div className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <Badge
                  key={c}
                  variant={selectedCourses.includes(c) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
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
            {errors.courses && <p className="text-sm text-destructive">{errors.courses}</p>}
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <Label>Budget Range (₹ Lakhs / year)</Label>
            <Slider
              min={1}
              max={30}
              step={1}
              value={budgetRange}
              onValueChange={(v) => setBudgetRange(v as [number, number])}
              className="py-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹{budgetRange[0]}L</span>
              <span>₹{budgetRange[1]}L</span>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Preferred Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className={errors.location ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
            </div>

            <div className="space-y-2">
              <Label>College Type</Label>
              <Select value={collegeType} onValueChange={setCollegeType}>
                <SelectTrigger className={errors.collegeType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Either">Either</SelectItem>
                </SelectContent>
              </Select>
              {errors.collegeType && <p className="text-sm text-destructive">{errors.collegeType}</p>}
            </div>
          </div>

          {/* Hostel */}
          <div className="flex items-center justify-between rounded-xl bg-accent/50 p-4">
            <div>
              <Label className="text-base">Hostel Required</Label>
              <p className="text-sm text-muted-foreground">Do you need on-campus accommodation?</p>
            </div>
            <Switch checked={hostelRequired} onCheckedChange={setHostelRequired} />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gradient-primary text-primary-foreground py-6 text-lg rounded-xl shadow-soft hover:shadow-elevated transition-all duration-300"
          >
            <Search className="mr-2 h-5 w-5" />
            Find My Perfect College
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default StudentForm;
