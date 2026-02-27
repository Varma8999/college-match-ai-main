import { GraduationCap, Sparkles, Database } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-10 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-foreground">College Admission Agent</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> AI Powered
          </span>
          <span className="text-border">|</span>
          <span>Personalized</span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1">
            <Database className="h-3.5 w-3.5" /> Data Driven
          </span>
        </div>
        <p className="text-xs text-muted-foreground/60">
          Built for Hackathon 2026 · Made with ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
