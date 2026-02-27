import { motion } from "framer-motion";
import { MapPin, IndianRupee, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { College } from "@/types/college";
import MatchScore from "./MatchScore";

interface CollegeCardProps {
  college: College;
  onViewDetails: (college: College) => void;
  isSelected: boolean;
  onToggleCompare: (id: string) => void;
  index: number;
}

const CollegeCard = ({ college, onViewDetails, isSelected, onToggleCompare, index }: CollegeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-3xl shadow-soft hover:shadow-elevated transition-all duration-300 p-7 border border-primary/10 glass-effect hover:-translate-y-1"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Match Score */}
        <div className="flex-shrink-0 flex sm:flex-col items-center gap-3 sm:gap-2">
          <MatchScore score={college.matchScore} />
          <span className="text-sm text-muted-foreground font-medium hidden sm:block">Match</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="text-2xl font-bold leading-tight">{college.name}</h3>
              <div className="flex items-center gap-1 text-base text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                {college.location}
              </div>
            </div>
            <Badge variant={college.type === "Government" ? "default" : "secondary"} className={`text-base py-2 px-3 rounded-lg ${college.type === "Government" ? "gradient-primary text-primary-foreground" : ""}`}>
              {college.type}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-base mt-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              📚 {college.course}
            </span>
            <span className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              {college.estimatedFees}
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-warning" />
              {college.rating} · Rank #{college.ranking}
            </span>
          </div>

          <p className="text-base text-muted-foreground/80 mt-4 line-clamp-2">{college.matchReason}</p>

          <div className="flex items-center justify-between mt-6">
            <label className="flex items-center gap-2 text-base cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggleCompare(college.id)}
              />
              Compare
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(college)}
              className="rounded-lg border-2 text-base h-10 hover:border-primary/50 transition-all"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollegeCard;
