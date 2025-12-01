import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, Clock, LineChart, Volume2, Settings as SettingsIcon, TrendingUp, Download, Moon, Sun, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { useState } from "react";
import SettingsPanel from "@/components/SettingsPanel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Features = () => {
  const { theme, setTheme } = useTheme();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [alertInterval, setAlertInterval] = useState(10);
  const [sensitivity, setSensitivity] = useState(2);
  
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
      icon: SettingsIcon,
      title: "Customizable Settings",
      description: "Adjust sensitivity, alert intervals, and audio preferences to match your needs",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Theme Toggle and Settings */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 p-0"
            >
              <SettingsIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <SettingsPanel
              audioEnabled={audioEnabled}
              onAudioToggle={setAudioEnabled}
              alertInterval={alertInterval}
              onAlertIntervalChange={setAlertInterval}
              sensitivity={sensitivity}
              onSensitivityChange={setSensitivity}
            />
          </DialogContent>
        </Dialog>

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
      <div className="container mx-auto px-4 py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,252,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.5)]">
              <Activity className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            AlignMe
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AI-Powered Posture Correction
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Transform your workspace wellness with real-time AI posture analysis. Get instant feedback, 
            track your progress, and build healthier habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/monitor">
              <Button size="lg" className="text-lg px-8 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.4)]">
                Start Monitoring
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 transition-all hover:scale-105 hover:border-primary/50" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to improve and maintain healthy posture
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.3)] animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(var(--neon-glow-rgb),0.3)] transition-all duration-500">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
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
      <div className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, effective posture monitoring in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.5)]">
                1
              </div>
              <h3 className="text-xl font-semibold">Enable Camera</h3>
              <p className="text-muted-foreground">
                Allow camera access and sit comfortably in front of your webcam
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.5)]">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your posture in real-time using advanced pose detection
              </p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.5)]">
                3
              </div>
              <h3 className="text-xl font-semibold">Get Feedback</h3>
              <p className="text-muted-foreground">
                Receive instant alerts and track your progress with detailed statistics
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Integration */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Hardware Integration</h2>
          <p className="text-lg text-muted-foreground">
            Take your posture monitoring to the next level with our MPU6050 sensor integration. 
            Get precise angle measurements directly from hardware sensors for enhanced accuracy 
            and reliability, even when away from your computer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/hardware">
              <Button size="lg" className="text-lg px-8 transition-all hover:scale-105">
                Learn More About Hardware
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Showcase */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">See It In Action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time posture detection with color-coded feedback
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Live Detection */}
          <div className="group space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(var(--neon-glow-rgb),0.3)]">
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/90 text-success-foreground text-sm font-medium backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-success-foreground animate-pulse"></span>
                  Good Posture
                </span>
              </div>
              <div className="aspect-video bg-gradient-to-br from-card to-secondary flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <Activity className="w-16 h-16 mx-auto opacity-50" />
                  <p className="text-sm">Real-time Camera Feed</p>
                  <p className="text-xs">Green landmarks indicate good posture</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Color-Coded Detection</h3>
              <p className="text-sm text-muted-foreground">
                Green for good posture, yellow for okay, red for bad
              </p>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="group space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(var(--neon-glow-rgb),0.3)]">
              <div className="p-6 space-y-4">
                <h4 className="text-lg font-semibold mb-4">Posture Statistics</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-4 rounded-lg border border-success/20 bg-success/5">
                    <div className="text-2xl font-bold text-success">61%</div>
                    <div className="text-xs text-muted-foreground mt-1">Good</div>
                    <div className="text-xs text-muted-foreground">(259 frames)</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-warning/20 bg-warning/5">
                    <div className="text-2xl font-bold text-warning">27%</div>
                    <div className="text-xs text-muted-foreground mt-1">Okay</div>
                    <div className="text-xs text-muted-foreground">(116 frames)</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div className="text-2xl font-bold text-destructive">12%</div>
                    <div className="text-xs text-muted-foreground mt-1">Bad</div>
                    <div className="text-xs text-muted-foreground">(51 frames)</div>
                  </div>
                </div>
                <div className="mt-6 p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Session Duration</span>
                    <span className="font-semibold">00:08:32</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                Detailed statistics help you improve over time
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/monitor">
            <Button size="lg" className="text-lg px-8 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.5)]">
              Try It Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="relative bg-gradient-to-br from-card to-secondary rounded-2xl p-12 text-center max-w-4xl mx-auto border border-primary/30 shadow-[0_0_50px_rgba(var(--neon-glow-rgb),0.2)]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Improve Your Posture?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Start monitoring your posture today and develop healthier habits for a better tomorrow
            </p>
            <Link to="/monitor">
              <Button size="lg" className="text-lg px-8 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--neon-glow-rgb),0.5)]">
                Start Free Monitoring
                <ChevronRight className="ml-2 h-5 w-5" />
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
