import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";
import heroImage from "@/assets/hero-posture.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-card rounded-full border border-primary/20">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Health Technology</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              AlignMe: AI Powered{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Posture Correction
              </span>{" "}
              System
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your workspace wellness with real-time AI posture analysis. 
              Prevent back pain, improve productivity, and maintain optimal health throughout your workday.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">99.2%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Monitoring</div>
              </div>
            </div>
          </div>
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-hero blur-3xl opacity-20 rounded-full" />
            <img 
              src={heroImage} 
              alt="Person with perfect posture at desk" 
              className="relative rounded-2xl shadow-hover w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
