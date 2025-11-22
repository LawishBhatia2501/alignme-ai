import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Brain, Clock, LineChart, Volume2, Settings, TrendingUp, Download, Moon, Sun } from "lucide-react";
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
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shadow-soft">
                <Activity className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AlignMe
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              AI-Powered Posture Correction System
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced real-time posture monitoring using AI and computer vision. Get instant feedback, 
              track your progress, and maintain healthy posture throughout your day.
            </p>
            <div className="flex gap-4 justify-center pt-4">
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
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all hover:shadow-hover">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
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
      <div className="bg-muted/30 py-16">
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

      {/* MPU6050 Hardware Integration Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hardware Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expandable to work with physical sensors for enhanced accuracy
            </p>
          </div>

          <Card className="border-border/50 shadow-hover">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">MPU6050 Sensor Integration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The <strong>MPU6050</strong> is a 6-axis motion tracking device that combines a 3-axis gyroscope 
                    and a 3-axis accelerometer. This sensor can be integrated with our system to provide precise 
                    posture measurements through physical hardware.
                  </p>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-2">Pitch Measurement</h4>
                      <p className="text-sm text-muted-foreground">
                        Measures forward/backward tilt of your body. Essential for detecting slouching or 
                        leaning too far forward, which are common poor posture indicators.
                      </p>
                    </div>
                    <div className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold mb-2">Roll Measurement</h4>
                      <p className="text-sm text-muted-foreground">
                        Measures side-to-side tilt of your body. Helps identify uneven shoulder positions 
                        and lateral spine curvature issues.
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full md:w-auto">
                    <a href="https://wokwi.com/projects/444511972417725441" target="_blank" rel="noopener noreferrer">
                      View MPU6050 Demo Project →
                    </a>
                  </Button>
                </div>
                <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                  <h4 className="font-semibold text-lg">Key Benefits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-sm">Real-time orientation tracking with 6-axis precision</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-sm">Accurate pitch and roll angles for posture analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-sm">Low power consumption for wearable applications</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-sm">Can complement webcam-based detection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center text-white">
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
