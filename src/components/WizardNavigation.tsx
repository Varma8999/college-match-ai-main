import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface WizardNavigationProps {
  onBack: () => void;
  onNext: () => void;
  step: number;
  totalSteps?: number;
}

const WizardNavigation = ({ onBack, onNext, step, totalSteps = 3 }: WizardNavigationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="border-t border-border bg-muted/50 glass-effect sticky bottom-0"
    >
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="flex-1 bg-muted rounded-full overflow-hidden h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full gradient-primary rounded-full"
            />
          </div>
          <span className="text-lg font-semibold text-muted-foreground whitespace-nowrap">
            Step {step} of {totalSteps}
          </span>
        </div>

        <div className="flex gap-4 justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="rounded-xl border-2 text-base h-12 px-6 hover:border-primary/50 transition-all"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
          <Button
            onClick={onNext}
            className="gradient-primary text-primary-foreground rounded-xl text-base h-12 px-8 hover:shadow-floating transition-all hover:scale-105 active:scale-95"
          >
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WizardNavigation;
