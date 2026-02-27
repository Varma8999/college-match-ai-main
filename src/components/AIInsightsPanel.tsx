import { motion } from "framer-motion";
import { Brain, Target, Wallet, Shield } from "lucide-react";
import { College } from "@/types/college";

interface AIInsightsPanelProps {
  college: College;
}

const AIInsightsPanel = ({ college }: AIInsightsPanelProps) => {
  const insights = [
    {
      icon: Brain,
      title: "Why Recommended",
      content: college.matchReason,
    },
    {
      icon: Target,
      title: "Strengths for You",
      content: college.strengths.join(" · "),
    },
    {
      icon: Wallet,
      title: "Budget Fit",
      content: college.budgetFit,
    },
    {
      icon: Shield,
      title: "Rank Safety",
      content: college.rankSafety,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl shadow-soft border border-border/50 p-5 space-y-4"
    >
      <h3 className="font-bold text-lg flex items-center gap-2">
        <Brain className="h-5 w-5 text-secondary" />
        AI Insights
      </h3>

      {insights.map((item, i) => (
        <div key={i} className="rounded-xl bg-accent/40 p-3">
          <div className="flex items-center gap-2 mb-1">
            <item.icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{item.title}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default AIInsightsPanel;
