import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cpu, Activity, Gauge } from "lucide-react";
import { Link } from "react-router-dom";

const Hardware = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-soft">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Hardware Integration</h1>
                  <p className="text-sm text-muted-foreground">MPU6050 Sensor System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <Badge variant="outline" className="mb-2">
              <Activity className="w-3 h-3 mr-1" />
              6-Axis Motion Tracking
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              MPU6050 Sensor Integration
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Expand AlignMe with physical hardware sensors for enhanced accuracy and precision in posture monitoring
            </p>
          </div>

          {/* Main Info Card */}
          <Card className="border-border/50 shadow-hover card-gradient animate-fade-in-up">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold">About MPU6050</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    The <strong className="text-foreground">MPU6050</strong> is a 6-axis motion tracking device that combines a 3-axis gyroscope 
                    and a 3-axis accelerometer. This sensor can be integrated with our system to provide precise 
                    posture measurements through physical hardware.
                  </p>
                  
                  <div className="space-y-4 pt-4">
                    <div className="p-4 rounded-xl bg-accent/10 border-l-4 border-accent">
                      <div className="flex items-start gap-3">
                        <Gauge className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-2 text-accent">Pitch Measurement</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Measures forward/backward tilt of your body. Essential for detecting slouching or 
                            leaning too far forward, which are common poor posture indicators.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-primary/10 border-l-4 border-primary">
                      <div className="flex items-start gap-3">
                        <Activity className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-2 text-primary">Roll Measurement</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Measures side-to-side tilt of your body. Helps identify uneven shoulder positions 
                            and lateral spine curvature issues.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-2xl p-8 space-y-6 border border-border/50">
                  <h4 className="font-bold text-2xl mb-6">Key Benefits</h4>
                  <ul className="space-y-4">
                    {[
                      "Real-time orientation tracking with 6-axis precision",
                      "Accurate pitch and roll angles for posture analysis",
                      "Low power consumption for wearable applications",
                      "Can complement webcam-based detection",
                      "Precise angular measurements (±16g, ±2000°/s)",
                      "I2C communication for easy integration"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="w-6 h-6 rounded-full bg-gradient-accent text-white flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-soft">
                          ✓
                        </div>
                        <span className="text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specs */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 card-gradient">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 shadow-soft">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Gyroscope</h3>
                <p className="text-sm text-muted-foreground mb-3">3-axis angular velocity sensor</p>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Range: ±250, 500, 1000, 2000°/s</p>
                  <p className="text-xs text-muted-foreground">16-bit ADC</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 card-gradient">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 shadow-soft">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Accelerometer</h3>
                <p className="text-sm text-muted-foreground mb-3">3-axis acceleration sensor</p>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Range: ±2g, 4g, 8g, 16g</p>
                  <p className="text-xs text-muted-foreground">16-bit ADC</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 card-gradient">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center mb-4 shadow-soft">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Communication</h3>
                <p className="text-sm text-muted-foreground mb-3">Digital interface</p>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">I2C protocol (400kHz)</p>
                  <p className="text-xs text-muted-foreground">3.3V or 5V operation</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo Project CTA */}
          <Card className="border-border/50 bg-gradient-hero shadow-glow text-white">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Try the MPU6050 Demo
              </h3>
              <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
                Experience the sensor in action with our interactive Wokwi simulation project
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-glow hover:scale-105 transition-all duration-300 font-bold"
                asChild
              >
                <a href="https://wokwi.com/projects/444511972417725441" target="_blank" rel="noopener noreferrer">
                  Launch Demo Project →
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Integration Guide */}
          <Card className="border-border/50 shadow-hover">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Integration Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-accent text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-glow">
                    1
                  </div>
                  <h4 className="font-bold">Connect Sensor</h4>
                  <p className="text-sm text-muted-foreground">
                    Wire the MPU6050 to your microcontroller via I2C pins
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-accent text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-glow">
                    2
                  </div>
                  <h4 className="font-bold">Configure Software</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up sensor parameters and calibration values
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-accent text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-glow">
                    3
                  </div>
                  <h4 className="font-bold">Stream Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Read pitch and roll angles in real-time for posture analysis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 AlignMe. Hardware integration capabilities.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hardware;
