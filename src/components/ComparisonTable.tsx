import { motion } from "framer-motion";
import { College } from "@/types/college";
import MatchScore from "./MatchScore";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComparisonTableProps {
  colleges: College[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const ComparisonTable = ({ colleges, onRemove, onClose }: ComparisonTableProps) => {
  if (colleges.length < 2) return null;

  const rows = [
    { label: "Location", key: "location" as const },
    { label: "Course", key: "course" as const },
    { label: "Fees", key: "estimatedFees" as const },
    { label: "Type", key: "type" as const },
    { label: "Ranking", render: (c: College) => `#${c.ranking}` },
    { label: "Rating", render: (c: College) => `${c.rating} / 5` },
    { label: "Avg Package", render: (c: College) => c.placementStats.avgPackage },
    { label: "Placement Rate", render: (c: College) => c.placementStats.placementRate },
    { label: "Eligibility", key: "eligibility" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-elevated border border-border/50 overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="font-bold text-lg">Compare Colleges</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-muted-foreground font-medium w-40">Criteria</th>
              {colleges.map((c) => (
                <th key={c.id} className="p-4 text-center min-w-[200px]">
                  <div className="flex flex-col items-center gap-2">
                    <MatchScore score={c.matchScore} size={56} />
                    <span className="font-semibold text-foreground text-sm">{c.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground"
                      onClick={() => onRemove(c.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-muted/30" : ""}>
                <td className="p-4 font-medium text-muted-foreground">{row.label}</td>
                {colleges.map((c) => (
                  <td key={c.id} className="p-4 text-center">
                    {"render" in row ? row.render(c) : c[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;
