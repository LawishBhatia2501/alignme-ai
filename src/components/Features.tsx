import { Card, CardContent } from "@/components/ui/card";
import { Brain, Camera, Bell, TrendingUp } from "lucide-react";
import aiDetection from "@/assets/ai-detection.jpg";
import realtimeMonitoring from "@/assets/realtime-monitoring.jpg";
import feedback from "@/assets/feedback.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning algorithms analyze your posture in real-time with 99.2% accuracy.",
    image: aiDetection,
  },
  {
    icon: Camera,
    title: "Real-Time Monitoring",
    description: "Continuous webcam analysis tracks 33 body landmarks to ensure perfect alignment throughout your day.",
    image: realtimeMonitoring,
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get gentle reminders and actionable feedback when your posture needs correction.",
    image: feedback,
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your posture improvements over time with detailed analytics and insights.",
    image: realtimeMonitoring,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">AlignMe</span>?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the future of workplace wellness with cutting-edge AI technology designed to keep you healthy and productive.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-hover transition-all duration-300 border-border/50 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="p-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-card flex items-center justify-center shadow-soft">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
