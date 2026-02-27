import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { College } from "@/types/college";
import MatchScore from "./MatchScore";
import { MapPin, TrendingUp, Building, BookOpen, CheckCircle } from "lucide-react";

interface CollegeDetailsModalProps {
  college: College | null;
  open: boolean;
  onClose: () => void;
}

const CollegeDetailsModal = ({ college, open, onClose }: CollegeDetailsModalProps) => {
  if (!college) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <MatchScore score={college.matchScore} size={64} />
            <div>
              <DialogTitle className="text-xl">{college.name}</DialogTitle>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" /> {college.location}
              </p>
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">{college.description}</p>

        <Separator />

        {/* Placement Stats */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" /> Placement Statistics
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Avg Package", value: college.placementStats.avgPackage },
              { label: "Highest", value: college.placementStats.highestPackage },
              { label: "Rate", value: college.placementStats.placementRate },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-accent/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Fee Structure */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <Building className="h-4 w-4 text-primary" /> Fee Structure
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(college.feeStructure).map(([k, v]) => (
              <div key={k} className="flex justify-between rounded-lg bg-muted/50 px-3 py-2">
                <span className="capitalize text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Cutoff Trends */}
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-primary" /> Cutoff Trends
          </h4>
          <div className="flex gap-3">
            {college.cutoffTrends.map((t) => (
              <div key={t.year} className="flex-1 rounded-xl bg-accent/50 p-3 text-center">
                <p className="text-xs text-muted-foreground">{t.year}</p>
                <p className="text-lg font-bold">{t.cutoff}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Facilities */}
        <div>
          <h4 className="font-semibold mb-3">Facilities</h4>
          <div className="flex flex-wrap gap-2">
            {college.facilities.map((f) => (
              <Badge key={f} variant="outline" className="rounded-lg">{f}</Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Eligibility */}
        <div className="rounded-xl gradient-accent p-4">
          <h4 className="font-semibold flex items-center gap-2 mb-1">
            <CheckCircle className="h-4 w-4 text-success" /> Admission Eligibility
          </h4>
          <p className="text-sm text-muted-foreground">{college.eligibility}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollegeDetailsModal;
