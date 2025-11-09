import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AlignMe
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">
              Sign In
            </Button>
            <Button variant="hero">
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
