import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="icon"
        className={`rounded-full h-14 w-14 ${className}`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? (
          <Moon className="h-7 w-7 text-muted-foreground" />
        ) : (
          <Sun className="h-7 w-7 text-muted-foreground" />
        )}
      </Button>
    </motion.div>
  );
};
