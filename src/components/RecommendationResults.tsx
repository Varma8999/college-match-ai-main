import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Bookmark, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { College } from "@/types/college";
import CollegeCard from "./CollegeCard";
import AIInsightsPanel from "./AIInsightsPanel";
import ComparisonTable from "./ComparisonTable";
import CollegeDetailsModal from "./CollegeDetailsModal";
import { toast } from "sonner";

interface RecommendationResultsProps {
  colleges: College[];
}

const RecommendationResults = ({ colleges }: RecommendationResultsProps) => {
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [focusedCollege, setFocusedCollege] = useState<College>(colleges[0]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) {
        toast.error("You can compare up to 3 colleges");
        return prev;
      }
      return [...prev, id];
    });
  };

  const compareColleges = colleges.filter((c) => compareIds.includes(c.id));

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Your Recommendations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We found <span className="font-semibold text-primary">{colleges.length}</span> colleges matching your profile
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mb-10"
        >
          {compareIds.length >= 2 && (
            <Button
              onClick={() => setShowComparison(true)}
              className="gradient-primary text-primary-foreground rounded-xl text-base h-12 px-6 hover:shadow-floating transition-all hover:scale-105 active:scale-95"
            >
              Compare ({compareIds.length})
            </Button>
          )}
          <Button variant="outline" className="rounded-xl text-base h-12 px-6 border-2 hover:border-primary/50 transition-all" onClick={() => toast.success("Recommendations saved!")}>
            <Bookmark className="mr-2 h-5 w-5" /> Save
          </Button>
          <Button variant="outline" className="rounded-xl text-base h-12 px-6 border-2 hover:border-primary/50 transition-all" onClick={() => toast.success("Report downloading...")}>
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Button>
          <Button variant="outline" className="rounded-xl text-base h-12 px-6 border-2 hover:border-primary/50 transition-all" onClick={() => toast.success("Email summary sent!")}>
            <Mail className="mr-2 h-5 w-5" /> Email Summary
          </Button>
        </motion.div>

        {/* Comparison */}
        {showComparison && compareColleges.length >= 2 && (
          <div className="mb-10">
            <ComparisonTable
              colleges={compareColleges}
              onRemove={(id) => toggleCompare(id)}
              onClose={() => setShowComparison(false)}
            />
          </div>
        )}

        {/* Results Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {colleges.map((college, i) => (
              <CollegeCard
                key={college.id}
                college={college}
                index={i}
                onViewDetails={(c) => {
                  setSelectedCollege(c);
                  setModalOpen(true);
                }}
                isSelected={compareIds.includes(college.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>

          {/* AI Insights sidebar */}
          <div className="space-y-4">
            <div className="sticky top-6">
              <AIInsightsPanel college={focusedCollege} />
              <div className="mt-4 flex flex-wrap gap-2">
                {colleges.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFocusedCollege(c)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      focusedCollege.id === c.id
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {c.name.split(",")[0].replace("Indian Institute of Technology", "IIT").replace("National Institute of Technology", "NIT")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CollegeDetailsModal
          college={selectedCollege}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default RecommendationResults;
