import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, Clock, LineChart, Volume2, Settings, TrendingUp, Download, Moon, Sun, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

const Features = () => {
  const { theme, setTheme } = useTheme();
  
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced MediaPipe pose detection with machine learning for accurate posture analysis",
    },
    {
      icon: Clock,
      title: "Real-Time Monitoring",
      description: "Instant feedback on your posture with live angle measurements and status updates",
    },
    {
      icon: Volume2,
      title: "Audio Alerts",
      description: "Customizable sound notifications when bad posture is detected to help you stay aware",
    },
    {
      icon: LineChart,
      title: "Live Angle Tracking",
      description: "Real-time graphs showing neck, shoulder, and back angle measurements",
    },
    {
      icon: TrendingUp,
      title: "Session Statistics",
      description: "Track your good, okay, and bad posture percentages throughout each session",
    },
    {
      icon: Clock,
      title: "Session Timer",
      description: "Monitor how long you've been maintaining your posture with persistent timers",
    },
    {
      icon: Download,
      title: "Data Export",
      description: "Export your posture data as CSV files for further analysis and tracking",
    },
    {
      icon: Settings,
      title: "Customizable Settings",
      description: "Adjust sensitivity, alert intervals, and audio preferences to match your needs",
    },
    {
      icon: Cpu,
      title: "Hardware Integration",
      description: "Expandable to work with MPU6050 sensors for enhanced physical tracking accuracy",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 p-0"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 animate-pulse-glow"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6 animate-float">
              <div className="w-20 h-20 rounded-3xl bg-gradient-hero flex items-center justify-center shadow-glow">
                <Activity className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gradient animate-fade-in-up tracking-tight">
              AlignMe
            </h1>
            <p className="text-2xl md:text-3xl font-medium bg-gradient-accent bg-clip-text text-transparent max-w-3xl mx-auto animate-fade-in">
              AI-Powered Posture Correction
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
              Transform your workspace wellness with real-time AI posture analysis. Get instant feedback, 
              track your progress, and build healthier habits for a pain-free tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-up">
              <Link to="/monitor">
                <Button size="lg" className="text-lg px-10 py-6 shadow-hover hover:shadow-glow transition-all duration-300 hover:scale-105">
                  Start Monitoring
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 hover:scale-105 transition-all duration-300" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to improve and maintain healthy posture
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-hover hover:-translate-y-1 card-gradient group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-muted/30 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, effective posture monitoring in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 rounded-full bg-gradient-accent text-white text-3xl font-bold flex items-center justify-center mx-auto shadow-glow">
                1
              </div>
              <h3 className="text-2xl font-bold">Enable Camera</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Allow camera access and sit comfortably in front of your webcam
              </p>
            </div>

            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 rounded-full bg-gradient-accent text-white text-3xl font-bold flex items-center justify-center mx-auto shadow-glow">
                2
              </div>
              <h3 className="text-2xl font-bold">AI Analysis</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our AI analyzes your posture in real-time using advanced pose detection
              </p>
            </div>

            <div className="text-center space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-20 h-20 rounded-full bg-gradient-accent text-white text-3xl font-bold flex items-center justify-center mx-auto shadow-glow">
                3
              </div>
              <h3 className="text-2xl font-bold">Get Feedback</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Receive instant alerts and track your progress with detailed statistics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Integration CTA */}
      <div className="container mx-auto px-4 py-16">
        <Card className="border-border/50 shadow-hover hover:shadow-glow transition-all duration-300 max-w-5xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-3xl bg-gradient-accent flex items-center justify-center shadow-glow">
                  <Cpu className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Hardware Integration Available</h3>
                <p className="text-lg text-muted-foreground mb-0">
                  Expand AlignMe with MPU6050 sensors for enhanced physical tracking accuracy
                </p>
              </div>
              <Link to="/hardware">
                <Button size="lg" variant="hero" className="whitespace-nowrap">
                  Learn More →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-hero rounded-3xl p-12 md:p-16 text-center text-white shadow-glow relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-pulse-glow">
              Ready to Improve Your Posture?
            </h2>
            <p className="text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed">
              Start monitoring your posture today and develop healthier habits for a better tomorrow
            </p>
            <Link to="/monitor">
              <Button size="lg" className="text-lg px-12 py-7 bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-all duration-300 font-bold">
                Start Free Monitoring
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 AlignMe. AI-Powered Posture Correction System.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
