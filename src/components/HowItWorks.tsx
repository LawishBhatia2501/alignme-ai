import { Card, CardContent } from "@/components/ui/card";
import { Webcam, Scan, CheckCircle2, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Webcam,
    step: "01",
    title: "Setup Your Camera",
    description: "Simply allow camera access and position yourself in the frame. No special equipment needed.",
  },
  {
    icon: Scan,
    step: "02",
    title: "AI Analysis Begins",
    description: "Our advanced AI detects 33 body landmarks and starts analyzing your posture in real-time.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Get Instant Feedback",
    description: "Receive immediate alerts when your posture deviates from optimal alignment.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Track Your Progress",
    description: "Monitor improvements with detailed analytics and personalized recommendations.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-card" id="how-it-works">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-hero bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get started in minutes with our simple, non-intrusive setup process.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative border-border/50 hover:shadow-hover transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-5xl font-bold text-primary/10">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold pt-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
