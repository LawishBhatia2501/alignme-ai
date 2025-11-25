import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, Clock, LineChart, Volume2, Settings as SettingsIcon, TrendingUp, Download, Moon, Sun } from "lucide-react";
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
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Activity className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            AlignMe
          </h1>
          <p className="text-xl md:text-2xl text-primary font-medium">
            AI-Powered Posture Correction
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your workspace wellness with real-time AI posture analysis. Get instant feedback, 
            track your progress, and build healthier habits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/monitor">
              <Button size="lg" className="text-lg px-8">
                Start Monitoring
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
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
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
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
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">Enable Camera</h3>
              <p className="text-muted-foreground">
                Allow camera access and sit comfortably in front of your webcam
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your posture in real-time using advanced pose detection
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
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

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-2xl p-12 text-center text-primary-foreground max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Improve Your Posture?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start monitoring your posture today and develop healthier habits for a better tomorrow
          </p>
          <Link to="/monitor">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Free Monitoring
            </Button>
          </Link>
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
